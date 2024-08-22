import { useCallback, useRef } from "react";

const Direction = {
  east: 1 << 0,
  north: 1 << 3,
  south: 1 << 1,
  west: 1 << 2,
};

export function useImageResizer({ imageRef, editor, onResizeStart, onResizeEnd }) {
  const controlWrapperRef = useRef(null);
  const positioningRef = useRef({
    currentHeight: 0,
    currentWidth: 0,
    direction: 0,
    isResizing: false,
    ratio: 0,
    startHeight: 0,
    startWidth: 0,
    startX: 0,
    startY: 0,
  });
  const userSelect = useRef({
    priority: "",
    value: "default",
  });

  const editorRootElement = editor.getRootElement();
  const maxWidthContainer = editorRootElement
    ? editorRootElement.getBoundingClientRect().width - 20
    : 100;
  const maxHeightContainer = editorRootElement
    ? editorRootElement.getBoundingClientRect().height - 20
    : 100;
  const minWidth = 100;
  const minHeight = 100;

  const setStartCursor = useCallback((direction) => {
    const cursorType = (direction) => {
      if (direction & Direction.north) {
        return direction & Direction.west ? "nwse" : "nesw";
      }
      return direction & Direction.west ? "nesw" : "nwse";
    };

    const cursor = cursorType(direction) || (direction & Direction.east || direction & Direction.west ? "ew" : "ns");
    
    editorRootElement?.style.setProperty("cursor", `${cursor}-resize`, "important");
    document.body.style.setProperty("cursor", `${cursor}-resize`, "important");
    userSelect.current.value = document.body.style.getPropertyValue("-webkit-user-select");
    userSelect.current.priority = document.body.style.getPropertyPriority("-webkit-user-select");
    document.body.style.setProperty("-webkit-user-select", "none", "important");
  }, [editorRootElement]);

  const setEndCursor = useCallback(() => {
    editorRootElement?.style.setProperty("cursor", "default");
    document.body.style.setProperty("cursor", "default");
    document.body.style.setProperty("-webkit-user-select", userSelect.current.value, userSelect.current.priority);
  }, [editorRootElement]);

  const clamp = useCallback((value, min, max) => Math.min(Math.max(value, min), max), []);

  const handlePointerDown = useCallback((event, direction) => {
    if (!editor.isEditable()) return;

    const image = imageRef.current;
    const controlWrapper = controlWrapperRef.current;

    if (image && controlWrapper) {
      const { width, height } = image.getBoundingClientRect();
      const positioning = positioningRef.current;
      positioning.startWidth = width;
      positioning.startHeight = height;
      positioning.ratio = width / height;
      positioning.currentWidth = width;
      positioning.currentHeight = height;
      positioning.startX = event.clientX;
      positioning.startY = event.clientY;
      positioning.isResizing = true;
      positioning.direction = direction;

      setStartCursor(direction);
      onResizeStart();

      controlWrapper.classList.add("image-control-wrapper--resizing");
      image.style.height = `${height}px`;
      image.style.width = `${width}px`;

      document.addEventListener("pointermove", handlePointerMove);
      document.addEventListener("pointerup", handlePointerUp);
    }
  }, [editor, onResizeStart, setStartCursor]);

  const handlePointerMove = useCallback((event) => {
    const image = imageRef.current;
    const positioning = positioningRef.current;

    if (image && positioning.isResizing) {
      const { startX, startY, startWidth, startHeight, ratio, direction } = positioning;
      let diffX = event.clientX - startX;
      let diffY = event.clientY - startY;

      const isHorizontal = direction & (Direction.east | Direction.west);
      const isVertical = direction & (Direction.south | Direction.north);

      if (isHorizontal && isVertical) {
        diffX *= direction & Direction.east ? 1 : -1;
        const newWidth = clamp(startWidth + diffX, minWidth, maxWidthContainer);
        const newHeight = newWidth / ratio;
        image.style.width = `${newWidth}px`;
        image.style.height = `${newHeight}px`;
        positioning.currentWidth = newWidth;
        positioning.currentHeight = newHeight;
      } else if (isVertical) {
        diffY *= direction & Direction.south ? 1 : -1;
        const newHeight = clamp(startHeight + diffY, minHeight, maxHeightContainer);
        image.style.height = `${newHeight}px`;
        positioning.currentHeight = newHeight;
      } else {
        diffX *= direction & Direction.east ? 1 : -1;
        const newWidth = clamp(startWidth + diffX, minWidth, maxWidthContainer);
        image.style.width = `${newWidth}px`;
        positioning.currentWidth = newWidth;
      }
    }
  }, [clamp, maxHeightContainer, maxWidthContainer, minHeight, minWidth]);

  const handlePointerUp = useCallback(() => {
    const image = imageRef.current;
    const positioning = positioningRef.current;
    const controlWrapper = controlWrapperRef.current;

    if (image && controlWrapper && positioning.isResizing) {
      onResizeEnd(positioning.currentWidth, positioning.currentHeight);
      positioning.isResizing = false;
      controlWrapper.classList.remove("image-control-wrapper--resizing");
      setEndCursor();

      document.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerup", handlePointerUp);
    }
  }, [onResizeEnd, setEndCursor]);

  return {
    Direction,
    controlWrapperRef,
    imageRef,
    handlePointerDown,
  };
}
