import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useEffect, useRef } from 'react';
import  {$getRoot, $insertNodes} from "lexical"
import { $generateNodesFromDOM } from '@lexical/html';

const HtmlToLexicalPlugin = ({ content = `<p></p>`}) => {
    const [editor] = useLexicalComposerContext();
    const isInitialRender = useRef(true); // Create a ref to track initial render

    useEffect(() => {
        if (content && isInitialRender.current) {
            editor.update(() => {
                const parser = new DOMParser();
                const dom = parser.parseFromString(content, "text/html");
               const nodes = $generateNodesFromDOM(editor, dom);
                $getRoot().select();
                $insertNodes(nodes);
              });
            isInitialRender.current = false; 
        }
    }, [content, editor]);

    return null;
};

export default HtmlToLexicalPlugin;
