/**
 * Cloudflare R2 Upload Utility
 *
 * This module handles photo and video uploads to Cloudflare R2 storage.
 * Uses direct fetch with base64 data for reliable uploads.
 */

import * as FileSystem from "expo-file-system";

// Get environment variables - clean up any whitespace
const getEnvVar = (key: string): string => {
  const value = process.env[`EXPO_PUBLIC_${key}`] || process.env[key] || "";
  return value.trim();
};

const R2_ACCESS_KEY_ID = getEnvVar("R2_ACCESS_KEY_ID");
const R2_SECRET_ACCESS_KEY = getEnvVar("R2_SECRET_ACCESS_KEY");
const R2_ENDPOINT = getEnvVar("R2_ENDPOINT");
const R2_BUCKET_NAME = getEnvVar("R2_BUCKET_NAME");
const R2_PUBLIC_URL = getEnvVar("R2_PUBLIC_URL");

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
    if (!R2_ENDPOINT || !R2_BUCKET_NAME) {
      console.warn("R2 credentials not configured. Storing locally instead.");

      // Fall back to local storage
      return await storeLocally(weddingId, fileUri, mediaType, contentType, fileName);
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

    // Build the upload URL properly
    const cleanEndpoint = R2_ENDPOINT.replace(/\/+$/, ""); // Remove trailing slashes
    const uploadUrl = `${cleanEndpoint}/${R2_BUCKET_NAME}/${key}`;

    console.log(`📤 Reading ${mediaType} file...`);
    console.log(`📤 Upload URL: ${uploadUrl}`);

    // Use FileSystem.uploadAsync for direct file upload
    console.log(`📤 Uploading to R2: ${key}`);

    const response = await FileSystem.uploadAsync(uploadUrl, fileUri, {
      httpMethod: "PUT",
      uploadType: FileSystem.FileSystemUploadType.BINARY_CONTENT,
      headers: {
        "Content-Type": contentType,
      },
    });

    // FileSystem.uploadAsync returns { status, headers, body }
    if (response.status >= 200 && response.status < 300) {
      // Construct public URL
      const cleanPublicUrl = R2_PUBLIC_URL.replace(/\/+$/, "");
      const publicUrl = `${cleanPublicUrl}/${key}`;

      console.log(`✅ Upload successful: ${publicUrl}`);

      return {
        success: true,
        publicUrl,
        key,
        mediaType,
      };
    } else {
      console.error(`❌ R2 upload failed: ${response.status} - ${response.body}`);

      // Fall back to local storage
      console.log("📦 Falling back to local storage...");
      return await storeLocally(weddingId, fileUri, mediaType, contentType, fileName);
    }
  } catch (error) {
    console.error("R2 upload error:", error);

    // Try local storage as fallback
    try {
      return await storeLocally(
        options.weddingId,
        options.fileUri,
        options.mediaType || "photo",
        options.contentType || "image/jpeg",
        options.fileName
      );
    } catch (localError) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown upload error",
      };
    }
  }
}

/**
 * Store file locally as fallback
 */
async function storeLocally(
  weddingId: string,
  fileUri: string,
  mediaType: MediaType,
  contentType: string,
  fileName?: string
): Promise<UploadResult> {
  try {
    const timestamp = Date.now();
    const randomId = Math.random().toString(36).substring(2, 15);
    const extension = getExtension(contentType);
    const prefix = mediaType === "video" ? "video" : "photo";
    const finalFileName = fileName || `${prefix}_${timestamp}_${randomId}.${extension}`;

    const folder = mediaType === "video" ? "videos" : "photos";
    const key = `wedding_${weddingId}/${folder}/${finalFileName}`;

    // Store locally
    const localDir = `${FileSystem.cacheDirectory}wedsync/${weddingId}/${folder}/`;
    await FileSystem.makeDirectoryAsync(localDir, { intermediates: true });

    const localUri = `${localDir}${finalFileName}`;
    await FileSystem.copyAsync({ from: fileUri, to: localUri });

    console.log(`📦 Stored locally: ${localUri}`);

    return {
      success: true,
      publicUrl: localUri,
      key,
      mediaType,
    };
  } catch (error) {
    console.error("Local storage error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to store locally",
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
  const cleanPublicUrl = R2_PUBLIC_URL.replace(/\/+$/, "");
  return cleanPublicUrl ? `${cleanPublicUrl}/${key}` : key;
}

/**
 * Delete a file from R2
 */
export async function deleteFromR2(key: string): Promise<boolean> {
  try {
    if (!R2_ENDPOINT || !R2_BUCKET_NAME) {
      return false;
    }

    const cleanEndpoint = R2_ENDPOINT.replace(/\/+$/, "");
    const deleteUrl = `${cleanEndpoint}/${R2_BUCKET_NAME}/${key}`;

    const response = await fetch(deleteUrl, {
      method: "DELETE",
    });

    return response.ok;
  } catch (error) {
    console.error("R2 delete error:", error);
    return false;
  }
}
