import { produce } from "immer";
import { create } from "zustand";
import { callMockAPI } from "../utils";

const useTranscriptStore = create((set) => ({
  isUploading: false,
  isUploaded: false,
  sections: null,
  setSections: (sections) => set({ sections }),
  setIsHighlighted: (sectionIndex, sentenceIndex, isHighlighted) =>
    set(
      produce((state) => {
        state.sections[sectionIndex].sentences[sentenceIndex].isHighlighted =
          isHighlighted;
      }),
    ),
  uploadVideo: async () => {
    set({ isUploading: true });
    const response = await callMockAPI();
    set({ sections: response.sections, isUploading: false, isUploaded: true });
  },
}));

export default useTranscriptStore;
