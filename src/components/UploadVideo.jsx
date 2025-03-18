import useTranscriptStore from "../stores/useTranscriptStore";

function UploadVideo() {
  const isUploading = useTranscriptStore((state) => state.isUploading);
  const uploadVideo = useTranscriptStore((state) => state.uploadVideo);

  return (
    <div className="flex h-screen items-center justify-center">
      <label
        htmlFor="uploadFile"
        className="mx-auto flex h-52 w-72 cursor-pointer flex-col items-center justify-center rounded border-2 border-dashed border-gray-300 bg-white font-[sans-serif] text-base font-semibold text-gray-500"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="mb-2 w-11 fill-gray-500"
          viewBox="0 0 32 32"
        >
          <path
            d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
            data-original="#000000"
          />
          <path
            d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
            data-original="#000000"
          />
        </svg>
        {isUploading ? "Uploading" : "Upload"} file
        <input
          type="file"
          id="uploadFile"
          className="hidden"
          onChange={() => uploadVideo()}
        />
        <p className="mt-2 text-xs font-medium text-gray-400">
          PNG, JPG SVG, WEBP, and GIF are Allowed.
        </p>
      </label>
    </div>
  );
}

export default UploadVideo;
