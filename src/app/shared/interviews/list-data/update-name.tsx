"use client";

import ModalButton from "@/app/shared/modal-button";
import {
  updateNameSchema,
  UpdateNameSchema,
} from "@/utils/validators/update-name-model.schema";
import { useState } from "react";
import { PiPencil, PiXBold } from "react-icons/pi";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ActionIcon } from "@/components/ui/action-icon";
import { Title, Text } from "@/components/ui/text";
import { useModal } from "@/app/shared/modal-views/use-modal";
import { Controller } from "react-hook-form";
import StatusField from "@/components/controlled-table/status-field";

const statusOptions = [
  {
    value: "Hugging Face",
    label: "Hugging Face",
  },
  {
    value: "AWS Sagemaker",
    label: "AWS Sagemaker",
  },
  {
    value: "Azure ML",
    label: "Azure ML",
  },
  {
    value: "Google Vertex AI",
    label: "Google Vertex AI",
  },
];

export default function UpdateName({
  onAddKeySubmit,
  disabled,
  recordInfo,
  updatedName,
  ...otherProps
}: any) {
  const { openModal } = useModal();

  return (
    <div
      className="flex ml-3 text-md text-gray-900 cursor-pointer break-all hover:text-primary-600 items-center"
      onClick={() => {
        openModal({
          view: (
            <AddKeyFrom
              onAddKeySubmit={onAddKeySubmit}
              name={updatedName||recordInfo.name}
            />
          ),
          customSize: "500px",
        });
      }}
    >
      {updatedName || recordInfo.name}
      <div className="w-6 h-6 flex justify-center items-center">
      <PiPencil className="w-4 h-4 ml-2" />
      </div>
    </div>
  );
}

function renderOptionDisplayValue(value: string) {
  return (
    <div className="flex items-center">
      <Text className="ms-1.5 text-sm font-medium capitalize text-gray-700 hover:text-primary-500">
        {value}
      </Text>
    </div>
  );
}

const AddKeyFrom = ({ onAddKeySubmit, name }: any) => {
  const { closeModal } = useModal();
  const [reset, setReset] = useState({});
  const [isLoading, setLoading] = useState(false);

  const onSubmit = async (data: any) => {
    const formData = {
      interviewName: data?.name?.trim(),
    };

    setLoading(true);
    onAddKeySubmit(formData);
    setLoading(false);
    closeModal();
    setReset({});
  };

  return (
    <Form<UpdateNameSchema>
      resetValues={reset}
      onSubmit={onSubmit}
      validationSchema={updateNameSchema}
      className="grid grid-cols-1 gap-6 p-6 @container md:grid-cols-2 [&_.rizzui-input-label]:font-medium [&_.rizzui-input-label]:text-gray-900"
      useFormProps={{
        defaultValues: { name: name || "" },
      }}
    >
      {({ register, control, watch, formState: { errors } }) => {
        console.log("errors", errors);
        return (
          <>
            <div className="col-span-full flex items-start justify-between">
              <Title as="h4" className="font-semibold text-gray-600">
                Update Interview Name
                <br />
                {/* <span className="text-sm text-gray-400 font-normal">
                            Select Your Machine Learning Platform
                        </span> */}
              </Title>
              <ActionIcon size="sm" variant="text" onClick={closeModal}>
                <PiXBold className="h-auto w-5" />
              </ActionIcon>
            </div>

            <Controller
              name="name"
              control={control}
              render={({ field: { value, onChange } }) => (
                <Input
                  label="Interview name"
                  color="info"
                  value={value}
                  max={40}
                  placeholder="Enter interview name"
                  className="col-span-full [&>label>span]:font-medium border-gray-300 ring-gray-300 text-gray-500"
                  inputClassName="text-sm h-11 ring-[0.6] border-gray-300 ring-gray-300 text-base text-gray-500"
                  {...register("name")}
                  error={errors.name?.message}
                  onChange={(e) => onChange(e.target.value)}
                />
              )}
            />

            <div className="col-span-full flex items-center justify-end gap-4 mt-5">
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
};
