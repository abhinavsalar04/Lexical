
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
import {initialConfig, MATCHERS} from "../constants";
import editorStyles from "./styles";
import { AutoLinkPlugin } from '@lexical/react/LexicalAutoLinkPlugin';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import {ImagePlugin} from "../plugins/ImagePlugin"
import { TablePlugin } from '@lexical/react/LexicalTablePlugin';
import PageBreakPlugin from '../plugins/PageBreakPlugin';
import CollapsiblePlugin from '../plugins/CollapsiblePlugin';
import {DEFAULT_EDITOR_SETTINGS} from "../constants"
import TableActionMenuPlugin from "../components/Table/index"
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { LayoutPlugin } from '../plugins/ColumnLayoutPlugin/ColumnLayoutPlugin';
import YouTubePlugin from '../plugins/YoutubePlugin';
import { CharacterLimitPlugin } from '../plugins/CharacterLLimitPlugin';
export const RichTextEditor = ({content, setContent}) => {
    return (
        <LexicalComposer
            initialConfig={{...initialConfig}}
        >
            <Stack sx={editorStyles.container}>
                <Toolbar editable/>
                <RichTextPlugin
                    contentEditable={
                        <ContentEditable sx={editorStyles.contentEditable}/>
                    }
                    placeholder={<Placeholder sx={editorStyles.placeholder}>Enter some rich text...</Placeholder>}
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
                <TablePlugin/>
                <TableActionMenuPlugin  /> 
                <PageBreakPlugin />
                <CollapsiblePlugin />
                <LayoutPlugin />
                <YouTubePlugin />
                <TablePlugin
                    hasCellMerge={DEFAULT_EDITOR_SETTINGS?.tableCellMerge ?? false}
                    hasCellBackgroundColor={DEFAULT_EDITOR_SETTINGS?.tableCellBackgroundColor ?? false}
                />
                <ImagePlugin captionsEnabled={false} />
                <HorizontalRulePlugin />
                <CheckListPlugin/>
                <CharacterLimitPlugin />
            </Stack>
        </LexicalComposer>
    )
}

export default RichTextEditor;