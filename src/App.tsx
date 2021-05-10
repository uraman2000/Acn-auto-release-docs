import WhereClaseIndex from "./Tabs/whereClause/WhereClaseIndex";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, Theme, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { useState } from "react";
import { Button, Container, Grid, TextField } from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import Story from "./Tabs/story/Story";

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: "100%",
  },
}));

function App() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = useState(0);

  const [story, setstory] = useState("");

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };
  return (
    <Container maxWidth="md">
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab label="Jira" {...a11yProps(0)} />
            <Tab label="Where Clause" {...a11yProps(1)} />
            {/* <Tab label="Item Three" {...a11yProps(2)} /> */}
          </Tabs>
        </AppBar>
        <Box mt={3}>
          <Grid container spacing={3}>
            <Grid item md={9}>
              <TextField
                fullWidth
                id="story"
                label="Story"
                variant="outlined"
                onChange={(e: any) => {
                  setstory(e.target.value);
                }}
              />
            </Grid>
            <Grid item md={3}>
              <Button
                startIcon={<DeleteForeverIcon />}
                style={{ width: "100%" }}
                size="large"
                variant="contained"
                color="secondary"
              >
                Clear all data
              </Button>
            </Grid>
          </Grid>
        </Box>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <Story story={story} setstory={setstory} />
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <WhereClaseIndex story={story} setstory={setstory} />
          </TabPanel>
          {/* <TabPanel value={value} index={2} dir={theme.direction}>
            Item Three
          </TabPanel> */}
        </SwipeableViews>
      </div>
    </Container>
  );
}

export default App;
