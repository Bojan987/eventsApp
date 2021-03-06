import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import EventIcon from "@material-ui/icons/Event";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Hidden from "@material-ui/core/Hidden";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridBlock: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "start",
  },

  cardImg: {
    width: "100px",
    height: "100px",
    marginLeft: 10,
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
  gridItem: {
    margin: "15px",
    
  },
}));

const BlockCard = ({ event }) => {
  const classes = useStyles();

  return (
    <Grid container  key={event.id} className={classes.gridItem}>
      <Hidden smDown>
        <Grid item sm={3}></Grid>
      </Hidden>
      <Grid xs={12} md={6} item >
        <Card>
          <CardActionArea className={classes.gridBlock}>
            <CardMedia
              className={classes.cardImg}
              component="img"
              alt={event.name}
              image={event.images ? event.images.large.url : ""}
              title={event.name}
            />
            <CardContent>
              <Typography gutterBottom  component="h6">
                {event.name}
              </Typography>

              {
                <div className={classes.barSubtitle}>
                  <div className={classes.barSubtitleStyle}>
                    <EventIcon className={classes.barSubtitleSpacing} />

                    <Typography variant="body2" component="p">
                      {event.event_date
                        ? moment(event.event_date.value).format("MMMM Do YYYY")
                        : "TBD"}{" "}
                    </Typography>
                  </div>
                  <div className={classes.barSubtitleStyle}>
                    <LocationOnIcon className={classes.barSubtitleSpacing} />
                    <Typography variant="body2" component="p">
                      {event.venue.location.address.address
                        ? event.venue.location.address.address
                        : "In the Woods"}
                    </Typography>
                  </div>
                </div>
              }
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    </Grid>
  );
};

export default BlockCard;
