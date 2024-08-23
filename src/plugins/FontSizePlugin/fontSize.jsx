

import {$patchStyleText} from '@lexical/selection';
import {$getSelection} from 'lexical';
import { useCallback, useEffect, useState } from 'react';
import {calculateNextFontSize, DEFAULT_FONT_SIZE, MAX_ALLOWED_FONT_SIZE, MIN_ALLOWED_FONT_SIZE, UPDATE_FONT_SIZE_TYPE} from "./constants"
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { useFontSizeStyles } from './fontSizeStyle';
import { Button, Input } from '@mui/material';



export default function FontSize({
  selectionFontSize,
  disabled,
  editor,
}) {
  const [inputValue, setInputValue] = useState(selectionFontSize);
  const [inputChangeFlag, setInputChangeFlag] = useState(false);
  const styles = useFontSizeStyles()
  
  const updateFontSizeInSelection = useCallback(
    (newFontSize, updateType) => {
      const getNextFontSize = (prevFontSize) => {
        if (!prevFontSize) {
          prevFontSize = `${DEFAULT_FONT_SIZE}px`;
        }
        prevFontSize = prevFontSize.slice(0, -2);
        const nextFontSize = calculateNextFontSize(
          Number(prevFontSize),
          updateType,
        );
        return `${nextFontSize}px`;
      };

      editor.update(() => {
        if (editor.isEditable()) {
          const selection = $getSelection();
          if (selection !== null) {
            $patchStyleText(selection, {
              'font-size': newFontSize || getNextFontSize,
            });
          }
        }
      });
    },
    [editor],
  );

  const handleKeyPress = (e) => {
    const inputValueNumber = Number(inputValue);

    if (['e', 'E', '+', '-'].includes(e.key) || isNaN(inputValueNumber)) {
      e.preventDefault();
      setInputValue('');
      return;
    }
    setInputChangeFlag(true);
    if (e.key === 'Enter' || e.key === 'Tab' || e.key === 'Escape') {
      e.preventDefault();

      updateFontSizeByInputValue(inputValueNumber);
    }
  };

  const handleInputBlur = () => {
    if (inputValue !== '' && inputChangeFlag) {
      const inputValueNumber = Number(inputValue);
      updateFontSizeByInputValue(inputValueNumber);
    }
  };

  const handleButtonClick = (updateType) => {
    if (inputValue !== '') {
      const nextFontSize = calculateNextFontSize(
        Number(inputValue),
        updateType,
      );
      updateFontSizeInSelection(String(nextFontSize) + 'px', null);
    } else {
      updateFontSizeInSelection(null, updateType);
    }
  };

  const updateFontSizeByInputValue = (inputValueNumber) => {
    let updatedFontSize = inputValueNumber;
    if (inputValueNumber > MAX_ALLOWED_FONT_SIZE) {
      updatedFontSize = MAX_ALLOWED_FONT_SIZE;
    } else if (inputValueNumber < MIN_ALLOWED_FONT_SIZE) {
      updatedFontSize = MIN_ALLOWED_FONT_SIZE;
    }

    setInputValue(String(updatedFontSize));
    updateFontSizeInSelection(String(updatedFontSize) + 'px', null);
    setInputChangeFlag(false);
  };

  useEffect(() => {
    setInputValue(selectionFontSize);
  }, [selectionFontSize]);

  return (
    <>
      <div style={styles.fontSizeWrapper}>
      <Button
        
        disabled={
          disabled ||
          (selectionFontSize !== '' &&
            Number(inputValue) <= MIN_ALLOWED_FONT_SIZE)
        }
        onClick={() => handleButtonClick(UPDATE_FONT_SIZE_TYPE.decrement)}
        style={{...styles.fontSizeDecrementButton}}
      >
      <RemoveRoundedIcon fontSize='small'  />
      </Button>
      <input
        type="text"
        value={inputValue}
        disabled={disabled}
        style={styles.fontSizeInput}
        min={MIN_ALLOWED_FONT_SIZE}
        max={MAX_ALLOWED_FONT_SIZE}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyPress}
        onBlur={handleInputBlur}
      />
      <Button
        type="button"
        disabled={
          disabled ||
          (selectionFontSize !== '' &&
            Number(inputValue) >= MAX_ALLOWED_FONT_SIZE)
        }
        onClick={() => handleButtonClick(UPDATE_FONT_SIZE_TYPE.increment)}
        style={styles.fontSizeIncrementButton}
      >
      <AddRoundedIcon fontSize='small' />
      </Button>
      </div>
     
    </>
  );
}
