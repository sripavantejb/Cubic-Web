type ScrubberOptions = {
  /** Called once, when the element can paint its first frame. */
  onFirstFrame?: () => void
};

// Stop short of `duration`: some browsers blank the picture when parked exactly at the end.
const END_GUARD = 0.04;
// About one 24fps frame — skip seeks that wouldn't change the picture.
const MIN_STEP = 1 / 24;

/**
 * Drives a paused, muted <video> from an external 0–1 progress value (a ScrollTrigger).
 *
 * Always chases the latest progress: while a seek is in flight we wait, then jump
 * straight to wherever scroll has moved — never queue a backlog of intermediate seeks
 * (that backlog is what makes scrubbed films feel stuck, then jump).
 */
export function createVideoScrubber(video: HTMLVideoElement, { onFirstFrame }: ScrubberOptions = {}) {
  let duration = 0;
  let progress = 0;
  let raf = 0;
  let painted = false;
  let primed = false;
  let pending = false;

  const targetTime = () => Math.max(0, Math.min(progress * duration, Math.max(0, duration - END_GUARD)));

  const render = () => {
    raf = 0;
    if (!duration) return;
    if (video.seeking) {
      pending = true;
      return;
    }

    const target = targetTime();
    if (Math.abs(video.currentTime - target) < MIN_STEP) {
      pending = false;
      return;
    }

    pending = false;
    try {
      video.currentTime = target;
    } catch {
      // Ignore seeks thrown before the element is ready; metadata handler will retry.
    }
  };

  const queue = () => {
    if (!raf) raf = requestAnimationFrame(render);
  };

  const onMetadata = () => {
    if (!Number.isFinite(video.duration) || video.duration <= 0) return;
    duration = video.duration;
    queue();
  };

  // Reveal only once a frame is ready and the element is paused, so the touch unlock below
  // can never show a moving picture.
  const onData = () => {
    if (painted || !video.paused || video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) return;
    painted = true;
    onFirstFrame?.();
  };

  const onSeeked = () => {
    onData();
    // Apply the newest scroll position immediately — drop everything in between.
    if (pending || Math.abs(video.currentTime - targetTime()) >= MIN_STEP) queue();
  };

  // iOS Safari can refuse to paint seeked frames until the element has played once.
  // On touch devices only, a muted play() is paused as soon as it starts; the element is
  // still hidden behind the poster at that point. Desktop never calls play().
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  const prime = () => {
    if (primed || !video.paused) return;
    primed = true;
    video
      .play()
      .then(() => {
        video.pause();
        queue();
      })
      .catch(() => {
        primed = false;
      });
  };

  video.muted = true;
  video.playsInline = true;
  video.addEventListener("loadedmetadata", onMetadata);
  video.addEventListener("durationchange", onMetadata);
  video.addEventListener("loadeddata", onData);
  video.addEventListener("pause", onData);
  video.addEventListener("seeked", onSeeked);
  if (coarse) {
    video.addEventListener("loadedmetadata", prime);
    window.addEventListener("touchstart", prime, { passive: true });
  }
  if (video.readyState >= HTMLMediaElement.HAVE_METADATA) onMetadata();
  if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) onData();

  return {
    setProgress(value: number) {
      progress = Math.min(1, Math.max(0, value));
      pending = true;
      queue();
    },
    destroy() {
      if (raf) cancelAnimationFrame(raf);
      video.removeEventListener("loadedmetadata", onMetadata);
      video.removeEventListener("durationchange", onMetadata);
      video.removeEventListener("loadeddata", onData);
      video.removeEventListener("pause", onData);
      video.removeEventListener("seeked", onSeeked);
      video.removeEventListener("loadedmetadata", prime);
      window.removeEventListener("touchstart", prime);
    },
  };
}
