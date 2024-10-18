import { forwardRef, useEffect } from "react";
import useTranscriptStore from "../stores/useTranscriptStore";
import useVideoStore from "../stores/useVideoStore";
import { formatTimestamp } from "../utils";

function Transcript(_, videoRef) {
  const currentTime = useVideoStore((state) => state.currentTime);
  const setCurrentTime = useVideoStore((state) => state.setCurrentTime);
  const setIsHighlighted = useTranscriptStore(
    (state) => state.setIsHighlighted,
  );
  const sections = useTranscriptStore((state) => state.sections);

  function getCurrentIndex() {
    for (let i = 0; i < sections.length; i++) {
      const { sentences } = sections[i];
      for (let j = 0; j < sentences.length; j++) {
        const { start, end } = sentences[j].timestamp;
        if (currentTime >= start && currentTime < end) {
          return {
            currentSectionIndex: i,
            currentSentenceIndex: j,
          };
        }
      }
    }
    return {};
  }

  const { currentSectionIndex, currentSentenceIndex } = getCurrentIndex();

  useEffect(() => {
    if (
      currentSectionIndex === undefined ||
      currentSentenceIndex === undefined
    ) {
      return;
    }
    document
      .getElementById(`${currentSectionIndex}-${currentSentenceIndex}`)
      .scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  }, [currentSectionIndex, currentSentenceIndex]);

  function renderSentence(sentence, sectionIndex, sentenceIndex) {
    const { isHighlighted, timestamp } = sentence;
    const { start } = timestamp;
    const isCurrent =
      sectionIndex === currentSectionIndex &&
      sentenceIndex === currentSentenceIndex;

    function getClassName() {
      let sentenceClassName = "flex gap-2 mt-2 py-1 px-2 rounded-md border-2";
      if (isHighlighted) {
        sentenceClassName += " bg-blue-500";
        if (isCurrent) {
          sentenceClassName += " border-yellow-500";
        } else {
          sentenceClassName += " border-transparent";
        }
      } else {
        sentenceClassName += " bg-white";
      }

      return sentenceClassName;
    }

    function renderTimestamp() {
      const className = isHighlighted ? "text-white" : "text-blue-600";

      return (
        <button
          className={className}
          onClick={() => {
            if (!isHighlighted) return;
            videoRef.current.currentTime = start;
            setCurrentTime(videoRef.current.currentTime);
          }}
        >
          {formatTimestamp(start)}
        </button>
      );
    }

    function renderText() {
      let className = "flex-grow text-left";
      if (isHighlighted) {
        className += " text-white";
      }

      return (
        <button
          className={className}
          onClick={() => {
            setIsHighlighted(sectionIndex, sentenceIndex, !isHighlighted);
          }}
        >
          {sentence.text}
        </button>
      );
    }

    return (
      <div
        key={sentenceIndex}
        className={getClassName()}
        id={`${sectionIndex}-${sentenceIndex}`}
      >
        {renderTimestamp()}
        {renderText()}
      </div>
    );
  }

  return sections.map((section, sectionIndex) => (
    <div key={sectionIndex} className="mb-4">
      <h3 className="font-semibold">{section.title}</h3>
      <div>
        {section.sentences.map((sentence, sentenceIndex) => {
          return renderSentence(sentence, sectionIndex, sentenceIndex);
        })}
      </div>
    </div>
  ));
}

export default forwardRef(Transcript);
