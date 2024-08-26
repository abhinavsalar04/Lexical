import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $insertNodeToNearestRoot } from '@lexical/utils';
import { COMMAND_PRIORITY_EDITOR, createCommand } from 'lexical';
import { useEffect } from 'react';

import { $createEmbedCodeNode, EmbedCodeNode } from '../CustomNodes/EmbedCode/EmbedCodeNode';

export const INSERT_HTML_COMMAND = createCommand('INSERT_HTML_COMMAND');

export default function HTMLPlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (!editor.hasNodes([EmbedCodeNode])) {
      throw new Error('HTMLPlugin: EmbedCodeNode not registered on editor');
    }

    return editor.registerCommand(
      INSERT_HTML_COMMAND,
      (htmlContent) => {
        const EmbedCodeNode = $createEmbedCodeNode(htmlContent);
        $insertNodeToNearestRoot(EmbedCodeNode);
        return true;
      },
      COMMAND_PRIORITY_EDITOR,
    );
  }, [editor]);

  return null;
}
