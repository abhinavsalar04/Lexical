import {useLexicalComposerContext} from "@lexical/react/LexicalComposerContext";
import {$createParagraphNode, $getRoot, COMMAND_PRIORITY_LOW, createCommand} from "lexical";

const useCustomCommands = () => {

    const CLEAR_EDITOR_COMMAND = createCommand();
    const [editor] = useLexicalComposerContext();

    editor.registerCommand(
        CLEAR_EDITOR_COMMAND,
        () => {
            editor.update(() => {
                const root = $getRoot();
                const paragraph = $createParagraphNode();
                root.clear();
                root.append(paragraph);
                paragraph.select();
            });
            return true;
            /**
             * We clear all content and return true to mark this event as handled. Thus, no other succeeding command handler is called.
             */
        },
        COMMAND_PRIORITY_LOW
    );

    const clearEditorContent = () => editor.dispatchCommand(CLEAR_EDITOR_COMMAND, undefined);

    return {
        clearEditorContent
    };
}

export default useCustomCommands;