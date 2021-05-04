import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import moment from "moment";
import EventIcon from "@material-ui/icons/Event";
import LocationOnIcon from "@material-ui/icons/LocationOn";


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
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)",
  },
  titleBar: {
    background:
      "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
      "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
    height: "55%",
    fontSize: "16px",
    fontWeight: "600",
  },
  icon: {
    color: "white",
  },
  barSubtitle: {
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    marginTop: "5px",
  },
  barSubtitleSpacing: {
    marginRight: "1px",
  },
  barSubtitleStyle: {
    display: "flex",
    alignItems: "center",
    marginTop: "10px",
  },
}));

const Cards = ({ events, isGrid }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <GridList cellHeight={400} spacing={10} className={classes.gridList}>
        {events.map((event) => (
          <GridListTile
            key={event.id}
            cols={isGrid ? 0.5 : 1}
            rows={isGrid ? 0.5 : 0.5}
          >
            <img
              src={event.images ? event.images.large.url : ""}
              alt={event.name}
            />
            <GridListTileBar
              title={event.name}
              titlePosition="bottom"
              subtitle={
                event.event_date ? (
                  <div className={classes.barSubtitle}>
                    <div className={classes.barSubtitleStyle}>
                      <EventIcon className={classes.barSubtitleSpacing} />
                      {moment(event.event_date.value).format("MMMM Do YYYY")}{" "}
                      
                    </div>
                    <div className={classes.barSubtitleStyle}>
                      <LocationOnIcon className={classes.barSubtitleSpacing} />
                      {event.venue.location.address.address}
                    </div>
                  </div>
                ) : (
                  ""
                )
              }
              className={classes.titleBar}
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
};

export default Cards;
