"use client";

import { useAppContext } from "@/app/root-lib/AppContext";
import PageHeader from "@/app/shared/page-header";
import { useEffect, useState } from "react";
import {
  getInterviewsData,
  updateCandidateStatus,
  updateInterviewName,
} from "./actions";
import { Loader } from "rizzui";
import TableList from "./list-data/table";
import ConnectPlatforms from "@/components/connect-platforms";

const initialState = {
  page: "1",
  limit: "8",
  sortBy: "createdAt",
  sortOrder: "desc",
  currentPage: 1,
};

const generateQueryString = (tableParams: any) => {
  const queryString = Object.entries(tableParams)
    .filter(([key, value]) => value !== "")
    .map(([key, value]: any) => `${key}=${encodeURIComponent(value)}`)
    .join("&");
  return queryString;
};

export default function InterviewsListView({ modelId }: any) {
  const { appContextData, setAppContextData }: any = useAppContext();
  const { currentUserInfo } = appContextData;
  const accountId = currentUserInfo?.idToken || "";
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [isFirstTimeLoad, setIsFirstTimeLoad] = useState(false);
  const [interviewsList, setInterviewsList] = useState<any>({});
  const [useTableParams, setTableParams] = useState(initialState);

  const handleFilters = ({ key, value, isNotAPICall }: any) => {
    setTableParams((prevParams) => {
      const updatedParams = {
        ...prevParams,
        [key]: value,
      };
      if (!isNotAPICall) {
        updateInterviewsList(updatedParams);
      }
      return updatedParams;
    });
  };

  const updateInterviewsList = async (tableParams: any) => {
    try {
      setIsDataLoading(true);
      const queryString = generateQueryString(tableParams);
      return await refetchModelsData(queryString);
    } catch (error) {
      console.log("Error while fetching data>>", error);
      setIsDataLoading(false);
    }
  };

  const refetchModelsData = async (queryString?: any) => {
    const accountId = currentUserInfo?.idToken || "";
    setIsDataLoading(true);

    const interviewListInfo: any = await getInterviewsData({
      idToken: accountId,
      accessToken: currentUserInfo?.accessToken,
      modelId,
      queryString: queryString || "",
    });

    if (interviewListInfo?.isSessionExpired) {
      return setAppContextData({ isSessionExpired: true });
    }

    setInterviewsList(interviewListInfo);
    setIsFirstTimeLoad(true);
    setIsDataLoading(false);
    return interviewListInfo;
  };

  useEffect(() => {
    if (accountId) {
      const queryString = generateQueryString(initialState);
      refetchModelsData(queryString);
    }
  }, []);

  return (
    <div className="mt-4">
      {isDataLoading ? (
        <div className="flex justify-center items-center h-[50vh]">
          <Loader color="info" className="text-primary h-10 w-10" />
        </div>
      ) : (
        (interviewsList?.interviews?.length > 0 || isFirstTimeLoad) && (
          <div className="">
            <TableList
              key={interviewsList?.length}
              listData={interviewsList?.interviews || []}
              useTableParams={useTableParams}
              handleFilters={handleFilters}
              setTableParams={setTableParams}
              refetchListData={refetchModelsData}
              updateDataList={updateInterviewsList}
              paginationInfo={interviewsList.paginationInfo}
              modelId={modelId}
              updateStatus={updateCandidateStatus}
              updateInterviewName={updateInterviewName}
            />
          </div>
        )
      )}
    </div>
  );
}
