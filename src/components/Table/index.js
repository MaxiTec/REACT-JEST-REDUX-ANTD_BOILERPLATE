import React from 'react';
import ReactTable from 'react-table';
import { Empty, Skeleton } from 'antd';
import 'react-table/react-table.css';
import Paginator from './Paginator';
import css from './table.styl';

const Table = props => (
  <Skeleton loading={props.loading} paragraph={{ rows: 20 }}>
    <div className="table__wrapper">
      <div className="table__header">{props.children}</div>
      <ReactTable
        // {...props}
        className={css.custom_table}
        data={props.data}
        filtered={props.filtered ? props.filtered : []}
        PaginationComponent={Paginator}
        resizable={false}
        minRows={0}
        pageSize={10}
        columns={props.columns}
        defaultPageSize={10}
        noDataText="No se encontró ningún resultado"
      />
    </div>
  </Skeleton>
);

export default Table;
