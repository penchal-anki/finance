import { PiCloudBold } from "react-icons/pi"
import { Title } from "rizzui"
import { Button } from "./ui/button"
import Link from "next/link"

const ConnectPlatforms = () => {
    return (
        <div className='flex justify-center items-center h-[50vh] flex-col'>
            <Title as="h5" className='text-gray-700'>No Connections Found</Title>
            <div className='text-gray-700 py-2'>Connect your platform to unlock models</div>
            <div>
                <Link href="/integrations">
                    <Button
                        type="submit"
                        color="primary"
                        buttonStyles="h-10 !text-sm"
                    >
                        <PiCloudBold className="w-5 h-5 mr-2" />
                        Connect Platforms
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default ConnectPlatforms;