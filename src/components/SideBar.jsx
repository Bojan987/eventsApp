import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

import GridOnIcon from "@material-ui/icons/GridOn";
import GridOffIcon from "@material-ui/icons/GridOff";
import SideBarAccordion from "./SideBarAccordion";
import Cards from "./Cards";
import Loader from "./Loader";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: "black",
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },

  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  toolbarBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },
  gridItems: {
    margin: "0 auto",
  },
  gridItem: {
    margin: "0 10px",
    cursor: "pointer",
  },
}));

const SideBar = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isGrid, setIsGrid] = useState(false);
  const [start, setStart] = useState(0);
  const [rows, setRows] = useState(20);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon fontSize="large" />
          </IconButton>
          <div className={classes.gridItems}>
          {start>0&&<NavigateBeforeIcon
              fontSize="large"
              className={classes.gridItem}
              onClick={() => {
                setStart(start-20)
                setRows(rows-20)
              }}
            />}
            <GridOnIcon
              fontSize="large"
              className={classes.gridItem}
              onClick={() => {
                setIsGrid(true);
              }}
            />
            <GridOffIcon
              fontSize="large"
              className={classes.gridItem}
              onClick={() => {
                setIsGrid(false);
              }}
            />
            <NavigateNextIcon
              fontSize="large"
              className={classes.gridItem}
              onClick={() => {
                setStart(start+20)
                setRows(rows+20)
              }}
            />
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <SideBarAccordion
            setEvents={setEvents}
            setLoading={setLoading}
            start={start}
            rows={rows}
          />
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        {loading ? <Loader /> : <Cards events={events} isGrid={isGrid} />}
      </main>
    </div>
  );
};

export default SideBar;
