
import {LexicalComposer} from '@lexical/react/LexicalComposer';
import {RichTextPlugin} from '@lexical/react/LexicalRichTextPlugin';
import {ContentEditable} from '@lexical/react/LexicalContentEditable';
import {HistoryPlugin} from '@lexical/react/LexicalHistoryPlugin';
import {HorizontalRulePlugin} from '@lexical/react/LexicalHorizontalRulePlugin';
import {ListPlugin} from '@lexical/react/LexicalListPlugin';
import {CheckListPlugin} from '@lexical/react/LexicalCheckListPlugin';
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import Toolbar from "./../components/Toolbar/Toolbar"
import LexicalToHtmlPlugin from '../plugins/LexicalToHtmlPlugin';
import HtmlToLexicalPlugin from "../plugins/HtmlToLexicalPlugin"
import Stack from "@mui/material/Stack";
import Placeholder from '../components/Placeholder/Placeholder';
import CodeHighlightPlugin from '../plugins/CodeHighlightPlugin';
import {initialConfig} from "../constants";
import editorStyles from "./styles";

export const RichTextEditor = ({content, setContent}) => {

    return (
        <LexicalComposer
            initialConfig={{...initialConfig}}
        >
            <Stack sx={editorStyles.container}>
                <Toolbar editable/>
                <RichTextPlugin
                    contentEditable={<ContentEditable sx={editorStyles.contentEditable}/>}
                    placeholder={<Placeholder sx={editorStyles.placeholder}>Enter some rich text...</Placeholder>}
                    ErrorBoundary={LexicalErrorBoundary}
                />
                <CodeHighlightPlugin />
                <LexicalToHtmlPlugin 
                    onHtmlChanged={(html) => {console.log(html); setContent(html)}}    
                />
                <HtmlToLexicalPlugin content={content} />
                <HistoryPlugin/>
                <ListPlugin/>
                <HorizontalRulePlugin />
                <CheckListPlugin/>
            </Stack>
        </LexicalComposer>
    )
}

export default RichTextEditor;