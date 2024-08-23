import { grey } from '@mui/material/colors';

export const useFontSizeStyles = () => ({
  fontSizeWrapper: {
    display: "flex",
    alignItems: "center",
    gap: "4px"
  },
  fontSizeInput: {
    fontWeight: 'bold',
    fontSize: '14px',
    color: '#777',
    borderRadius: '6px',
    border: `2px solid ${grey[600]}`,
    borderColor: grey[500],
    height: '28px',
    padding: '2px 4px',
    textAlign: 'center',
    width: '30px',
  },
  fontSizeIncrementButton: {
    minWidth: 'auto',
    p: 0.75,
    color: grey[600],
    cursor: "pointer",
    '&:hover': {
      borderRadius: "6px",
      backgroundColor: grey[100],
    },
  },
  fontSizeDecrementButton: {
    minWidth: 'auto',
    p: 0.75,
    color: grey[600],
    cursor: "pointer",
    '&:hover': {
      borderRadius: "6px",
      backgroundColor: grey[100],
    },
  },
})