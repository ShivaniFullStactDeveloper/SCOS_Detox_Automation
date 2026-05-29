/**
 * @file api-config.ts
 * @module services/api-config
 * @description Central API configuration — base URL and request defaults.
 */

import { Platform } from 'react-native';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** Extends the global object to allow a runtime base URL override. */
type GlobalWithApiOverride = typeof globalThis & {
  MENTRIXOS_API_BASE_URL?: string;
};

// ---------------------------------------------------------------------------
// URL resolution
// ---------------------------------------------------------------------------

/**
 * Default local backend URLs:
 * Android Emulator  -> 10.0.2.2
 * iOS Simulator     -> localhost
 */
const DEFAULT_BASE_URL =
  Platform.OS === 'android'
    ? 'http://10.0.2.2:3005'
    : 'http://localhost:3005';

/**
 * Reads the runtime override injected via the global object.
 * Returns null if not set so the fallback chain continues.
 */
const getRuntimeUrl = (): string | null => {
  if (typeof global === 'undefined') return null;
  return (global as GlobalWithApiOverride).MENTRIXOS_API_BASE_URL ?? null;
};

/**
 * Reads the build-time environment variable.
 * Returns null if process / process.env is unavailable.
 */
const getEnvUrl = (): string | null => {
  if (typeof process === 'undefined' || !process?.env) return null;
  return process.env.API_BASE_URL ?? null;
};

// ---------------------------------------------------------------------------
// Exported config values
// ---------------------------------------------------------------------------

/**
 * Resolved API base URL.
 */
export const API_BASE_URL: string =
  getRuntimeUrl() ?? getEnvUrl() ?? DEFAULT_BASE_URL;

/**
 * Request timeout in milliseconds.
 */
export const API_TIMEOUT_MS: number = 15_000;