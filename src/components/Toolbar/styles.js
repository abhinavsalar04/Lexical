import { grey } from "@mui/material/colors";

const toolbarStyles = {
    root: {
        padding: "5px",
        borderBottom: `2px solid ${grey[300]}`,
        overflow: "auto",
    },
    activeButtonStyle: {
        borderRadius: "8px",
        backgroundColor: grey[200],
        "&:hover": {
            borderRadius: "8px",
            backgroundColor: grey[300],
        },
    },
    inactiveButtonStyle: {
        color: grey[800],
        "&:hover": {
            borderRadius: "8px",
            backgroundColor: grey[200],
        },
    },
    pointerEventsNone: {
        cursor: "not-allowed",
    },
    disabledButtonStyle: {
        color: grey[400],
        "&:hover": {
            backgroundColor: "transparent",
        },
    },
    inActiveButtonHoverStyle: {
        "&:hover": {
            borderRadius: "8px",
            backgroundColor: grey[200],
        },
    },
    avtiveButtonHoverStyle: {
        "&:hover": {
            borderRadius: "8px",
            backgroundColor: grey[300],
        },
    }
};

export default toolbarStyles;
