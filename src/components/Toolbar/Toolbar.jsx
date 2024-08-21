import {FORMAT_TEXT_COMMAND, UNDO_COMMAND, REDO_COMMAND,} from 'lexical';
import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';
// import Divider from '@mui/material/Divider';
import {Divider} from '../UI/Divider/divider';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import StrikethroughSIcon from '@mui/icons-material/StrikethroughS';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import LinkIcon from '@mui/icons-material/Link';
import CodeIcon from '@mui/icons-material/Code';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import ClearIcon from '@mui/icons-material/Clear';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ReplayRoundedIcon from '@mui/icons-material/ReplayRounded';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Tooltip from "@mui/material/Tooltip";
import "./../../styles/EditorTheme.css";
import ColorPicker from '../ColorPicker/ColorPicker';
import BlockFormatMenu from "../BlockFormatMenu/BlockFormatMenu";
import AlignMenu from "../AlignMenu/AlignMenu";
import FormatTextMenu from "../FormatTextMenu/FormatTextMenu";
import useEditorToolbar from "../../hooks/useEditorToolbar";
import useCustomCommands from "../../hooks/useCustomCommands";
import useColorPicker from "../../hooks/useColorPicker";
import toolbarStyles from "./styles";
import {getActiveBtnStyle} from "../../utils";
import FloatingLinkEditor from '../FloatingLinkEditor';
import { createPortal } from 'react-dom';
import InsertMenu from '../InsertMenu/InsertMenu';


const Toolbar = ({editable}) => {
    const {
        editor, 
        hasFormat,
        isEditorEmpty,
        blockType,
        isLink,
        insertLink,
        clearFormatting,
    } = useEditorToolbar();

    const {clearEditorContent} = useCustomCommands();
    const handleClearEditorContent = () => {
        if (confirm("Are you sure you want to clear out the editor's content?"))
            clearEditorContent();
    }
    const {onFontColorSelect, onBgColorSelect } = useColorPicker();
    if (!editable) return null;

    return (
        <Stack direction="row" gap={1} sx={toolbarStyles.root}>
            <Tooltip title="Undo (Ctrl + Z)">
                <IconButton
                    size="small"
                    onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)}>
                    <ReplayRoundedIcon/>
                </IconButton>
            </Tooltip>
            <Tooltip title="Redo (Ctrl + Y)">
                <IconButton
                    size="small"
                    onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)}>
                    <ReplayRoundedIcon style={{transform: "scale(-1, 1)"}}/>
                </IconButton>
            </Tooltip>
            <Divider  orientation="vertical" flexItem/>
            <BlockFormatMenu blockType={blockType}/>
            <Divider orientation="vertical" flexItem/>
            <Tooltip title="Bold (Ctrl + B)">
                <IconButton
                    size="small"
                    sx={getActiveBtnStyle(hasFormat.bold)}
                    onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')}
                >
                    <FormatBoldIcon/>
                </IconButton>
            </Tooltip>
            <Tooltip title="Italic (Ctrl + I)">
                <IconButton
                    size="small"
                    sx={getActiveBtnStyle(hasFormat.italic)}
                    onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic')}
                >
                    <FormatItalicIcon/>
                </IconButton>
            </Tooltip>
            <Tooltip title="Underline (Ctrl + U)">
                <IconButton
                    size="small"
                    sx={getActiveBtnStyle(hasFormat.underline)}
                    onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline')}
                >
                    <FormatUnderlinedIcon/>
                </IconButton>
            </Tooltip>
            <Tooltip title="Strikethrough">
                <IconButton
                    size="small"
                    sx={getActiveBtnStyle(hasFormat.strikethrough)}
                    onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough')}
                >
                    <StrikethroughSIcon/>
                </IconButton>
            </Tooltip>
            <Tooltip title="Insert code block">
                <IconButton
                    size="small"
                    sx={getActiveBtnStyle(hasFormat.code)}
                    onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'code')}
                >
                    <CodeIcon/>
                </IconButton>
            </Tooltip>
            <Tooltip title={"Insert link"}>
                <IconButton 
                    size='small'
                    sx={getActiveBtnStyle(hasFormat.link)}
                    onClick={insertLink}
                 >
                    <LinkIcon />
                 </IconButton>
            </Tooltip>
            {isLink &&
                createPortal(<FloatingLinkEditor editor={editor} />, document.body)
            }
            <ColorPicker
                key="color-picker"
                title="Font color"
                onChange={(color) => onFontColorSelect(color)}
                icon={<ColorLensIcon/>}
            />
            <ColorPicker
                key="bg-color-picker"
                title="Background color"
                onChange={(color) => onBgColorSelect(color)}
                icon={<FormatColorFillIcon/>}
            />
            <Divider className='divider' orientation="vertical" flexItem/>
            <FormatTextMenu hasFormat={hasFormat}/>
            <Divider orientation="vertical" flexItem/>
            <InsertMenu />
            <Divider orientation="vertical" flexItem/>
            <AlignMenu/>
            <Divider style={{padding: "0px"}} orientation="vertical" flexItem/>
            <Tooltip title="Clear editor">
                <IconButton
                    size="small"
                    disabled={isEditorEmpty}
                    onClick={handleClearEditorContent}>
                    <ClearIcon/>
                </IconButton>
            </Tooltip>
            <Tooltip title="Clear formatting">
                <IconButton size="small" onClick={clearFormatting}>
                    <DeleteOutlineIcon/>
                </IconButton>
            </Tooltip>
        </Stack>
    );
};

export default Toolbar;