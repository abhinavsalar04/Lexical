import { Suspense, useRef } from "react";
import { LazyImage} from "./components";
import ImageResizer from "../../components/ImageResizer/ImageResizer"
import { useImageNode } from "../../hooks/useImageNode"; // import the custom hook
import { $isNodeSelection } from "lexical";

export default function ImageComponent({
  src,
  altText,
  nodeKey,
  width,
  height,
  maxWidth,
  resizable,
  showCaption,
  caption,
  captionsEnabled,
}) {
  const imageRef = useRef(null);

  const {
    editor,
    setShowCaption,
    onResizeEnd,
    onResizeStart,
    selection,
    buttonRef,
    draggable,
    isFocused,
  } = useImageNode({ nodeKey, showCaption, caption, imageRef });

  return (
    <Suspense fallback={null}>
      <>
        <div draggable={draggable}>
          <LazyImage
            className={
              isFocused
                ? `focused ${$isNodeSelection(selection) ? "draggable" : ""}`
                : null
            }
            src={src}
            altText={altText}
            imageRef={imageRef}
            width={width}
            height={height}
            maxWidth={maxWidth}
          />
        </div>
        {/* {showCaption && (
          <div className="image-caption-container">
          <LexicalNestedComposer
              initialEditor={caption}
              initialNodes={[
                RootNode,
                TextNode,
                ParagraphNode,
              ]}>
              <AutoFocusPlugin />
               <PlainTextPlugin
                contentEditable={
                  <ContentEditable
                    placeholder="Enter a caption..."
                    placeholderClassName="ImageNode__placeholder"
                    className="ImageNode__contentEditable"
                  />
                }
                ErrorBoundary={LexicalErrorBoundary}
              />
            </LexicalNestedComposer>
          </div>
        )} */}
        {resizable && $isNodeSelection(selection) && isFocused && (
          <ImageResizer
            showCaption={showCaption}
            setShowCaption={setShowCaption}
            editor={editor}
            buttonRef={buttonRef}
            imageRef={imageRef}
            maxWidth={maxWidth}
            onResizeStart={onResizeStart}
            onResizeEnd={onResizeEnd}
            captionsEnabled={captionsEnabled}
          />
        )}
      </>
    </Suspense>
  );
}
