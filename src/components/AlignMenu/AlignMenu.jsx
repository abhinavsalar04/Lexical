import {useState} from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Button from '@mui/material/Button';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import {FORMAT_ELEMENT_COMMAND} from "lexical";
import {useLexicalComposerContext} from "@lexical/react/LexicalComposerContext";
import {alignMenuItems} from "../../constants";
import FormatAlignLeftRoundedIcon from '@mui/icons-material/FormatAlignLeftRounded';
import { useMediaQuery } from '@mui/material';
import {getMenuButtonStyle} from "../../utils";

const AlignMenu = () => {
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
                aria-controls={anchorEl ? "align-menu" : undefined}
                onClick={handleClickIconButton}
                size={isMdViewport ? "large" : "small"}
                variant="text"
                color="info"
                sx={getMenuButtonStyle({open, isMdViewport})}
                startIcon={<FormatAlignLeftRoundedIcon/>}
                endIcon={<KeyboardArrowDownRoundedIcon sx={{color: "grey.600"}}/>}
            >
                {isMdViewport ? "Align" : null}
            </Button>
            <Menu
                id="align-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'block-format-button',
                    role: 'listbox',
                }}
            >
                {alignMenuItems.map((option, index) => (
                    <MenuItem
                        role="option"
                        key={index}
                        onClick={() => {
                            handleClose();
                            editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, option.payload)
                        }}
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

export default AlignMenu;
