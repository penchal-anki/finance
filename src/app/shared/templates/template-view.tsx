"use client";
import {
  TemplateCreationSchema,
  templateCreationSchema,
} from "@/utils/validators/template-creation.schema";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { PiPlus } from "react-icons/pi";
import { Controller, useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Text } from "@/components/ui/text";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/text-area";
import StatusField from "@/components/controlled-table/status-field";
import TableList from "./list-data/table";
import { useAppContext } from "@/app/root-lib";
import { getTemplatesData } from "./actions";

const statusOptions = [
  { value: "C#", label: "C#" },
  { value: "C/C++", label: "C/C++" },
  { value: "Clojure", label: "Clojure" },
  { value: "Java", label: "Java" },
  { value: "Kotlin", label: "Kotlin" },
  { value: "Go", label: "Go" },
  { value: "Haskell", label: "Haskell" },
  { value: "JavaScript", label: "JavaScript" },
  { value: "TypeScript", label: "TypeScript" },
  { value: "PHP", label: "PHP" },
  { value: "Python2", label: "Python2" },
  { value: "Python3", label: "Python3" },
];

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

const renderOptionDisplayValue = (value: string) => (
  <div className="flex items-center">
    <Text className="ms-1.5 text-sm font-medium capitalize text-gray-700 hover:text-primary-500">
      {value}
    </Text>
  </div>
);

const TemplatesView = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const {
    control,
    register,
    formState: { errors },
  } = useForm();

  const [useTableParams, setTableParams] = useState(initialState);
  const [templatesListInfo, setTemplatesListInfo] = useState<any>({});
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [isFirstTimeLoad, setIsFirstTimeLoad] = useState(false);
  const { appContextData, setAppContextData }: any = useAppContext();
  const { currentUserInfo } = appContextData;
  const accountId = currentUserInfo?.idToken || "";

  const templates = [];

  const onSubmit = (data: TemplateCreationSchema) => {
    console.log("Form Data:", data);
  };

  const handleCreateTemplateClick = () => {
    setIsFormVisible(true);
  };

  const handleFilters = ({ key, value, isNotAPICall }: any) => {
    setTableParams((prevParams) => {
      const updatedParams = {
        ...prevParams,
        [key]: value,
      };
      if (!isNotAPICall) {
        updateListData(updatedParams);
      }
      return updatedParams;
    });
  };

  const updateListData = async (tableParams: any) => {
    try {
      setIsDataLoading(true);
      const queryString = generateQueryString(tableParams);
      return await refetchTemplatesData(queryString);
    } catch (error) {
      console.log("Error while fetching data>>", error);
      setIsDataLoading(false);
    }
  };

  const refetchTemplatesData = async (queryString?: any) => {
    const accountId = currentUserInfo?.idToken || "";
    setIsDataLoading(true);

    const templatesListData: any = await getTemplatesData({
      idToken: accountId,
      accessToken: currentUserInfo?.accessToken,
      queryString: queryString || "",
    });

    if (templatesListData?.isSessionExpired) {
      return setAppContextData({ isSessionExpired: true });
    }

    setTemplatesListInfo(templatesListData);
    setIsFirstTimeLoad(true);
    setIsDataLoading(false);
    return templatesListData;
  };

  useEffect(() => {
    if (accountId) {
      const queryString = generateQueryString(initialState);
      refetchTemplatesData(queryString);
    }
  }, []);

  return (
    <>
      {!isFormVisible && (
        <>
          <div className="flex flex-col items-start">
            <div className="mt-4">
              <Button
                type="button"
                color="primary"
                onClick={handleCreateTemplateClick}
              >
                <PiPlus className="mr-2 h-5 w-5" />
                Create Template
              </Button>
            </div>
            <p className="ml-2 my-4">
              These have been created by you and your team.
            </p>
          </div>
          {templates.length === 0 && (
            <div className="">
              <TableList
                key={templatesListInfo?.templates?.length}
                listData={templatesListInfo?.templates || []}
                useTableParams={useTableParams}
                handleFilters={handleFilters}
                setTableParams={setTableParams}
                refetchListData={refetchTemplatesData}
                updateDataList={updateListData}
                paginationInfo={templatesListInfo.paginationInfo}
              />
            </div>
          )}
        </>
      )}

      {isFormVisible && (
        <Form<TemplateCreationSchema>
          onSubmit={onSubmit}
          validationSchema={templateCreationSchema}
          className="space-y-4 mt-4 pl-4"
          useFormProps={{
            defaultValues: {
              templateName: "",
              questionDescription: "",
              language: "",
              codeInput: "",
              solution: "",
            },
          }}
        >
          {({ register, control, watch, formState: { errors } }) => (
            <>
              <div>
                <div className="flex justify-between">
                  <p>
                    <strong>Snippets</strong> Can be in multiple languages. When
                    you import a snippet, each code will be imported for their
                    respective language.
                  </p>
                  <hr className="my-6" />
                </div>
                <Controller
                  name="templateName"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <Input
                      label="Template name"
                      color="info"
                      value={value}
                      placeholder="Enter template name"
                      className="mt-1 block w-1/2 [&>label>span]:font-medium border-gray-300 ring-gray-300 text-gray-500"
                      inputClassName="text-sm h-11 border-gray-300 ring-gray-300 text-sm text-gray-400"
                      {...register("templateName")}
                      error={errors.templateName?.message}
                      onChange={(e) => onChange(e.target.value)}
                    />
                  )}
                />
              </div>
              <div>
                <Controller
                  name="questionDescription"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <Textarea
                      label="Question Description (This section is visible for both
                        candidates and interviewers)"
                      color="info"
                      labelClassName="block text-gray-700"
                      placeholder="Enter question description"
                      className="w-1/2 [&>label>span]:font-normal border-gray-300 ring-gray-300 text-gray-500"
                      textareaClassName="text-sm h-50 min-h-11 ring-[0.6] border-gray-300 ring-gray-300 text-base text-gray-500"
                      {...register("questionDescription")}
                      error={errors.questionDescription?.message}
                      onChange={(e) => onChange(e.target.value)}
                    />
                  )}
                />
              </div>
              <div className="w-1/2 mr-4">
                <Controller
                  name="language"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <StatusField
                      dropdownClassName="!z-10 bg-white"
                      label="Default code pasted in the interview editor."
                      optionClassName="hover:bg-gray-50"
                      className="col-span-full text-gray-500"
                      selectClassName="h-11 rounded-md min-w-[120px] ring-gray-300"
                      options={statusOptions}
                      placeholder="Select language"
                      value={value}
                      onChange={onChange}
                      getOptionValue={(option) => option.value}
                      getOptionDisplayValue={(option) =>
                        renderOptionDisplayValue(option.label)
                      }
                      displayValue={(selected) =>
                        renderOptionDisplayValue(selected as string)
                      }
                      error={errors.language?.message}
                    />
                  )}
                />
              </div>
              <div className="w-1/2 mr-4">
                <Controller
                  name="codeInput"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <>
                      <Textarea
                        label="Code Input"
                        color="info"
                        labelClassName="text-gray-700"
                        placeholder="Enter code input"
                        className="col-span-full [&>label>span]:font-normal border-gray-300 ring-gray-300 text-gray-500"
                        textareaClassName="text-sm h-50 min-h-11 ring-[0.6] border-gray-300 ring-gray-300 text-base text-gray-500"
                        {...register("codeInput")}
                        error={errors.codeInput?.message}
                        onChange={(e) => onChange(e.target.value)}
                      />
                    </>
                  )}
                />
              </div>
              <div>
                <Controller
                  name="solution"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <>
                      <Textarea
                        label=" Interviewer Solutions (This section is only visible for the
                          interviewer)"
                        color="info"
                        labelClassName="text-gray-700"
                        placeholder="Enter solution"
                        className="w-1/2 [&>label>span]:font-normal border-gray-300 ring-gray-300 text-gray-500"
                        textareaClassName="text-sm h-50 min-h-11 ring-[0.6] border-gray-300 ring-gray-300 text-base text-gray-500"
                        {...register("solution")}
                        error={errors.solution?.message}
                        onChange={(e) => onChange(e.target.value)}
                      />
                    </>
                  )}
                />
              </div>
              <div className="flex justify-start">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsFormVisible(false);
                  }}
                  className="h-10 text-sm  w-[124px]"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  color="primary"
                  buttonStyles="!h-10 text-sm w-[124px] ml-6"
                >
                  <span>Save</span>
                </Button>
              </div>
            </>
          )}
        </Form>
      )}
    </>
  );
};

export default TemplatesView;
