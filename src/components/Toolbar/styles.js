import { grey } from "@mui/material/colors";

export const toolbarStyles = {
    root: {
      paddingBottom: "6px",
      borderBottom: `2px solid ${grey[300]}`,
      overflow: "hidden", // Remove scrollbar
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      gap: "4px",
    },
    itemWrapper: {
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      gap: "8px",
      justifyContent: "flex-start", // Left-align items
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
    commonButtonStyle: {
      color: grey[600],
    },
    buttonHover: {
      "&:hover": {
        borderRadius: "6px",
        backgroundColor: grey[100],
      },
    },
    menuTitleHidden: {
      display: "none",
    },
    '@media (max-width: 600px)': {
      root: {
        flexDirection: "row", // Adjust layout for smaller screens
      },
      itemWrapper: {
        justifyContent: "flex-start", // Left-align items on smaller screens
      },
      menuTitleHidden: {
        display: "none", // Hide menu titles on smaller screens
      },
    },
  };
  