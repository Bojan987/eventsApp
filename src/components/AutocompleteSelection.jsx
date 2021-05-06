import React, { useEffect } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";





const AutocompleteSelection = ({ cities,setSelectedCities,selectedCities,setCheckBoxValues}) => {
  

  const handleSelect = (e, v) => {
    
    const countryIds = v && v.map(el=>el.id)
    countryIds && setSelectedCities(countryIds)
  };
  
  useEffect(() => {
    setCheckBoxValues((previous) => {
      return {
        ...previous,
        cityQueryString: selectedCities.join(","),
      };
    });
  }, [selectedCities,setCheckBoxValues]);


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
            
          />
        )}
        getOptionLabel={(option) => option.name}
        onChange={handleSelect}
        getOptionSelected={(option,value)=>(option.id===value.id)}
      />
    </>
  );
};

export default AutocompleteSelection;
