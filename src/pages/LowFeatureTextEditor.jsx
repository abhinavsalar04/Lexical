
import {LexicalComposer} from '@lexical/react/LexicalComposer';
import {RichTextPlugin} from '@lexical/react/LexicalRichTextPlugin';
import {ContentEditable} from '@lexical/react/LexicalContentEditable';
import {HistoryPlugin} from '@lexical/react/LexicalHistoryPlugin';
import {ListPlugin} from '@lexical/react/LexicalListPlugin';
import {CheckListPlugin} from '@lexical/react/LexicalCheckListPlugin';
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import LexicalToHtmlPlugin from '../plugins/LexicalToHtmlPlugin';
import HtmlToLexicalPlugin from "../plugins/HtmlToLexicalPlugin"
import Stack from "@mui/material/Stack";
import Placeholder from '../components/Placeholder/Placeholder';
import CodeHighlightPlugin from '../plugins/CodeHighlightPlugin';
import {initialConfig, MATCHERS} from "../constants";
import editorStyles from "./styles";
import { AutoLinkPlugin } from '@lexical/react/LexicalAutoLinkPlugin';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { CharacterLimitPlugin } from '../plugins/CharacterLLimitPlugin';
import LowFeatureTextEditorToobar from "../components/Toolbar/LowFeatureTextEditorToolbar"
import { LOW_FEATURE_EDITOR_NODES } from '../constants';
export const LowFeatureTextEditor = ({content, setContent}) => {
    return (
            <LexicalComposer
                initialConfig={{...initialConfig, nodes: LOW_FEATURE_EDITOR_NODES}}
            >
                <Stack sx={editorStyles.container}>
                    <LowFeatureTextEditorToobar editable/>
                    <RichTextPlugin
                        contentEditable={
                            <ContentEditable sx={editorStyles.contentEditable}/>
                        }
                        placeholder={<Placeholder style={{...editorStyles.placeholder}}>Enter some rich text...</Placeholder>}
                        ErrorBoundary={LexicalErrorBoundary}
                    />
                    <CodeHighlightPlugin />
                    <LexicalToHtmlPlugin 
                        onHtmlChanged={(html) => {setContent(html)}}    
                    />
                    <AutoFocusPlugin />
                    <AutoLinkPlugin matchers={MATCHERS} />
                    <HtmlToLexicalPlugin content={content} />
                    <HistoryPlugin/>
                    <ListPlugin/>
                    <LinkPlugin />
                    <CheckListPlugin/>
                    <CharacterLimitPlugin />
                </Stack>
            </LexicalComposer>
    )
}
