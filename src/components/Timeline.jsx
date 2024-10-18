import useTranscriptStore from "../stores/useTranscriptStore";
import useVideoStore from "../stores/useVideoStore";
import { getHighlightedSentences } from "../utils";

function Timeline() {
  const currentTime = useVideoStore((state) => state.currentTime);
  const duration = useVideoStore((state) => state.duration);
  const sections = useTranscriptStore((state) => state.sections);

  const highlightedSentences = getHighlightedSentences(sections);

  function renderHighlights() {
    return highlightedSentences.map((sentence, index) => {
      const { start, end } = sentence.timestamp;
      const width = ((end - start) / duration) * 100;
      return (
        <div
          key={index}
          className="absolute h-full rounded-sm bg-blue-500"
          style={{
            width: `${width}%`,
            left: `${(start / duration) * 100}%`,
          }}
        />
      );
    });
  }

  function renderMarker() {
    if (highlightedSentences.length === 0) return null;
    return (
      <div
        className="absolute h-full w-0.5 -translate-x-1/2 bg-red-500"
        style={{
          left: `${(currentTime / duration) * 100}%`,
        }}
      />
    );
  }

  return (
    <div className="relative h-6 rounded-sm bg-[rgb(55,65,81)]">
      {renderHighlights()}
      {renderMarker()}
    </div>
  );
}

export default Timeline;
