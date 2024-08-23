import { useState } from 'react';
import Button from "@mui/material/Button";
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import useInsertMenu from "../../hooks/useInsertMenu";
import { getMenuButtonStyle } from "../../utils";
import { ListItemText, useMediaQuery } from "@mui/material";
import useModal from '../../hooks/useModal';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

const InsertMenu = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const isMdViewport = useMediaQuery('(min-width:960px)');
    const handleClickIconButton = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);
    const [modal, showModal] = useModal()
    const [editor] = useLexicalComposerContext()
    const {insertMenuItems} = useInsertMenu({editor, showModal})

    return (
        <>
            <Button
                aria-haspopup={anchorEl ? "true" : undefined}
                aria-controls={anchorEl ? "insert-more-menu" : undefined}
                onClick={handleClickIconButton}
                size={isMdViewport ? "large" : "small"}
                variant="text"
                color="info"
                sx={getMenuButtonStyle({ open, isMdViewport })}
                startIcon={<AddRoundedIcon />}
                endIcon={<KeyboardArrowDownRoundedIcon sx={{ color: "grey.600" }} />}
            >
                {isMdViewport ? "Insert" : null}
            </Button>
            <Menu
                id="insert-more-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'block-format-button',
                    role: 'listbox',
                }}
            >
                {insertMenuItems?.map((menuItem, index) => {
                    return (
                    <MenuItem
                        key={menuItem?.title + "_" + index}
                        onClick={() => {
                        handleClose();
                        menuItem?.onClick()
                    }}
                    >
                        <ListItemIcon>
                            {menuItem?.icon ?? <></>}
                        </ListItemIcon>
                        <ListItemText>
                            {menuItem?.title ?? "_"}
                        </ListItemText>
                    </MenuItem>)
                })}
            </Menu>
            {modal}
        </>
    );
};

export default InsertMenu;