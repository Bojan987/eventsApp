import React, { useEffect, useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const Checkboxes = ({ data, setCheckBoxValues,setSelectedCategories ,selectedCategories}) => {
  const [check, setCheck] = useState(data.length>0 && data.slice().fill(false));

  // console.log(data.length)

  const handleClick = (index) =>(e)=> {
    const {name,value,checked} = e.target
    console.log(name,value,checked)

    setCheck(check.map((v, i) => (i === index ? !v :v)));

    checked && setSelectedCategories(previous=>[...previous,value])
    !checked && setSelectedCategories(previous=>previous.filter(el=>value!==el))
    
  
  };

  useEffect(()=>{
    setCheckBoxValues(previous=>{
      return {...previous,categoryQueryString:selectedCategories.join('%2C')}
    })
  },[selectedCategories])

  return (
    <FormGroup>
      { data.length>0 && data.map((el,index)=>(

        <FormControlLabel
          key={el?.id ? el.id : el }
          control={
            <Checkbox
              checked={check[index]}
              onClick={handleClick(index)}
              value={el?.id ? el.id : el }
              name={el?.name ? el.name : el}
              color="primary"
              size="small"
            />
          }
          label={el?.name ? el.name : el}
        />
      ))
      }
    </FormGroup>
  );
};

export default Checkboxes;
