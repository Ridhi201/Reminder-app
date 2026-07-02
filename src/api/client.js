import { APP_CONFIG } from "../config/app.config.js";

/**
 * Thin fetch wrapper. Swap for axios if preferred — call sites only
 * depend on this module's exported shape, not the underlying client.
 */
async function request(path, { method = "GET", body, headers, ...rest } = {}) {
  const res = await fetch(`${APP_CONFIG.apiBaseUrl}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
    ...rest,
  });

  if (!res.ok) {
    const errorBody = await res.text().catch(() => "");
    throw new Error(`API ${method} ${path} failed: ${res.status} ${errorBody}`);
  }

  const contentType = res.headers.get("content-type") || "";
  return contentType.includes("application/json") ? res.json() : res.text();
}

export const apiClient = {
  get: (path, options) => request(path, { ...options, method: "GET" }),
  post: (path, body, options) => request(path, { ...options, method: "POST", body }),
  put: (path, body, options) => request(path, { ...options, method: "PUT", body }),
  patch: (path, body, options) => request(path, { ...options, method: "PATCH", body }),
  delete: (path, options) => request(path, { ...options, method: "DELETE" }),
};
