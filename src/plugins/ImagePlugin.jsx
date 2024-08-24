
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $wrapNodeInElement, mergeRegister } from "@lexical/utils";
import {
  $createParagraphNode,
  $createRangeSelection,
  $getSelection,
  $insertNodes,
  $isNodeSelection,
  $isRootOrShadowRoot,
  $setSelection,
  COMMAND_PRIORITY_EDITOR,
  COMMAND_PRIORITY_HIGH,
  COMMAND_PRIORITY_LOW,
  createCommand,
  DRAGOVER_COMMAND,
  DRAGSTART_COMMAND,
  DROP_COMMAND,
} from "lexical";
import { useEffect, useRef, useState } from "react";
import { Box, Button, DialogActions, Grid, TextField } from "@mui/material";

import { CAN_USE_DOM } from "../utils/canUseDom";
import {
  $createImageNode,
  $isImageNode,
  ImageNode,
} from "../CustomNodes/ImageNode";
import TextInput from "../components/TextInput/TextInput";
import FileInput from "../ui/FileInput/fileInput";

const getDOMSelection = (targetWindow) =>
  CAN_USE_DOM ? (targetWindow || window).getSelection() : null;

export const INSERT_IMAGE_COMMAND = createCommand("INSERT_IMAGE_COMMAND");

export function InsertImageUriDialogBody({ onClick }) {
  const [src, setSrc] = useState("");
  const [altText, setAltText] = useState("");

  const isDisabled = src === "";

  return (
    <>
      <TextField
        label="Image URL"
        placeholder="i.e. https://source.unsplash.com/random"
        onChange={(e) => setSrc(e.target.value)}
        value={src}
        sx={{ mb: 7, height: 10 }}
        fullWidth
      />
      <TextField
        label="Alt Text"
        placeholder="Random unsplash image"
        onChange={(e) => setAltText(e.target.value)}
        sx={{ mb: 7, height: 10 }}
        fullWidth
        value={altText}
        data-test-id="image-modal-alt-text-input"
      />
      <Grid container justifyContent="flex-end">
        <Button
          data-test-id="image-modal-confirm-btn"
          disabled={isDisabled}
          onClick={() => onClick({ altText, src })}
          variant="outlined"
        >
          Confirm
        </Button>
      </Grid>
    </>
  );
}

export function InsertImageUploadedDialogBody({ onClick }) {
  const [src, setSrc] = useState("");
  const [altText, setAltText] = useState("");
  const [isLoading, setIsLoading] = useState(false)

  const isDisabled = src === "" || isLoading;

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      setIsLoading(true);
      // const response = await new Promise((resolve, reject) => {
      //   setTimeout(() => {
      //     resolve({data: {url: "https://dcblog.b-cdn.net/wp-content/uploads/2021/02/Full-form-of-URL-1-1024x824.jpg", alt: "image"}})
      //   }, 1000)
      // })
      // console.log("response: ", response)
      // if (response.data && response?.data?.url) {
      //   setSrc(response?.data?.url); // Use the returned URL as the src
      //   setAltText(response?.data?.alt)
      // } else {
      //   throw new Error("Upload failed");
      // }
    } catch (error) {
      console.error("Image upload failed:", error);
      setSrc(""); // Reset src if upload fails
    } finally {
      setIsLoading(false);
    }
  };

  const loadImage = (files) => {
    const reader = new FileReader();
    reader.onload = function () {
      if (typeof reader.result === 'string') {
        setSrc(reader.result);
      }
      return '';
    };
    if (files !== null) {
      reader.readAsDataURL(files[0]);
    }
  };

  return (
    <>
      <FileInput
        label="Image Upload"
        onChange={loadImage}
        accept="image/*"
        data-test-id="image-modal-file-upload"
      />
      <TextInput
        label="Alt Text"
        placeholder="Descriptive alternative text"
        onChange={setAltText}
        value={altText}
        data-test-id="image-modal-alt-text-input"
      />
      <DialogActions>
        <Button
          data-test-id="image-modal-file-upload-btn"
          variant="contained"
          color="inherit"
          style={{boxShadow: "none"}}
          disabled={isDisabled}
          onClick={() => onClick({altText, src})}>
          Confirm
        </Button>
      </DialogActions>
    </>
  );
}

export function InsertImageDialog({ activeEditor,  onClose = () => {} }) {
  const [mode, setMode] = useState(null);
  const hasModifier = useRef(false);      

  useEffect(() => {                       
    hasModifier.current = false;
    const handler = (e) => {
      hasModifier.current = e.altKey;
    };
    document.addEventListener("keydown", handler);
    return () => {
      document.removeEventListener("keydown", handler);
    };
  }, [activeEditor]);

  const onClick = (payload) => {
    // console.log("payload: ", payload)
    activeEditor.dispatchCommand(INSERT_IMAGE_COMMAND, payload);
    onClose();
  };

  return (
    <>
        {!mode && (
          <Box
           display={"flex"}
           flexDirection={"column"}
           gap={"1.5rem"}
          >
            <Button
              variant="contained"
              color="inherit"
              style={{boxShadow: "none"}}
              data-test-id="image-modal-option-url"
              onClick={() => setMode("url")}
            >
              URL
            </Button>
            <Button
              variant="contained"
              color="inherit"
              style={{boxShadow: "none"}}
              data-test-id="image-modal-option-file"
              onClick={() => setMode("file")}
            >
              File
            </Button>
          </Box>
        )}
        {mode === "url" && <InsertImageUriDialogBody onClick={onClick} />}
        {mode === "file" && <InsertImageUploadedDialogBody onClick={onClick} />}
    </>
  );
}


export function ImagePlugin({ captionsEnabled }) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (!editor.hasNodes([ImageNode])) {
      throw new Error("ImagePlugin: ImageNode not registered on editor");
    }

    return mergeRegister(
      editor.registerCommand(
        INSERT_IMAGE_COMMAND,
        (payload) => {
          const imageNode = $createImageNode(payload);
          $insertNodes([imageNode]);
          if ($isRootOrShadowRoot(imageNode.getParentOrThrow())) {
            $wrapNodeInElement(imageNode, $createParagraphNode).selectEnd();
          }

          return true;
        },
        COMMAND_PRIORITY_EDITOR
      ),
      editor.registerCommand(
        DRAGSTART_COMMAND,
        (event) => {
          return onDragStart(event);
        },
        COMMAND_PRIORITY_HIGH
      ),
      editor.registerCommand(
        DRAGOVER_COMMAND,
        (event) => {
          return onDragover(event);
        },
        COMMAND_PRIORITY_LOW
      ),
      editor.registerCommand(
        DROP_COMMAND,
        (event) => {
          return onDrop(event, editor);
        },
        COMMAND_PRIORITY_HIGH
      )
    );
  }, [captionsEnabled, editor]);

  return null;
}

const TRANSPARENT_IMAGE =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
const img = document.createElement("img");
img.src = TRANSPARENT_IMAGE;

function onDragStart(event) {
  const node = getImageNodeInSelection();
  if (!node) {
    return false;
  }
  const dataTransfer = event.dataTransfer;
  if (!dataTransfer) {
    return false;
  }
  dataTransfer.setData("text/plain", "_");
  dataTransfer.setDragImage(img, 0, 0);
  dataTransfer.setData(
    "application/x-lexical-drag",
    JSON.stringify({
      data: {
        altText: node.__altText,
        caption: node.__caption,
        height: node.__height,
        key: node.getKey(),
        maxWidth: node.__maxWidth,
        showCaption: node.__showCaption,
        src: node.__src,
        width: node.__width,
      },
      type: "image",
    })
  );

  return true;
}

function onDragover(event) {
  const node = getImageNodeInSelection();
  if (!node) {
    return false;
  }
  if (!canDropImage(event)) {
    event.preventDefault();
  }
  return true;
}

function onDrop(event, editor) {
  const node = getImageNodeInSelection();
  if (!node) {
    return false;
  }
  const data = getDragImageData(event);
  if (!data) {
    return false;
  }
  event.preventDefault();
  if (canDropImage(event)) {
    const range = getDragSelection(event);
    node.remove();
    const rangeSelection = $createRangeSelection();
    if (range !== null && range !== undefined) {
      rangeSelection.applyDOMRange(range);
    }
    $setSelection(rangeSelection);
    editor.dispatchCommand(INSERT_IMAGE_COMMAND, data);
  }
  return true;
}

function getImageNodeInSelection() {
  const selection = $getSelection();
  if (!$isNodeSelection(selection)) {
    return null;
  }
  const nodes = selection.getNodes();
  const node = nodes[0];
  return $isImageNode(node) ? node : null;
}

function getDragImageData(event) {
  const dragData = event.dataTransfer?.getData("application/x-lexical-drag");
  if (!dragData) {
    return null;
  }
  const { type, data } = JSON.parse(dragData);
  if (type !== "image") {
    return null;
  }

  return data;
}

function canDropImage(event) {
  const target = event.target;
  return !!(
    target &&
    target instanceof HTMLElement &&
    !target.closest("code, span.editor-image") &&
    target.parentElement &&
    target.parentElement.closest("div.ContentEditable__root")
  );
}

function getDragSelection(event) {
  let range;
  const target = event.target;
  const targetWindow =
    target == null
      ? null
      : target.nodeType === 9
      ? target.defaultView
      : target.ownerDocument.defaultView;
  const domSelection = getDOMSelection(targetWindow);
  if (document.caretRangeFromPoint) {
    range = document.caretRangeFromPoint(event.clientX, event.clientY);
  } else if (event.rangeParent && domSelection !== null) {
    domSelection.collapse(event.rangeParent, event.rangeOffset || 0);
    range = domSelection.getRangeAt(0);
  } else {
    throw Error(`Cannot get the selection when dragging`);
  }

  return range;
}
