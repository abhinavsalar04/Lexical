
import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';
import {useEffect} from 'react';

export function AutoFocusPlugin({defaultSelection}) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    editor.focus(
      () => {
        const activeElement = document.activeElement;
        const rootElement = editor.getRootElement();
        if (rootElement !== null && (activeElement === null || !rootElement.contains(activeElement))) {
          rootElement.focus({preventScroll: true});
        }
      },
      {defaultSelection},
    );
  }, [defaultSelection, editor]);

  return null;
}
