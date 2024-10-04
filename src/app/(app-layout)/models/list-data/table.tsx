'use client';

import { useContext, useMemo, useState } from 'react';
import { useColumn } from '@/hooks/use-column';
import { getColumns } from './columns';
import { useTable } from '@/hooks/use-table';
import { Button } from 'rizzui';
import TableFooter from '@/app/shared/table-footer';
import ControlledTable from '@/components/controlled-table';
import { exportToCSV } from '@/utils/export-to-csv';
import { AppContext } from '@/app/root-lib';
import WidgetCard from '@/components/cards/widget-card';
import FilterElement from './filters';
import { clientHandleApiResponse, getOptions } from '@/services';
import { unstable_noStore as noStore } from 'next/cache';
import { setContextApiData } from '@/utils/form-utils';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import cn from '@/utils/class-names';

const AddNewModelElement = dynamic(
  () => import('./add-model'),
  { ssr: false }
);


const filterState = {
  date: [null, null],
  status: '',
};



export default function TableList({
  className,
  listData,
  useTableParams,
  handleFilters,
  setTableParams,
  paginationInfo,
  refetchListData,
  updateDataList,
  handleModelList
}: {
  className?: string;
  listData: any[];
  useTableParams?: any;
  handleFilters?: any;
  setTableParams?: any
  paginationInfo?: any
  refetchListData?: any
  updateDataList?: any
  handleModelList?: any
}) {

  const pageSize = Math.ceil(useTableParams?.limit || 8)
  const { appContextData, setAppContextData } = useContext<any>(AppContext);
  const { currentUserInfo } = appContextData;
  const idToken = currentUserInfo?.idToken || '';
  const accessToken = currentUserInfo?.accessToken || '';
  const router = useRouter()

  const onHeaderCellClick = (info: any) => ({
    onClick: () => {
      handleFilters({ key: 'currentPage', value: 1, isNotAPICall: true })
      handleFilters({ key: 'skip', value: info.skip, isNotAPICall: true })
      handleFilters({ key: 'sortBy', value: info.key, isNotAPICall: true })
      handleFilters({ key: 'sortOrder', value: info.value })
    },
  });

  const handleRowClick = async (record: any, index: any) => {
    console.log('Clicked row:', record, 'at index:', index);
    const idToken = currentUserInfo?.idToken || '';
    router.push(`/finance?modelId=${record.id}`)
    // Add your logic here
  };

  const {
    isLoading,
    isFiltered,
    tableData,
    filters,
    updateFilter,
    handleReset,
    sortConfig,
    selectedRowKeys,
    setSelectedRowKeys,
    handleRowSelect,
    handleSelectAll,
    handleDelete,
  } = useTable(listData, pageSize, filterState);

  const columns = useMemo(
    () =>
      getColumns({
        onHeaderCellClick,
        useTableParams,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      selectedRowKeys,
      onHeaderCellClick,
      sortConfig.key,
      sortConfig.direction,
      handleRowSelect,
      handleSelectAll,
    ]
  );
  const { visibleColumns } = useColumn(columns);
  const [modelsInfoList, setModelsListInfo] = useState<any>([])

  const selectedData = listData.filter((item: any) => selectedRowKeys.includes(item.id));
  function handleExportData() {
    exportToCSV(
      selectedData,
      'Title,Amount,Date,Status,Shared',
      `billing_history_${selectedData.length}`
    );
  }

  const handleOnBlur = () => {
    setModelsListInfo(undefined)
  }

  const handleSearchData = async (value: any) => {
    noStore();
    //  const findingsInfo= await updateDataList(useTableParams);
    const url = process.env.RS_API_URL;
    const fullURL = `${url}/models/search?searchText=${value}&limit=5`;
    const response = await fetch(fullURL, getOptions({
      token: idToken,
      accessToken: accessToken
    }));
    const rJson = await clientHandleApiResponse({
      apiResponse: response,
      setContextApiData,
      setAppContextData
    });
    setModelsListInfo(rJson || []);
  }


  return (
    <>
      <div className={className}>
        <WidgetCard
          className='p-0 lg:p-0'
          headerClassName="items-start flex-col @[57rem]:flex-row @[57rem]:items-center"
          actionClassName="w-full"
          title=""
          titleClassName="!mb-0"
        // action={
        //   <div className="flex w-full flex-col-reverse items-start justify-between">
        //     <FilterElement
        //       isFiltered={isFiltered}
        //       filters={filters}
        //       updateFilter={updateFilter}
        //       handleReset={handleReset}
        //       handleSearch={handleSearchData}
        //       onFocusInput={handleSearchData}
        //       modelsInfoList={modelsInfoList}
        //       updateDataList={updateDataList}
        //       onBlur={handleOnBlur}
        //       handleFilters={handleFilters}
        //       setTableParams={setTableParams}
        //       useTableParams={useTableParams}
        //     >
        //       <div>
        //         <AddNewModelElement
        //           onAddKeySubmit={(form: any) => {
        //             handleModelList(form)
        //             console.log(">>>>>>>>>>form", form)
        //           }}
        //         />
        //       </div>
        //     </FilterElement>
        //   </div>
        // }
        >
          <div
            className={cn('table-wrapper flex-grow border border-muted rounded-md border-t-0')}
          >
            <ControlledTable
              isLoading={isLoading}
              data={tableData}
              // @ts-ignore
              columns={visibleColumns}
              scroll={{ x: 1300 }}
              variant="elegant"
              rowKey={(record) => record.id}
              className="text-sm"
              paginatorOptions={{
                pageSize: Math.ceil(useTableParams?.limit),
                setPageSize: (value) => {
                  handleFilters({ key: 'currentPage', value: 1, isNotAPICall: true })
                  handleFilters({ key: "skip", value: 0, isNotAPICall: true })
                  handleFilters({ key: "limit", value: value })
                },
                total: paginationInfo?.totalCount,
                current: Math.ceil(useTableParams?.currentPage),
                onChange: (page: number) => {
                  handleFilters({ key: 'currentPage', value: page, isNotAPICall: true })
                  handleFilters({ key: "skip", value: (page - 1) * useTableParams?.limit })
                },
              }}
              onRow={(record, index) => ({
                onClick: () => handleRowClick(record, index),
              })}
              tableFooter={
                <TableFooter
                  checkedItems={selectedRowKeys}
                  handleDelete={(ids: string[]) => {
                    setSelectedRowKeys([]);
                    handleDelete(ids);
                  }}
                >
                  <Button
                    size="sm"
                    onClick={() => handleExportData()}
                    className="dark:bg-gray-300 dark:text-gray-800"
                  >
                    Download {selectedRowKeys.length}{' '}
                    {selectedRowKeys.length > 1 ? 'Files' : 'File'}
                  </Button>
                </TableFooter>
              }
            />
          </div>
        </WidgetCard>
      </div>
    </>
  );
}
