import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { Button } from "@mui/material";
import { useMemo, useState } from "react";
import {useAutoEmbedStyles} from "./autoEmbedDialogStyle"
import { URL_MATCHER } from "@lexical/react/LexicalAutoEmbedPlugin";


const debounce = (callback, delay) => {
  let timeoutId;
  return (text) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      callback(text);
    }, delay);
  };
 };

 
export function AutoEmbedDialog({
    embedConfig,
    onClose,
   }) {
    
    const [text, setText] = useState('');
    const [editor] = useLexicalComposerContext();
    const [embedResult, setEmbedResult] = useState(null);
    const styles = useAutoEmbedStyles()
   
    const validateText = useMemo(
      () =>
        debounce((inputText) => {
          const urlMatch = URL_MATCHER.exec(inputText);
          if (embedConfig != null && inputText != null && urlMatch != null) {
            Promise.resolve(embedConfig.validateURL(inputText)).then(
              (parseResult) => {
                setEmbedResult(parseResult);
              },
            );
          } else if (embedResult != null) {
            setEmbedResult(null);
          }
        }, 200),
      [embedConfig, embedResult],
    );
   
    const onClick = () => {
      if (embedResult != null) {
        embedConfig.insertNode(editor, embedResult);
        onClose();
      }
    };
   
    return (
      <div style={styles.modalContainer}>
        <div style={{display: "flex", flexDirection: "column", gap: "10px"}}>
          <div style={{...styles.inputWrapper}}>
            <textarea
              style={{...styles.textarea}}
              placeholder={embedConfig.exampleUrl}
              value={text}
              data-test-id={`${embedConfig.type}-embed-modal-url`}
              onChange={(e) => {
                const { value } = e.target;
                setText(value);
                validateText(value);
              }}
            />
          </div>
          <div style={{alignSelf: "flex-end"}}>
            <Button
              variant="contained"
              color="inherit"
              style={{boxShadow: 'none', textTransform: 'none'}}
              disabled={!embedResult}
              onClick={onClick}
              data-test-id={`${embedConfig.type}-embed-modal-submit-btn`}>
              Embed
            </Button>
          </div>
        </div>
      </div>
    );
}