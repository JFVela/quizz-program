import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Skeleton from "@mui/material/Skeleton"; // Importamos Skeleton
import styles from "./SelectPais.module.css";

const SelectVariants = ({ icon: Icon, onChange }) => {
  const [selectedCountry, setSelectedCountry] = React.useState("");
  const [countries, setCountries] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true); // Estado de carga

  React.useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        const countryData = data
          .map((country) => ({
            name: country.name.common,
            flag: country.flags.png,
          }))
          .sort((a, b) => a.name.localeCompare(b.name));
        setCountries(countryData);
        setIsLoading(false); // Desactivamos el estado de carga
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
        setIsLoading(false);
      });
  }, []);

  const handleChange = (event) => {
    setSelectedCountry(event.target.value);
    if (onChange) {
      onChange(event.target.value);
    }
  };

  return (
    <div className={styles.container}>
      {Icon && <Icon sx={{ color: "black", mr: 1, my: 0.5 }} />}
      <FormControl sx={{ width: "100%" }} variant="standard">
        <InputLabel id="select-pais-label">Seleccione su país:</InputLabel>
        <Select
          sx={{ margin: "0px" }}
          labelId="select-pais-label"
          id="select-pais"
          value={selectedCountry}
          onChange={handleChange}
          disabled={isLoading} // Desactiva el select mientras carga
        >
          {isLoading ? (
            // Mostrar Skeleton mientras se carga
            [...Array(5)].map((_, index) => (
              <MenuItem key={index} disabled>
                <Skeleton variant="rectangular" width={20} height={15} style={{ marginRight: 8 }} />
                <Skeleton variant="text" width={100} />
              </MenuItem>
            ))
          ) : (
            // Mostrar los países cuando se carguen los datos
            countries.map((country, index) => (
              <MenuItem key={index} value={country.name}>
                <img
                  src={country.flag}
                  alt={country.name}
                  className={styles.flag}
                />
                {country.name}
              </MenuItem>
            ))
          )}
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectVariants;
