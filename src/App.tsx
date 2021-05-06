import { useState } from "react";
import "./App.css";
import { Box, Container, TextField, Grid, Button } from "@material-ui/core";
import { Data } from "./Constant/Data";
import { Autocomplete } from "@material-ui/lab";
import ResultTable from "./Table/ResultTable";

const data = Data("dqwdqw");

interface Idata {
  whereClause: any;
  mainObject: any;
  result: Array<Iresult> | null;
}

interface Iresult {
  whereClause: any;
  mainObject: any;
}
function App() {
  const [state, setstate] = useState<Idata>({
    whereClause: null,
    mainObject: null,
    result: [],
  });

  const options = Object.keys(data).map((item, index) => {
    return item;
  });
  return (
    <Box mt={3}>
      {console.log(state)}
      <Container maxWidth="sm">
        <Grid container spacing={10}>
          <Grid item xs={6}>
            <Autocomplete
              id="combo-box-demo"
              options={options}
              // getOptionLabel={options}
              onChange={(event: any, newValue: string | null) => {
                setstate({ ...state, mainObject: newValue });
              }}
              style={{ width: 300 }}
              renderInput={(params) => <TextField {...params} fullWidth label="Main Object" variant="outlined" />}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="outlined-basic"
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
              onClick={() => {
                // console.log(test);
                setstate((prevState: any) => {
                  const dataTemp = Data(state.whereClause);
                  const tmp = prevState.mainObject;
                  const test = dataTemp[prevState.mainObject];
                  return {
                    ...prevState,
                    result: [
                      ...prevState.result,
                      {
                        whereClause: test,
                        mainObject: prevState.mainObject,
                      },
                    ],
                  };
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

export default App;
