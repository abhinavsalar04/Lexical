import { backdropClasses } from '@mui/material';
import { grey } from '@mui/material/colors';

const editorStyles = {
    container: {
        position: 'relative',
        width: '100%',
        backgroundColor: 'white',
        color: 'black',
        fontWeight: 400,
        textAlign: 'left',
        height: '100%', // Make sure the container takes full height
        display: 'flex',
        flexDirection: 'column',
    },
    contentEditable: {
        position: 'relative',
        resize: 'none',
        outline: '0',
        fontSize: '1rem',
        caretColor: grey[600],
        tabSize: '1',
        padding: '15px',
        overflow: 'auto',
        maxHeight: '200px',
        border: '1px solid #ccc',
        borderRadius: '4px',
    },
    placeholder: {
        position: 'absolute',
        top: '16px',
        left: '15px',
        right: '28px',
        fontSize: '15px',
        color: grey[500],
        // overflow: 'hidden',
        textOverflow: 'ellipsis',
        userSelect: 'none',
        pointerEvents: 'none',
        whiteSpace: 'nowrap',
        display: 'inline-block',
    },
};

export default editorStyles;
