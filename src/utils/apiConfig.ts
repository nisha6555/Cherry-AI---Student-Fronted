/**
 * apiConfig.ts
 * External Backend API and WebSocket configuration for Student Frontend (Vercel SPA).
 * Configures endpoints using VITE_API_URL and VITE_WS_URL environment variables.
 */

export function getApiBaseUrl(): string {
  const envUrl = (import.meta.env.VITE_API_URL as string | undefined)?.trim();
  if (envUrl && envUrl.length > 0) {
    return envUrl.replace(/\/+$/, "");
  }
  // Default to empty string for relative paths if running with same-origin or reverse proxy
  return "";
}

export function getWsBaseUrl(): string {
  const envWs = (import.meta.env.VITE_WS_URL as string | undefined)?.trim();
  if (envWs && envWs.length > 0) {
    let clean = envWs.replace(/\/+$/, "");
    if (clean.startsWith("http://")) {
      clean = "ws://" + clean.slice(7);
    } else if (clean.startsWith("https://")) {
      clean = "wss://" + clean.slice(8);
    }
    return clean;
  }

  // Fallback to current browser host
  if (typeof window !== "undefined") {
    const isHttps = window.location.protocol === "https:";
    return `${isHttps ? "wss:" : "ws:"}//${window.location.host}`;
  }
  return "";
}

/**
 * Returns full API URL for a given relative endpoint path (e.g. '/api/upload-document' -> 'https://api.backend.com/api/upload-document')
 */
export function apiUrl(endpoint: string): string {
  const base = getApiBaseUrl();
  const normalized = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  return base ? `${base}${normalized}` : normalized;
}

/**
 * Returns full WebSocket URL for a given endpoint path (e.g. '/api/live' -> 'wss://api.backend.com/api/live')
 */
export function wsUrl(endpoint: string): string {
  const base = getWsBaseUrl();
  const normalized = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  return `${base}${normalized}`;
}

/**
 * Wrapper around window.fetch that prepends the configured external backend API URL.
 */
export async function apiFetch(endpoint: string, init?: RequestInit): Promise<Response> {
  const url = apiUrl(endpoint);
  return fetch(url, init);
}
