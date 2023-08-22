import { Table, TablePaginationConfig, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import useAxios from 'axios-hooks';
import { useEffect, useState } from 'react';
import { ILog, MethodsTags } from '../../types/logs.d';
import './Stats.scss';

type LogsResponse = {
  logs: ILog[],
  totalPages: number,
  page: number
};

export default function Stats() {
  const [page, setPage] = useState<number>(1);

  const [
    {
      data,
      loading: logsLoading,
    },
    loadLogs,
  ] = useAxios<LogsResponse>(
    {
      url: '/logs',
      params: { page },
    },
    { manual: true },
  );

  const tablePagination: TablePaginationConfig = {
    onChange(newPage) { setPage(newPage); },
    position: ['topCenter'],
    current: page,
  };

  useEffect(() => {
    loadLogs();
  }, [page]);

  useEffect(() => {
    tablePagination.total = data?.totalPages;
  }, [data]);

  const columns: ColumnsType<ILog> = [
    {
      title: 'Method',
      key: 'method',
      align: 'center',
      render(row: ILog) {
        const color = MethodsTags[row.method];

        return <Tag color={color}>{ row.method }</Tag>;
      },
    },
    {
      title: 'IP',
      dataIndex: 'ip',
      key: 'ip',
    },
    {
      title: 'Path',
      dataIndex: 'path',
      key: 'path',
      width: 500,
    },
    {
      title: 'Requested at',
      key: 'requestedAt',
      render(row: ILog) {
        return new Date(row.requestedAt).toLocaleString();
      },
    },
  ];

  return (
    <Table
      className="stats__table"
      loading={logsLoading}
      columns={columns}
      dataSource={data?.logs}
      pagination={tablePagination}
    />
  );
}
