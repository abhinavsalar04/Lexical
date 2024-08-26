import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $insertNodeToNearestRoot } from '@lexical/utils';
import { COMMAND_PRIORITY_EDITOR, createCommand } from 'lexical';
import { useEffect } from 'react';

import { $createIframeNode, IframeNode } from '../CustomNodes/IFrameNode/IFrameNode';

export const INSERT_IFRAME_COMMAND = createCommand('INSERT_IFRAME_COMMAND');

export default function IframePlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    console.log(editor.hasNodes([IframeNode]))
    if (!editor.hasNodes([IframeNode])) {
      throw new Error('IframePlugin: IframeNode not registered on editor');
    }

    return editor.registerCommand(
      INSERT_IFRAME_COMMAND,
      (payload) => {
        const iframeNode = $createIframeNode(payload);
        console.log("iframeNode: ", iframeNode)
        $insertNodeToNearestRoot(iframeNode);

        return true;
      },
      COMMAND_PRIORITY_EDITOR
    );
  }, [editor]);

  return null;
}
