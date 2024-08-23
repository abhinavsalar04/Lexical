
import {useState} from 'react';
import {INSERT_LAYOUT_COMMAND} from "./ColumnLayoutPlugin";
// import {DropDownMenu} from "../../ui/Dropdown/dropdown"
import {DropdownMenu} from "../../ui/DropdownMenu/dropdownMenu"
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import { Button } from '@mui/material';
import { Margin } from '@mui/icons-material';
import { grey } from '@mui/material/colors';
const LAYOUTS = [
  {label: '2 columns (equal width)', value: '1fr 1fr'},
  {label: '2 columns (25% - 75%)', value: '1fr 3fr'},
  {label: '3 columns (equal width)', value: '1fr 1fr 1fr'},
  {label: '3 columns (25% - 50% - 25%)', value: '1fr 2fr 1fr'},
  {label: '4 columns (equal width)', value: '1fr 1fr 1fr 1fr'},
];

export default function InsertLayoutDialog({
  activeEditor,
  onClose,
}) {
  const [layout, setLayout] = useState(LAYOUTS[0].value);
  const buttonLabel = LAYOUTS.find((item) => item.value === layout)?.label;

  const onClick = () => {
    activeEditor.dispatchCommand(INSERT_LAYOUT_COMMAND, layout);
    onClose();
  };

  return (
    <>
      <div style={{display: "flex", flexDirection: "column", gap: "10px"}}>
        <DropdownMenu
          variant='contained'
          color='inherit'
          endIcon={<KeyboardArrowDownRoundedIcon />}
          buttonStyle={{'&:hover': {boxShadow: 'none'}}}
          buttonLabel={buttonLabel}
          menuItems={LAYOUTS}
          handleSelect={(layout) => {setLayout(layout)}}
        >
        </DropdownMenu>
        <Button 
          variant="contained"
          color='inherit'
          style={{boxShadow: 'none', minWidth: 'auto', display: "flex", alignSelf: "flex-end"}}
          onClick={onClick}>Insert</Button>
      </div>
    </>
  );
}
