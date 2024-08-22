import {useState} from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Button from '@mui/material/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import useBlockFormat from "../../hooks/useBlockFormat";
import {blockTypeToBlockName} from "../../constants";
import {useMediaQuery} from "@mui/material";
import {getMenuButtonStyle} from "../../utils";

const BlockFormatMenu = ({blockType}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const isMdViewport = useMediaQuery('(min-width:960px)');

    const handleClickIconButton = (event) => setAnchorEl(event.currentTarget);

    const handleClose = () => setAnchorEl(null);

    const {blocks} = useBlockFormat({blockType});

    const getSelectedBlock = () => blocks.find((block) => block.blockType === blockType);

    return (
        <>
            <Button
                aria-haspopup={anchorEl ? "true" : undefined}
                aria-controls={anchorEl ? "block-format-menu" : undefined}
                onClick={handleClickIconButton}
                size="large"
                color='inherit'
                variant="text"
                sx={{
                    ...getMenuButtonStyle({open, isMdViewport}),
                    color: "info.main"
                }}
                startIcon={getSelectedBlock()?.icon}
                endIcon={<KeyboardArrowDownIcon sx={{color: "info.main"}}/>}
            >
                {isMdViewport ? blockTypeToBlockName[blockType] : null}
            </Button>
            <Menu
                id="block-format-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'block-format-button',
                    role: 'listbox',
                }}
            >
                {blocks.map((option, index) => (
                    <MenuItem
                        role="option"
                        key={index}
                        selected={blockType === option.blockType}
                        onClick={() => {
                            handleClose();
                            option.onClick();
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

export default BlockFormatMenu;
