"use client";

import { Badge } from "@/components/ui/badge";
import DateCell, { DateFormat } from "@/components/ui/date-cell";
import { HeaderCell } from "@/components/ui/table";
import StatusBadge, {
  renderOptionDisplayValue,
} from "@/components/ui/status-badge";
import { text } from "stream/consumers";
import {
  PiEyeDuotone,
  PiNotePencil,
  PiPencil,
  PiPlayDuotone,
  PiTrash,
} from "react-icons/pi";
import StatusField from "@/components/controlled-table/status-field";
import { capitalize } from "@/utils/commonFuncations";
import { useState } from "react";
import { useAppContext } from "@/app/root-lib";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type Columns = {
  onHeaderCellClick: any;
  useTableParams?: any;
  updateStatus?: any;
  updateInterviewName?: any;
};

const colorMappings = [
  { bg: "bg-primary-100", textColor: "text-primary-600" },
  { bg: "bg-green-100", textColor: "text-green-600" },
  { bg: "bg-blue-100", textColor: "text-blue-600" },
  { bg: "bg-yellow-100", textColor: "text-yellow-600" },
  { bg: "bg-orange-100", textColor: "text-orange-400" },
  { bg: "bg-red-100", textColor: "text-red-600" },
];

const candidateStatus = [
  {
    value: "inProgress",
    label: "In Progress",
  },
  {
    value: "hold",
    label: "Hold",
  },
  {
    value: "rejected",
    label: "Rejected",
  },
  {
    value: "selected",
    label: "Selected",
  },
];

function CandidateStatusSelect({ interviewInfo, updateStatus }: any) {
  const { appContextData }: any = useAppContext();

  const idToken = appContextData.currentUserInfo?.idToken || "";
  const accessToken = appContextData.currentUserInfo?.accessToken || "";

  const [value, setValue] = useState("");
  const updateStatusInfo = async (value: any) => {
    setValue(value);
    const statusInfo = await updateStatus({
      candidateStatus: value,
      interviewInfo,
      idToken,
      accessToken,
    });

    if (statusInfo?.isErrorInApi) {
      toast.error("Candidate not updated", { position: "top-right" });
    } else {
      toast.success("Candidate status updated successfully", {
        position: "top-right",
      });
    }
  };

  return (
    <StatusField
      dropdownClassName="!z-10 bg-white !w-[140px]"
      optionClassName="hover:bg-gray-50"
      className={`rounded-md @[35rem]:w-auto flex items-center`}
      selectClassName={`!h-[30px] rounded-md min-w-[140px] hover:bg-primary-100 !ring-primary-300`}
      options={candidateStatus}
      placeholder="Candidate status"
      value={capitalize(value || interviewInfo.candidateStatus)}
      onChange={updateStatusInfo}
      getOptionValue={(option: { value: any }) => option.value}
      getOptionDisplayValue={(option: { label: any }) =>
        renderOptionDisplayValue(option.label as string)
      }
      displayValue={(selected: string) => renderOptionDisplayValue(selected)}
    />
  );
}

const ActionEvent = ({ recordInfo }: any) => {
  const router = useRouter();

  const onCLickRun = () => {
    console.log("Run Clicked");
    window.open(`/interview/${recordInfo._id}`, "_blank");
  };

  const clickView = () => {
    router.push(`/interview-details/${recordInfo._id}`);
  };

  return (
    <div className="flex">
      <div className="flex">
        <PiNotePencil className="w-5 h-5 mr-2 cursor-pointer" />
        <PiTrash className="w-5 h-5 cursor-pointer" />
      </div>
    </div>
  );
};

export const getColumns = ({
  onHeaderCellClick,
  useTableParams,
  updateStatus,
  updateInterviewName,
}: Columns) => [
  {
    title: (
      <HeaderCell
        title="Name"
        className="ml-3"
        sortable={true}
        isShowIcon={useTableParams.sortBy === "name"}
        ascending={
          useTableParams?.sortOrder === "asc" &&
          useTableParams.sortBy === "name"
        }
      />
    ),
    dataIndex: "",
    key: "",
    width: 180,
    onHeaderCell: () => {
      const sortInfo =
        useTableParams.sortOrder === "desc" && useTableParams?.sortBy === "name"
          ? "asc"
          : "desc";
      return onHeaderCellClick({ key: "name", value: sortInfo, page: 1 });
    },
    render: (info: any) => {
      return <div>{info?.name}</div>;
    },
  },
  {
    title: <HeaderCell title="Language" />,
    dataIndex: "",
    key: "",
    width: 140,
    render: (info: any) => (
      <div className="text-md flex text-gray-600">
        <Badge
          className="capitalize  h-6"
          variant="flat"
          // @ts-ignore
          color="primary"
        >
          {info.programmingLanguage}
        </Badge>
      </div>
    ),
  },
  {
    title: (
      <HeaderCell
        title="createdAt"
        sortable={true}
        isShowIcon={useTableParams.sortBy === "createdAt"}
        ascending={
          useTableParams?.sortOrder === "asc" &&
          useTableParams.sortBy === "createdAt"
        }
      />
    ),
    onHeaderCell: () => {
      const sortInfo =
        useTableParams.sortOrder === "desc" &&
        useTableParams?.sortBy === "createdAt"
          ? "asc"
          : "desc";
      return onHeaderCellClick({ key: "createdAt", value: sortInfo, page: 1 });
    },
    dataIndex: "createdAt",
    key: "createdAt",
    width: 180,
    render: (value: Date) => (
      <DateFormat date={value} className="!flex text-gray-600" />
    ),
  },
  {
    title: <HeaderCell title="Action" sortable={false} />,
    dataIndex: "",
    key: "",
    width: 100,
    render: (info: any) => {
      return <ActionEvent recordInfo={info} />;
    },
  },
];
