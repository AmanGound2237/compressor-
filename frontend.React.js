import React, { useState } from 'react';

const VideoCompressor = () => {
  const [file, setFile] = useState(null);
  const [resolution, setResolution] = useState('1280x720');
  const [crf, setCrf] = useState(28);
  const [outputFormat, setOutputFormat] = useState('mp4');
  const [progress, setProgress] = useState(0);
  const [downloadUrl, setDownloadUrl] = useState(null);

  const handleFileUpload = (event) => {
    setFile(event.target.files[0]);
  };

  const handleCompress = async () => {
    if (!file) {
      alert('Please upload a video file.');
      return;
    }

    const formData = new FormData();
    formData.append('video', file);
    formData.append('resolution', resolution);
    formData.append('crf', crf);
    formData.append('format', outputFormat);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:3000/compress-video', true);
    xhr.responseType = 'blob';

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percentComplete = Math.round((event.loaded / event.total) * 100);
        setProgress(percentComplete);
      }
    };

    xhr.onload = () => {
      if (xhr.status === 200) {
        const blob = new Blob([xhr.response], { type: video/${outputFormat} });
        const url = URL.createObjectURL(blob);
        setDownloadUrl(url);
      } else {
        alert('Compression failed.');
      }
    };

    xhr.send(formData);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Video Compressor</h1>

      <div className="mb-4">
        <input
          type="file"
          accept="video/*"
          onChange={handleFileUpload}
          className="border border-gray-300 p-2 w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium">Resolution:</label>
        <select
          value={resolution}
          onChange={(e) => setResolution(e.target.value)}
          className="border border-gray-300 p-2 w-full"
        >
          <option value="1920x1080">1920x1080 (Full HD)</option>
          <option value="1280x720">1280x720 (HD)</option>
          <option value="640x480">640x480 (SD)</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium">Quality (CRF):</label>
        <input
          type="number"
          value={crf}
          onChange={(e) => setCrf(e.target.value)}
          min="18"
          max="40"
          className="border border-gray-300 p-2 w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium">Output Format:</label>
        <select
          value={outputFormat}
          onChange={(e) => setOutputFormat(e.target.value)}
          className="border border-gray-300 p-2 w-full"
        >
          <option value="mp4">MP4</option>
          <option value="avi">AVI</option>
          <option value="mkv">MKV</option>
        </select>
      </div>

      <button
        onClick={handleCompress}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Compress Video
      </button>

      {progress > 0 && (
        <div className="mt-4">
          <label className="block text-sm font-medium">Progress:</label>
          <progress value={progress} max="100" className="w-full"></progress>
          <p>{progress}%</p>
        </div>
      )}

      {downloadUrl && (
        <div className="mt-4">
          <a
            href={downloadUrl}
            download="compressed-video.mp4"
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Download Compressed Video
          </a>
        </div>
      )}
    </div>
  );
};

export default VideoCompressor;
