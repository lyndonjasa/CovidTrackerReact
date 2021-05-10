import { makeStyles, Table, TableBody, TableFooter, TablePagination, TableRow } from '@material-ui/core';
import React from 'react';
import Scrollbars from 'react-custom-scrollbars';
import { GroupedCovidDataModel } from '../../models/GroupedCovidDataModel';
import CovidDataRowGroup from './CovidDataRowGroup';

const useFooterRowStyles = makeStyles({
  root: {
    boxShadow: '0px -1px 5px 0px rgba(0,0,0,0.75)',
    marginTop: '5px'
  }
})

type Pagination = {
  length: number,
  rowsPerPage: number,
  page: number
}

type Props = {
  data: GroupedCovidDataModel[],
  pagination: Pagination,
  rowsPerPageCallback: (value: number) => void,
  pageCallback: (value: number) => void
}

const CovidDataTable: React.FC<Props> = (props: Props) => {
  const { data, pagination, rowsPerPageCallback, pageCallback } = props;
  const { length, rowsPerPage, page } = pagination;
  const footerClasses = useFooterRowStyles();

  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    rowsPerPageCallback(+event.target.value);
  }

  const handlePageChange = (newPage: number) => {
    pageCallback(newPage);
  }

  return (
    <>
      <Scrollbars
          style={{ height: '370px' }}
          autoHide>
        <Table>
          <TableBody>
            {
              data.map((d, index) => <CovidDataRowGroup key={index} groupedData={d} />)
            }
          </TableBody>
        </Table>
      </Scrollbars>
      <Table>
        <TableFooter className={footerClasses.root}>
          <TableRow>
            <TablePagination
              rowsPerPage={rowsPerPage}
              rowsPerPageOptions={[5, 10, 25]}
              colSpan={4}
              count={length}
              page={page}
              onChangePage={(event, newPage) => handlePageChange(newPage)}
              onChangeRowsPerPage={handleRowsPerPageChange}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </>
  )
}

export default CovidDataTable;