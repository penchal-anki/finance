import { getOptions, handleResponseMiddleWare, postOptions } from "@/services";
import { unstable_noStore as noStore } from 'next/cache';


const getOrgIntegrations = async ({ idToken, accessToken, orgId }: any) => {
    try {
        noStore()
        const response = await fetch(`${process.env.RS_API_URL}/integrations/org`,
            getOptions({
                token: idToken,
                accessToken: accessToken
            })
        );
        const integrations = await handleResponseMiddleWare(response);
        return integrations || []
    } catch (error) {
        console.error('Error fetching getModelsData info:', error);
        return {}
    }
}

const getModelsData = async ({ idToken, accessToken, queryString }: any) => {
    try {
        noStore()
        // // const response = await fetch(`${process.env.RS_API_URL}/models?page=1&limit=8&sortBy=createdAt&sortOrder=desc`,
        // const response = await fetch(`${process.env.RS_API_URL}/models?${queryString}`,

        //     getOptions({
        //         token: idToken,
        //         accessToken: accessToken
        //     })
        // );
        // const modelsList = await handleResponseMiddleWare(response);
        return [
            {
                "createdAt": "2024-09-27T12:24:10.043Z",
                "modelDescription": "description 1",
                "modelName": "Budget plan 2024",
                "updatedAt": "2024-09-27T12:24:10.043Z",
                "id":"10001",
            },
            {
                "createdAt": "2024-09-26T11:20:15.002Z",
                "modelDescription": "description 2",
                "modelName": "Marketing Strategy 2024",
                "updatedAt": "2024-09-26T11:20:15.002Z",
                "id":"10002"
            },
            {
                "createdAt": "2024-09-25T10:18:09.545Z",
                "modelDescription": "description 3",
                "modelName": "Operational Plan 2024",
                "updatedAt": "2024-09-25T10:18:09.545Z",
                "id":"10003"
            },
            {
                "createdAt": "2024-09-24T09:14:08.301Z",
                "modelDescription": "description 4",
                "modelName": "Financial Overview 2024",
                "updatedAt": "2024-09-24T09:14:08.301Z",
                "id":"10004"
            }
        ]

    } catch (error) {
        console.error('Error fetching getModelsData info:', error);
        return {}
    }
}

const getModelById = async ({ idToken, accessToken, modelId }: any) => {
    try {
        noStore()
        // const response = await fetch(`${process.env.RS_API_URL}/models?page=1&limit=8&sortBy=createdAt&sortOrder=desc`,
        const response = await fetch(`${process.env.RS_API_URL}/models/${modelId}`,
            getOptions({
                token: idToken,
                accessToken: accessToken
            })
        );
        const modelInfo = await handleResponseMiddleWare(response);
        return modelInfo || {}
    } catch (error) {
        console.error('Error fetching getModelsData info:', error);
        return {}
    }
}

export {
    getModelsData,
    getModelById,
    getOrgIntegrations
}