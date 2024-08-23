import {useCallback} from "react";
import {useLexicalComposerContext} from "@lexical/react/LexicalComposerContext";
import {$getSelection, $isRangeSelection} from "lexical";
import {$patchStyleText} from "@lexical/selection";


const useColorPicker = () => {
    const [editor] = useLexicalComposerContext();

    const applyStyleText = useCallback(
        (styles) => {
            editor.update(() => {
                const selection = $getSelection();
                if ($isRangeSelection(selection)) {
                    $patchStyleText(selection, styles);
                }
            });
        },
        [editor],
    );

    const fontColorChangeHandler = useCallback(
        (value) => {
            applyStyleText({color: value});
        },
        [applyStyleText],
    );

    const backgroundColorChangeHandler = useCallback(
        (value) => {
            applyStyleText({'background-color': value});
        },
        [applyStyleText],
    );

    return {
        fontColorChangeHandler,
        backgroundColorChangeHandler,
    };
};

export default useColorPicker;
