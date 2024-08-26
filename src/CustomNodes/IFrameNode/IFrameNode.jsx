import { BlockWithAlignableContents } from '@lexical/react/LexicalBlockWithAlignableContents';
import { DecoratorBlockNode } from '@lexical/react/LexicalDecoratorBlockNode';

function IframeComponent({ className, format, nodeKey, src }) {
  return (
    <BlockWithAlignableContents className={className} format={format} nodeKey={nodeKey}>
      <iframe
        width="560"
        height="315"
        src={src}
        allowFullScreen={true}
        title="Embedded content"
      />
    </BlockWithAlignableContents>
  );
}

function $convertIframeElement(domNode) {
  const src = domNode.getAttribute('data-lexical-iframe');
  if (src) {
    const node = $createIframeNode(src);
    return { node };
  }
  return null;
}

export class IframeNode extends DecoratorBlockNode {
  __src;

  static getType() {
    return 'iframe';
  }

  static clone(node) {
    return new IframeNode(node.__src, node.__format, node.__key);
  }

  static importJSON(serializedNode) {
    const node = $createIframeNode(serializedNode.src);
    node.setFormat(serializedNode.format);
    return node;
  }

  exportJSON() {
    return {
      ...super.exportJSON(),
      type: 'iframe',
      version: 1,
      src: this.__src,
    };
  }

  constructor(src, format, key) {
    super(format, key);
    this.__src = src;
  }

  exportDOM() {
    const element = document.createElement('iframe');
    element.setAttribute('data-lexical-iframe', this.__src);
    element.setAttribute('width', '560');
    element.setAttribute('height', '315');
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
      />
    );
  }
}

export function $createIframeNode(src) {
  return new IframeNode(src);
}

export function $isIframeNode(node) {
  return node instanceof IframeNode;
}
