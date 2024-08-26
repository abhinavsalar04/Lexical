
  import { BlockWithAlignableContents } from '@lexical/react/LexicalBlockWithAlignableContents';
  import { DecoratorBlockNode } from '@lexical/react/LexicalDecoratorBlockNode';
  
  
  function YouTubeComponent({
    className,
    format,
    nodeKey,
    videoID,
    width, 
    height
  }) {  
    return (
      <BlockWithAlignableContents
        className={className}
        format={format}
        nodeKey={nodeKey}>
        <iframe
          width={width ? width : `560`}
          height={height ? height : `315`}
          src={`https://www.youtube-nocookie.com/embed/${videoID}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen={true}
          title="YouTube video"
        />
      </BlockWithAlignableContents>
    );
  }
  
  
  function $convertYoutubeElement(domNode) {
    const videoID = domNode.getAttribute('data-lexical-youtube');
    const width = domNode.getAttribute('data-lexical-width')
    const height = domNode.getAttribute('data-lexical-height')
    if (videoID) {
      const node = $createYouTubeNode(videoID, width || '516', height || '315');
      console.log("domNode", domNode, " generated node: ", node)
      return {node};
    }
    return null;
  }
  
  export class YouTubeNode extends DecoratorBlockNode {
    __id;
    __width;
    __height

    static getType() {
      return 'youtube';
    }
  
    static clone(node) {
      return new YouTubeNode(node.__id, node.__width, node.__height, node.__format, node.__key);
    }
  
    static importJSON(serializedNode) {
      const node = $createYouTubeNode(serializedNode.videoID, serializedNode.width, serializedNode.height);
      node.setFormat(serializedNode.format);
      return node;
    }
  
    exportJSON() {
      return {
        ...super.exportJSON(),
        type: 'youtube',
        version: 1,
        videoID: this.__id,
        width: this.__width,
        height: this.__height
      };
    }
  
    constructor(id, width, height, format, key) {
      super(format, key);
      this.__id = id;
      this.__width = width;
      this.__height = height;
    }
  
    exportDOM() {
      const element = document.createElement('iframe');
      element.setAttribute('data-lexical-youtube', this.__id);
      element.setAttribute('data-lexical-width', this.__width ?? '516');
      element.setAttribute('data-lexical-height', this.__height ?? '315');
      element.setAttribute('width', this.__width);
      element.setAttribute('height', this.__height);
      element.setAttribute(
        'src',
        `https://www.youtube-nocookie.com/embed/${this.__id}`,
      );
      element.setAttribute('frameborder', '0');
      element.setAttribute(
        'allow',
        'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
      );
      element.setAttribute('allowfullscreen', 'true');
      element.setAttribute('title', 'YouTube video');
      return {element};
    }
  
    static importDOM() {
      return {
        iframe: (domNode) => {
          if (!domNode.hasAttribute('data-lexical-youtube')) {
            return null;
          }
          return {
            conversion: $convertYoutubeElement,
            priority: 1,
          };
        },
      };
    }
  
    updateDOM() {
      return false;
    }
  
    getId() {
      return this.__id;
    }
  
    getTextContent(
      _includeInert,
      _includeDirectionless,
    ) {
      return `https://www.youtube.com/watch?v=${this.__id}`;
    }
  
    decorate(_editor, config) {
      const embedBlockTheme = config.theme.embedBlock || {};
      const className = {
        base: embedBlockTheme.base || '',
        focus: embedBlockTheme.focus || '',
      };
      return (
        <YouTubeComponent
          className={className}
          format={this.__format}
          nodeKey={this.getKey()}
          videoID={this.__id}
          width={this.__width}
          height={this.__height}
        />
      );
    }
  }
  
  export function $createYouTubeNode(videoID, width, height) {
    console.log("createYoutubeNode: ", videoID, width, height)
    return new YouTubeNode(videoID, width, height);
  }
  
  export function $isYouTubeNode(node) {
    return node instanceof YouTubeNode;
  }
  