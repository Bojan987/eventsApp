import React, { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Checkboxes from "./Checkboxes";
import RadioButtons from "./RadioButtons";
import AutocompleteSelection from "./AutocompleteSelection";
import AutoCompleteVenue from "./AutoCompleteVenue";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(16),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const SideBarAccordion = ({ setEvents, setLoading, start, rows }) => {
  const classes = useStyles();

  const [categories, setCategories] = useState([""]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [checkBoxValues, setCheckBoxValues] = useState({
    domain: "germany",
    sortBy: "",
    categoryQueryString: "",
    cityQueryString: "",
    venueSearch: "",
    venueQueryString: "",
  });
  const [cities, setCities] = useState([]);
  const [selectedCities, setSelectedCities] = useState([""]);
  const [venues, setVenues] = useState([""]);
  const checkBoxData = {
    domains: ["germany", "spain", "poland"],
    sortBy: ["eventname", "popularity", "eventdate"],
  };

  const urlHandler = (url) => {
    if (url === "events")
      return "https://app.ticketmaster.eu/amplify/v2/events?apikey=3emDiWvgsjWAX84KicT04Sibk9XAsX88";
    if (url === "domain")
      return "https://app.ticketmaster.eu/amplify/v2/categories?apikey=3emDiWvgsjWAX84KicT04Sibk9XAsX88";
    if (url === "cities")
      return "https://app.ticketmaster.eu/amplify/v2/cities?apikey=3emDiWvgsjWAX84KicT04Sibk9XAsX88";
    if (url === "venues")
      return "https://app.ticketmaster.eu/amplify/v2/venues?apikey=3emDiWvgsjWAX84KicT04Sibk9XAsX88";
  };

  useEffect(() => {
    const fetchData = async (domain) => {
      setLoading(true);
      const { data } = await axios.get(urlHandler("domain"), {
        params: {
          domain: domain,
          lang: "en-us",
        },
      });

      setCategories(data.categories);

      const res = await axios.get(urlHandler("events"), {
        params: {
          domain: domain,
          lang: "en-us",
          category_ids: checkBoxValues.categoryQueryString,
          sort_by: checkBoxValues.sortBy,
          start: start,
          rows: rows,
          city_ids: checkBoxValues.cityQueryString,
          venue_ids: checkBoxValues.venueQueryString,
        },
      });

      setEvents(res.data.events);

      const domainId = { germany: 276, spain: 724, poland: 616 };

      const cityRes = await axios.get(urlHandler("cities"), {
        params: {
          domain: domain,
          lang: "en-us",
          country_id: domainId[domain],
        },
      });

      setCities(cityRes.data.cities);

      const venueRes = await axios.get(urlHandler("venues"), {
        params: {
          domain: domain,
          venue_name: checkBoxValues.venueSearch,
        },
      });
      setVenues(venueRes.data.venues);

      setLoading(false);
    };

    fetchData(checkBoxValues.domain);
  }, [
    checkBoxValues.domain,
    checkBoxValues.sortBy,
    checkBoxValues.categoryQueryString,
    setEvents,
    setLoading,
    start,
    rows,
    checkBoxValues.cityQueryString,
    checkBoxValues.venueSearch,
    checkBoxValues.venueQueryString,
  ]);

  return (
    <div className={classes.root}>
      <AutocompleteSelection
        cities={cities}
        setSelectedCities={setSelectedCities}
        selectedCities={selectedCities}
        setCheckBoxValues={setCheckBoxValues}
      />
      <AutoCompleteVenue
        setCheckBoxValues={setCheckBoxValues}
        venues={venues}
      />
      <Accordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Select Country</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <RadioButtons
            data={checkBoxData.domains}
            setCheckBoxValues={setCheckBoxValues}
            radioFor="domain"
          />
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>Choose a Category</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Checkboxes
            data={categories}
            setCheckBoxValues={setCheckBoxValues}
            setSelectedCategories={setSelectedCategories}
            selectedCategories={selectedCategories}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>Sort by:</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <RadioButtons
            data={checkBoxData.sortBy}
            setCheckBoxValues={setCheckBoxValues}
            radioFor="sortBy"
          />
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default SideBarAccordion;
