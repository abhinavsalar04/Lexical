import { useCallback, useEffect, useRef, useState } from "react";
import {
  SELECTION_CHANGE_COMMAND,
  $getSelection,
  $isRangeSelection,
} from "lexical";
import { $isLinkNode, TOGGLE_LINK_COMMAND } from "@lexical/link";
import { mergeRegister } from "@lexical/utils";
import getSelectedNode from "../utils/getSelectedNode";

const LowPriority = 1;
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

export const useFloatingLinkEditor = ({editor}) => {
  const editorRef = useRef(null);
  const inputRef = useRef(null);
  const mouseDownRef = useRef(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [isEditMode, setEditMode] = useState(false);
  const [lastSelection, setLastSelection] = useState(null);
  const [error, setError] = useState(null)


  function validateURL (link){
      const urlRegex = /^$|(https?|ftp):\/\/([a-zA-Z0-9.-]+(\.[a-zA-Z]{2,})+)(:\d{1,5})?([/?].*)?$/
      return { valid: urlRegex.test(link), error: "Invalid URL" }
  }
  
  const updateLinkEditor = useCallback(() => {
    editor.getEditorState().read(() => {
      const selection = $getSelection();
      const node = getSelectedNode(selection);
      const parent = node.getParent();

      if ($isRangeSelection(selection)) {
        setLinkUrl($isLinkNode(parent) ? parent.getURL() : $isLinkNode(node) ? node.getURL() : "");
      }

      const editorElem = editorRef.current;
      const nativeSelection = window.getSelection();
      const rootElement = editor.getRootElement();

      if (
        editorElem &&
        selection &&
        !nativeSelection.isCollapsed &&
        rootElement &&
        rootElement.contains(nativeSelection.anchorNode)
      ) {
        const rect = nativeSelection.anchorNode === rootElement
          ? rootElement.firstElementChild.getBoundingClientRect()
          : nativeSelection.getRangeAt(0).getBoundingClientRect();

        if (!mouseDownRef.current) {
          positionEditorElement(editorElem, rect, rootElement);
        }
        setLastSelection(selection);
      } else {
        positionEditorElement(editorElem, null, rootElement);
        setLastSelection(null);
        setEditMode(false);
        setLinkUrl("");
      }
    });
  }, [editor]);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(() => updateLinkEditor()),
      editor.registerCommand(SELECTION_CHANGE_COMMAND, () => {
        updateLinkEditor();
        return true;
      }, LowPriority)
    );
  }, [editor, updateLinkEditor]);

  useEffect(() => {
    if (isEditMode && inputRef.current) {
      inputRef.current.focus();
      updateLinkEditor();
    }
  }, [isEditMode, updateLinkEditor]);

  const handleConfirm = () => {
    if (lastSelection) {
      editor.update(() => {
        const status = validateURL(linkUrl)
        if(!status || !status.valid){
          setError(status.error)
          return;
        }
        setError(null)
        if (linkUrl) editor.dispatchCommand(TOGGLE_LINK_COMMAND, linkUrl);
        setEditMode(false);
      });
    }
  };

  function handleDelteLink(){
    editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
  }

  return {
    error,
    editorRef,
    inputRef,
    linkUrl,
    isEditMode,
    setLinkUrl,
    setEditMode,
    handleConfirm,
    handleDelteLink
  };
};
