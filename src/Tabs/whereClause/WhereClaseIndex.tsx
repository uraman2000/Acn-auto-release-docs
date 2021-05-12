import { useEffect, useState } from "react";
import { Box, Container, TextField, Grid, Button } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import AddIcon from "@material-ui/icons/Add";
import ResultTable from "./Table/ResultTable";
import { Data } from "../../Constant/Data";
import { setStorage, getStorage } from "../../Constant/Storage";

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
                setstate((prevState: any) => {
                  const dataTemp = Data(state.whereClause);
                  const test = dataTemp[prevState.mainObject];

                  const mstory = story.story.match(/MX-.+/g);
                  const lastIndex =
                    prevState.result.length === 0 ? 0 : prevState.result[prevState.result.length - 1].id + 1;

                  const returnData = {
                    ...prevState,
                    result: [
                      ...prevState.result,
                      {
                        id: lastIndex,
                        story: mstory,
                        whereClause: test,
                        mainObject: prevState.mainObject,
                      },
                    ],
                  };

                  setStorage(returnData);
                  return returnData;
                });
              }}
            >
              ADD
            </Button>
          </Grid>
          <Grid item xs={12}>
            <ResultTable
              state={state}
              setstate={(data: any) => {
                setstate((prevState: any) => {
                  const resultValue = { ...prevState, result: data };

                  setStorage(resultValue);
                  return resultValue;
                });
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
