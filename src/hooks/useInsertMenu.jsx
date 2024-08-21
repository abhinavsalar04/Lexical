import BorderHorizontalIcon from '@mui/icons-material/BorderHorizontal';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import TableViewOutlinedIcon from '@mui/icons-material/TableViewOutlined';
import { InsertImageDialog } from '../plugins/ImagePlugin';
import InsertPageBreakOutlinedIcon from '@mui/icons-material/InsertPageBreakOutlined';
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';
import {INSERT_HORIZONTAL_RULE_COMMAND} from "@lexical/react/LexicalHorizontalRuleNode";
import { INSERT_PAGE_BREAK } from '../plugins/PageBreakPlugin';
import {INSERT_COLLAPSIBLE_COMMAND} from "../plugins/CollapsiblePlugin/index"
import {InsertTableDialog} from "../plugins/TablePlugin"
const useInsertMenu = ({editor, showModal}) => {
    const insertMenuItems = [
        {
            title: "Horizontal Rule",
            icon: <BorderHorizontalIcon/>,
            onClick: () => editor.dispatchCommand(INSERT_HORIZONTAL_RULE_COMMAND, undefined,)
        },
        {
            title: "Page Break",
            icon: <InsertPageBreakOutlinedIcon/>,
            onClick: () => {
                editor.dispatchCommand(INSERT_PAGE_BREAK, undefined);
              }
        },
        {
            title: "Image",
            icon: <ImageOutlinedIcon />,
            onClick: () => showModal('Insert Image', (onClose) => {
                return <InsertImageDialog activeEditor={editor} onClose={onClose} />
            }, true)
        },
        {
            title: 'Table',
            icon: <TableViewOutlinedIcon />,
            onClick: () => showModal("Insert Table", (onClose) => {
                return <InsertTableDialog activeEditor={editor} onClose={onClose} />
            }, false)
        },
        {
            title: 'Collapsible Container',
            icon: <ExpandCircleDownOutlinedIcon />,
            onClick: () => {
                editor.dispatchCommand(
                  INSERT_COLLAPSIBLE_COMMAND,
                  undefined,
                );
            }
        },

    ]

  return {
      insertMenuItems
  };
};

export default useInsertMenu;
