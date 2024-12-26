const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const execPromise = promisify(exec);

/**
 * Compress a video using ffmpeg.
 * @param {Buffer} videoBuffer - The uploaded video file buffer.
 * @param {string} resolution - The target resolution (e.g., 1280x720).
 * @param {number} crf - The Constant Rate Factor (quality level).
 * @param {string} format - The output format (e.g., mp4, avi, mkv).
 * @returns {Promise<Buffer>} - Compressed video file as a buffer.
 */
async function compressVideo(videoBuffer, resolution, crf, format) {
  const inputPath = path.join(__dirname, 'input-temp.mp4');
  const outputPath = path.join(__dirname, output-temp.${format});

  try {
    // Write the video buffer to a temporary file
    fs.writeFileSync(inputPath, videoBuffer);

    // Run ffmpeg to compress the video
    const ffmpegCommand = ffmpeg -i "${inputPath}" -vf scale=${resolution} -crf ${crf} "${outputPath}";
    await execPromise(ffmpegCommand);

    // Read the compressed video into a buffer
    const compressedBuffer = fs.readFileSync(outputPath);

    // Clean up temporary files
    fs.unlinkSync(inputPath);
    fs.unlinkSync(outputPath);

    return compressedBuffer;
  } catch (error) {
    throw new Error('Error compressing video: ' + error.message);
  }
}

module.exports = { compressVideo };
