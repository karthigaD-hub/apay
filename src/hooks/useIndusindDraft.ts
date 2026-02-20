import { useEffect } from "react";

const DRAFT_KEY = "indusind_insurance_draft";

// ✅ Save draft (MERGE instead of overwrite)
export function useSaveDraft<T extends object>(data: T) {
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const existing = localStorage.getItem(DRAFT_KEY);
        const parsed = existing ? JSON.parse(existing) : {};

        const updated = {
          ...parsed,
          ...data, // merge new section
        };

        localStorage.setItem(DRAFT_KEY, JSON.stringify(updated));
      } catch (error) {
        console.error("Draft save error:", error);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [data]);
}

// ✅ Load draft
export function loadDraft<T>(): T | null {
  try {
    const saved = localStorage.getItem(DRAFT_KEY);
    if (!saved) return null;
    return JSON.parse(saved);
  } catch {
    return null;
  }
}

// ✅ Clear draft after payment
export function clearDraft() {
  localStorage.removeItem(DRAFT_KEY);
}