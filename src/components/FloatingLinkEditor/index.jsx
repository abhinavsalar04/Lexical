
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import {
  FloatingDivContainer,
  FloatingDivLink,
  FloatingDivLinkInput,
} from "./floatingLinkStyle";
import { Grid, IconButton} from "@mui/material";
import {useFloatingLinkEditor} from "../../hooks/useFloatingLinkEditor"
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import { grey } from "@mui/material/colors";

function FloatingLinkEditor({ editor }) {
  const {
    error,
    editorRef,
    inputRef,
    linkUrl,
    isEditMode,
    setLinkUrl,
    setEditMode,
    handleConfirm,
    handleDelteLink
  } = useFloatingLinkEditor({editor});

  return (
    <FloatingDivContainer ref={editorRef}>
      <Grid container alignItems="center">
        <Grid item xs={10}>
          {isEditMode ? (
            <FloatingDivLinkInput
              ref={inputRef}
              fullWidth
              value={linkUrl}
              inputProps={{ sx: { height: 10 } }}
              onChange={(event) => {
                setLinkUrl(event.target.value);
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  handleConfirm();
                } else if (event.key === "Escape") {
                  event.preventDefault();
                  setEditMode(false);
                }
              }}
            />
          ) : (
            <FloatingDivLink>
              <a href={linkUrl} target="_blank" rel="noopener noreferrer">
                {linkUrl}
              </a>
            </FloatingDivLink>
          )}
        </Grid>
        <Grid item xs={1}>
          <div style={{display: "flex", color: grey[600], gap: "0px", minWidth: 'auto'}}>
          <IconButton
            sx={{padding: "0px", borderRadius: "6px", p: 0.5}}
          >
          {isEditMode ? <DoneIcon fontSize="medium" onClick={handleConfirm} /> : <EditIcon fontSize="medium" onClick={() => {
              setEditMode(true);
              if (!isEditMode && inputRef.current) {
                inputRef.current.focus();
              }
            }} />}
          </IconButton>
            <IconButton
              sx={{padding: "0px", borderRadius: "6px", p: 0.5}}
            >
              <DeleteForeverRoundedIcon fontSize="medium"  onClick={handleDelteLink} />
            </IconButton>
          </div>
          
        </Grid>
        {error && error != "" && <span style={{color: "red", fontSize: "13px", padding: "0px 0px 8px 15px"}}>{error}!</span>}
      </Grid>
    </FloatingDivContainer>
  );
}


export default FloatingLinkEditor;
