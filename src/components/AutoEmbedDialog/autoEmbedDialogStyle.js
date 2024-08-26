import { Height } from "@mui/icons-material";

export const useAutoEmbedStyles = () => ({
  modalContainer: {
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
    borderRadius: '6px',
    boxSizing: 'border-box',
    '@media (maxWidth: 768px)': {
      width: '100%',
      padding: '20px',
      borderRadius: '0px',
    },
  },
  inputWrapper: {
    width: '100%',
    borderRadius: '6px',
  },
  textarea: {
    width: '100%',
    padding: "10px",
    borderRadius: '6px',
    height: 'calc(20vh - 10px)',
    resize: 'none',
    boxSizing: 'border-box',
  },
});