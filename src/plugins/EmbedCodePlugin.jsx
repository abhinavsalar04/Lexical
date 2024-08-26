import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getRoot, $getSelection } from 'lexical';
import { COMMAND_PRIORITY_EDITOR, createCommand } from 'lexical';
import { useEffect } from 'react';

import { $createEmbedCodeNode, EmbedCodeNode } from '../CustomNodes/EmbedCode/EmbedCodeNode';

export const INSERT_EMBED_CODE_COMMAND = createCommand('INSERT_HTML_COMMAND');

export default function EmbedCodePlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (!editor.hasNodes([EmbedCodeNode])) {
      throw new Error('HTMLPlugin: EmbedCodeNode not registered on editor');
    }

    return editor.registerCommand(
      INSERT_EMBED_CODE_COMMAND,
      (htmlContent) => {
        editor.update(() => {
          const root = $getRoot();
          root.clear();
          const embedCodeNode = $createEmbedCodeNode(htmlContent);
          root.append(embedCodeNode);
        });
        return true;
      },
      COMMAND_PRIORITY_EDITOR,
    );
  }, [editor]);

  return null;
}
