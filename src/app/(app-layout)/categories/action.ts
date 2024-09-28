import { getOptions, handleResponseMiddleWare, postOptions } from "@/services";
import { unstable_noStore as noStore } from 'next/cache';



export const sampleJsonCategories = [
    {
        "categoryDescription": "List of engineering department employees",
        "categoryName": "Engineering",
        "createdAt": "2024-09-27T09:26:12.479Z",
        "updatedAt": "2024-09-27T09:26:12.479Z",
        "categoryListValues": [
            {
                "employeeId": 1,
                "name": "John Doe",
                "age": 30,
                "position": "Software Engineer",
                "hiredAt": "2021-06-15T10:30:45.000Z",
                "email": "john.doe@example.com",
                "salary": 75000
            },
            {
                "employeeId": 2,
                "name": "Michael Green",
                "age": 40,
                "position": "DevOps Engineer",
                "hiredAt": "2019-04-10T11:25:37.000Z",
                "email": "michael.green@example.com",
                "salary": 90000
            }
        ]
    },
    {
        "categoryDescription": "List of management department employees",
        "categoryName": "Management",
        "createdAt": "2024-09-27T09:26:12.479Z",
        "updatedAt": "2024-09-27T09:26:12.479Z",
        "categoryListValues": [
            {
                "employeeId": 3,
                "name": "Jane Smith",
                "age": 28,
                "position": "Project Manager",
                "hiredAt": "2022-02-20T14:20:33.000Z",
                "email": "jane.smith@example.com",
                "salary": 85000
            },
            {
                "employeeId": 4,
                "name": "Sara White",
                "age": 29,
                "position": "HR Manager",
                "hiredAt": "2020-06-01T08:35:30.000Z",
                "email": "sara.white@example.com",
                "salary": 72000
            }
        ]
    },
    {
        "categoryDescription": "List of design department employees",
        "categoryName": "Design",
        "createdAt": "2024-09-27T09:26:12.479Z",
        "updatedAt": "2024-09-27T09:26:12.479Z",
        "categoryListValues": [
            {
                "employeeId": 5,
                "name": "Mark Johnson",
                "age": 35,
                "position": "UX Designer",
                "hiredAt": "2020-10-01T08:45:22.000Z",
                "email": "mark.johnson@example.com",
                "salary": 70000
            }
        ]
    },
    {
        "categoryDescription": "List of data science department employees",
        "categoryName": "Data Science",
        "createdAt": "2024-09-27T09:26:12.479Z",
        "updatedAt": "2024-09-27T09:26:12.479Z",
        "categoryListValues": [
            {
                "employeeId": 6,
                "name": "Lisa Brown",
                "age": 32,
                "position": "Data Analyst",
                "hiredAt": "2021-12-05T09:35:50.000Z",
                "email": "lisa.brown@example.com",
                "salary": 78000
            }
        ]
    }
]



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
        return sampleJsonCategories

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