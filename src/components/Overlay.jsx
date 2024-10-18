import useTranscriptStore from "../stores/useTranscriptStore";
import useVideoStore from "../stores/useVideoStore";
import { getHighlightedSentences } from "../utils";

function Overlay() {
  const currentTime = useVideoStore((state) => state.currentTime);
  const sections = useTranscriptStore((state) => state.sections);

  const highlightedSentences = getHighlightedSentences(sections);

  const currentSentence = highlightedSentences.find((sentence) => {
    const { start, end } = sentence.timestamp;
    return start <= currentTime && currentTime < end;
  });

  return (
    <div className="absolute bottom-2 left-2 text-white">
      {currentSentence?.text}
    </div>
  );
}

export default Overlay;
