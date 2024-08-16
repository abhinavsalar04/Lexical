import React from "react";
import { useImageResizer } from "../../hooks/useImageResizer";
import "./imageResizerStyle.css";

export default function ImageResizer({
  onResizeStart,
  onResizeEnd,
  buttonRef,
  imageRef,
  editor,
  showCaption,
  setShowCaption,
  captionsEnabled,
}) {
  const { Direction, controlWrapperRef, handlePointerDown } = useImageResizer({
    editor,
    onResizeStart,
    onResizeEnd,
  });

  return (
    <div ref={controlWrapperRef}>
      {!showCaption && captionsEnabled && (
        <button
          className="image-caption-button"
          ref={buttonRef}
          onClick={() => setShowCaption(!showCaption)}
        >
          Add Caption
        </button>
      )}
      {Object.keys(Direction).map((dir) => (
        <div
          key={dir}
          className={`image-resizer image-resizer-${dir.toLowerCase()}`}
          onPointerDown={(event) =>
            handlePointerDown(event, Direction[dir.toLowerCase()])
          }
        />
      ))}
    </div>
  );
}
