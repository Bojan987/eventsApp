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

const AutoCompleteVenue = ({ setCheckBoxValues,venues}) => {
  const classes = useStyles();

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
      />
    </>
  );
};

export default AutoCompleteVenue;