import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import styles from "./SelectPais.module.css";

const SelectVariants = ({ icon: Icon, onChange }) => {
  const [selectedCountry, setSelectedCountry] = React.useState("");
  const [countries, setCountries] = React.useState([]);

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
      })
      .catch((error) => console.error("Error fetching countries:", error));
  }, []);

  const handleChange = (event) => {
    setSelectedCountry(event.target.value);
    if (onChange) {
      onChange(event.target.value);  // Se invoca onChange con el país seleccionado
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
        >
          {countries.map((country, index) => (
            <MenuItem key={index} value={country.name}>
              <img
                src={country.flag}
                alt={country.name}
                className={styles.flag}
              />
              {country.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectVariants;
