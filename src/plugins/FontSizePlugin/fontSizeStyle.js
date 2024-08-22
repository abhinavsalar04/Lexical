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
    borderRadius: '5px',
    borderColor: grey[500],
    height: '30px',
    padding: '2px 4px',
    textAlign: 'center',
    width: '30px',
  },
  fontSizeIncrementButton: {
    color: grey[600],
    cursor: "pointer",
    borderRadius: '5px',
    '&:hover': {
      backgroundColor: grey[700],
    },
  },
  fontSizeDecrementButton: {
    color: grey[600],
    cursor: "pointer",
    borderRadius: '15px',
    '&:hover': {
      backgroundColor: grey[200],
    },
  },
})