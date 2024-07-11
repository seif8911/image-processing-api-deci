interface sharpResizeParams {
  source: string;
  target: string;
  width: number;
  height: number;
}

import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

const cacheDir = path.resolve(__dirname, '../assets/images/cache');

const ensureCacheDir = () => {
  if (!fs.existsSync(cacheDir)) {
    fs.mkdirSync(cacheDir, { recursive: true });
  }
};

const processImage = async (
  inputPath: string,
  outputPath: string,
  width: number,
  height: number
): Promise<void> => {
  await sharp(inputPath)
    .resize(width, height)
    .toFormat('jpg')
    .toFile(outputPath);
};

export default processImage;
