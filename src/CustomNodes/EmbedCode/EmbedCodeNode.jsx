import { DecoratorBlockNode } from '@lexical/react/LexicalDecoratorBlockNode';

function EmbedCodeComponent({ htmlContent }) {
  return (
    <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
  );
}

export class EmbedCodeNode extends DecoratorBlockNode {
  __htmlContent;

  static getType() {
    return 'html';
  }

  static clone(node) {
    return new EmbedCodeNode(node.__htmlContent, node.__format, node.__key);
  }

  static importJSON(serializedNode) {
    const node = $createEmbedCodeNode(serializedNode.htmlContent);
    node.setFormat(serializedNode.format);
    return node;
  }

  exportJSON() {
    return {
      ...super.exportJSON(),
      type: 'html',
      version: 1,
      htmlContent: this.__htmlContent,
    };
  }

  constructor(htmlContent, format, key) {
    super(format, key);
    this.__htmlContent = htmlContent;
  }

  exportDOM() {
    const element = document.createElement('div');
    element.innerHTML = this.__htmlContent;
    return { element };
  }

  static importDOM() {
    return {
      div: (domNode) => {
        return {
          conversion: () => {
            const htmlContent = domNode.innerHTML;
            const node = $createEmbedCodeNode(htmlContent);
            return { node };
          },
          priority: 0,
        };
      },
    };
  }

  updateDOM() {
    return false;
  }

  decorate(_editor, config) {
    return (
      <EmbedCodeComponent htmlContent={this.__htmlContent} />
    );
  }
}

export function $createEmbedCodeNode(htmlContent) {
  return new EmbedCodeNode(htmlContent);
}

export function $isEmbedCodeNode(node) {
  return node instanceof EmbedCodeNode;
}
