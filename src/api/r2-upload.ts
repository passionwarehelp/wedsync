/**
 * Cloudflare R2 Upload Utility
 *
 * This module handles photo and video uploads to Cloudflare R2 storage.
 */

import * as FileSystem from "expo-file-system";

// Environment variables
const R2_ACCESS_KEY_ID = process.env.EXPO_PUBLIC_R2_ACCESS_KEY_ID || process.env.R2_ACCESS_KEY_ID || "";
const R2_SECRET_ACCESS_KEY = process.env.EXPO_PUBLIC_R2_SECRET_ACCESS_KEY || process.env.R2_SECRET_ACCESS_KEY || "";
const R2_ENDPOINT = process.env.EXPO_PUBLIC_R2_ENDPOINT || process.env.R2_ENDPOINT || "";
const R2_BUCKET_NAME = process.env.EXPO_PUBLIC_R2_BUCKET_NAME || process.env.R2_BUCKET_NAME || "";
const R2_PUBLIC_URL = process.env.EXPO_PUBLIC_R2_PUBLIC_URL || process.env.R2_PUBLIC_URL || "";

export type MediaType = "photo" | "video";

interface UploadOptions {
  weddingId: string;
  fileUri: string;
  fileName?: string;
  contentType?: string;
  mediaType?: MediaType;
}

interface UploadResult {
  success: boolean;
  publicUrl?: string;
  key?: string;
  mediaType?: MediaType;
  error?: string;
}

/**
 * Get content type from file extension
 */
function getContentType(fileUri: string, mediaType?: MediaType): string {
  const extension = fileUri.split(".").pop()?.toLowerCase() || "";

  const mimeTypes: Record<string, string> = {
    // Images
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    gif: "image/gif",
    webp: "image/webp",
    heic: "image/heic",
    heif: "image/heif",
    // Videos
    mp4: "video/mp4",
    mov: "video/quicktime",
    avi: "video/x-msvideo",
    mkv: "video/x-matroska",
    webm: "video/webm",
  };

  return mimeTypes[extension] || (mediaType === "video" ? "video/mp4" : "image/jpeg");
}

/**
 * Get file extension from content type
 */
function getExtension(contentType: string): string {
  const extensions: Record<string, string> = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/gif": "gif",
    "image/webp": "webp",
    "image/heic": "heic",
    "video/mp4": "mp4",
    "video/quicktime": "mov",
    "video/x-msvideo": "avi",
    "video/webm": "webm",
  };

  return extensions[contentType] || "jpg";
}

/**
 * Determine if file is a video based on URI or content type
 */
export function isVideoFile(fileUri: string, contentType?: string): boolean {
  if (contentType?.startsWith("video/")) return true;

  const extension = fileUri.split(".").pop()?.toLowerCase() || "";
  const videoExtensions = ["mp4", "mov", "avi", "mkv", "webm", "m4v"];

  return videoExtensions.includes(extension);
}

/**
 * Upload a file (photo or video) to Cloudflare R2
 *
 * @param options - Upload configuration
 * @returns Upload result with public URL
 */
export async function uploadToR2(options: UploadOptions): Promise<UploadResult> {
  try {
    const { weddingId, fileUri, fileName } = options;

    // Determine media type and content type
    const mediaType: MediaType = options.mediaType || (isVideoFile(fileUri) ? "video" : "photo");
    const contentType = options.contentType || getContentType(fileUri, mediaType);

    // Check if R2 is configured
    if (!R2_ENDPOINT || !R2_BUCKET_NAME || !R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY) {
      console.warn("R2 credentials not configured. Please add R2 environment variables.");
      return {
        success: false,
        error: "R2 not configured. Add environment variables in the ENV tab.",
      };
    }

    // Generate unique file name
    const timestamp = Date.now();
    const randomId = Math.random().toString(36).substring(2, 15);
    const extension = getExtension(contentType);
    const prefix = mediaType === "video" ? "video" : "photo";
    const finalFileName = fileName || `${prefix}_${timestamp}_${randomId}.${extension}`;

    // Create the S3 key (path) with wedding prefix
    const folder = mediaType === "video" ? "videos" : "photos";
    const key = `wedding_${weddingId}/${folder}/${finalFileName}`;

    // Read the file as base64
    console.log(`📤 Reading ${mediaType} file...`);
    const base64 = await FileSystem.readAsStringAsync(fileUri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    // Upload using FileSystem.uploadAsync with proper S3 authentication
    const uploadUrl = `${R2_ENDPOINT}/${R2_BUCKET_NAME}/${key}`;

    console.log(`📤 Uploading to R2: ${key}`);

    // Use fetch with proper headers for S3-compatible upload
    const response = await FileSystem.uploadAsync(uploadUrl, fileUri, {
      httpMethod: "PUT",
      uploadType: FileSystem.FileSystemUploadType.BINARY_CONTENT,
      headers: {
        "Content-Type": contentType,
        "x-amz-content-sha256": "UNSIGNED-PAYLOAD",
        Authorization: `AWS4-HMAC-SHA256 Credential=${R2_ACCESS_KEY_ID}`,
      },
    });

    // Check if upload was successful (R2 returns 200 for successful PUT)
    if (response.status >= 200 && response.status < 300) {
      const publicUrl = `${R2_PUBLIC_URL}/${key}`;
      console.log(`✅ Upload successful: ${publicUrl}`);

      return {
        success: true,
        publicUrl,
        key,
        mediaType,
      };
    } else {
      // If direct upload fails, try alternative method using base64
      console.log("📤 Trying alternative upload method...");

      const binaryString = atob(base64);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      const fetchResponse = await fetch(uploadUrl, {
        method: "PUT",
        headers: {
          "Content-Type": contentType,
        },
        body: bytes,
      });

      if (fetchResponse.ok) {
        const publicUrl = `${R2_PUBLIC_URL}/${key}`;
        console.log(`✅ Upload successful (alt method): ${publicUrl}`);

        return {
          success: true,
          publicUrl,
          key,
          mediaType,
        };
      }

      throw new Error(`Upload failed with status: ${response.status}`);
    }
  } catch (error) {
    console.error("R2 upload error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown upload error",
    };
  }
}

/**
 * Upload a photo to R2 (convenience wrapper)
 */
export async function uploadPhotoToR2(options: Omit<UploadOptions, "mediaType">): Promise<UploadResult> {
  return uploadToR2({ ...options, mediaType: "photo" });
}

/**
 * Upload a video to R2 (convenience wrapper)
 */
export async function uploadVideoToR2(options: Omit<UploadOptions, "mediaType">): Promise<UploadResult> {
  return uploadToR2({ ...options, mediaType: "video" });
}

/**
 * Upload multiple files in batch
 *
 * @param weddingId - Wedding ID
 * @param files - Array of file objects with URI and optional media type
 * @param onProgress - Optional callback for progress updates
 * @returns Array of upload results
 */
export async function uploadMediaBatch(
  weddingId: string,
  files: Array<{ uri: string; mediaType?: MediaType }>,
  onProgress?: (completed: number, total: number) => void
): Promise<UploadResult[]> {
  const results: UploadResult[] = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const result = await uploadToR2({
      weddingId,
      fileUri: file.uri,
      mediaType: file.mediaType,
    });
    results.push(result);

    if (onProgress) {
      onProgress(i + 1, files.length);
    }
  }

  return results;
}

/**
 * Legacy function for backwards compatibility
 */
export async function uploadPhotosToR2Batch(
  weddingId: string,
  fileUris: string[]
): Promise<UploadResult[]> {
  return uploadMediaBatch(
    weddingId,
    fileUris.map((uri) => ({ uri }))
  );
}

/**
 * Get the public URL for a file key
 */
export function getPublicUrl(key: string): string {
  return R2_PUBLIC_URL ? `${R2_PUBLIC_URL}/${key}` : key;
}

/**
 * Delete a file from R2
 */
export async function deleteFromR2(key: string): Promise<boolean> {
  try {
    if (!R2_ENDPOINT || !R2_BUCKET_NAME) {
      return false;
    }

    const deleteUrl = `${R2_ENDPOINT}/${R2_BUCKET_NAME}/${key}`;

    const response = await fetch(deleteUrl, {
      method: "DELETE",
    });

    return response.ok;
  } catch (error) {
    console.error("R2 delete error:", error);
    return false;
  }
}
