import { useEffect, useRef, useState, useCallback } from "react";
import {
  SELECTION_CHANGE_COMMAND,
  $getSelection,
  $isRangeSelection,
} from "lexical";
import { mergeRegister } from "@lexical/utils";
import EditIcon from "@mui/icons-material/Edit";
import { $isLinkNode, TOGGLE_LINK_COMMAND } from "@lexical/link";
import DoneIcon from "@mui/icons-material/Done";
import { $isAtNodeEnd } from "@lexical/selection";
import {
  FloatingDivContainer,
  FloatingDivLink,
  FloatingDivLinkInput,
} from "./floatingLinkStyle";
import { Grid, IconButton } from "@mui/material";

const LowPriority = 1;

function FloatingLinkEditor({ editor }) {
  const editorRef = useRef(null);
  const inputRef = useRef(null);
  const mouseDownRef = useRef(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [isEditMode, setEditMode] = useState(false);
  const [lastSelection, setLastSelection] = useState(null);

  const updateLinkEditor = useCallback(() => {
    editor.getEditorState().read(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        const node = getSelectedNode(selection);
        const parent = node.getParent();
        if ($isLinkNode(parent)) {
          setLinkUrl(parent.getURL());
        } else if ($isLinkNode(node)) {
          setLinkUrl(node.getURL());
        } else {
          setLinkUrl("");
        }
      }

      const editorElem = editorRef.current;
      const nativeSelection = window.getSelection();
      const activeElement = document.activeElement;

      if (editorElem === null) {
        return;
      }

      const rootElement = editor.getRootElement();
      if (
        selection !== null &&
        !nativeSelection.isCollapsed &&
        rootElement !== null &&
        rootElement.contains(nativeSelection.anchorNode)
      ) {
        const domRange = nativeSelection.getRangeAt(0);
        let rect;
        if (nativeSelection.anchorNode === rootElement) {
          let inner = rootElement;
          while (inner.firstElementChild != null) {
            inner = inner.firstElementChild;
          }
          rect = inner.getBoundingClientRect();
        } else {
          rect = domRange.getBoundingClientRect();
        }

        if (!mouseDownRef.current) {
          positionEditorElement(editorElem, rect, rootElement);
        }
        setLastSelection(selection);
      } else if (!activeElement || activeElement.className !== "link-input") {
        positionEditorElement(editorElem, null, rootElement);
        setLastSelection(null);
        setEditMode(false);
        setLinkUrl("");
      }
    });
  }, [editor]);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateLinkEditor();
        });
      }),

      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          updateLinkEditor();
          return true;
        },
        LowPriority
      )
    );
  }, [editor, updateLinkEditor]);

  useEffect(() => {
    editor.getEditorState().read(() => {
      updateLinkEditor();
    });
  }, [editor, updateLinkEditor]);

  useEffect(() => {
    if (isEditMode && inputRef.current) {
      inputRef.current.focus();
      if (lastSelection !== null) {
        editor.getEditorState().read(() => {
          const selection = $getSelection();
          const node = getSelectedNode(selection);
          const parent = node.getParent();
          if ($isLinkNode(parent)) {
            setLinkUrl(parent.getURL());
          } else if ($isLinkNode(node)) {
            setLinkUrl(node.getURL());
          }
        });
      }
    }
  }, [isEditMode, lastSelection, editor]);

  const handleDone = () => {
    if (lastSelection !== null) {
      editor.update(() => {
        if (linkUrl !== "") {
          editor.dispatchCommand(TOGGLE_LINK_COMMAND, linkUrl);
        }
        setEditMode(false);
      });
    }
  };

  return (
    <FloatingDivContainer ref={editorRef}>
      <Grid container alignItems="center">
        <Grid item xs={10}>
          {isEditMode ? (
            <FloatingDivLinkInput
              ref={inputRef}
              fullWidth
              value={linkUrl}
              inputProps={{ sx: { height: 10 } }}
              onChange={(event) => {
                setLinkUrl(event.target.value);
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  handleDone();
                } else if (event.key === "Escape") {
                  event.preventDefault();
                  setEditMode(false);
                }
              }}
            />
          ) : (
            <FloatingDivLink>
              <a href={linkUrl} target="_blank" rel="noopener noreferrer">
                {linkUrl}
              </a>
            </FloatingDivLink>
          )}
        </Grid>
        <Grid item xs={1}>
          <IconButton
            className="link-edit"
            role="button"
            tabIndex={0}
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => {
              setEditMode(!isEditMode);
              if (!isEditMode && inputRef.current) {
                inputRef.current.focus();
              }
            }}
          >
            {isEditMode ? <DoneIcon onClick={handleDone} /> : <EditIcon />}
          </IconButton>
        </Grid>
      </Grid>
    </FloatingDivContainer>
  );
}

function getSelectedNode(selection) {
  const anchor = selection.anchor;
  const focus = selection.focus;
  const anchorNode = selection.anchor.getNode();
  const focusNode = selection.focus.getNode();
  if (anchorNode === focusNode) {
    return anchorNode;
  }
  const isBackward = selection.isBackward();
  if (isBackward) {
    return $isAtNodeEnd(focus) ? anchorNode : focusNode;
  } else {
    return $isAtNodeEnd(anchor) ? focusNode : anchorNode;
  }
}

function positionEditorElement(editorElem, rect, rootElement) {
  if (rect === null) {
    editorElem.style.opacity = "0";
    editorElem.style.top = "-1000px";
    editorElem.style.left = "-1000px";
  } else {
    if (!rootElement) {
      console.error("Editor element not found. Check the selector.");
      return;
    }

    const editorBounds = rootElement.getBoundingClientRect();
    let top = (rect.top + rect.height + window.pageYOffset + 10);
    let left = rect.left + window.pageXOffset - editorElem.offsetWidth / 2 + rect.width / 2;

    // Adjust positioning to keep within editor bounds
    if (top + editorElem.offsetHeight > editorBounds.bottom) {
      top = editorBounds.bottom - editorElem.offsetHeight / 2 + 25;
    }
    if (left < editorBounds.left) {
      left = editorBounds.left + 10;
    }
    if (left + editorElem.offsetWidth > editorBounds.right) {
      left = editorBounds.right - editorElem.offsetWidth / 2 + 25;
    }

    editorElem.style.opacity = "1";
    editorElem.style.top = `${top}px`;
    editorElem.style.left = `${left}px`;
  }
}

export default FloatingLinkEditor;
