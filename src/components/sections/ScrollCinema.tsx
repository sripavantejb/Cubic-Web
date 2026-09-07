"use client";

import { cinema } from "@/content/site";
import { ScrollVideo } from "@/components/media/ScrollVideo";

export function ScrollCinema() {
  return (
    <div id="story">
      <ScrollVideo src={cinema.video} poster={cinema.poster} beats={cinema.beats} />
    </div>
  );
}
