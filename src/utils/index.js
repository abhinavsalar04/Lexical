import {blue, blueGrey} from "@mui/material/colors";
import {grey} from "@mui/material/colors";

export const getMenuButtonStyle = ({open, isMdViewport}) => ({
    color: grey[700],
    p: "5px",
    px: "10px",
    textTransform: "none",
    "&:hover": {
            backgroundColor: grey[100],
    },
    ...(open && {
        "& .MuiButton-endIcon": {
            transition: "all 0.2s ease-in-out",
            transform: "rotate(180deg)",
        },
    }),
    // Remove margin from icons when viewport is less than 960px
    ...(!isMdViewport && {
        "& .MuiButton-startIcon, & .MuiButton-endIcon": {
            m: 0,
        },
    }),
});

export const getActiveBtnStyle = (isActive) => ({
    ...(isActive ? {
        color: grey[700],
        borderRadius: "8px",
        backgroundColor: grey[200],
        "&:hover": {
            borderRadius: "8px",
            backgroundColor: grey[300]
        },
    }:{
        color: grey[700],
        "&:hover": {
            borderRadius: "8px",
            backgroundColor: grey[100]
        },
    }),
});

export const getColorPickerPaperStyle = () => ({
    overflow: 'visible',
    "::before": {
        content: '""',
        position: "absolute",
        top: 7,
        left: "50%",
        bgcolor: "#F6F6F6",
        transform: "translate(-50%) rotate(45deg)",
        width: 10,
        height: 10,
        zIndex: 0,
        borderLeft: `1px solid ${grey[400]}`,
        borderTop: `1px solid ${grey[400]}`,
    },
    boxShadow: 5,
    border: `1px solid ${grey[400]}`,
    mt: 1.5
});