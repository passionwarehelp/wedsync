/**
 * Cloudflare R2 Upload Utility
 *
 * This module handles photo uploads to Cloudflare R2 storage.
 * Uses local caching until proper backend presigned URL generation is implemented.
 */

import * as FileSystem from "expo-file-system";

// Environment variables
const R2_PUBLIC_URL = process.env.EXPO_PUBLIC_R2_PUBLIC_URL || process.env.R2_PUBLIC_URL || "";

interface UploadOptions {
  weddingId: string;
  fileUri: string;
  fileName?: string;
  contentType?: string;
}

interface UploadResult {
  success: boolean;
  publicUrl?: string;
  localUri?: string;
  key?: string;
  error?: string;
}

/**
 * Upload a photo to Cloudflare R2 (or cache locally for MVP)
 *
 * NOTE: This currently stores photos locally. To enable R2 uploads:
 * 1. Set up a backend API to generate presigned upload URLs
 * 2. Replace the file copy logic with fetch() to the presigned URL
 * 3. Update the return to use the R2 public URL
 *
 * @param options - Upload configuration
 * @returns Upload result with public URL or local URI
 */
export async function uploadPhotoToR2(options: UploadOptions): Promise<UploadResult> {
  try {
    const { weddingId, fileUri, fileName, contentType = "image/jpeg" } = options;

    // Generate unique file name if not provided
    const timestamp = Date.now();
    const randomId = Math.random().toString(36).substring(2, 15);
    const finalFileName = fileName || `photo_${timestamp}_${randomId}.jpg`;

    // Create the S3 key (path) with wedding prefix
    const key = `wedding_${weddingId}/photos/${finalFileName}`;

    // For MVP: Store locally in the app's cache directory
    const localDir = `${FileSystem.cacheDirectory}weddings/${weddingId}/photos/`;
    await FileSystem.makeDirectoryAsync(localDir, { intermediates: true });

    const localUri = `${localDir}${finalFileName}`;
    await FileSystem.copyAsync({ from: fileUri, to: localUri });

    // Construct what the public URL would be on R2
    const publicUrl = R2_PUBLIC_URL ? `${R2_PUBLIC_URL}/${key}` : localUri;

    console.log("📸 Photo stored:", { key, localUri });

    return {
      success: true,
      publicUrl,
      localUri,
      key,
    };
  } catch (error) {
    console.error("Photo storage error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown storage error",
    };
  }
}

/**
 * Upload multiple photos in batch
 *
 * @param weddingId - Wedding ID
 * @param fileUris - Array of file URIs
 * @returns Array of upload results
 */
export async function uploadPhotosToR2Batch(
  weddingId: string,
  fileUris: string[]
): Promise<UploadResult[]> {
  const results: UploadResult[] = [];

  for (const fileUri of fileUris) {
    const result = await uploadPhotoToR2({ weddingId, fileUri });
    results.push(result);
  }

  return results;
}

/**
 * Get the public URL for a photo key
 */
export function getPublicUrl(key: string): string {
  return R2_PUBLIC_URL ? `${R2_PUBLIC_URL}/${key}` : key;
}

/**
 * Delete a photo from local storage (R2 deletion to be implemented)
 */
export async function deletePhoto(localUri: string): Promise<boolean> {
  try {
    const fileInfo = await FileSystem.getInfoAsync(localUri);
    if (fileInfo.exists) {
      await FileSystem.deleteAsync(localUri);
      return true;
    }
    return false;
  } catch (error) {
    console.error("Photo deletion error:", error);
    return false;
  }
}
