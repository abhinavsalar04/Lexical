import {$createParagraphNode, $getSelection, $isRangeSelection, } from "lexical";
import {$isTableSelection} from "@lexical/table"
import {$setBlocksType} from "@lexical/selection";
import {useLexicalComposerContext} from "@lexical/react/LexicalComposerContext";
import {
    $createHeadingNode,
    $createQuoteNode,
} from '@lexical/rich-text';
import {
    INSERT_CHECK_LIST_COMMAND,
    INSERT_ORDERED_LIST_COMMAND,
    INSERT_UNORDERED_LIST_COMMAND,
    REMOVE_LIST_COMMAND,
} from '@lexical/list';
import NotesRoundedIcon from '@mui/icons-material/NotesRounded';
import TitleRoundedIcon from '@mui/icons-material/TitleRounded';
import FormatListBulletedRoundedIcon from '@mui/icons-material/FormatListBulletedRounded';
import FormatListNumberedRoundedIcon from '@mui/icons-material/FormatListNumberedRounded';
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import FormatQuoteOutlinedIcon from "@mui/icons-material/FormatQuoteOutlined";
import CodeRoundedIcon from '@mui/icons-material/CodeRounded';
import {$createCodeNode} from "@lexical/code";

const useBlockFormat = (props) => {
    const {blockType} = props;
    const [editor] = useLexicalComposerContext();

    const formatParagraph = () => {
        if (blockType !== 'paragraph') {
            editor.update(() => {
                const selection = $getSelection();
                if (
                    $isRangeSelection(selection) ||
                    $isTableSelection(selection)
                )
                    $setBlocksType(selection, () => $createParagraphNode());
            });
        }
    };

    const formatHeading = (headingSize) => {
        if (blockType !== headingSize) {
            editor.update(() => {
                const selection = $getSelection();
                if (
                    $isRangeSelection(selection) ||
                    $isTableSelection(selection)
                ) {
                    $setBlocksType(selection, () =>
                        $createHeadingNode(headingSize),
                    );
                }
            });
        }
    };

    const formatBulletList = () => {
        if (blockType !== 'bullet') {
            console.log('formatBulletList');
            editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
        } else {
            console.log('removeBulletList');
            editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
        }
    };


    const formatCheckList = () => {
        console.log(blockType);
        if (blockType !== 'check') {
            editor.dispatchCommand(INSERT_CHECK_LIST_COMMAND, undefined);
        } else {
            editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
        }
    };

    const formatNumberedList = () => {
        if (blockType !== 'number') {
            editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
        } else {
            editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
        }
    };

    const formatQuote = () => {
        if (blockType !== 'quote') {
            editor.update(() => {
                const selection = $getSelection();
                if (
                    $isRangeSelection(selection) ||
                    $isTableSelection(selection)
                ) {
                    $setBlocksType(selection, () => $createQuoteNode());
                }
            });
        }
    };

    const formatCode = () => {
        if (blockType !== 'code') {
            editor.update(() => {
                let selection = $getSelection();

                if (
                    $isRangeSelection(selection) ||
                    $isTableSelection(selection)
                ) {
                    if (selection.isCollapsed()) {
                        $setBlocksType(selection, () => $createCodeNode());
                    } else {
                        const textContent = selection.getTextContent();
                        const codeNode = $createCodeNode();
                        selection.insertNodes([codeNode]);
                        selection = $getSelection();
                        if ($isRangeSelection(selection))
                            selection.insertRawText(textContent);
                    }
                }
            });
        }
    };


    const blocks = [
        {
            name: 'Normal',
            blockType: 'paragraph',
            icon: <NotesRoundedIcon/>,
            onClick: formatParagraph,
        },
        {
            name: 'Heading 1',
            blockType: 'h1',
            icon: <TitleRoundedIcon/>,
            onClick: () => formatHeading("h1")
        },
        {
            name: 'Heading 2',
            blockType: 'h2',
            icon: <TitleRoundedIcon/>,
            onClick: () => formatHeading("h2")
        },
        {
            name: 'Heading 3',
            blockType: 'h3',
            icon: <TitleRoundedIcon/>,
            onClick: () => formatHeading("h3")
        },
        {
            name: 'Heading 4',
            blockType: 'h4',
            icon: <TitleRoundedIcon/>,
            onClick: () => formatHeading("h4")
        },
        {
            name: 'Heading 5',
            blockType: 'h5',
            icon: <TitleRoundedIcon/>,
            onClick: () => formatHeading("h5")
        },
        {
            name: 'Heading 6',
            blockType: 'h6',
            icon: <TitleRoundedIcon/>,
            onClick: () => formatHeading("h6")
        },
        {
            name: 'Bulleted List',
            blockType: 'bullet',
            icon: <FormatListBulletedRoundedIcon/>,
            onClick: formatBulletList,
        },
        {
            name: 'Numbered List',
            blockType: 'number',
            icon: <FormatListNumberedRoundedIcon/>,
            onClick: formatNumberedList,
        },
        {
            name: 'Check List',
            blockType: 'check',
            icon: <CheckBoxOutlinedIcon/>,
            onClick: formatCheckList,
        },
        {
            name: "Quote",
            blockType: 'quote',
            icon: <FormatQuoteOutlinedIcon/>,
            onClick: formatQuote,
        },
        {
            name: "Code Block",
            blockType: 'code',
            icon: <CodeRoundedIcon/>,
            onClick: formatCode
        },
    ];

    return {
        blocks,
        formatParagraph,
        formatHeading,
        formatBulletList,
        formatCheckList,
        formatNumberedList,
        formatQuote,
        formatCode,
    };
};

export default useBlockFormat;
