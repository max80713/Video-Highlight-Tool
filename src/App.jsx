import { useRef } from "react";
import Controls from "./components/Controls";
import Overlay from "./components/Overlay";
import Player from "./components/Player";
import Timeline from "./components/Timeline";
import Transcript from "./components/Transcript";
import UploadVideo from "./components/UploadVideo";
import useTranscriptStore from "./stores/useTranscriptStore";

function App() {
  const videoRef = useRef();
  const isUploaded = useTranscriptStore((state) => state.isUploaded);

  if (!isUploaded) {
    return <UploadVideo />;
  }

  return (
    <div className="flex h-screen flex-col-reverse sm:flex-row">
      <div className="h-32 flex-grow bg-[rgb(242,244,246)] sm:h-full">
        <h2 className="p-4 text-xl font-bold">Transcript</h2>
        <div className="h-[calc(100%-60px)] overflow-auto px-4">
          <Transcript ref={videoRef} />
        </div>
      </div>
      <div className="flex-grow-0 bg-[rgb(31,41,51)] p-4 sm:flex-grow">
        <h2 className="mb-4 text-xl font-bold text-white">Preview</h2>
        <div className="relative">
          <Player ref={videoRef} />
          <Overlay />
        </div>
        <Controls ref={videoRef} />
        <Timeline />
      </div>
    </div>
  );
}

export default App;
