import { useCallback, useEffect } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import debounce from '../utils/debounce';


const LocalStoragePlugin = ({ namespace }) => {
    const [editor] = useLexicalComposerContext();

    const saveContent = useCallback(
        (content) => {
            localStorage.setItem(namespace, content);
        },
        [namespace]
    );

    const debouncedSaveContent = debounce(saveContent, 500);

    useEffect(() => {
        return editor.registerUpdateListener(
            ({ editorState, dirtyElements, dirtyLeaves }) => {
                // Don't update if nothing has changed
                if (dirtyElements.size === 0 && dirtyLeaves.size === 0) return;

                const serializedState = JSON.stringify(editorState);
                debouncedSaveContent(serializedState);
            },
        );

        /**
         * Note that editor.registerUpdateListener() returns a callback to remove the update listener again. To avoid memory leaks, we use this returned callback for the cleanup function of useEffect.
         */
    }, [debouncedSaveContent, editor]);

    /**
     * As this plugin shouldn’t render any decoration or toolbar, we simply return null at the very end of the component.
     */
    return null;
}

export default LocalStoragePlugin;