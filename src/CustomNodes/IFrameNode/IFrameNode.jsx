import { BlockWithAlignableContents } from '@lexical/react/LexicalBlockWithAlignableContents';
import { DecoratorBlockNode } from '@lexical/react/LexicalDecoratorBlockNode';

function IframeComponent({ className, format, nodeKey, src, width, height }) {
  return (
    <BlockWithAlignableContents className={className} format={format} nodeKey={nodeKey}>
      <iframe
        style={{maxWidth: "100%"}}
        width={width || "560"}
        height={height || "315"}
        src={src}
        allowFullScreen={true}
        title="Embedded content"
      />
    </BlockWithAlignableContents>
  );
}

function $convertIframeElement(domNode) {
  const src = domNode.getAttribute('data-lexical-iframe');
  const width = domNode.getAttribute('data-lexical-width')
  const height = domNode.getAttribute('data-lexical-height')
  if (src) {
    const node = $createIframeNode(src, width, height);
    return { node };
  }
  return null;
}

export class IframeNode extends DecoratorBlockNode {
  __src;
  __width;
  __height;

  static getType() {
    return 'iframe';
  }

  static clone(node) {
    return new IframeNode(node.__src, node.__width, node.__height, node.__format, node.__key);
  }

  static importJSON(serializedNode) {
    const node = $createIframeNode(serializedNode.src, serializedNode.__width, serializedNode.__height);
    node.setFormat(serializedNode.format);
    return node;
  }

  exportJSON() {
    return {
      ...super.exportJSON(),
      type: 'iframe',
      version: 1,
      src: this.__src,
      width: this.__width,
      height: this.__height
    };
  }

  constructor(src, width, height, format, key) {
    super(format, key);
    this.__src = src;
    this.__width = width;
    this.__height = height;
  }

  exportDOM() {
    const element = document.createElement('iframe');
    element.setAttribute('data-lexical-iframe', this.__src);
    element.setAttribute('data-lexical-width', this.__width ?? '516');
    element.setAttribute('data-lexical-height', this.__height ?? '315');
    element.setAttribute('width', this.__width);
    element.setAttribute('height', this.__height);
    element.setAttribute('src', this.__src);
    element.setAttribute('frameborder', '0');
    element.setAttribute('allowfullscreen', 'true');
    element.setAttribute('title', 'Embedded content');
    return { element };
  }

  static importDOM() {
    return {
      iframe: (domNode) => {
        if (!domNode.hasAttribute('data-lexical-iframe')) {
          return null;
        }
        return {
          conversion: $convertIframeElement,
          priority: 1,
        };
      },
    };
  }

  updateDOM() {
    return false;
  }

  getSrc() {
    return this.__src;
  }

  getTextContent(_includeInert, _includeDirectionless) {
    return this.__src;
  }

  decorate(_editor, config) {
    const embedBlockTheme = config.theme.embedBlock || {};
    const className = {
      base: embedBlockTheme.base || '',
      focus: embedBlockTheme.focus || '',
    };
    return (
      <IframeComponent
        className={className}
        format={this.__format}
        nodeKey={this.getKey()}
        src={this.__src}
        width={this.__width}
        height={this.__height}
      />
    );
  }
}

export function $createIframeNode(src, width, height) {
  return new IframeNode(src, width, height);
}

export function $isIframeNode(node) {
  return node instanceof IframeNode;
}
