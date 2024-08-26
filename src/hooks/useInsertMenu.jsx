import BorderHorizontalIcon from '@mui/icons-material/BorderHorizontal';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import TableViewOutlinedIcon from '@mui/icons-material/TableViewOutlined';
import { InsertImageDialog } from '../plugins/ImagePlugin';
import InsertPageBreakOutlinedIcon from '@mui/icons-material/InsertPageBreakOutlined';
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';
import ViewWeekOutlinedIcon from '@mui/icons-material/ViewWeekOutlined';
import {INSERT_HORIZONTAL_RULE_COMMAND} from "@lexical/react/LexicalHorizontalRuleNode";
import { INSERT_PAGE_BREAK } from '../plugins/PageBreakPlugin';
import {INSERT_COLLAPSIBLE_COMMAND} from "../plugins/CollapsiblePlugin/index"
import {InsertTableDialog} from "../plugins/TablePlugin"
import InsertLayoutDialog from "../plugins/ColumnLayoutPlugin/InsertColumnLayoutDialog"
import {AutoEmbedDialog} from "../components/AutoEmbedDialog/AutoEmbedDialog"
import SmartDisplayRoundedIcon from '@mui/icons-material/SmartDisplayRounded';
import CodeOffRoundedIcon from '@mui/icons-material/CodeOffRounded';
import HtmlRoundedIcon from '@mui/icons-material/HtmlRounded';
import { INSERT_YOUTUBE_COMMAND } from '../plugins/YoutubePlugin';
import { INSERT_IFRAME_COMMAND } from '../plugins/IFramePlugin';
import { Icon } from '@iconify/react/dist/iconify.js';
import { INSERT_EMBED_CODE_COMMAND} from '../plugins/EmbedCodePlugin';
import { $generateHtmlFromNodes} from "@lexical/html";

const customModalStyle = {
    width: '60%',
    height: "50vh",
    maxWidth: '1200px',
    '@media (max-width: 768px)': {
      width: '90%',
    },
    '@media (max-width: 540px)': {
      width: '100%',
    },
}

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
        {
            title: "Column Layout",
            icon: <ViewWeekOutlinedIcon />,
            onClick: () => showModal('Insert Columns', (onClose) => {
                return  <InsertLayoutDialog
                activeEditor={editor}
                onClose={onClose}
              /> 
            }, true)
        },
        {
            title: 'Youtube Video',
            icon: <SmartDisplayRoundedIcon />,
            // icon: <Icon icon={'mingcute:youtube-fill'} fontSize={'20'}></Icon>,
            exampleUrl: 'https://www.youtube.com/watch?v=jNQXAC9IVRw',
            insertNode: (editor, result) => {
                editor.dispatchCommand(INSERT_YOUTUBE_COMMAND, result);
            },
            keywords: ['youtube', 'video'],
            type: 'youtube-video',
            validateURL: async (url) => {
                const match = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/.exec(url);
                const id = match ? (match?.[2].length === 11 ? match[2] : null) : null;
                if (id != null) {
                    return {id, url};
                }
                return null;
            },
            onClick: function () {
                const self = this; 
                return showModal('Insert Youtube Video link/iframe', function (onClose) {
                        return <AutoEmbedDialog embedConfig={{...self}} onClose={onClose}></AutoEmbedDialog>
                    }, true
                )
          }
        },
        {
            title: 'Embed Iframe',
            // icon: <CodeOffRoundedIcon />,
            icon: <Icon icon={'mdi:iframe-brackets-outline'} fontSize={'22'}></Icon>,
            exampleUrl: 'Enter valid iframe code.Ex- <iframe src = "src_url" .....></iframe>',
            insertNode: (editor, result) => {
                editor.dispatchCommand(INSERT_IFRAME_COMMAND, result);
            },
            keywords: ['iframe', 'video', 'code'],
            type: 'iframe-embed',
            validateURL: async (inputText) => {
                const iframeRegex = /<iframe\s+(?:[^>]*?\s+)?src=["']([^"']+)["'][^>]*><\/iframe>/;
                const match = iframeRegex.exec(inputText);
                if (match && match[0] && match[1]) {
                    return { src: match[1], data: match[0] }; // Extracted src URL
                }
                return null;
            },
            onClick: function () {
                const self = this; 
                return showModal('Embed Iframe', function (onClose) {
                        return <AutoEmbedDialog  embedConfig={{...self}} onClose={onClose}></AutoEmbedDialog>
                    }, true, {...customModalStyle}
                )
            }
        },
        {
            title: 'Source Code',
            _id: 'Lexical_SourceCode',
            // icon: <HtmlRoundedIcon />,
            icon: <Icon icon={'dashicons:html'} fontSize={'22'} />,
            exampleUrl: 'Write your html code here...',
            insertNode: (editor, result) => {
            editor.dispatchCommand(INSERT_EMBED_CODE_COMMAND, result);
            },
            keywords: ['source', 'code', 'html'],
            type: 'souorce-code',
            validateURL: async (inputText) => {
                return inputText 
            },
            onClick: function () {
                const self = this; 
                return showModal('Source Code', function (onClose) {
                    const editorHtmlContent = editor.getEditorState().read(() => {
                        return $generateHtmlFromNodes(editor);
                    });
                        return <AutoEmbedDialog value={editorHtmlContent} embedConfig={{...self}} onClose={onClose}></AutoEmbedDialog>
                    }, true, {...customModalStyle}
                )
            }
        },

    ]

  return {
      insertMenuItems
  };
};

export default useInsertMenu;
