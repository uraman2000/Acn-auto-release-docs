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
import { getStorage, setStorage } from "../../Constant/Storage";
import DeleteIcon from "@material-ui/icons/Delete";

export default function Story(story: any, setstory: any) {
  const [state, setstate] = useState({
    asBuilt: "",
    summary: "",
    storyResult: [],
  });

  const [show, setshow] = useState(true);

  useEffect(() => {
    if (!show) {
      copyTable();
    }
    setshow(true);
  }, [show]);

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
              const lastIndex =
                prevState.storyResult.length === 0
                  ? 0
                  : prevState.storyResult[prevState.storyResult.length - 1].id + 1;

              const returnData = {
                ...prevState,
                storyResult: [
                  ...prevState.storyResult,
                  {
                    id: lastIndex,
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
      <Grid item xs={12}>
        <Button
          style={{ float: "right" }}
          startIcon={<AssignmentIcon />}
          variant="contained"
          color="primary"
          onClick={() => setshow(false)}
        >
          Copy
        </Button>
      </Grid>

      <TableContainer component={Paper}>
        <Table id="table" size="small" aria-label="a dense table">
          <TableHead style={{ display: show ? "contents" : "none" }}>
            <TableRow>
              <TableCell>Story</TableCell>
              <TableCell>summary</TableCell>
              <TableCell></TableCell>
              <TableCell>As-Built</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state.storyResult.map((row: any) => (
              <TableRow key={row.id}>
                <TableCell style={{ fontSize: "21px", fontFamily: "Calibri" }}>{row.story}</TableCell>
                <TableCell style={{ fontSize: "21px", fontFamily: "Calibri" }}>{row.summary}</TableCell>
                <TableCell></TableCell>
                <TableCell style={{ textTransform: "capitalize", fontSize: "21px", fontFamily: "Calibri" }}>
                  {row.asBuilt ? (
                    <Link href={row.asBuilt} target="_blank">
                      As-Built
                    </Link>
                  ) : (
                    ""
                  )}
                  
                </TableCell>
                <TableCell style={{ display: show ? "block" : "none" }}>
                  <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<DeleteIcon />}
                    onClick={() => {
                      let items = state.storyResult.filter((item: any) => item.id !== row.id);
                      setstate((prevState: any) => {
                        const resval = { ...prevState, storyResult: items };
                        setStorage(resval);

                        return resval;
                      });
                    }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
}
