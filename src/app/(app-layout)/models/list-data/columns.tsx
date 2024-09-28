'use client';

import { Badge } from '@/components/ui/badge';
import DateCell, { DateFormat } from '@/components/ui/date-cell';
import { HeaderCell } from '@/components/ui/table';
import cn from '@/utils/class-names';
import { useState } from 'react';
import { PiPlusBold } from 'react-icons/pi';

const violationCodes = {
  critical: {
    bg: 'bg-red-50',
    textColor: 'text-red-700'
  },
  high: {
    bg: 'bg-orange-50',
    textColor: 'text-orange-400'
  },
  medium: {
    bg: 'bg-yellow-50',
    textColor: 'text-yellow-600'
  },
  low: {
    bg: 'bg-blue-50',
    textColor: 'text-blue-700'
  }
}

type Columns = {
  onHeaderCellClick: any;
  useTableParams?: any;
};


const TagsInfo = ({ row }: any) => {
  const tagsCount = row?.tags?.length;
  const [isAllTagsVisible, setIsAllTagsVisible] = useState(false)

  return (
    <div className="flex items-center justify-start cursor-pointer">
      {
        Array.from(
          new Set(row?.tags?.map((tag: any) => tag))
        )
          .slice(0, isAllTagsVisible ? tagsCount : 2)
          .map((tag: any, index: number) => {
            return (
              <div className='flex justify-start items-center'>
                <Badge
                  key={index}
                  className={`capitalize h-6 mr-2`}
                  variant="flat"
                  color='primary'
                >
                  {tag}
                </Badge>
              </div>
            );
          })
      }
      {tagsCount > 2 && !isAllTagsVisible && (
        <div
          onClick={(e) => {
            e.stopPropagation();
            setIsAllTagsVisible(true);
          }}
        >
          <Badge
            variant="flat"
            color='primary'
            className={cn(
              'hidden py-1 sm:block mr-2',
              'bg-gray-200 text-gray-700 !flex'
            )}
          >
            <PiPlusBold className="h-3 w-3 mr-[2px] text-gray-700" />
            {tagsCount - 2}
          </Badge>
        </div>
      )}
    </div>
  );

}




const SeverityInfo = ({ row }: any) => {
  const [isAllSeverityVisible, setIsAllSeverityVisible] = useState(false)
  const violations = [
    {
      title: 'Critical',
      value: row.critical,
    },
    {
      title: 'High',
      value: row.high,
    },

    {
      title: 'Medium',
      value: row.medium,
    },
    {
      title: 'Low',
      value: row.low,
    }
  ].filter((item) => item?.value);

  const violationCount = violations?.length;
  return (
    <div className='flex flex-col'>
      <div className='flex'>
        <div className="flex items-center justify-start cursor-pointer flex-wrap">
          {
            Array.from(
              new Set(violations?.map((violation: any) => violation))
            )
              .slice(0, isAllSeverityVisible ? violations.length : 2)
              .map((violation: any, index: number) => {
                return (
                  <div className='flex justify-start items-center'>
                    <Badge
                      key={index}
                      className={`
              capitalize h-6 ${violationCodes[violation.title.toLowerCase() as keyof typeof violationCodes].bg}
               ${violationCodes[violation.title.toLowerCase() as keyof typeof violationCodes].textColor}
                mr-2 ${index > 1 && 'mt-2'}`}
                      variant="flat"
                      color='primary'
                    >
                      {violation.title} - {violation.value}
                    </Badge>
                  </div>
                );
              })
          }
          {violationCount > 2 && !isAllSeverityVisible && (
            <div
              onClick={(e) => {
                e.stopPropagation();
                setIsAllSeverityVisible(true);
              }}
            >
              <Badge
                variant="flat"
                color='primary'
                className={cn(
                  'hidden py-1 sm:block mr-2',
                  'bg-gray-200 text-gray-700 !flex'
                )}
              >
                <PiPlusBold className="h-3 w-3 mr-[2px] text-gray-700" />
                {violationCount - 2}
              </Badge>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}






export const getColumns = ({
  onHeaderCellClick,
  useTableParams,
}: Columns) => [
    {
      title: <HeaderCell
        title="Model Name"
        className='ml-3'
        sortable={true}
        isShowIcon={useTableParams.sortBy === 'modelName'}
        ascending={
          useTableParams?.sortOrder === 'asc' && useTableParams.sortBy === 'modelName'
        }
      />,
      dataIndex: '',
      key: '',
      width: 180,
      onHeaderCell: () => {
        const sortInfo = (useTableParams.sortOrder === 'desc' && useTableParams?.sortBy === 'modelName') ? 'asc' : 'desc'
        return onHeaderCellClick({ key: 'modelName', value: sortInfo, skip: 0 })
      },
      render: (info: any) => {
        return (
          <div className='flex ml-3 text-md text-gray-900 cursor-pointer break-all'>
            {info.modelName}
          </div>
        );
      },
    },
    {
      title: <HeaderCell
        title="Description"
        className='ml-3'
        sortable={true}
        isShowIcon={useTableParams.sortBy === 'description'}
        ascending={
          useTableParams?.sortOrder === 'asc' && useTableParams.sortBy === 'description'
        }
      />,
      dataIndex: '',
      key: '',
      width: 180,
      onHeaderCell: () => {
        const sortInfo = (useTableParams.sortOrder === 'desc' && useTableParams?.sortBy === 'modelDescription') ? 'asc' : 'desc'
        return onHeaderCellClick({ key: 'modelDescription', value: sortInfo, skip: 0 })
      },
      render: (info: any) => {
        return (
          <div className='flex ml-3 text-md text-gray-900 cursor-pointer break-all'>
            {info.modelDescription}
          </div>
        );
      },
    },
    {
      title: (
        <HeaderCell
          title="createdAt"
          sortable={true}
          isShowIcon={useTableParams.sortBy === 'createdAt'}
          ascending={
            useTableParams?.sortOrder === 'asc' && useTableParams.sortBy === 'createdAt'
          }
        />
      ),
      onHeaderCell: () => {
        const sortInfo = (useTableParams.sortOrder === 'desc' && useTableParams?.sortBy === 'createdAt') ? 'asc' : 'desc'
        return onHeaderCellClick({ key: 'createdAt', value: sortInfo, page: 1 })
      },
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 180,
      render: (value: Date) => <DateFormat date={value} className='!flex text-gray-600' />,
    },
    // {
    //   title: (
    //     <HeaderCell
    //       title="Versions"
    //       sortable={false}
    //       isShowIcon={useTableParams.sortBy === 'versions'}
    //       ascending={
    //         useTableParams?.sortOrder === 'asc' && useTableParams.sortBy === 'versions'
    //       }
    //     />
    //   ),
    //   // onHeaderCell: () => {
    //   //   const sortInfo = (useTableParams.sortOrder === 'desc' && useTableParams?.sortBy === 'versions') ? 'asc' : 'desc'
    //   //   return onHeaderCellClick({ key: 'versions', value: sortInfo, skip: 0 })
    //   // },
    //   dataIndex: 'versions',
    //   key: 'versions',
    //   width: 100,
    //   render: (_: any, row: any) => {
    //     const versionsCount = row?.versions?.length;
    //     return (
    //       <div className="flex items-center justify-start cursor-pointer">
    //         {
    //           Array.from(
    //             new Set(row?.versions?.map((version: any) => version))
    //           )
    //             .slice(0, 2)
    //             .map((versionTitle: any, index: number) => {
    //               return (
    //                 <div className='flex justify-start items-center'>
    //                   <Badge
    //                     key={index}
    //                     className={`capitalize h-6 bg-gray-200 text-gray-700 mr-2`}
    //                     variant="flat"
    //                     color='primary'
    //                   >
    //                     {versionTitle}
    //                   </Badge>
    //                 </div>
    //               );
    //             })
    //         }
    //         {versionsCount > 2 && (
    //           <Badge
    //             variant="flat"
    //             color='primary'
    //             className={cn(
    //               'hidden py-1 sm:block mr-2',
    //               'bg-gray-200 text-gray-700 !flex'
    //             )}
    //           >
    //             <PiPlusBold className="h-3 w-3 mr-[2px] text-gray-700" />
    //             {versionsCount - 2}
    //           </Badge>
    //         )}
    //       </div>
    //     );
    //   },
    // },
    // {
    //   title: (
    //     <HeaderCell
    //       title="Status"
    //       sortable
    //       isShowIcon={useTableParams.sortBy === 'status'}
    //       ascending={
    //         useTableParams?.sortOrder === 'asc' && useTableParams.sortBy === 'status'
    //       }
    //     />
    //   ),
    //   onHeaderCell: () => {
    //     const sortInfo = (useTableParams.sortOrder === 'desc' && useTableParams?.sortBy === 'status') ? 'asc' : 'desc'
    //     return onHeaderCellClick({ key: 'status', value: sortInfo, skip: 0 })
    //   },
    //   dataIndex: 'status',
    //   key: 'status',
    //   width: 100,
    //   render: (value: any) => {
    //     const status = value?.toLowerCase() || '';
    //     let colorCode = status === 'started' ? 'primary' : status === 'running' ? 'info' : 'success';
    //     return (
    //       <div>
    //         <Badge
    //           className='capitalize  h-6'
    //           variant="flat"
    //           // @ts-ignore
    //           color={colorCode}
    //         >
    //           {status}
    //         </Badge>
    //       </div>
    //     )
    //   },
    // },
    // {
    //   title: (
    //     <HeaderCell
    //       title="Severity"
    //     />
    //   ),
    //   dataIndex: '',
    //   key: '',
    //   width: 180,
    //   render: (row: any) => {
    //     return (
    //       <SeverityInfo row={row} />
    //     )
    //   },
    // },
    // {
    //   title: (
    //     <HeaderCell
    //       title="Tags"
    //     />
    //   ),
    //   dataIndex: 'tags',
    //   key: 'tags',
    //   width: 180,
    //   render: (_: any, row: any) => {
    //     return (
    //       <TagsInfo row={row} />
    //     );
    //   }
    // },
  ];



// const versionsCount = row?.versions?.length;
// return (
//   <div className="flex items-center justify-start cursor-pointer">
//     {
//       Array.from(
//         new Set(row?.versions?.map((version: any) => version))
//       )
//         .slice(0, 2)
//         .map((versionTitle: any, index: number) => {
//           return (
//             <div className='flex justify-start items-center'>
//               <Badge
//                 key={index}
//                 className={`capitalize h-6 bg-gray-200 text-gray-700 mr-2`}
//                 variant="flat"
//                 color='primary'
//               >
//                 {versionTitle}
//               </Badge>
//             </div>
//           );
//         })
//     }
//     {versionsCount > 2 && (
//       <Badge
//         variant="flat"
//         color='primary'
//         className={cn(
//           'hidden py-1 sm:block mr-2',
//           'bg-gray-200 text-gray-700 !flex'
//         )}
//       >
//         <PiPlusBold className="h-3 w-3 mr-[2px] text-gray-700" />
//         {versionsCount - 2}
//       </Badge>
//     )}
//   </div>
// );