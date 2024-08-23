
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AlertDialog({isOpen = false, onClose = () => {}, title = "_", content = "___", cancelButtonTitle = "Cancel", confirmButtonTitle = "Confirm", confirmHandler = () => {}}) {
  return (
    <>
      <Dialog
        open={isOpen}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant='outlined' size='small' color='inherit' style={{textTransform: "none"}} onClick={onClose}>{cancelButtonTitle}</Button>
          <Button variant='contained' size='small' style={{textTransform: "none"}} onClick={() => {
                confirmHandler()
                onClose()
            }} autoFocus>
            {confirmButtonTitle}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}