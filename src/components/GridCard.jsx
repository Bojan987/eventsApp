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
  title:{
    fontSize:15,
    fontWeight:600
  },
  cardItem: {
    height: "320px",
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

const GridCard = ({ event }) => {
  const classes = useStyles();

  return (
    <Grid key={event.id} md={3} xs={12} item={true}>
      <Card className={classes.cardItem}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt={event.name}
            height="140"
            image={event.images ? event.images.large.url : ""}
            title={event.name}
          />
          <CardContent>
            <Typography gutterBottom variant="h6" component="h6" className={classes.title}>
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
  );
};

export default GridCard;
