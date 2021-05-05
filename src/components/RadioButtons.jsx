import React, { useState } from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

const RadioButtons = ({ data, setCheckBoxValues, radioFor }) => {
  const [value, setValue] = useState(data[0]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValue(value);
    setCheckBoxValues(prev=>{
      return{
        ...prev,
        [name]:value
      }
    })
  };

  return (
    <FormControl component="fieldset">
      <RadioGroup
        aria-label="sort"
        name="sort1"
        value={value}
        onChange={handleChange}
      >
        {data.map((el) => (
          
          <FormControlLabel
            value={el}
            control={<Radio color="primary" />}
            label={el}
            key={ el}
            name={radioFor}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default RadioButtons;
