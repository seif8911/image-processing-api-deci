import { promises as fs } from 'fs';
import path from 'path';
import processImage from './image-processing'; // Assuming this function exists and is correctly implemented

interface ImageQuery {
  filename?: string;
  width?: string;
  height?: string;
}

export default class File {
  static imagesFullPath = path.resolve(__dirname, '../assets/images/full');
  static imagesThumbPath = path.resolve(__dirname, '../assets/images/thumb');

  /**
   * Get the path of an image based on parameters.
   */
  static async getImagePath(params: ImageQuery): Promise<string | null> {
    if (!params.filename) {
      return null;
    }

    const filePath =
      params.width && params.height
        ? path.resolve(
            File.imagesThumbPath,
            `${params.filename}-${params.width}x${params.height}.jpg`
          )
        : path.resolve(File.imagesFullPath, `${params.filename}.jpg`);

    try {
      await fs.access(filePath);
      return filePath;
    } catch {
      return null;
    }
  }

  /**
   * Check if an image with given filename exists.
   */
  static async isImageAvailable(filename: string = ''): Promise<boolean> {
    if (!filename) {
      return false;
    }

    try {
      const files = await fs.readdir(File.imagesFullPath);
      return files.map(file => path.parse(file).name).includes(filename);
    } catch {
      return false;
    }
  }

  /**
   * Retrieve all available image filenames.
   */
  static async getAvailableImageNames(): Promise<string[]> {
    try {
      const files = await fs.readdir(File.imagesFullPath);
      return files.map(file => path.parse(file).name);
    } catch {
      return [];
    }
  }

  /**
   * Check if a thumbnail with given parameters exists.
   */
  static async isThumbAvailable(params: ImageQuery): Promise<boolean> {
    if (!params.filename || !params.width || !params.height) {
      return false;
    }

    const thumbPath = path.resolve(
      File.imagesThumbPath,
      `${params.filename}-${params.width}x${params.height}.jpg`
    );

    try {
      await fs.access(thumbPath);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Ensure the thumbnail directory exists.
   */
  static async createThumbPath(): Promise<void> {
    try {
      await fs.access(File.imagesThumbPath);
    } catch {
      await fs.mkdir(File.imagesThumbPath, { recursive: true });
    }
  }

  /**
   * Create a thumbnail for a given image.
   */
  static async createThumb(params: ImageQuery): Promise<string | null> {
    if (!params.filename || !params.width || !params.height) {
      return null;
    }

    const fullImagePath = path.resolve(
      File.imagesFullPath,
      `${params.filename}.jpg`
    );
    const thumbImagePath = path.resolve(
      File.imagesThumbPath,
      `${params.filename}-${params.width}x${params.height}.jpg`
    );

    try {
      await processImage(
        fullImagePath,
        thumbImagePath,
        parseInt(params.width),
        parseInt(params.height)
      );
      return null;
    } catch (error) {
      return error.message;
    }
  }
}
