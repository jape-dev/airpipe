import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

import {
  FieldOption,
  DefaultService,
  Body_field_options_query_field_options_post,
} from "../vizoApi";

import { useEffect } from "react";

interface StickyHeadTableProps {
  columns: string[];
  results: Object[];
  rows?: number;
}

export const StickyHeadTable: React.FC<StickyHeadTableProps> = ({
  columns,
  results,
  rows = 10,
}) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(rows);
  const [fields, setFields] = React.useState<FieldOption[]>([]);

  interface RowType {
    [key: string]: any;
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getIconUrl = (field: FieldOption) => {
    return require(`../Static/images/${field.img}.png`);
  };

  useEffect(() => {
    let requestBody: Body_field_options_query_field_options_post = {
      fields: columns,
      data: results,
    };
    DefaultService.fieldOptionsQueryFieldOptionsPost(requestBody)
      .then((response) => {
        setFields(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [columns]);

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {fields.map((field) => (
                <TableCell style={{ minWidth: 200, fontWeight: "bold" }}>
                  <div className="flex items-center">
                    <img
                      className="h-5 w-5 mr-2"
                      src={getIconUrl(field)}
                      alt="icon"
                    />
                    <span className="mr-4">{field.label}</span>
                  </div>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {results
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row: RowType) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1}>
                    {columns.map((column) => {
                      const value = row[column];
                      return (
                        <TableCell style={{ minWidth: 170 }}>{value}</TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={results.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};
