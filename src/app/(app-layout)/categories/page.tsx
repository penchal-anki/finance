'use client'

import { useAppContext } from '@/app/root-lib/AppContext';
import PageHeader from '@/app/shared/page-header';
import { useEffect, useState } from 'react';
import { getModelsData } from './action';
import { Loader } from 'rizzui';
import ModelsTable from './list-data/table';
import dynamic from 'next/dynamic';
import { setContextApiData } from '@/utils/form-utils';
const AddNewModelElement = dynamic(
    () => import('./list-data/add-model'),
    { ssr: false }
);


const pageHeader = {
    title: 'Categories',
    subHeading: "",
    breadcrumb: [],
};


const initialState = {
    skip: "0",
    limit: '8',
    sortBy: "lastScan",
    sortOrder: "desc",
    currentPage: 1,
}

const generateQueryString = (tableParams: any) => {
    const queryString = Object.entries(tableParams)
        .filter(([key, value]) => value !== "")
        .map(([key, value]: any) => `${key}=${encodeURIComponent(value)}`)
        .join("&");
    return queryString;
}

export default function Models() {
    const { appContextData, setAppContextData }: any = useAppContext()
    const { currentUserInfo } = appContextData;
    const accountId = currentUserInfo?.idToken || '';
    const [isDataLoading, setIsDataLoading] = useState(false);
    const [isFirstTimeLoad, setIsFirstTimeLoad] = useState(false);
    const [categories, setCategories] = useState<any>({});
    const [useTableParams, setTableParams] = useState(initialState);

    const handleFilters = ({ key, value, isNotAPICall }: any) => {
        setTableParams((prevParams) => {
            const updatedParams = {
                ...prevParams,
                [key]: value,
            };
            if (!isNotAPICall) {
                updateModelsList(updatedParams);
            }
            return updatedParams;
        });
    };

    const updateModelsList = async (tableParams: any) => {
        try {
            setIsDataLoading(true)
            const queryString = generateQueryString(tableParams)
            return await refetchModelsData(queryString);
        } catch (error) {
            console.log("Error while fetching data>>", error)
            setIsDataLoading(false)
        }
    };


    const refetchModelsData = async (queryString?: any) => {
        const accountId = currentUserInfo?.idToken || '';
        setIsDataLoading(true)
        const categoryListInfo: any = await getModelsData({
            idToken: accountId,
            accessToken: currentUserInfo?.accessToken,
            queryString: queryString || ''
        });

        const cacheCategoryList = appContextData?.categoryListInfo || [];
        setCategories(cacheCategoryList?.length > 0 ? cacheCategoryList : categoryListInfo);

        setIsFirstTimeLoad(true)
        setIsDataLoading(false)

        if (cacheCategoryList?.length === 0) {
            setContextApiData(setAppContextData, { categoryListInfo })
        }

        return categoryListInfo;
    }

    useEffect(() => {
        // if (accountId) {
        const queryString = generateQueryString(initialState)
        refetchModelsData(queryString);
        // }
    }, [])

    const handleModelList = (info: any) => {
        setIsDataLoading(true)
        setCategories((prev: any) => {
            return [...prev, info]
        })
        setContextApiData(setAppContextData, { categoryListInfo: [...categories, info] })
        setIsDataLoading(false)
    }


    console.log('modelsList>>>>>>>>>>', categories)
    return (
        <div>
            <div className='flex justify-between'>
                <PageHeader
                    title={pageHeader.title}
                    breadcrumb={pageHeader.breadcrumb}
                    subHeading={pageHeader.subHeading}
                >
                </PageHeader>
                <div>
                    <AddNewModelElement
                        onAddKeySubmit={(form: any) => {
                            handleModelList(form)
                            console.log(">>>>>>>>>>form", form)
                        }}
                    />
                </div>
            </div>
            {isDataLoading ?
                <div className='flex justify-center items-center h-[50vh]'>
                    <Loader color="info" className='text-primary h-10 w-10' />
                </div>
                :
                (categories?.length > 0 || isFirstTimeLoad) &&
                <div className="">
                    <ModelsTable
                        key={categories?.length}
                        listData={categories || []}
                        useTableParams={useTableParams}
                        handleFilters={handleFilters}
                        setTableParams={setTableParams}
                        updateDataList={updateModelsList}
                        paginationInfo={{ ...categories }}
                        handleModelList={handleModelList}
                    />
                </div>
            }
        </div>
    )
}
