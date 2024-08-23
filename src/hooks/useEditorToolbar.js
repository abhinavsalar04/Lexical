import {useCallback, useEffect, useState} from "react";
import {$isRootOrShadowRoot, $isTextNode, CAN_REDO_COMMAND, CAN_UNDO_COMMAND} from "lexical";
import {
    mergeRegister,
    $findMatchingParent,
    $getNearestBlockElementAncestorOrThrow,
    $getNearestNodeOfType,
} from "@lexical/utils";
import {useLexicalComposerContext} from "@lexical/react/LexicalComposerContext";
import {$getRoot, $getSelection, $isParagraphNode, $isRangeSelection} from "lexical";
import {blockTypeToBlockName, initialHasFormat} from "../constants";
import {$isListNode, ListNode} from "@lexical/list";
import {$isDecoratorBlockNode} from '@lexical/react/LexicalDecoratorBlockNode';
import {$isLinkNode, TOGGLE_LINK_COMMAND} from '@lexical/link';
import {INSERT_HORIZONTAL_RULE_COMMAND} from '@lexical/react/LexicalHorizontalRuleNode';
import {$getSelectionStyleValueForProperty, $selectAll} from '@lexical/selection';
import {$isHeadingNode} from '@lexical/rich-text';
import {$isCodeNode} from '@lexical/code';
import {$isTableSelection} from '@lexical/table';
import getSelectedNode from "../utils/getSelectedNode";
import useModal from "./useModal";

const LowPriority = 1;
const useEditorToolbar = () => {

    const [editor] = useLexicalComposerContext();
    const [hasFormat, setHasFormat] = useState(initialHasFormat);
    const [isEditorEmpty, setIsEditorEmpty] = useState(false);
    const [blockType, setBlockType] = useState('paragraph');
    const [isLink, setIsLink] = useState(false);
    const [fontSize, setFontSize] = useState('15px');
    const [modal, showModal] = useModal()
    const [canUndo, setCanUndo] = useState(false)
    const [canRedo, setCanRedo] = useState(false)


    // This function runs every time the editor state changes.
    const updateToolbar = useCallback(() => {
        const selection = $getSelection();

        // setting fontsize
        if ($isRangeSelection(selection) || $isTableSelection(selection)) {
            setFontSize(
              $getSelectionStyleValueForProperty(selection, 'font-size', '15px'),
            );
          }

        if ($isRangeSelection(selection)) {
            const anchorNode = selection.anchor.getNode();
            let element =
                anchorNode.getKey() === 'root'
                    ? anchorNode
                    : $findMatchingParent(anchorNode, (e) => {
                        const parent = e.getParent();
                        return parent !== null && $isRootOrShadowRoot(parent);
                    });

            if (element === null) {
                element = anchorNode.getTopLevelElementOrThrow();
            }
            const elementKey = element.getKey();
            const elementDOM = editor.getElementByKey(elementKey);

            // Update text format
            setHasFormat({
                bold: selection.hasFormat('bold'),
                italic: selection.hasFormat('italic'),
                underline: selection.hasFormat('underline'),
                strikethrough: selection.hasFormat('strikethrough'),
                subscript: selection.hasFormat('subscript'),
                superscript: selection.hasFormat('superscript'),
                code: selection.hasFormat('code'),
                link: selection.hasFormat('link'),
                highlight: selection.hasFormat('highlight'),
            });

            // Update links
            const node = getSelectedNode(selection);
            const parent = node.getParent();
            if ($isLinkNode(parent) || $isLinkNode(node)) {
                setIsLink(true);
            } else {
                setIsLink(false);
            }

            if (elementDOM !== null) {
                if ($isListNode(element)) {
                    const parentList = $getNearestNodeOfType(
                        anchorNode,
                        ListNode,
                    );
                    const type = parentList
                        ? parentList.getListType()
                        : element.getListType();
                    setBlockType(type);
                } else {
                    const type = $isHeadingNode(element)
                        ? element.getTag()
                        : element.getType();
                    if (type in blockTypeToBlockName) {
                        setBlockType(type);
                    }
                    if ($isCodeNode(element)) {
                        // const language =
                        //     element.getLanguage();
                        // setCodeLanguage(
                        //     language ? CODE_LANGUAGE_MAP[language] || language : '',
                        // );
                        return;
                    }
                }
            }
        }
        // Check if editor is empty
        checkIfEditorIsEmpty();
    }, [editor]);

    const checkIfEditorIsEmpty = useCallback(() => {
        const root = $getRoot();
        const children = root.getChildren();

        // setIsEditorEmpty(Boolean(children.length));

        if (children.length > 1) {
            setIsEditorEmpty(false);
            return;
        }

        if ($isParagraphNode(children[0])) {
            setIsEditorEmpty(children[0].getChildren().length === 0);
        } else {
            setIsEditorEmpty(false);
        }
    }, []);

    const insertLink = useCallback(() => {
        if (!isLink) {
            editor.dispatchCommand(TOGGLE_LINK_COMMAND, "https://");
        } else {
            editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
        }
    }, [editor, isLink]);

    const insertHorizontalRule = () => {
        editor.dispatchCommand(
            INSERT_HORIZONTAL_RULE_COMMAND,
            undefined,
        );
    }
        
    useEffect(() => {
        return mergeRegister(
            editor.registerUpdateListener(({editorState}) => {
                // The latest EditorState can be found as `editorState`.
                // To read the contents of the EditorState, use the following API:
                editorState.read(() => {
                    // Just like editor.update(), .read() expects a closure where you can use
                    // the $ prefixed helper functions.
                    updateToolbar();
                });
            }),
            editor.registerCommand(
                CAN_UNDO_COMMAND,
                (payload) => {
                  setCanUndo(payload);
                  return false;
                },
                LowPriority,
              ),
              editor.registerCommand(
                CAN_REDO_COMMAND,
                (payload) => {
                  setCanRedo(payload);
                  return false;
                },
                LowPriority,
              ),
        );
    }, [updateToolbar, editor]);

    const clearFormatting = useCallback(() => {
        editor.update(() => {
            const selection = $getSelection();
            if ($isRangeSelection(selection)) {
                $selectAll(selection);
                selection.getNodes().forEach((node) => {
                    if ($isTextNode(node)) {
                        node.setFormat(0);
                        node.setStyle('');
                        $getNearestBlockElementAncestorOrThrow(node).setFormat('');
                    }
                    if ($isDecoratorBlockNode(node)) {
                        node.setFormat('');
                    }
                });
            }
        });
    }, [editor]);
    return {
        canUndo,
        canRedo,
        fontSize,
        editor,
        modal, 
        showModal,
        hasFormat,
        isEditorEmpty,
        blockType,
        isLink,
        setIsLink,
        insertLink,
        insertHorizontalRule,
        clearFormatting,
    };
};

export default useEditorToolbar;
