import { useEffect, useState } from "react";
import { Box, Container, TextField, Grid, Button } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import AddIcon from "@material-ui/icons/Add";
import ResultTable from "./Table/ResultTable";
import { Data } from "../../Constant/Data";
import { setStorage, getStorage, clearStorage } from "../../Constant/Storage";

const data = Data("dqwdqw");

export default function WhereClaseIndex(story: any, setstory: any) {
  const [state, setstate]: any = useState({
    whereClause: null,
    mainObject: null,
    result: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      const store = getStorage();
      console.log(store);
      if (!!store.result) {
        setstate(store);
      }
    };
    fetchData();
  }, []);

  const options = Object.keys(data).map((item, index) => {
    return item;
  });

  return (
    <Box>
      <Container maxWidth="md">
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Autocomplete
              id="mainObject"
              options={options}
              // getOptionLabel={options}
              onChange={(event: any, newValue: any) => {
                setstate({ ...state, mainObject: newValue });
              }}
              style={{ width: "100%" }}
              renderInput={(params) => <TextField {...params} fullWidth label="Main Object" variant="outlined" />}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="WhereCaluse"
              label="Where Clause"
              variant="outlined"
              onChange={(e: any) => {
                setstate({ ...state, whereClause: e.target.value });
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              style={{ width: "100%" }}
              startIcon={<AddIcon />}
              onClick={() => {
                // console.log(test);
                setstate((prevState: any) => {
                  const dataTemp = Data(state.whereClause);
                  const test = dataTemp[prevState.mainObject];

                  const mstory = story.story.match(/MX-.+/g);
                  const returnData = {
                    ...prevState,
                    result: [
                      ...prevState.result,
                      {
                        story: mstory,
                        whereClause: test,
                        mainObject: prevState.mainObject,
                      },
                    ],
                  };
                  console.log(returnData);
                  setStorage(returnData);
                  return returnData;
                });
              }}
            >
              ADD
            </Button>
          </Grid>
          <Grid item xs={12}>
            <ResultTable data={state.result} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
