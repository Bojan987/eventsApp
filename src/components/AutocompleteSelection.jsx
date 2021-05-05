import React, { useEffect } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
}));

const AutocompleteSelection = ({ cities,setSelectedCities,selectedCities,setCheckBoxValues}) => {
  const classes = useStyles();

  const handleSelect = (e, v) => {
    
    const countryIds = v && v.map(el=>el.id)
    countryIds && setSelectedCities(countryIds)
  };
  
  useEffect(() => {
    setCheckBoxValues((previous) => {
      return {
        ...previous,
        cityQueryString: selectedCities.join("%2C"),
      };
    });
  }, [selectedCities]);


  return (
    <>
      
      <Autocomplete
        multiple
        autoSelect
        id="tags-standard"
        options={cities}
        style={{ width: 200 }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search City"
            variant="outlined"
            onChange={handleSelect}
          />
        )}
        getOptionLabel={(option) => option.name}
        onChange={handleSelect}
      />
    </>
  );
};

export default AutocompleteSelection;
