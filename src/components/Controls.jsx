import { forwardRef, useMemo } from "react";
import { FiPause, FiPlay, FiSkipBack, FiSkipForward } from "react-icons/fi";
import useTranscriptStore from "../stores/useTranscriptStore";
import useVideoStore from "../stores/useVideoStore";
import { formatTimestamp, getHighlightedSentences } from "../utils";

function Controls(_, videoRef) {
  const isPlaying = useVideoStore((state) => state.isPlaying);
  const currentTime = useVideoStore((state) => state.currentTime);
  const setCurrentTime = useVideoStore((state) => state.setCurrentTime);
  const sections = useTranscriptStore((state) => state.sections);

  const highlightedSentences = useMemo(
    () => getHighlightedSentences(sections),
    [sections],
  );

  const currentSentenceIndex = useMemo(() => {
    return highlightedSentences.findIndex((sentence) => {
      const { start, end } = sentence.timestamp;
      return currentTime >= start && currentTime < end;
    });
  }, [currentTime, highlightedSentences]);

  function renderSeekToPreviousButton() {
    return (
      <button>
        <FiSkipBack
          onClick={() => {
            const previousSentence =
              highlightedSentences[currentSentenceIndex - 1];
            if (!previousSentence) return;
            videoRef.current.currentTime = previousSentence.timestamp.start;
            setCurrentTime(videoRef.current.currentTime);
          }}
        />
      </button>
    );
  }

  function renderPlayOrPauseButton() {
    return (
      <button
        onClick={() => {
          if (highlightedSentences.length === 0) return;
          if (isPlaying) {
            videoRef.current.pause();
          } else {
            videoRef.current.play();
          }
        }}
      >
        {isPlaying ? <FiPause /> : <FiPlay />}
      </button>
    );
  }

  function renderSeekToNextButton() {
    return (
      <button
        onClick={() => {
          const nextSentence = highlightedSentences[currentSentenceIndex + 1];
          if (!nextSentence) return;
          videoRef.current.currentTime = nextSentence.timestamp.start;
          setCurrentTime(videoRef.current.currentTime);
        }}
      >
        <FiSkipForward />
      </button>
    );
  }

  function renderTimestamp() {
    return (
      <div className="w-16 text-right text-sm">
        {formatTimestamp(currentTime)}
      </div>
    );
  }

  return (
    <div className="my-4 flex items-center justify-between px-2 text-xl text-white">
      {renderSeekToPreviousButton()}
      {renderPlayOrPauseButton()}
      {renderSeekToNextButton()}
      {renderTimestamp()}
    </div>
  );
}

export default forwardRef(Controls);
