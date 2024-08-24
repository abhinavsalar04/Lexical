import { styled, Box, TextField } from "@mui/material";
import { grey } from "@mui/material/colors";

export const FloatingDivContainer = styled(Box)({
  position: "absolute",
  zIndex: 100,
  top: -10000,
  left: -10000,
  marginTop: -6,
  maxWidth: 400,
  width: "100%",
  opacity: 0,
  display: "flex",
  backgroundColor: "#fff",
  boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.3)",
  borderRadius: 6,
  transition: "opacity 0.5s",
});

export const FloatingDivLinkInput = styled(TextField)({
  display: "block",
  boxSizing: "border-box",
  width: "100%",
  borderRadius: 6,
  margin: "8px 0px",
  padding: "5px 10px",
  fontSize: 12,
  color: grey[100],
  border: 0,
  outline: 0,
  position: "relative",
  fontFamily: "inherit",
});

export const FloatingDivLink = styled("a")({
  display: "block",
  width: "calc(100% - 24px)",
  boxSizing: "border-box",
  margin: "8px 12px",
  padding: "8px 10px",
  borderRadius: 6,
  backgroundColor: "#eee",
  fontSize: 15,
  color: grey[100],
  border: 0,
  outline: 0,
  position: "relative",
  fontFamily: "inherit",
});


export const iconStyle = {
  cursor: 'pointer',
  // padding: '6px',
  borderRadius: '6px',
  transition: 'background-color 0.3s ease',
}