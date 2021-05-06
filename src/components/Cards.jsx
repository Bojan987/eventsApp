import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import GridCard from "./GridCard";
import BlockCard from "./BlockCard";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: "100%",
    height: "100%",
    transform: "translateZ(0)",
  },
  gridBlock:{
    margin: '0 auto'
  }
}));

const Cards = ({ events, isGrid }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid className={  classes.gridList} container spacing={5}>
        {events.length > 0 ? events.map((event) => 
          isGrid ?
            <GridCard event={event} key={event.id}/>
            :
            <BlockCard event={event} key={event.id}/>
          
      ):<h1>Nothing Found</h1>}
      </Grid>
    </div>
  );
};

export default Cards;
