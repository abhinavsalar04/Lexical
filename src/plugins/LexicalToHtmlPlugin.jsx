import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $generateHtmlFromNodes} from "@lexical/html";


const LexicalToHtmlPlugin = ({ onHtmlChanged }) => {
    const [editor] = useLexicalComposerContext();   
    return (
        <OnChangePlugin
            onChange={(editorState) => {
                editorState.read(() => {
                    onHtmlChanged($generateHtmlFromNodes(editor));
                });
            }}
        />
    );
};

export default LexicalToHtmlPlugin;