
import {useState} from 'react';
import {INSERT_LAYOUT_COMMAND} from "./ColumnLayoutPlugin";
import {DropDownMenu} from "../../ui/Dropdown/dropdown"
import { Button } from '@mui/material';
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
      <DropDownMenu
        buttonClassName="toolbar-item dialog-dropdown"
        buttonLabel={buttonLabel}
        menuItems={LAYOUTS}
        onSelect={(layout) => {setLayout(layout)}}
      >
      </DropDownMenu>
      <Button 
        variant="contained"
        color='inherit'
        style={{boxShadow: 'none', marginTop: "15px"}}
        onClick={onClick}>Insert</Button>
    </>
  );
}
