import { IconButton, InputAdornment } from "@mui/material";
import InputGroup from "../Input";
import { Https, Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";

// Componente para el campo de contraseña con funcionalidad de mostrar/ocultar
const PasswordInput = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <InputGroup
      icon={Https}
      label="Contraseña"
      type={showPassword ? "text" : "password"}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handleClickShowPassword} edge="end">
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default PasswordInput;