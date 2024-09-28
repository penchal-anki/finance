import ModalButton from '@/app/shared/modal-button';
import {
    closeFindingSchema,
    CloseFindingSchema
} from '@/utils/validators/finding-close.schema';
import { useState, useRef, useEffect, Fragment } from 'react'; // Import useRef and useEffect
import { PiFolderOpen, PiXBold } from 'react-icons/pi';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { ActionIcon } from '@/components/ui/action-icon';
import { Title, Text } from '@/components/ui/text';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { Textarea } from 'rizzui';
import { Popover, Transition } from '@headlessui/react';





export default function CloseFinding({
    onAddKeySubmit,
    disabled,
    ...otherProps
}: any) {
    return (
        <Popover className="relative">
            <Popover.Button className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
                <Button
                    type="submit"
                    color="info"
                    buttonStyles="h-10 !text-sm"
                >
                    <PiFolderOpen className="w-5 h-5 mr-2" />
                    Close Finding
                </Button>
            </Popover.Button>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
            >
                <Popover.Panel className="absolute left-3/4 z-10 mt-3 flex w-screen max-w-max -translate-x-3/4 px-40">
                    <div className="w-screen max-w-md flex-auto overflow-hidden rounded-md bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
                        <AddKeyFrom
                            onAddKeySubmit={onAddKeySubmit}
                        />
                    </div>
                </Popover.Panel>
            </Transition>
        </Popover>
    );
}

const AddKeyFrom = ({ onAddKeySubmit }: any) => {
    const { closeModal } = useModal();
    const [reset, setReset] = useState({});
    const [isLoading, setLoading] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null); // Create a ref for the textarea

    useEffect(() => {
        // Function to focus on textarea when modal opens
        const focusTextarea = () => {
            if (textareaRef.current) {
                textareaRef.current.focus();
            }
        };
        focusTextarea(); // Call the function when component mounts
    }, []);

    const onSubmit = async (data: any) => {
        const formData = {
            closedComments: data?.closedComments?.trim(),
        }

        setLoading(true)
        onAddKeySubmit(formData)
        setLoading(false)
        closeModal();
        setReset({});
    }

    return (
        <Form<CloseFindingSchema>
            resetValues={reset}
            onSubmit={onSubmit}
            validationSchema={closeFindingSchema}
            className="grid grid-cols-1 gap-6 p-6 @container md:grid-cols-2 [&_.rizzui-input-label]:font-medium [&_.rizzui-input-label]:text-gray-900"
        >
            {({ register, control, watch, formState: { errors } }) => {
                console.log('errors', errors);
                return (
                    <>
                        <Textarea
                            label="Close comments"
                            color="info"
                            placeholder="Comments"
                            className="z-[9999999999] col-span-full [&>label>span]:font-medium border-gray-300 ring-gray-300 text-gray-500"
                            textareaClassName="text-sm h-18 ring-[0.6] border-gray-300 ring-gray-300 text-base text-gray-500"
                            {...register('closedComments')}
                            error={errors.closedComments?.message}
                            onClick={() => {
                                console.log('clicked')
                            }}
                        />

                        <div className="col-span-full flex items-center justify-end gap-4 mt-5">
                            {/* <Button
                                variant="outline"
                                onClick={closeModal}
                                className="w-full @xl:w-auto h-10 text-sm"
                            >
                                Cancel
                            </Button> */}
                            <Button
                                type="submit"
                                color="info"
                                isLoading={isLoading}
                                buttonStyles="h-10 !text-sm"
                            >
                                Close
                            </Button>
                        </div>
                    </>
                );
            }}
        </Form>
    );
}
