import toast from 'react-hot-toast';

const postOptions = ({
  isPassApiKey,
  payload,
  // isPassConsultationAPIKey,
  // isPassWorkFlowAPiKey,
  method,
  xUserId,
  token,
  accessToken
}: {
  isPassApiKey?: boolean;
  payload: Object
  token?: string;
  method?: string;
  tenantId?: string;
  patientId?: string;
  practitionerId?: string;
  isPassWorkFlowAPiKey?: boolean;
  isPassConsultationAPIKey?: boolean;
  xToken?: string;
  xUserId?: string;
  accessToken?: string;
}) => {
  const postRequest = {
    body: JSON.stringify(payload),
    method: method || 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: '',
      'id-token': '',
      ...isPassApiKey && { 'uc-api-key': process.env['UC_API_KEY'] },
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'x-user-id': '',
      "x-api-key": 'b7314df043f26830ce3c3ea4f2eac3cb0939596e3087135be1050af6d451366a',
    }
  };
  if (accessToken) {
    postRequest.headers.Authorization = `${accessToken}`;
  }
  if (token) {
    postRequest.headers['id-token'] = `${token}`;
  }

  return postRequest;
};


const deleteOptions = ({
  idToken,
  accessToken,
}: any) => {

  const deleteRequest = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: accessToken,
      "id-token": idToken,
    }
  }

  return deleteRequest;
}


const postFileOptions = ({ data, token }: any) => {
  const urlPostFileOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
      // Authorization: `Bearer ${token}`,
      // CORS headers
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    },
    body: data
  };
  return urlPostFileOptions;
};

const getOptions = ({
  jwtToken = '',
  method,
  xUserId = '',
  token,
  accessToken
}: {
  token?: string;
  tenantId?: string;
  hospitalUnitId?: string;
  isPassApiKey?: boolean;
  method?: string;
  deviceId?: string;
  profileId?: string;
  isPassWorkFlowAPiKey?: boolean;
  isPassConsultationAPIKey?: boolean;
  jwtToken?: string;
  xUserId?: string
  accessToken?: string
}) => {
  const urlGetOptions = {
    revalidate: 10,
    tags: ['settings'],
    method: method || 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: '',
      'id-token': '',
      // ...isPassApiKey && { 'uc-api-key': process.env['UC_API_KEY'] },
      // ...isPassWorkFlowAPiKey && { 'uc-api-key': process.env['WORKFLOW_API_KEY'] },
      // ...isPassConsultationAPIKey && {
      //     'uc-api-key': process.env['E_CONSULTATION_API_KEY']
      // },
      // CORS headers
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      "x-api-key": 'b7314df043f26830ce3c3ea4f2eac3cb0939596e3087135be1050af6d451366a',
    }
  };
  if (accessToken) {
    urlGetOptions.headers.Authorization = `${accessToken}`;
  }
  if (token) {
    urlGetOptions.headers['id-token'] = `${token}`;
  }

  return urlGetOptions;
};


const customMessages = {
  200: 'The request was successful',
  201: 'The resource was created successfully',
  400: 'Bad Request: The request was malformed or invalid',
  401: 'Unauthorized: Authentication is required to access this resource',
  403: 'Forbidden: You do not have permission to access this resource',
  404: 'Not Found: The requested resource was not found',
  500: 'Internal Server Error: An unexpected error occurred on the server',
  503: 'Unavailable: Service Temporarily Unavailable'
};

const handleResponseMiddleWare = async (
  apiResponse: any,
  handleErrors = { handleNotFound: false }
) => {
  try {
    const customMessage =
      customMessages[apiResponse?.status as keyof typeof customMessages] || '';
    const rJson = await apiResponse.json();
    // Check for error status codes
    if (
      apiResponse?.status === 404 ||
      apiResponse?.status === 500 ||
      apiResponse?.status === 503
    ) {
      const errorInfo = {
        isErrorInApi: true,
        message: customMessage,
        ...apiResponse
      };
      if (handleErrors?.handleNotFound) {
        return errorInfo;
      }

      throw errorInfo;
    }

    if (apiResponse.status === 401 || apiResponse.status === 400) {
      if (apiResponse.status === 401) {
        localStorage.setItem('isSessionExpired', 'true');
      }
      // Create an error object
      const errorObject = {
        isErrorInApi: true,
        isSessionExpired: apiResponse?.status === 401,
        message: customMessage,
        rJson
      };
      return errorObject;
    }
    // Parse and return the JSON response
    return rJson;
  } catch (error) {
    console.log('>>>>>>>>catch block>************', JSON.stringify(error));
    throw new Error(JSON.stringify(error));
  }
};


const setToastMessage = (rJson?: any) => {
  console.log(">>>>>>>rJson", rJson)
  const message = customMessages[rJson?.statusCode as keyof typeof customMessages];
  const messageHeading = message?.split(':')?.[0];
  const apiMessage =
    typeof rJson?.message === 'string' ? rJson?.message : rJson?.message?.message || '';
  if (rJson?.message === 'User is disabled.') {
    return toast.error("Your account is currently disabled. If you require access please contact support.");
  } else {
    return toast.error(apiMessage ? apiMessage : messageHeading || 'Something went wrong.!', { position: 'top-right' });
  }

};

const clientHandleApiResponse = async ({
  apiResponse,
  setContextApiData,
  setAppContextData
}: any) => {
  try {
    const rJson = await apiResponse.json();
    if (apiResponse.status === 404 || apiResponse.status === 500) {
      if (apiResponse.status === 500) {
        setToastMessage({ statusCode: apiResponse.status, message: apiResponse?.message || rJson?.message });
      }
      const errorInfo = {
        statusCode: apiResponse.status,
        error: {},
        ...apiResponse
      };
      return errorInfo;
    }
    if (apiResponse?.status === 400 || rJson?.statusCode === 401 || rJson?.statusCode === 409) {
      setToastMessage(rJson)
      if (apiResponse.status === 401 && rJson?.statusCode !== 401) {
        setContextApiData(setAppContextData, { isSessionExpired: true })
      }
      return {
        statusCode: apiResponse.status,
        isErrorInApi: true,
        ...rJson
      };
    }
    return rJson;
    // Parse and return the JSON response
  } catch (error) {
    console.log(">>>>>>>>error",error)
    throw new Error('Error');
  }
};


export {
  postOptions,
  getOptions,
  postFileOptions,
  handleResponseMiddleWare,
  clientHandleApiResponse,
  deleteOptions
};
