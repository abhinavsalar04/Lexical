import AlignHorizontalLeftIcon from "@mui/icons-material/AlignHorizontalLeft";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import AlignHorizontalRightIcon from "@mui/icons-material/AlignHorizontalRight";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import StrikethroughSIcon from '@mui/icons-material/StrikethroughS';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import SubscriptIcon from '@mui/icons-material/Subscript';
import SuperscriptIcon from '@mui/icons-material/Superscript';
import CodeIcon from '@mui/icons-material/Code';
import BorderColorIcon from '@mui/icons-material/BorderColor';
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

export const theme = {
    blockCursor: 'blockCursor',
    characterLimit: 'characterLimit',
    code: 'code',
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
        h1: 'h1',
        h2: 'h2',
        h3: 'h3',
        h4: 'h4',
        h5: 'h5',
        h6: 'h6',
    },
    image: 'editor-image',
    indent: 'indent',
    link: 'link',
    list: {
        listitem: 'listItem',
        listitemChecked: 'listItemChecked',
        listitemUnchecked: 'listItemUnchecked',
        nested: {
            listitem: 'nestedListItem',
        },
        olDepth: [
            'ol1',
            'ol2',
            'ol3',
            'ol4',
            'ol5',
        ],
        ul: 'ul',
    },
    ltr: 'ltr',
    mark: 'mark',
    markOverlap: 'markOverlap',
    paragraph: 'paragraph',
    quote: 'quote',
    rtl: 'rtl',
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
    text: {
        bold: 'textBold',
        code: 'textCode',
        italic: 'textItalic',
        strikethrough: 'textStrikethrough',
        subscript: 'textSubscript',
        superscript: 'textSuperscript',
        underline: 'textUnderline',
        underlineStrikethrough: 'textUnderlineStrikethrough',
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
    HorizontalRuleNode,
];

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
        icon: <AlignHorizontalLeftIcon />,
        payload: "left",
    },
    {
        name: "Center Align",
        icon: <FormatAlignCenterIcon />,
        payload: "center",
    },
    {
        name: "Right Align",
        icon: <AlignHorizontalRightIcon />,
        payload: "right",
    },
    {
        name: "Justify Align",
        icon: <FormatAlignJustifyIcon />,
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
        icon: <StrikethroughSIcon />,
        payload: "strikethrough",
    },
    {
        name: "Underline",
        icon: <FormatUnderlinedIcon />,
        payload: "underline",
    },
    {
        name: "Code",
        icon: <CodeIcon />,
        payload: "code",
    },
    {
        name: "Highlight",
        icon: <BorderColorIcon />,
        payload: "highlight",
    },
    {
        name: "Subscript",
        icon: <SubscriptIcon />,
        payload: "subscript",
    },
    {
        name: "Superscript",
        icon: <SuperscriptIcon />,
        payload: "superscript",
    }
];