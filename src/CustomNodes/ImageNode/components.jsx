import React from "react";

const imageCache = new Set();

function useSuspenseImage(src) {
  if (!imageCache.has(src)) {
    throw new Promise((resolve) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        imageCache.add(src);
        resolve(null);
      };
    });
  }
}

export function LazyImage({
  altText,
  className,
  imageRef,
  src,
  width,
  height,
  maxWidth,
}) {
  useSuspenseImage(src);
  return (
    <img
      className={className || undefined}
      src={src}
      alt={altText}
      ref={imageRef}
      style={{
        height,
        maxWidth,
        width,
      }}
      draggable="false"
    />
  );
}

export function ImageResizer({
  showCaption,
  setShowCaption,
  editor,
  buttonRef,
  imageRef,
  maxWidth,
  onResizeStart,
  onResizeEnd,
  captionsEnabled,
}) {
  // Your ImageResizer component implementation here...
}
