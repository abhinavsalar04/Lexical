import { useState} from 'react';
import Button from "@mui/material/Button";
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import FormatColorTextRoundedIcon from '@mui/icons-material/FormatColorTextRounded';
import Menu from "@mui/material/Menu";
import {formatMenuItems} from "../../constants";
import MenuItem from "@mui/material/MenuItem";
import {FORMAT_TEXT_COMMAND} from "lexical";
import ListItemIcon from "@mui/material/ListItemIcon";
import {useLexicalComposerContext} from "@lexical/react/LexicalComposerContext";
import {useMediaQuery} from "@mui/material";
import {getMenuButtonStyle} from "../../utils";

const FormatTextMenu = ({hasFormat}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const isMdViewport = useMediaQuery('(min-width:960px)');

    const [editor] = useLexicalComposerContext();

    const handleClickIconButton = (event) => setAnchorEl(event.currentTarget);

    const handleClose = () => setAnchorEl(null);

    return (
        <>
            <Button
                aria-haspopup={anchorEl ? "true" : undefined}
                aria-controls={anchorEl ? "format-text-menu" : undefined}
                onClick={handleClickIconButton}
                size={isMdViewport ? "large" : "small"}
                variant="text"
                color="info"
                sx={getMenuButtonStyle({open, isMdViewport})}
                startIcon={<FormatColorTextRoundedIcon/>}
                endIcon={<KeyboardArrowDownRoundedIcon sx={{color: "grey.600"}}/>}
            >
                {isMdViewport ? "Format" : null}
            </Button>
            <Menu
                id="format-text-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'block-format-button',
                    role: 'listbox',
                }}
            >
                {formatMenuItems.map((option, index) => (
                    <MenuItem
                        role="option"
                        key={index}
                        onClick={() => {
                            handleClose();
                            editor.dispatchCommand(FORMAT_TEXT_COMMAND, option.payload)
                        }}
                        selected={hasFormat[option.payload]}
                    >
                        <ListItemIcon>
                            {option.icon}
                        </ListItemIcon>
                        {option.name}
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
};

export default FormatTextMenu;
