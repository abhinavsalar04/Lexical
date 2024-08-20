import BorderHorizontalIcon from '@mui/icons-material/BorderHorizontal';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import TableViewOutlinedIcon from '@mui/icons-material/TableViewOutlined';
import InsertPageBreakOutlinedIcon from '@mui/icons-material/InsertPageBreakOutlined';
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';
import {INSERT_HORIZONTAL_RULE_COMMAND} from "@lexical/react/LexicalHorizontalRuleNode";
import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';
import { InsertImageDialog } from '../plugins/ImagePlugin';
import useEditorToolbar from './useEditorToolbar';
import { INSERT_PAGE_BREAK } from '../plugins/PageBreakPlugin';
import {INSERT_COLLAPSIBLE_COMMAND} from "../plugins/CollapsiblePlugin/index"

const useInsertMenu = () => {
    const [editor] = useLexicalComposerContext();
    const {showModal} = useEditorToolbar();

    const insertMenuItems = [
        {
            name: "Horizontal Rule",
            icon: <BorderHorizontalIcon/>,
            onClick: () => editor.dispatchCommand(INSERT_HORIZONTAL_RULE_COMMAND, undefined,)
        },
        {
            name: "Page Break",
            icon: <InsertPageBreakOutlinedIcon/>,
            onClick: () => {
                editor.dispatchCommand(INSERT_PAGE_BREAK, undefined);
              }
        },
        {
            _id: "IMAGE",
            name: "Image",
            icon: <ImageOutlinedIcon />,
            onClick: () => showModal("Insert Image", (onClose) => {
                return <InsertImageDialog activeEditor={editor} onClose={onClose} />
            })
        },
        {
            name: 'Table',
            icon: <TableViewOutlinedIcon />,
            onClick: () => showModal("Insert Table", (onClose) => {
                return <InsertImageDialog activeEditor={editor} onClose={onClose} />
            })
        },
        {
            name: 'Collapsible Container',
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
