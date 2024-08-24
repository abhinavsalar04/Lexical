import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';
import {useMemo, useState} from 'react';

import {useCharacterLimit} from './../hooks/useCharacterlimit';

const CHARACTER_LIMIT = 256;
let textEncoderInstance = null;

function textEncoder() {
  if (window.TextEncoder === undefined) {
    return null;
  }

  if (textEncoderInstance === null) {
    textEncoderInstance = new window.TextEncoder();
  }

  return textEncoderInstance;
}

function utf8Length(text) {
  const currentTextEncoder = textEncoder();

  if (currentTextEncoder === null) {
    const m = encodeURIComponent(text).match(/%[89ABab]/g);
    return text.length + (m ? m.length : 0);
  }

  return currentTextEncoder.encode(text).length;
}

function DefaultRenderer({remainingCharacters}) {
  return (
    <span
      className={`characters-limit ${
        remainingCharacters < 0 ? 'characters-limit-exceeded' : ''
      }`}>
      {remainingCharacters}
    </span>
  );
}

export function CharacterLimitPlugin({
  charset = 'UTF-16',
  maxLength = CHARACTER_LIMIT,
  renderer = DefaultRenderer,
}) {
  const [editor] = useLexicalComposerContext();

  const [remainingCharacters, setRemainingCharacters] = useState(maxLength);

  const characterLimitProps = useMemo(
    () => ({
      remainingCharacters: setRemainingCharacters,
      strlen: (text) => {
        if (charset === 'UTF-8') {
          return utf8Length(text);
        } else if (charset === 'UTF-16') {
          return text.length;
        } else {
          throw new Error('Unrecognized charset');
        }
      },
    }),
    [charset],
  );

  useCharacterLimit(editor, maxLength, characterLimitProps);

  return renderer({remainingCharacters});
}
