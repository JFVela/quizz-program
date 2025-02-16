// src/components/InputPassword/index.jsx
import { IconButton, InputAdornment } from "@mui/material";
import InputGroup from "../Input";
import { Https, Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";

const PasswordInput = ({ label, onChange, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <InputGroup
      icon={Https}
      label={label}
      type={showPassword ? "text" : "password"}
      onChange={onChange}  // Se agrega el onChange aquí
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handleClickShowPassword} edge="end">
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      {...props}
    />
  );
};

export default PasswordInput;
