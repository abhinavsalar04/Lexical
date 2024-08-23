import { grey } from "@mui/material/colors";

const toolbarStyles = {
    root: {
        paddingBottom: "6px",
        borderBottom: `2px solid ${grey[300]}`,
        overflow: "auto",
    },
    pointerEventsNone: {
        cursor: "not-allowed",
    },
    disabledButtonStyle: {
        color: grey[400],
        padding: "0 2px",
        borderRadius: "6px",
        "&:hover": {
            backgroundColor: "transparent",
        },
    },
    commonButtonStyle:{
        color: grey[600],
    },
    buttonHover: {
        "&:hover": {
            borderRadius: "6px",
            backgroundColor: grey[100],
        },
    }
};

export default toolbarStyles;
