import { useState } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';

export const DropdownMenu = ({ variant = "text", color= "inherit", buttonLabel, children, startIcon = null, endIcon = null, buttonStyle, menuStyle, menuItems = [], handleSelect = () => {} }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (value) => {
    handleSelect(value);
    handleClose();
  };

  console.log(buttonStyle)
  return (
    <>
        <Button
          variant={variant}
          color={color}
          sx={{ 
            boxShadow: 'none',
            minWidth: 'auto',
            ...buttonStyle
          }}
          onClick={handleClick}
        >
          {startIcon && (
          <span style={{display: "flex", alignItems: "center"}}>
            {startIcon}
          </span>
        )}
        <span style={{ flexGrow: 1, textAlign: "start" }}>{buttonLabel}</span>
        {endIcon && (
          <span style={{display: "flex", alignItems: "center"}}>
            {endIcon}
          </span>
        )}
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'drop-down-menu',
          }}
        >
          {children && children}
          {menuItems?.length > 0 && menuItems?.map(({ label, value }) => (
            <MenuItem
              key={value}
              className="item"
              onClick={() => handleMenuItemClick(value)}
            >
              <span className="text">{label}</span>
            </MenuItem>
          ))}
        </Menu>
    </>
  );
};
