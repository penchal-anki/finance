'use client';

import { Badge } from '@/components/ui/badge';
import DateCell from '@/components/ui/date-cell';
import { HeaderCell } from '@/components/ui/table';
import StatusBadge from '@/components/ui/status-badge';

type Columns = {
  onHeaderCellClick: any;
  useTableParams?: any;
};


export const getModelColumns = ({
  onHeaderCellClick,
  useTableParams,
}: Columns) => [
    {
      title: (
        <HeaderCell
          title="Vulnerability"
          sortable
          className='ml-3'
          isShowIcon={useTableParams.sortBy === 'attack'}
          ascending={
            useTableParams?.sortOrder === 'asc' && useTableParams.sortBy === 'attack'
          }
        />
      ),
      onHeaderCell: () => {
        const sortInfo = (useTableParams.sortOrder === 'desc' && useTableParams?.sortBy === 'attack') ? 'asc' : 'desc'
        return onHeaderCellClick({ key: 'attack', value: sortInfo, skip: 0 })
      },
      dataIndex: 'attack',
      key: 'attack',
      width: 140,
      render: (attack: any) => {
        return (
          <div className='flex items-center ml-3'>
            {attack.map((attack: any) => {
              return (
                <Badge
                  className='capitalize h-6 mr-2'
                  variant="flat"
                  color='primary'
                >
                  {attack}
                </Badge>
              );
            })}
          </div>
        )
      },
    },
    {
      title: (
        <HeaderCell
          title="Date Opened"
          sortable
          isShowIcon={useTableParams.sortBy === 'createdAt'}
          ascending={
            useTableParams?.sortOrder === 'asc' && useTableParams.sortBy === 'createdAt'
          }
        />
      ),
      onHeaderCell: () => {
        const sortInfo = (useTableParams.sortOrder === 'desc' && useTableParams?.sortBy === 'createdAt') ? 'asc' : 'desc'
        return onHeaderCellClick({ key: 'createdAt', value: sortInfo, skip: 0 })
      },
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 140,
      render: (value: Date) => <DateCell date={value} className='text-md !flex text-gray-600' />,
    },
    {
      title: (
        <HeaderCell
          title="Version"
          sortable
          isShowIcon={useTableParams.sortBy === 'version'}
          ascending={
            useTableParams?.sortOrder === 'asc' && useTableParams.sortBy === 'version'
          }
        />
      ),
      onHeaderCell: () => {
        const sortInfo = (useTableParams.sortOrder === 'desc' && useTableParams?.sortBy === 'version') ? 'asc' : 'desc'
        return onHeaderCellClick({ key: 'version', value: sortInfo, skip: 0 })
      },
      dataIndex: 'version',
      key: 'version',
      width: 100,
      render: (value: any) => {
        return (
          <div className="flex items-center justify-start ">
            <Badge
              className={`capitalize h-6 mr-2 bg-gray-200 text-gray-700`}
              variant="flat"
              color='info'
            >
              {value}
            </Badge>
          </div>
        );
      },
    },
    {
      title: (
        <HeaderCell
          title="Severity"
          sortable={true}
          isShowIcon={useTableParams.sortBy === 'severity'}
          ascending={
            useTableParams?.sortOrder === 'asc' && useTableParams.sortBy === 'severity'
          }
        />
      ),
      dataIndex: 'severity',
      key: 'severity',
      width: 100,
      onHeaderCell: () => {
        const sortInfo = (useTableParams.sortOrder === 'desc' && useTableParams?.sortBy === 'severity') ? 'asc' : 'desc'
        return onHeaderCellClick({ key: 'severity', value: sortInfo, skip: 0 })
      },
      render: (value: string) => <StatusBadge status={value} />,
    },
    {
      title: (
        <HeaderCell
          title="Status"
          sortable
          isShowIcon={useTableParams.sortBy === 'status'}
          ascending={
            useTableParams?.sortOrder === 'asc' && useTableParams.sortBy === 'status'
          }
        />
      ),
      onHeaderCell: () => {
        const sortInfo = (useTableParams.sortOrder === 'desc' && useTableParams?.sortBy === 'status') ? 'asc' : 'desc'
        return onHeaderCellClick({ key: 'status', value: sortInfo, skip: 0 })
      },
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (value: any) => {
        const status = value?.toLowerCase() || '';
        let colorCode = status === 'open' ? 'primary' : status === 'running' ? 'info' : 'success';
        return (
          <div>
            <Badge
              className='capitalize  h-6'
              variant="flat"
              // @ts-ignore
              color={colorCode}
            >
              {value}
            </Badge>
          </div>
        )
      },
    }
  ];