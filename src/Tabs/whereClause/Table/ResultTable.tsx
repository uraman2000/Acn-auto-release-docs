import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  TableBody,
  Button,
  Box,
} from "@material-ui/core";
import AssignmentIcon from "@material-ui/icons/Assignment";
import { copyTable } from "../../../Constant/CoppyTable";
import DeleteIcon from "@material-ui/icons/Delete";
import { useEffect, useState } from "react";

export default function ResultTable({ state, setstate }: any) {
  const [show, setshow] = useState(true);

  useEffect(() => {
    if (!show) {
      copyTable();
    }
    setshow(true);
  }, [show]);

  if (state.result === 0) return <div></div>;

  return (
    <div>
      <Button
        style={{ float: "right" }}
        startIcon={<AssignmentIcon />}
        variant="contained"
        color="primary"
        onClick={() => {
          setshow(false);
        }}
      >
        Copy
      </Button>
      <Box pt={6}>
        <TableContainer component={Paper}>
          <Table size="small" aria-label="a dense table" id="table">
            <TableHead style={{ display: show ? "contents" : "none" }}>
              <TableRow>
                <TableCell>Story</TableCell>
                <TableCell>Main Object</TableCell>
                <TableCell>Where Caluse</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {state.result.map((row: any) => (
                <TableRow key={row.id}>
                  <TableCell style={{ fontSize: "21px", fontFamily: "Calibri" }}>{row.story}</TableCell>
                  <TableCell style={{ textTransform: "capitalize", fontSize: "21px", fontFamily: "Calibri" }}>
                    {row.mainObject.toLowerCase()}
                  </TableCell>
                  <TableCell style={{ fontSize: "21px", fontFamily: "Calibri" }}>{row.whereClause}</TableCell>
                  <TableCell style={{ display: show ? "block" : "none" }}>
                    <Button
                      variant="contained"
                      color="secondary"
                      startIcon={<DeleteIcon />}
                      onClick={() => {
                        let items = state.result.filter((item: any) => item.id != row.id);

                        setstate(items);
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
      </Box>
    </div>
  );
}
