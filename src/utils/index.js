function formatTimestamp(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  let string = `${minutes.toString().padStart(2, "0")}:${remainingSeconds
    .toString()
    .padStart(2, "0")}`;
  if (hours > 0) {
    string = `${hours}:${string}`;
  }
  return string;
}

function getHighlightedSentences(sections) {
  const highlightedSentences = [];
  sections.forEach((section) => {
    section.sentences.forEach((sentence) => {
      if (sentence.isHighlighted) {
        highlightedSentences.push(sentence);
      }
    });
  });

  return highlightedSentences;
}

function getSkippedIntervals(sections) {
  const skippedIntervals = [{}];
  sections.forEach((section) => {
    section.sentences.forEach((sentence) => {
      if (sentence.isHighlighted) {
        const index = skippedIntervals.length;
        skippedIntervals[index - 1].end = sentence.timestamp.start;
        skippedIntervals[index] = { start: sentence.timestamp.end };
      }
    });
  });
  skippedIntervals.shift();
  skippedIntervals.pop();

  return skippedIntervals;
}

function callMockAPI() {
  const mockJSON = {
    sections: [
      {
        title: "Introduction",
        sentences: [
          {
            timestamp: {
              start: 0,
              end: 5,
            },
            text: "Welcome to our product demonstration.",
            isHighlighted: false,
          },
          {
            timestamp: {
              start: 5,
              end: 10,
            },
            text: "Today, we'll be showcasing our latest innovation.",
            isHighlighted: true,
          },
        ],
      },
      {
        title: "Key Features",
        sentences: [
          {
            timestamp: {
              start: 15,
              end: 20,
            },
            text: "Our product has three main features.",
            isHighlighted: false,
          },
          {
            timestamp: {
              start: 20,
              end: 25,
            },
            text: "First, it's incredibly easy to use.",
            isHighlighted: true,
          },
          {
            timestamp: {
              start: 25,
              end: 30,
            },
            text: "Second, it's highly efficient.",
            isHighlighted: true,
          },
          {
            timestamp: {
              start: 30,
              end: 35,
            },
            text: "And third, it's cost-effective.",
            isHighlighted: false,
          },
        ],
      },
      {
        title: "Demonstration",
        sentences: [
          {
            timestamp: {
              start: 40,
              end: 45,
            },
            text: "Let me show you how it works.",
            isHighlighted: false,
          },
          {
            timestamp: {
              start: 45,
              end: 48,
            },
            text: "Simply press this button to start.",
            isHighlighted: true,
          },
          {
            timestamp: {
              start: 50,
              end: 55,
            },
            text: "The interface is intuitive and user-friendly.",
            isHighlighted: true,
          },
        ],
      },
      {
        title: "Conclusion",
        sentences: [
          {
            timestamp: {
              start: 60,
              end: 65,
            },
            text: "In conclusion, our product is a game-changer.",
            isHighlighted: false,
          },
          {
            timestamp: {
              start: 65,
              end: 70,
            },
            text: "We're excited to bring this to market.",
            isHighlighted: true,
          },
          {
            timestamp: {
              start: 70,
              end: 75,
            },
            text: "Thank you for your attention.",
            isHighlighted: false,
          },
        ],
      },
    ],
  };
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockJSON);
    }, 1000);
  });
}

export {
  callMockAPI, formatTimestamp,
  getHighlightedSentences,
  getSkippedIntervals
};

