import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';
import {$insertNodeToNearestRoot} from '@lexical/utils';
import {COMMAND_PRIORITY_EDITOR, createCommand} from 'lexical';
import {useEffect} from 'react';
import {getAttributesFromHTMLContent} from "../utils/getAttributesFromHTMLContent"

import {$createYouTubeNode, YouTubeNode} from '../CustomNodes/YoutubeNode/YoutubeNode';

export const INSERT_YOUTUBE_COMMAND = createCommand('INSERT_YOUTUBE_COMMAND');

export default function YouTubePlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (!editor.hasNodes([YouTubeNode])) {
      throw new Error('YouTubePlugin: YouTubeNode not registered on editor');
    }

    return editor.registerCommand(
      INSERT_YOUTUBE_COMMAND,
      (payload) => {
        const {width, height} = getAttributesFromHTMLContent(payload?.url)
        const youTubeNode = $createYouTubeNode(payload?.id, width, height);
        $insertNodeToNearestRoot(youTubeNode);

        return true;
      },
      COMMAND_PRIORITY_EDITOR,
    );
  }, [editor]);

  return null;
}
