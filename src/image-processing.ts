import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

interface sharpResizeParams {
  source: string;
  target: string;
  width: number;
  height: number;
}

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

const cacheDir = path.resolve(__dirname, '../assets/images/cache');

const ensureCacheDir = () => {
  if (!fs.existsSync(cacheDir)) {
    fs.mkdirSync(cacheDir, { recursive: true });
  }
};

export default processImage;
