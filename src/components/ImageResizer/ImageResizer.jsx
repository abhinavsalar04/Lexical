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
    imageRef,
    editor,
    onResizeStart,
    onResizeEnd,
  });

  return (
    <div ref={controlWrapperRef}>
      {/* {!showCaption && captionsEnabled && (
        <button
          className="image-caption-button"
          ref={buttonRef}
          onClick={() => {
            setShowCaption(!showCaption);
          }}>
          Add Caption
        </button>
      )} */}
      <div
        className="image-resizer image-resizer-n"
        onPointerDown={(event) => {
          handlePointerDown(event, Direction.north);
        }}
      />
      <div
        className="image-resizer image-resizer-ne"
        onPointerDown={(event) => {
          handlePointerDown(event, Direction.north | Direction.east);
        }}
      />
      <div
        className="image-resizer image-resizer-e"
        onPointerDown={(event) => {
          handlePointerDown(event, Direction.east);
        }}
      />
      <div
        className="image-resizer image-resizer-se"
        onPointerDown={(event) => {
          handlePointerDown(event, Direction.south | Direction.east);
        }}
      />
      <div
        className="image-resizer image-resizer-s"
        onPointerDown={(event) => {
          handlePointerDown(event, Direction.south);
        }}
      />
      <div
        className="image-resizer image-resizer-sw"
        onPointerDown={(event) => {
          handlePointerDown(event, Direction.south | Direction.west);
        }}
      />
      <div
        className="image-resizer image-resizer-w"
        onPointerDown={(event) => {
          handlePointerDown(event, Direction.west);
        }}
      />
      <div
        className="image-resizer image-resizer-nw"
        onPointerDown={(event) => {
          handlePointerDown(event, Direction.north | Direction.west);
        }}
      />
    </div>
  );
  // return (
  //   <div ref={controlWrapperRef}>
  //     {!showCaption && captionsEnabled && (
  //       <button
  //         className="image-caption-button"
  //         ref={buttonRef}
  //         onClick={() => setShowCaption(!showCaption)}
  //       >
  //         Add Caption
  //       </button>
  //     )}
  //     {Object.keys(Direction).map((dir) => (
  //       <div
  //         key={dir}
  //         className={`image-resizer image-resizer-${dir.toLowerCase()}`}
  //         onPointerDown={(event) =>
  //           handlePointerDown(event, Direction[dir.toLowerCase()])
  //         }
  //       />
  //     ))}
  //   </div>
  // );
}
