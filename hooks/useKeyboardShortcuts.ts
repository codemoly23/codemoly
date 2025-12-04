"use client";

import { useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

type ShortcutHandler = () => void;

interface KeyboardShortcut {
  key: string;
  ctrl?: boolean;
  shift?: boolean;
  alt?: boolean;
  handler: ShortcutHandler;
  description: string;
}

// Admin panel keyboard shortcuts
export function useAdminShortcuts() {
  const router = useRouter();

  const shortcuts: KeyboardShortcut[] = [
    {
      key: "d",
      alt: true,
      handler: () => router.push("/admin"),
      description: "Go to Dashboard",
    },
    {
      key: "s",
      alt: true,
      handler: () => router.push("/admin/services"),
      description: "Go to Services",
    },
    {
      key: "p",
      alt: true,
      handler: () => router.push("/admin/products"),
      description: "Go to Products",
    },
    {
      key: "e",
      alt: true,
      handler: () => router.push("/admin/events"),
      description: "Go to Events",
    },
    {
      key: "b",
      alt: true,
      handler: () => router.push("/admin/blog"),
      description: "Go to Blog",
    },
    {
      key: "m",
      alt: true,
      handler: () => router.push("/admin/media"),
      description: "Go to Media",
    },
    {
      key: "g",
      alt: true,
      handler: () => router.push("/admin/settings"),
      description: "Go to Settings",
    },
  ];

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      // Don't trigger shortcuts when typing in inputs
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement ||
        (event.target as HTMLElement).isContentEditable
      ) {
        return;
      }

      for (const shortcut of shortcuts) {
        const ctrlMatch = shortcut.ctrl ? event.ctrlKey || event.metaKey : !event.ctrlKey && !event.metaKey;
        const shiftMatch = shortcut.shift ? event.shiftKey : !event.shiftKey;
        const altMatch = shortcut.alt ? event.altKey : !event.altKey;
        const keyMatch = event.key.toLowerCase() === shortcut.key.toLowerCase();

        if (ctrlMatch && shiftMatch && altMatch && keyMatch) {
          event.preventDefault();
          shortcut.handler();
          return;
        }
      }
    },
    [shortcuts]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return shortcuts;
}

// Generic keyboard shortcut hook
export function useKeyboardShortcut(
  key: string,
  handler: ShortcutHandler,
  options: { ctrl?: boolean; shift?: boolean; alt?: boolean } = {}
) {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      // Don't trigger shortcuts when typing in inputs
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement ||
        (event.target as HTMLElement).isContentEditable
      ) {
        return;
      }

      const ctrlMatch = options.ctrl
        ? event.ctrlKey || event.metaKey
        : !event.ctrlKey && !event.metaKey;
      const shiftMatch = options.shift ? event.shiftKey : !event.shiftKey;
      const altMatch = options.alt ? event.altKey : !event.altKey;
      const keyMatch = event.key.toLowerCase() === key.toLowerCase();

      if (ctrlMatch && shiftMatch && altMatch && keyMatch) {
        event.preventDefault();
        handler();
      }
    },
    [key, handler, options]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);
}

// ESC key to close modals
export function useEscapeKey(handler: ShortcutHandler) {
  useKeyboardShortcut("Escape", handler);
}
