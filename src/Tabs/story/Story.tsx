import {
  TextField,
  Grid,
  Button,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  TableBody,
  Link,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import AssignmentIcon from "@material-ui/icons/Assignment";
import { copyTable } from "../../Constant/CoppyTable";
import { getStorage, setStorage, clearStorage } from "../../Constant/Storage";

export default function Story(story: any, setstory: any) {
  const [state, setstate] = useState({
    asBuilt: "",
    summary: "",
    storyResult: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      const store = getStorage();
      if (!!store.storyResult) {
        setstate(store);
      }
    };
    fetchData();
  }, []);
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          id="summary"
          label="summary"
          variant="outlined"
          onChange={(e: any) => {
            setstate({ ...state, summary: e.target.value });
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          id="as-buit"
          label="As-Built"
          variant="outlined"
          onChange={(e: any) => {
            setstate({ ...state, asBuilt: e.target.value });
          }}
        />
      </Grid>
      <Grid item xs={12} sm={12}>
        <Button
          variant="contained"
          color="primary"
          style={{ width: "100%" }}
          startIcon={<AddIcon />}
          size="large"
          onClick={() => {
            setstate((prevState: any) => {
              const mstory = story.story.match(/MX-.+/g);
              const returnData = {
                ...prevState,
                storyResult: [
                  ...prevState.storyResult,
                  {
                    story: mstory,
                    asBuilt: prevState.asBuilt,
                    summary: prevState.summary,
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
      <Button
        style={{ float: "right" }}
        startIcon={<AssignmentIcon />}
        variant="contained"
        color="primary"
        onClick={() => copyTable()}
      >
        Copy
      </Button>
      <TableContainer component={Paper}>
        <Table size="small" aria-label="a dense table">
          {/* <TableHead>
              <TableRow>
                <TableCell>Story</TableCell>
                <TableCell>Main Object</TableCell>
                <TableCell>Where Caluse</TableCell>
              </TableRow>
            </TableHead> */}
          <TableBody>
            {state.storyResult.map((row: any) => (
              <TableRow key={row.mainObject}>
                <TableCell style={{ fontSize: "21px", fontFamily: "Calibri" }}>{row.story}</TableCell>
                <TableCell style={{ fontSize: "21px", fontFamily: "Calibri" }}>{row.summary}</TableCell>
                <TableCell></TableCell>
                <TableCell style={{ textTransform: "capitalize", fontSize: "21px", fontFamily: "Calibri" }}>
                  <Link href={row.asBuilt} target="_blank">
                    As-Built
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
}
