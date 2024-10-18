import { forwardRef, useEffect } from "react";
import useTranscriptStore from "../stores/useTranscriptStore";
import useVideoStore from "../stores/useVideoStore";
import { getHighlightedSentences, getSkippedIntervals } from "../utils";

function Player(_, videoRef) {
  const setIsPlaying = useVideoStore((state) => state.setIsPlaying);
  const currentTime = useVideoStore((state) => state.currentTime);
  const setCurrentTime = useVideoStore((state) => state.setCurrentTime);
  const sections = useTranscriptStore((state) => state.sections);

  const highlightedSentences = getHighlightedSentences(sections);
  const start = highlightedSentences.at(0)?.timestamp.start;
  const end = highlightedSentences.at(-1)?.timestamp.end;

  useEffect(() => {
    if (start === undefined) return;
    videoRef.current.currentTime = start;
  }, [videoRef, start]);
  useEffect(() => {
    const skippedIntervals = getSkippedIntervals(sections);
    const interval = skippedIntervals.find(
      (interval) => currentTime >= interval.start && currentTime < interval.end,
    );
    if (interval) videoRef.current.currentTime = interval.end;
  }, [videoRef, sections, currentTime]);
  useEffect(() => {
    if (start === undefined) return;
    if (currentTime >= end) {
      videoRef.current.pause();
      videoRef.current.currentTime = start;
    }
  }, [videoRef, start, end, currentTime]);
  useEffect(() => {
    if (start === undefined && end === undefined) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [videoRef, start, end]);

  return (
    <video
      src="/SampleVideo.mp4"
      ref={videoRef}
      className="w-full"
      playsInline
      preload="metadata"
      onPlay={() => setIsPlaying(true)}
      onPause={() => setIsPlaying(false)}
      onTimeUpdate={() => setCurrentTime(videoRef.current.currentTime)}
    />
  );
}

export default forwardRef(Player);
