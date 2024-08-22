import { useCallback, useMemo, useState } from "react";
import { Modal, Box, Typography, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

export default function useModal() {
  const [modalContent, setModalContent] = useState(null);

  const onClose = useCallback(() => {
    setModalContent(null);
  }, []);

  const modal = useMemo(() => {
    if (modalContent === null) {
      return null;
    }
    const { title, content, closeOnClickOutside } = modalContent;

    return (
      <Modal
        open={!!modalContent}
        onClose={onClose}
        disableBackdropClick={!closeOnClickOutside}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            outline: 0,
            width: '400px', // Adjust width as needed
            borderRadius: '8px', // Optional: rounded corners
          }}
        >
          <IconButton
            onClick={onClose}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              color: 'grey.500',
            }}
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" component="h2" sx={{ mb: 2, textAlign: 'left' }}>
            {title}
          </Typography>
          <Box>
            {content}
          </Box>
        </Box>
      </Modal>
    );
  }, [modalContent, onClose]);

  const showModal = useCallback(
    (
      title,
      getContent,
      closeOnClickOutside = false
    ) => {
      setModalContent({
        closeOnClickOutside,
        content: getContent(onClose),
        title,
      });
    },
    [onClose]
  );

  return [modal, showModal];
}
