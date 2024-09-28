import { Badge } from "@/components/ui/badge"
import DateCell from "@/components/ui/date-cell"
import StatusBadge from "@/components/ui/status-badge"
import { Title } from "@/components/ui/text"
import { PiArrowSquareOut, PiFolderOpen, PiBug } from "react-icons/pi"
import CloseFinding from "./close-finding"
// import { closeModelById } from "./actions"
import { useAppContext } from "@/app/root-lib/AppContext"
import toast from "react-hot-toast"
import Link from "next/link"

const FindingPopUp = ({
    record,
    setIsOpenDrawer,
    refetchListData
}: any) => {
    const {
        version = '',
        updatedAt = '',
        attack = [],
        severity = '',
        status = '',
        meta = {},
        mitreCVE = '',
        mitreCVELink = '',
        cve
    } = record;

    const {
        id,
        cveLink,
        description,
        cvss,
        cwe,
        packageName,
        packageVersion,
        fixedVersion,
        cweLink,
        publishedDate,
        lastModifiedDate,
        Vector
    } = cve

    const { appContextData }: any = useAppContext()
    const { currentUserInfo } = appContextData;
    const idToken = currentUserInfo?.idToken || '';
    const accessToken = currentUserInfo?.accessToken || '';

    const closeFindingHandler = async (formData: any) => {
        console.log('close finding>>>>>>>', formData)
        // const rJson = await closeModelById({
        //     idToken,
        //     accessToken,
        //     modelId: record._id,
        //     payload: formData
        // });

        // if (!rJson.isErrorInApi) {
        //     toast.success(rJson.message);
        //     setIsOpenDrawer(false);
        //     refetchListData();
        // } else {
        //     toast.error(rJson.message)
        // }
    }
    // Attack, Severity, Status, Open Date, Version , Description.

    let colorCode = status?.toLowerCase() === 'open' ? 'primary' : status === 'running' ? 'info' : 'success';
    return (
        <div className='w-full flex flex-col items-center bg-white'>
            <div className='flex justify-start w-[90%] flex-col'>
                <div className='w-full mt-4'>
                    <div className="flex justify-between items-center">
                        <div>
                            <Title as="h4" className="font-semibold text-gray-700 flex items-center">
                                <PiBug className="w-6 h-6 mr-2 text-gray-700" />
                                Finding Details
                            </Title>
                            <p className="mt-2"> Understanding vulnerability risks and implementing countermeasures</p>
                        </div>

                        <div>
                            <CloseFinding
                                onAddKeySubmit={closeFindingHandler}
                                icon={<PiFolderOpen className="w-5 h-5 mr-2" />}
                            />
                        </div>
                    </div>
                    <hr className="w-full mt-4" />
                </div>

                <div className="flex mt-8 gap-8">
                    <div className="w-[40%] rounded-md">
                        <div className="flex py-2 px-4 items-start">
                            <div className="mr-4 text-sm w-[30%] font-medium text-gray-700">
                                Attack
                            </div>
                            <div className="w-[70%]">
                                {attack?.map((attack: any) => {
                                    return (
                                        <Badge
                                            className='capitalize h-6 mr-2'
                                            variant="flat"
                                            color='primary'
                                        >
                                            {attack}
                                        </Badge>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="flex py-2 px-4 items-start ">
                            <div className="mr-4 text-sm w-[30%] font-medium text-gray-700">
                                Severity
                            </div>
                            <div className="w-[70%]">
                                <StatusBadge status={severity} />
                            </div>
                        </div>
                        <div className="flex py-2 px-4 items-start">
                            <div className="mr-4 text-sm w-[30%] font-medium text-gray-700">
                                Status
                            </div>
                            <div className="w-[70%]">
                                <Badge
                                    className='capitalize  h-6'
                                    variant="flat"
                                    // @ts-ignore
                                    color={colorCode}
                                >
                                    {status}
                                </Badge>
                            </div>
                        </div>

                        <div className="flex py-2 px-4 items-start">
                            <div className="mr-4 text-sm w-[30%] font-medium text-gray-700">
                                Date Opened
                            </div>
                            <div className="w-[70%]">
                                <DateCell date={updatedAt} className='text-md !flex text-gray-600' />
                            </div>
                        </div>
                        <div className="flex py-2 px-4 items-center">
                            <div className="mr-4 text-sm w-[30%] font-medium text-gray-700">
                                Version
                            </div>
                            <div className="w-[70%]">
                                <Badge
                                    className={`capitalize h-6 mr-2 bg-gray-200 text-gray-700`}
                                    variant="flat"
                                    color='info'
                                >
                                    {version || ''}
                                </Badge>
                            </div>
                        </div>
                 
                        <div className="flex py-2 px-4 items-start ">
                            <div className="mr-4 text-sm w-[30%] font-medium text-gray-700">
                                Description
                            </div>
                            <div className="w-[70%]">
                                {meta?.description || ''}
                            </div>
                        </div>
           
                        {/* <div className="flex py-2 px-4 items-start ">
                            <div className="mr-4 text-sm w-[30%] font-medium text-gray-700">
                                MiTRE Atlas
                            </div>
                            <div className="w-[70%]">
                                <Link href={mitreCVELink} target="_blank" className="flex items-center text-primary-600">
                                    {mitreCVE}
                                    <PiArrowSquareOut className="w-4 h-4 text-primary-500 ml-1" />
                                </Link>
                            </div>
                        </div> */}
                    </div>
                    <div className="w-[60%] border shadow-sm rounded-md px-6 py-4">
                        <Title as="h5" className="text-gray-700">CVE Details</Title>
                        <hr className="my-2" />
                        <div className="">
                            <div className="flex items-center my-2">
                                <div className="w-[30%] font-medium">CVE ID</div>
                                <div className="w-[70%]">
                                    <Badge
                                        className='capitalize h-6 mr-2'
                                        variant="flat"
                                        color='primary'
                                    >
                                        {id}
                                    </Badge>
                                </div>
                            </div>
                            <div className="flex items-center my-2">
                                <div className="w-[30%] font-medium">CVSS</div>
                                <div className="w-[70%]">
                                    <Badge
                                        className='capitalize h-6 mr-2'
                                        variant="flat"
                                        color='primary'
                                    >
                                        {cvss}
                                    </Badge>
                                </div>
                            </div>
                            <div className="flex items-center my-2">
                                <div className="w-[30%] font-medium">Package Name</div>
                                <div className="w-[70%] capitalize">
                                    {/* <Badge
                                        className='capitalize h-6 mr-2'
                                        variant="flat"
                                        color='primary'
                                    > */}
                                        {packageName}
                                    {/* </Badge> */}
                                </div>
                            </div>
                            <div className="flex items-center my-2">
                                <div className="w-[30%] font-medium">Package Version</div>
                                <div className="w-[70%]">
                                    <Badge
                                        className={`capitalize h-6 mr-2 bg-gray-200 text-gray-700`}
                                        variant="flat"
                                        color='info'
                                    >
                                        {packageVersion || ''}
                                    </Badge>
                                </div>
                            </div>
                            <div className="flex items-center my-2">
                                <div className="w-[30%] font-medium">Fix Version</div>
                                <div className="w-[70%]">
                                    <Badge
                                        className={`capitalize h-6 mr-2 bg-gray-200 text-gray-700`}
                                        variant="flat"
                                        color='info'
                                    >
                                        {fixedVersion || ''}
                                    </Badge>
                                </div>
                            </div>
                            <div className="flex items-center my-2">
                                <div className="w-[30%] font-medium">Published Date</div>
                                <div className="w-[70%]">
                                    {publishedDate}
                                </div>
                            </div>
                            <div className="flex items-center my-2">
                                <div className="w-[30%] font-medium">Last Modified</div>
                                <div className="w-[70%]">
                                    {lastModifiedDate}
                                </div>
                            </div>
                            <div className="flex items-center my-2">
                                <div className="w-[30%] font-medium">Vector</div>
                                <div className="w-[70%]">
                                    {Vector}
                                </div>
                            </div>
                            <div className="flex items-center my-2">
                                <div className="w-[30%] font-medium">CWE ID</div>
                                <div className="w-[70%]">
                                    <Link href={cweLink} target="_blank" className="flex items-center text-primary-600">
                                        {cwe}
                                        <PiArrowSquareOut className="w-4 h-4 text-primary-500 ml-1" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FindingPopUp