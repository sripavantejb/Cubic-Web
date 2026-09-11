type ScrubberOptions = {
  /** Called once, when the element can paint its first frame. */
  onFirstFrame?: () => void
};

// Stop short of `duration`: some browsers blank the picture when parked exactly at the end.
const END_GUARD = 0.01;
// Below this gap (about half a 24fps frame) a seek would repaint the same frame.
const MIN_STEP = 0.02;

/**
 * Drives a paused, muted <video> from an external 0–1 progress value (a ScrollTrigger).
 *
 * - Nothing seeks until `loadedmetadata` provides the real duration; progress set before
 *   that (slow network, restored scroll position on refresh) is applied once it arrives.
 * - Seeks are coalesced to one per animation frame and never stacked: while the decoder
 *   is still busy, the newest target waits for `seeked`.
 */
export function createVideoScrubber(video: HTMLVideoElement, { onFirstFrame }: ScrubberOptions = {}) {
  let duration = 0;
  let progress = 0;
  let raf = 0;
  let painted = false;
  let primed = false;

  const render = () => {
    raf = 0;
    if (!duration || video.seeking) return;
    const target = Math.max(0, Math.min(progress * duration, duration - END_GUARD));
    if (Math.abs(video.currentTime - target) < MIN_STEP) return;
    video.currentTime = target;
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
        queue(); // back to the scroll position; `seeked` then reveals the element
      })
      .catch(() => {
        primed = false;
      });
  };

  video.muted = true;
  video.addEventListener("loadedmetadata", onMetadata);
  video.addEventListener("durationchange", onMetadata);
  video.addEventListener("loadeddata", onData);
  video.addEventListener("pause", onData);
  video.addEventListener("seeked", onData);
  video.addEventListener("seeked", queue);
  if (coarse) {
    video.addEventListener("loadedmetadata", prime);
    window.addEventListener("touchstart", prime, { passive: true });
  }
  if (video.readyState >= HTMLMediaElement.HAVE_METADATA) onMetadata();
  if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) onData();

  return {
    setProgress(value: number) {
      progress = Math.min(1, Math.max(0, value));
      queue();
    },
    destroy() {
      if (raf) cancelAnimationFrame(raf);
      video.removeEventListener("loadedmetadata", onMetadata);
      video.removeEventListener("durationchange", onMetadata);
      video.removeEventListener("loadeddata", onData);
      video.removeEventListener("pause", onData);
      video.removeEventListener("seeked", onData);
      video.removeEventListener("seeked", queue);
      video.removeEventListener("loadedmetadata", prime);
      window.removeEventListener("touchstart", prime);
    },
  };
}
