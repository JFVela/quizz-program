import { Box, TextField } from "@mui/material";

// Componente reutilizable para campos de entrada
const InputGroup = ({ icon: Icon, label, placeholder, type = "text", ...props }) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "flex-end",
      width: "90%",
      backgroundColor: "#F0EDFF",
      borderRadius: "15px",
      padding: "14px 18px",
    }}
  >
    <Icon sx={{ color: "black", mr: 1, my: 0.5 }} />
    <TextField
      id={label.toLowerCase()}
      label={label}
      variant="standard"
      placeholder={placeholder}
      type={type}
      fullWidth
      {...props}
    />
  </Box>
);

export default InputGroup;