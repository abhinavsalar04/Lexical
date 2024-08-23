import { grey } from '@mui/material/colors';

export const useFontSizeStyles = () => ({
  fontSizeWrapper: {
    display: "flex",
    alignItems: "center",
    gap: "2px"
  },
  fontSizeInput: {
    fontWeight: 'bold',
    fontSize: '14px',
    color: '#777',
    borderRadius: '5px',
    border: `2px solid ${grey[600]}`,
    borderColor: grey[500],
    height: '28px',
    padding: '2px 4px',
    textAlign: 'center',
    width: '30px',
  },
  fontSizeIncrementButton: {
    minWidth: 0,
    color: grey[600],
    cursor: "pointer",
    '&:hover': {
      backgroundColor: grey[100],
    },
  },
  fontSizeDecrementButton: {
    minWidth: 0,
    color: grey[600],
    cursor: "pointer",
    '&:hover': {
      backgroundColor: grey[100],
    },
  },
})