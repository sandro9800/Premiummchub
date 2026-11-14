import type { DataSnapshot } from "@/types";
import { DEFAULT_SETTINGS } from "@/types";

export function getLocalFallback(): DataSnapshot {
  return {
    settings: DEFAULT_SETTINGS,
    items: [],
    media: [],
    downloads: [],
    analytics: [],
  };
}
