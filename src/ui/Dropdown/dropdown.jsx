import { useState } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';

export const DropDownMenu = ({ buttonLabel, menuItems, onSelect }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (value) => {
    onSelect(value);
    handleClose();
  };

  return (
    <div>
      <Button
        variant="contained"
        color='inherit'
        style={{boxShadow: 'none'}}
        focusRipple={true}
        onClick={handleClick}
      >
        {buttonLabel}
        <span style={{display: "flex", alignItems: 'center', paddingLeft: "15px"}}>
          <KeyboardArrowDownRoundedIcon />
        </span>
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {menuItems.map(({ label, value }) => (
          <MenuItem
            key={value}
            className="item"
            onClick={() => handleMenuItemClick(value)}
          >
            <span className="text">{label}</span>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};
