const convertHtmlToJson = ({htmlContent}) => {
    if (!htmlContent) {
        return null; // Return null if no content is provided
    }

    // Parse the HTML string into a DOM object
    const parser = new DOMParser();
    const dom = parser.parseFromString(htmlContent, 'text/html');
    // Check if the parsing was successful
    if (!dom || !dom.body) {
        console.error('Failed to parse HTML content:', htmlContent);
        return null; // Return null if parsing failed
    }

    // Helper function to recursively convert DOM elements to JSON
    const convertNodeToJson = (node) => {
        if (node.nodeType === Node.TEXT_NODE) {
            return {
                type: 'text',
                content: node.textContent,
            };
        }

        if (node.nodeType === Node.ELEMENT_NODE) {
            return {
                type: node.nodeName.toLowerCase(),
                content: Array.from(node.childNodes).map(convertNodeToJson),
            };
        }

        return null;
    };

    // Convert the root element (body) to JSON
    const json = convertNodeToJson(dom.body);

    return json; // Return the JSON representation of the DOM
};

export default convertHtmlToJson;
