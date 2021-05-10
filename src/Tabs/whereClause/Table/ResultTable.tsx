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
export default function ResultTable(data: any) {
  if (data.data.lenght === 0) return <div></div>;

  return (
    <div>
      <Button
        style={{ float: "right" }}
        startIcon={<AssignmentIcon />}
        variant="contained"
        color="primary"
        onClick={() => copyTable()}
      >
        Copy
      </Button>
      <Box pt={6}>
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
              {data.data.map((row: any) => (
                <TableRow key={row.whereClause}>
                  <TableCell style={{ fontSize: "21px", fontFamily: "Calibri" }}>{row.story}</TableCell>
                  <TableCell style={{ textTransform: "capitalize", fontSize: "21px", fontFamily: "Calibri" }}>
                    {row.mainObject.toLowerCase()}
                  </TableCell>
                  <TableCell style={{ fontSize: "21px", fontFamily: "Calibri" }}>{row.whereClause}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
}
