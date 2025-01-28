import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
  AppointmentInfoType,
  ColumnInfoType,
  CustomerInfoType,
  SaleInfoType,
} from "../../utils/types/types";
import { CircularProgress, Typography } from "@mui/material";
import { constants } from "../../utils/constants/constants";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: constants.colors.customerBgColor,
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

type PropsType<T> = {
  columns: ColumnInfoType[];
  data: T;
  loading?: boolean;
};

type tableDataType =
  | CustomerInfoType[]
  | SaleInfoType[]
  | AppointmentInfoType[];

const CustomTable = <T extends tableDataType>({
  columns,
  data,
  loading,
}: PropsType<T>) => {
  return (
    <TableContainer component={Paper} sx={{ height: 400 }}>
      <Table
        sx={{ minWidth: "auto", height: 1000 }}
        aria-label="customized table"
      >
        <TableHead>
          <TableRow>
            {columns.map((column, index) => (
              <StyledTableCell key={index} align={column.align}>
                {column.label}
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        {!loading && data?.length > 0 ? (
          <TableBody>
            {data.map((row, index) => (
              <StyledTableRow key={index}>
                {columns.map((column, index) => (
                  <StyledTableCell key={index} align={column.align}>
                    {(row as any)[column.dataIndex]}
                  </StyledTableCell>
                ))}
              </StyledTableRow>
            ))}
          </TableBody>
        ) : !loading && data?.length === 0 ? (
          <Typography variant="h5">No Customers available</Typography>
        ) : loading ? (
          <CircularProgress size={20} />
        ) : null}
      </Table>
    </TableContainer>
  );
};

export default CustomTable;
