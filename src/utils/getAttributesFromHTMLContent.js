export function getAttributesFromHTMLContent(data) {
    if (!data) return {};

    const parser = new DOMParser();
    const doc = parser.parseFromString(data, 'text/html');
    const iframe = doc.querySelector('iframe');
    
    if (!iframe) return {};

    const attributes = Array.from(iframe.attributes).reduce((acc, attr) => {
        acc[attr.name] = attr.value;
        return acc;
    }, {});

    return attributes;
}
