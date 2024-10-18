import { create } from "zustand";

const useVideoStore = create((set) => ({
  isPlaying: false,
  currentTime: 0,
  duration: 125,
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  setCurrentTime: (currentTime) => set({ currentTime }),
}));

export default useVideoStore;
