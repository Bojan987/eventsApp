import React from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";





const AutoCompleteVenue = ({ setCheckBoxValues,venues}) => {
  

  const handleSelect = (e, v) => {
    
    const venueIds = v && v.map(el=>el.id)
    venueIds &&  setCheckBoxValues((previous) => {
      return {
        ...previous,
        venueQueryString: venueIds.join(","),
      };
    });
  };

  const handleInput = (e)=>{
    const {value,name} = e.target 
    setCheckBoxValues(previous=>{ return {...previous,[name]:value}})
  }
  



  return (
    <>
      
      <Autocomplete
        multiple
        autoSelect
        id="tags-standard"
        options={venues}
        style={{ width: 200 }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search Venue"
            variant="outlined"
            onChange={handleInput}
            value={setCheckBoxValues.venueSearch}
            name='venueSearch'

          />
        )}
        getOptionLabel={(option) => `${option.name} ${option.id} `}
        onChange={handleSelect}
        getOptionSelected={(option,value)=>(option.id===value.id)}
      />
    </>
  );
};

export default AutoCompleteVenue;