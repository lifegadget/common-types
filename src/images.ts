export type ImageFormat =
  | "avif"
  | "dz"
  | "fits"
  | "gif"
  | "heif"
  | "jpg"
  | "magick"
  | "pdf"
  | "png"
  | "ppm"
  | "raw"
  | "svg"
  | "tiff"
  | "webp";
export type WebImageFormat = Omit<
  ImageFormat,
  "fits" | "magick" | "ppm" | "raw" | "tiff"
>;

/**
 * A way of describing an image which has been optimized via the
 * _do-devops_ image optimization flow.
 */
export interface IOptimizedImage {
  name: string;
  /** the relative path to the optimized image */
  path: string;
  /** the widths which the image has been optimized for */
  widths: number[];
  /** the image formats which have been generated */
  formats: WebImageFormat[];

  /** the native aspect ratio of the source image (e.g., width/height) */
  aspectRatio: number;
}
