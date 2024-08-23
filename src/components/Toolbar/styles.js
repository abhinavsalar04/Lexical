import { grey } from "@mui/material/colors";

const toolbarStyles = {
    root: {
        paddingBottom: "6px",
        borderBottom: `2px solid ${grey[300]}`,
        overflow: "auto",
    },
    activeButtonStyle: {
        padding: "-2px 2px",
        borderRadius: "6px",
        "&:hover": {
            backgroundColor: grey[100],
        },
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
    buttonHover: {
        "&:hover": {
            borderRadius: "8px",
            backgroundColor: grey[100],
        },
    }
};

export default toolbarStyles;
