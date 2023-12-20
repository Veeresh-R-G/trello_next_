"use client";

import { createBoard } from "@/actions/create-board"
import { FormInput } from "@/components/forms/form-input"
import { UseAction } from "@/hooks/use-action"
import { FormSubmit } from "@/components/forms/form-submit";
export const FORM = () => {

    const { execute, fieldErrors } = UseAction(createBoard, {
        onSuccess: (data): void => {
            console.log(data, "Success")
        },

        onError: (error) => {
            console.error("Error", error)
        }
    })

    const onSubmit = (formData: FormData) => {
        console.log("Hola")
        const title = formData.get("title") as string;
        const image = formData.get("image") as string;

        execute({ title, image })
    }
    return (
        <form action={onSubmit}>
            <div className="flex flex-col space-y-2">
                <FormInput
                    label="Board Title"
                    id="title"
                    errors={fieldErrors} />
            </div>
            <FormSubmit>
                Save
            </FormSubmit>
        </form>
    )
}