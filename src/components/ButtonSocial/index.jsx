import { Button } from "@mui/material";

// Componente para botones de redes sociales
const SocialLoginButton = ({ imgSrc, text, alt }) => (
  <Button
    sx={{ padding: "10px", gap: "10px", borderRadius: "20px" }}
    variant="outlined"
    color="info"
  >
    <img src={imgSrc} alt={alt} /> {text}
  </Button>
);

export default SocialLoginButton;
