import {FORMAT_TEXT_COMMAND, UNDO_COMMAND, REDO_COMMAND,} from 'lexical';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import StrikethroughSRoundedIcon from '@mui/icons-material/StrikethroughSRounded';
import FormatUnderlinedRoundedIcon from '@mui/icons-material/FormatUnderlinedRounded';
import InsertLinkRoundedIcon from '@mui/icons-material/InsertLinkRounded';
import CodeRoundedIcon from '@mui/icons-material/CodeRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import FormatColorTextRoundedIcon from '@mui/icons-material/FormatColorTextRounded';
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
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
import useColorPicker from "../../hooks/useColorPicker";
import toolbarStyles from "./styles";
import {getActiveBtnStyle} from "../../utils";
import FloatingLinkEditor from '../FloatingLinkEditor';
import { createPortal } from 'react-dom';
import InsertMenu from '../InsertMenu/InsertMenu';
import FontSizePlugin from "../../plugins/FontSizePlugin/fontSize"
import { Divider } from '@mui/material';
import AlertDialog from "../../ui/AlertDialog/alertDialog"


const Toolbar = ({editable}) => {
    const {
        isClearEditorDialogOpen,
        setIsClearEditorDialogOpen,
        clearEditorContent,
        canUndo,
        canRedo,
        fontSize,
        editor, 
        hasFormat,
        isEditorEmpty,
        blockType,
        isLink,
        insertLink,
        clearFormatting,
    } = useEditorToolbar();
    
    const {onFontColorSelect, onBgColorSelect } = useColorPicker();
    if (!editable) return null;

    return (
        <div >
            <Stack direction="row" gap={1} sx={{...toolbarStyles.root}} >
                <div style={{ display: "flex", gap: "4px" }}>
                    <Tooltip title="Undo (Ctrl + Z)">
                        <IconButton
                            sx={{
                                ...(canUndo
                                    ? toolbarStyles.activeButtonStyle
                                    : { ...toolbarStyles.pointerEventsNone, ...toolbarStyles.disabledButtonStyle }),
                            }}
                            size="small"
                            onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)}
                        >
                            <ReplayRoundedIcon style={{ fontSize: "20px", margin: "0px 2px"}} />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Redo (Ctrl + Y)">
                        <IconButton
                            sx={{
                                ...(canRedo
                                    ? toolbarStyles.activeButtonStyle
                                    : { ...toolbarStyles.pointerEventsNone, ...toolbarStyles.disabledButtonStyle }),
                            }}
                            size="small"
                            onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)}
                        >
                            <ReplayRoundedIcon style={{ transform: "scale(-1, 1)", fontSize: "20px", margin: "0px 2px" }} />
                        </IconButton>
                    </Tooltip>
                </div>
                <Divider  orientation="vertical" flexItem/>
                <BlockFormatMenu customStyle={{...toolbarStyles}} blockType={blockType}/>
                <Divider orientation="vertical" flexItem/>
                <div style={{display: "flex", verticalAlign: "middle"}}>
                    <FontSizePlugin 
                        selectionFontSize={fontSize?.slice(0, -2)}
                        editor={editor}
                        disabled={false}
                    />
                </div>
                <Divider orientation="vertical" flexItem />
                <Tooltip title="Bold (Ctrl + B)">
                    <IconButton
                        size="small"
                        sx={getActiveBtnStyle(hasFormat.bold)}
                        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')}
                    >
                        <FormatBoldIcon  />
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
                        <FormatUnderlinedRoundedIcon/>
                    </IconButton>
                </Tooltip>
                <Tooltip title="Strikethrough">
                    <IconButton
                        size="small"
                        sx={getActiveBtnStyle(hasFormat.strikethrough)}
                        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough')}
                    >
                        <StrikethroughSRoundedIcon/>
                    </IconButton>
                </Tooltip>
                <Tooltip title="Insert code block">
                    <IconButton
                        size="small"
                        sx={getActiveBtnStyle(hasFormat.code)}
                        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'code')}
                    >
                        <CodeRoundedIcon/>
                    </IconButton>
                </Tooltip>
                <Tooltip title={"Insert link"}>
                    <IconButton 
                        size='small'
                        sx={getActiveBtnStyle(hasFormat.link)}
                        onClick={insertLink}
                    >
                        <InsertLinkRoundedIcon />
                    </IconButton>
                </Tooltip>
                {isLink &&
                    createPortal(<FloatingLinkEditor editor={editor} />, document.body)
                }
                <ColorPicker
                    key="color-picker"
                    title="Font color"
                    onChange={(color) => onFontColorSelect(color)}
                    icon={<FormatColorTextRoundedIcon fontSize='small'/>}
                />
                <ColorPicker
                    key="bg-color-picker"
                    title="Background color"
                    onChange={(color) => onBgColorSelect(color)}
                    icon={<BorderColorRoundedIcon fontSize='small'/>}
                />
                <Divider className='divider' orientation="vertical" flexItem/>
                <FormatTextMenu hasFormat={hasFormat}/>
                <Divider orientation="vertical" flexItem/>
                <InsertMenu />
                <Divider orientation="vertical" flexItem/>
                <AlignMenu/>
                <Divider orientation="vertical" flexItem/>
                <Tooltip title="Clear editor">
                    <IconButton
                        size="small"
                        disabled={isEditorEmpty}
                        onClick={() => setIsClearEditorDialogOpen(true)}>
                        <ClearRoundedIcon/>
                    </IconButton>
                <AlertDialog isOpen={isClearEditorDialogOpen} onClose={() => setIsClearEditorDialogOpen(false)} title='Clear Editor' confirmButtonTitle='Clear' content="Are you sure you want to clear out the editor's content?" confirmHandler={clearEditorContent} />
                </Tooltip>
                <Tooltip title="Clear formatting">
                    <IconButton size="small" onClick={clearFormatting}>
                        <DeleteOutlineRoundedIcon/>
                    </IconButton>
                </Tooltip>
            </Stack>
        </div>
    );
};

export default Toolbar;