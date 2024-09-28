import { getOptions, handleResponseMiddleWare, postOptions } from "@/services";
import { formatDate } from "@/utils/format-date";
import { unstable_noStore as noStore } from "next/cache";
import toast from "react-hot-toast";

const getInterviewsData = async ({
  idToken,
  accessToken,
  modelId,
  queryString,
}: any) => {
  try {
    noStore();
    const urlInfo = `${process.env.RS_API_URL}/interview?${queryString}`;
    const response = await fetch(
      urlInfo,
      getOptions({
        token: idToken,
        accessToken: accessToken,
      })
    );
    const interviewsList = await handleResponseMiddleWare(response);
    return interviewsList || {};
  } catch (error) {
    console.error("Error fetching policy info:", error);
    return {};
  }
};

const updateCandidateStatus = async ({
  interviewInfo,
  candidateStatus,
  idToken,
  accessToken,
}: any) => {
  try {
    const urlInfo = `${process.env.RS_API_URL}/interview/${interviewInfo._id}/candidate-status`;
    const response = await fetch(
      urlInfo,
      postOptions({
        method: "PUT",
        token: idToken,
        accessToken: accessToken,
        payload: {
          candidateStatus: candidateStatus,
        },
      })
    );
    const candidateStatusInfo = await handleResponseMiddleWare(response);
    return candidateStatusInfo || {};
  } catch (error) {
    console.error("Error while updating candidate status:", error);
    return {};
  }
};

const updateInterviewName = async ({
  interviewInfo,
  interviewName,
  idToken,
  accessToken,
}: any) => {
  try {
    const urlInfo = `${process.env.RS_API_URL}/interview/${interviewInfo._id}/name`;
    const response = await fetch(
      urlInfo,
      postOptions({
        method: "PUT",
        token: idToken,
        accessToken: accessToken,
        payload: {
          name: interviewName || "",
        },
      })
    );
    const interviewUpdatedInfo = await handleResponseMiddleWare(response);
    return interviewUpdatedInfo || {};
  } catch (error) {
    console.error("Error while updating candidate status:", error);
    return {};
  }
};

const createNewInterview = async ({ idToken, accessToken }: any) => {
  try {
    const currentDate = formatDate(new Date(), "YYYY-MM-DD hh:mm");

    const urlInfo = `${process.env.RS_API_URL}/interview/create-interview`;
    const response = await fetch(
      urlInfo,
      postOptions({
        method: "POST",
        token: idToken,
        accessToken: accessToken,
        payload: {
          name: `interview - ${currentDate}`,
        },
      })
    );
    const interviewUpdatedInfo = await handleResponseMiddleWare(response);
    return interviewUpdatedInfo || {};
  } catch (error) {
    console.error("Error while updating candidate status:", error);
    return {};
  }
};

const sendSSEEvent = async ({ interviewId, event, candidate }: any) => {
  try {
    const urlInfo = `${process.env.RS_API_URL}/sse/send-message`;
    const response = await fetch(
      urlInfo,
      postOptions({
        method: "POST",
        payload: {
          id: interviewId,
          message: event,
          candidate: candidate || {},
        },
      })
    );
    const interviewUpdatedInfo = await handleResponseMiddleWare(response);
    return interviewUpdatedInfo || {};
  } catch (error) {
    console.error("Error while updating candidate status:", error);
    return {};
  }
};

const updateInterviewDetails = async ({
  interviewId,
  event,
  candidate,
}: any) => {
  try {
    const urlInfo = `${process.env.RS_API_URL}/interview/public/${interviewId}/output`;
    const response = await fetch(
      urlInfo,
      postOptions({
        method: "PUT",
        payload: {
          id: interviewId,
          message: event,
          candidate: candidate || {},
        },
      })
    );
    const interviewUpdatedInfo = await handleResponseMiddleWare(response);
    return interviewUpdatedInfo || {};
  } catch (error) {
    console.error("Error while updating candidate status:", error);
    return {};
  }
};

const getInterviewById = async ({ idToken, accessToken, interviewId }: any) => {
  try {
    const urlInfo = `${process.env.RS_API_URL}/interview/public/${interviewId}`;
    const response = await fetch(
      urlInfo,
      getOptions({
        token: idToken,
        accessToken: accessToken,
      })
    );
    const interviewInfo = await handleResponseMiddleWare(response);
    return interviewInfo || {};
  } catch (error) {
    console.error("Error while fetching interview info:", error);
    return {};
  }
};

const updateDateCandidateDetails = async ({
  interviewId,
  candidateInfo,
}: any) => {
  try {
    const urlInfo = `${process.env.RS_API_URL}/interview/public/${interviewId}/candidate`;
    const response = await fetch(
      urlInfo,
      postOptions({
        method: "PUT",
        payload: {
          ...candidateInfo,
        },
      })
    );
    const interviewUpdatedInfo = await handleResponseMiddleWare(response);
    return interviewUpdatedInfo || {};
  } catch (error) {
    console.error("Error while fetching interview info:", error);
    return {};
  }
};

const updateInterviewStatus = async ({
  idToken,
  accessToken,
  interviewId,
  status,
}: any) => {
  try {
    const urlInfo = `${process.env.RS_API_URL}/interview/${interviewId}/status`;
    const response = fetch(
      urlInfo,
      postOptions({
        token: idToken,
        accessToken,
        method: "PUT",
        payload: {
          status,
        },
      })
    );
    const interviewUpdatedStatus = await handleResponseMiddleWare(response);
    return interviewUpdatedStatus || {};
  } catch (error) {
    console.error("Error while fetching interview info:", error);
    return {};
  }
};

const sendSSEEventAPI = async ({ interviewId, event, candidate }: any) => {
  const eventMessageInfo = await sendSSEEvent({
    interviewId,
    event: event,
    candidate: candidate || {},
  });

  const updateInterviewInfo = await updateInterviewDetails({
    interviewId,
    event: event,
    candidate: candidate || {},
  });

  console.log(
    ">>>>>>>>>>>>>>Message  sent",
    updateInterviewInfo,
    eventMessageInfo
  );
  return eventMessageInfo;
};

const updateInterviewNamePrompt = async ({
  interviewInfo,
  interviewName,
  currentUserInfo,
}: any) => {
  const accountId = currentUserInfo?.idToken || "";
  const accessToken = currentUserInfo?.accessToken || "";
  const interviewData = await updateInterviewName({
    interviewName: interviewName,
    idToken: accountId,
    accessToken,
    interviewInfo,
  });

  if (interviewData?._id) {
    toast.success("Interview name updated successfully");
  } else {
    toast.error("Error while updating interview name");
  }
};

const sendInterviewerSSEEvent = async ({
  interviewId,
  event,
  candidate,
}: any) => {
  try {
    
    await updateInterviewDetails({
      interviewId,
      event: event,
      candidate: candidate || {},
    });

    const urlInfo = `${process.env.RS_API_URL}/sse/interviewer/send-message`;
    const response = await fetch(
      urlInfo,
      postOptions({
        method: "POST",
        payload: {
          id: interviewId,
          message: event,
          candidate: candidate || {},
        },
      })
    );
    const interviewUpdatedInfo = await handleResponseMiddleWare(response);
    return interviewUpdatedInfo || {};
  } catch (error) {
    console.error("Error while updating candidate status:", error);
    return {};
  }
};

export {
  getInterviewsData,
  updateCandidateStatus,
  updateInterviewName,
  createNewInterview,
  getInterviewById,
  sendSSEEvent,
  updateInterviewDetails,
  updateDateCandidateDetails,
  updateInterviewStatus,
  sendInterviewerSSEEvent,
  sendSSEEventAPI,
  updateInterviewNamePrompt,
};
