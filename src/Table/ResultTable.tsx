import { Table, TableContainer, TableHead, TableRow, TableCell, Paper, TableBody } from "@material-ui/core";

export default function ResultTable(data: any) {
  return (
    <TableContainer component={Paper}>
      <Table size="small"  aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Main Object</TableCell>
            <TableCell>Where Caluse</TableCell>
          </TableRow>
        </TableHead>
        {data.data.map((row: any) => {
          console.log(data);
        })}
        <TableBody>
          {data.data.map((row: any) => (
            <TableRow key={row.mainObject}>
              <TableCell style={{ textTransform: "capitalize" }}>{row.mainObject.toLowerCase()}</TableCell>
              <TableCell>{row.whereClause}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
