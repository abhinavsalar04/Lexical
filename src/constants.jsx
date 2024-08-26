import FormatAlignLeftRoundedIcon from '@mui/icons-material/FormatAlignLeftRounded';
import FormatAlignRightRoundedIcon from '@mui/icons-material/FormatAlignRightRounded';
import FormatAlignCenterRoundedIcon from '@mui/icons-material/FormatAlignCenterRounded';
import FormatAlignJustifyRoundedIcon from '@mui/icons-material/FormatAlignJustifyRounded';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import StrikethroughSRoundedIcon from '@mui/icons-material/StrikethroughSRounded';
import FormatUnderlinedRoundedIcon from '@mui/icons-material/FormatUnderlinedRounded';
import SubscriptRoundedIcon from '@mui/icons-material/SubscriptRounded';
import SuperscriptRoundedIcon from '@mui/icons-material/SuperscriptRounded';
import CodeRoundedIcon from '@mui/icons-material/CodeRounded';
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';
import {CodeHighlightNode, CodeNode} from "@lexical/code";
import {LinkNode, AutoLinkNode} from "@lexical/link";
import {ListItemNode, ListNode} from "@lexical/list";
import {ImageNode} from "./CustomNodes/ImageNode/index"
import {HeadingNode, QuoteNode} from "@lexical/rich-text";
import {HorizontalRuleNode} from '@lexical/react/LexicalHorizontalRuleNode';
import { createLinkMatcherWithRegExp } from "@lexical/react/LexicalAutoLinkPlugin";
import {TableNode, TableCellNode, TableRowNode} from "@lexical/table"
import { PageBreakNode } from "./CustomNodes/PageBreakNode/PageBreakNode";
import { CollapsibleTitleNode } from "./CustomNodes/CollapsibleContainer/CollapsibleTitleNode";
import { CollapsibleContainerNode } from "./CustomNodes/CollapsibleContainer/CollapsibleContainerNode";
import { CollapsibleContentNode } from "./CustomNodes/CollapsibleContainer/CollapsibleContentNode";
import { LayoutContainerNode } from "./CustomNodes/ColumnLayout/LayoutContainerNode";
import { LayoutItemNode } from "./CustomNodes/ColumnLayout/LayoutItemNode";
import { YouTubeNode } from './CustomNodes/YoutubeNode/YoutubeNode';
import {OverflowNode} from '@lexical/overflow';
import { IframeNode } from './CustomNodes/IFrameNode/IFrameNode';
import { EmbedCodeNode } from './CustomNodes/EmbedCode/EmbedCodeNode';
import { Link } from '@mui/material';


export const theme = {
    blockCursor: 'blockCursor',
    characterLimit: 'LexicalEditor_characterLimit',
    code: 'LexicalEditor_code',
    codeHighlight: {
        atrule: 'tokenAttr',
        attr: 'tokenAttr',
        boolean: 'tokenProperty',
        builtin: 'tokenSelector',
        cdata: 'tokenComment',
        char: 'tokenSelector',
        class: 'tokenFunction',
        'class-name': 'tokenFunction',
        comment: 'tokenComment',
        constant: 'tokenProperty',
        deleted: 'tokenProperty',
        doctype: 'tokenComment',
        entity: 'tokenOperator',
        function: 'tokenFunction',
        important: 'tokenVariable',
        inserted: 'tokenSelector',
        keyword: 'tokenAttr',
        namespace: 'tokenVariable',
        number: 'tokenProperty',
        operator: 'tokenOperator',
        prolog: 'tokenComment',
        property: 'tokenProperty',
        punctuation: 'tokenPunctuation',
        regex: 'tokenVariable',
        selector: 'tokenSelector',
        string: 'tokenSelector',
        symbol: 'tokenProperty',
        tag: 'tokenProperty',
        url: 'tokenOperator',
        variable: 'tokenVariable',
    },
    embedBlock: {
        base: 'embedBlock',
        focus: 'embedBlockFocus',
    },
    hashtag: 'hashtag',
    heading: {
        h1: 'LexicalEditor_h1',
        h2: 'LexicalEditor_h2',
        h3: 'LexicalEditor_h3',
        h4: 'LexicalEditor_h4',
        h5: 'LexicalEditor_h5',
        h6: 'LexicalEditor_h6',
    },
    image: 'editor-image',
    indent: 'LexicalEditor_indent',
    link: 'LexicalEditor_link',
    list: {
        listitem: 'LexicalEditor_listItem',
        listitemChecked: 'LexicalEditor_listItemChecked',
        listitemUnchecked: 'LexicalEditor_listItemUnchecked',
        nested: {
            listitem: 'LexicalEditor_nestedListItem',
        },
        olDepth: [
            'LexicalEditor_ol1',
            'LexicalEditor_ol2',
            'LexicalEditor_ol3',
            'LexicalEditor_ol4',
            'LexicalEditor_ol5',
        ],
        ul: 'LexicalEditor_ul',
    },
    ltr: 'LexicalEditor_ltr',
    rtl: 'LexicalEditor_rtl',
    mark: 'mark',
    markOverlap: 'LexicalEditor_markOverlap',
    paragraph: 'LexicalEditor_paragraph',
    quote: 'LexicalEditor_quote',
    table: 'LexicalEditor__table',
  tableCell: 'LexicalEditor__tableCell',
  tableCellActionButton: 'LexicalEditor__tableCellActionButton',
  tableCellActionButtonContainer:
    'LexicalEditor__tableCellActionButtonContainer',
  tableCellEditing: 'LexicalEditor__tableCellEditing',
  tableCellHeader: 'LexicalEditor__tableCellHeader',
  tableCellPrimarySelected: 'LexicalEditor__tableCellPrimarySelected',
  tableCellResizer: 'LexicalEditor__tableCellResizer',
  tableCellSelected: 'LexicalEditor__tableCellSelected',
  tableCellSortedIndicator: 'LexicalEditor__tableCellSortedIndicator',
  tableResizeRuler: 'LexicalEditor__tableCellResizeRuler',
  tableSelected: 'LexicalEditor__tableSelected',
  tableSelection: 'LexicalEditor__tableSelection',
  inlineImage: 'LexicalEditor_inline-editor-image',
  layoutContainer: 'LexicalEditor__layoutContainer',
  layoutItem: 'LexicalEditor__layoutItem',
    text: {
        bold: 'LexicalEditor_textBold',
        code: 'LexicalEditor_textCode',
        italic: 'LexicalEditor_textItalic',
        strikethrough: 'LexicalEditor_textStrikethrough',
        subscript: 'LexicalEditor_textSubscript',
        superscript: 'LexicalEditor_textSuperscript',
        underline: 'LexicalEditor_textUnderline',
        underlineStrikethrough: 'LexicalEditor_textUnderlineStrikethrough',
    },
};

export const DEFAULT_EDITOR_SETTINGS = {
    disableBeforeInput: false,
    isAutocomplete: false,
    isCharLimit: false,
    isCharLimitUtf8: false,
    isCollab: false,
    isMaxLength: false,
    isRichText: true,
    measureTypingPerf: false,
    shouldPreserveNewLinesInMarkdown: false,
    shouldUseLexicalContextMenu: false,
    showNestedEditorTreeView: false,
    showTableOfContents: false,
    showTreeView: true,
    tableCellBackgroundColor: true,
    tableCellMerge: true,
}

export const EDITOR_NODES = [
    CodeNode,
    CodeHighlightNode,
    HeadingNode,
    AutoLinkNode,
    LinkNode,
    QuoteNode,
    ListNode,
    ListItemNode,
    ImageNode,
    TableNode,
    TableCellNode,
    TableRowNode,
    PageBreakNode,
    CollapsibleTitleNode,
    CollapsibleContainerNode,
    CollapsibleContentNode,
    LayoutContainerNode,
    LayoutItemNode,
    HorizontalRuleNode,
    YouTubeNode,
    OverflowNode,
    IframeNode,
    EmbedCodeNode
];

export const LOW_FEATURE_EDITOR_NODES = [
    CodeNode,
    CodeHighlightNode,
    HeadingNode,
    AutoLinkNode,
    LinkNode,
    QuoteNode,
    ListNode,
    ListItemNode,
    OverflowNode
] 

/**
 * Catch any errors that occur during Lexical updates and log them
 * or throw them as needed. If you don't throw them, Lexical will
 * try to recover gracefully without losing user data.
 */
const onError = (error, editor) => {
    console.error(error);
}

export const initialConfig= {
    namespace: 'MyEditor',
    theme,
    nodes: EDITOR_NODES,
    onError,
    className: 'LexicalEditorContainer'
    // editable: false,
};

const URL_REGEX = /((https?:\/\/(www\.)?)|(www\.))[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

export const MATCHERS = [
    createLinkMatcherWithRegExp(URL_REGEX, (text) => {
      return text.startsWith('http') ? text : `https://${text}`;
    }),
  ]

export const blockTypeToBlockName = {
    bullet: 'Bulleted List',
    check: 'Check List',
    code: 'Code Block',
    h1: 'Heading 1',
    h2: 'Heading 2',
    h3: 'Heading 3',
    h4: 'Heading 4',
    h5: 'Heading 5',
    h6: 'Heading 6',
    number: 'Numbered List',
    paragraph: 'Normal',
    quote: 'Quote',
};

export const initialHasFormat = {
    bold: false,
    italic: false,
    underline: false,
    strikethrough: false,
    subscript: false,
    superscript: false,
    code: false,
    link: false,
    highlight: false,
}

export const alignMenuItems = [
    {
        name: "Left Align",
        icon: <FormatAlignLeftRoundedIcon />,
        payload: "left",
    },
    {
        name: "Center Align",
        icon: <FormatAlignCenterRoundedIcon />,
        payload: "center",
    },
    {
        name: "Right Align",
        icon: <FormatAlignRightRoundedIcon />,
        payload: "right",
    },
    {
        name: "Justify Align",
        icon: <FormatAlignJustifyRoundedIcon />,
        payload: "justify",
    }
];

export const formatMenuItems = [
    {
        name: "Bold",
        icon: <FormatBoldIcon />,
        payload: "bold",
    },
    {
        name: "Italic",
        icon: <FormatItalicIcon />,
        payload: "italic",
    },
    {
        name: "Strikethrough",
        icon: <StrikethroughSRoundedIcon />,
        payload: "strikethrough",
    },
    {
        name: "Underline",
        icon: <FormatUnderlinedRoundedIcon />,
        payload: "underline",
    },
    {
        name: "Code",
        icon: <CodeRoundedIcon />,
        payload: "code",
    },
    {
        name: "Highlight",
        icon: <BorderColorRoundedIcon />,
        payload: "highlight",
    },
    {
        name: "Subscript",
        icon: <SubscriptRoundedIcon />,
        payload: "subscript",
    },
    {
        name: "Superscript",
        icon: <SuperscriptRoundedIcon />,
        payload: "superscript",
    }
];