'use client';

import ModalButton from '@/app/shared/modal-button';
import {
    AddModelSchema,
    addModelSchema
} from '@/utils/validators/add-model.schema';
import { useState } from 'react';
import { PiPlusCircleBold, PiXBold } from 'react-icons/pi';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ActionIcon } from '@/components/ui/action-icon';
import { Title } from '@/components/ui/text';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { Textarea } from '@/components/ui/text-area';

export default function AddModelInfo({
    onAddKeySubmit,
    disabled,
    ...otherProps
}: any) {
    return (
        <ModalButton
            label="Add Model"
            view={
                <AddKeyFrom
                    onAddKeySubmit={onAddKeySubmit}
                />
            }
            customSize="600px"
            disabled={disabled}
            icon={<PiPlusCircleBold className="mr-1.5 h-[20px] w-[20px]" />}
            {...otherProps}
        />
    );
}

const AddKeyFrom = ({ onAddKeySubmit }: any) => {
    const { closeModal } = useModal();
    const [reset, setReset] = useState({});
    const [isLoading, setLoading] = useState(false);

    // const router = useRouter();

    const onSubmit = async (data: any) => {
        closeModal();
        const formData = {
            modelName: data?.modelName?.trim(),
            modelDescription: data?.modelDescription?.trim(),
            createtedAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        }
        setLoading(true)
        onAddKeySubmit(formData)
        setLoading(false)
        setReset({});
    }

    return (
        <Form<AddModelSchema>
            resetValues={reset}
            onSubmit={onSubmit}
            validationSchema={addModelSchema}
            className="grid grid-cols-1 gap-6 p-6 @container md:grid-cols-2 [&_.rizzui-input-label]:font-medium [&_.rizzui-input-label]:text-gray-900"
        >
            {({ register, control, watch, formState: { errors } }) => {
                return (
                    <>
                        <div className="col-span-full flex items-start justify-between">
                            <Title as="h4" className="font-semibold text-gray-600">
                                Add Model
                                <br />
                                {/* <span className="text-sm text-gray-400 font-normal">Select Your Machine Learning Platform</span> */}
                            </Title>
                            <ActionIcon size="sm" variant="text" onClick={closeModal}>
                                <PiXBold className="h-auto w-5" />
                            </ActionIcon>
                        </div>

                        <Input
                            label="Model Name"
                            color="info"
                            labelClassName='text-gray-700'
                            placeholder="Enter policy name"
                            className="col-span-full [&>label>span]:font-normal border-gray-300 ring-gray-300 text-gray-500"
                            inputClassName="text-sm h-11 ring-[0.6] border-gray-300 ring-gray-300 text-base text-gray-500"
                            {...register('modelName')}
                            error={errors.modelName?.message}
                        />
                        <Textarea
                            label="Description"
                            color="info"
                            labelClassName='text-gray-700'
                            placeholder="Enter description"
                            className="col-span-full [&>label>span]:font-normal border-gray-300 ring-gray-300 text-gray-500"
                            textareaClassName="text-sm h-16 min-h-11 ring-[0.6] border-gray-300 ring-gray-300 text-base text-gray-500"
                            {...register('modelDescription')}
                            error={errors.modelDescription?.message}
                        />

                        <div className="col-span-full flex items-center justify-end gap-4 mt-16">
                            <Button
                                variant="outline"
                                onClick={closeModal}
                                className="w-full @xl:w-auto h-10 text-sm"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                color="info"
                                isLoading={isLoading}
                                buttonStyles="h-10 !text-sm"
                            >
                                Add
                            </Button>
                        </div>
                    </>
                );
            }}
        </Form>
    );
}


