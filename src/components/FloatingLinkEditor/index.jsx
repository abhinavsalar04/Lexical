
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import {
  FloatingDivContainer,
  FloatingDivLink,
  FloatingDivLinkInput,
} from "./floatingLinkStyle";
import { Grid, IconButton } from "@mui/material";
import {useFloatingLinkEditor} from "../../hooks/useFloatingLinkEditor"

function FloatingLinkEditor({ editor }) {
  const {
    editorRef,
    inputRef,
    linkUrl,
    isEditMode,
    setLinkUrl,
    setEditMode,
    handleDone,
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
                  handleDone();
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
          <IconButton
            className="link-edit"
            role="button"
            tabIndex={0}
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => {
              setEditMode(!isEditMode);
              if (!isEditMode && inputRef.current) {
                inputRef.current.focus();
              }
            }}
          >
            {isEditMode ? <DoneIcon onClick={handleDone} /> : <EditIcon />}
          </IconButton>
        </Grid>
      </Grid>
    </FloatingDivContainer>
  );
}


export default FloatingLinkEditor;
