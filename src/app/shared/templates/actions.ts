import { getOptions, handleResponseMiddleWare, postOptions } from "@/services";
import { unstable_noStore as noStore } from "next/cache";
import { templatesList } from "./sample-data";

const getTemplatesData = async ({
  idToken,
  accessToken,
  modelId,
  queryString,
}: any) => {
  try {
    noStore();
    return templatesList || {};
  } catch (error) {
    console.error("Error fetching policy info:", error);
    return {};
  }
};

export { getTemplatesData};
