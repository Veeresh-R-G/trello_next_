"use client";

import { Button } from '@/components/ui/button';
import React, { useState } from 'react'
import { Board } from '@prisma/client'
import { FormInput } from '@/components/forms/form-input';
import { UseAction } from '@/hooks/use-action';
import { updateBoard } from '@/actions/update-board';
import { toast } from 'sonner';
interface BoardTitleFormProps {
  data: Board
};
function BoardTitleForm({ data }: BoardTitleFormProps) {

  const [isEditing, setisEditing] = useState<boolean>(false)
  const [title, setTitle] = useState<string>(data.title)
  const inputRef = React.useRef<HTMLInputElement>(null);
  const formRef = React.useRef<HTMLFormElement>(null);

  const { execute } = UseAction(updateBoard, {
    onSuccess: (data) => {
      toast.success("Board updated successfully");
      setTitle(data.title);
      disableEditing();
    },
    onError: (error) => {
      toast.error(error);
    }
  })

  const disableEditing = () => {
    setisEditing(false);
  }

  const enableEditing = () => {
    setisEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    }, 0);
  }
  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;

    execute({
      title,
      id: data.id,
    });
  };

  const onBlur = () => {
    formRef.current?.requestSubmit();
  };
  if (isEditing) {
    return (
      <form action={onSubmit} ref={formRef} className="flex items-center gap-x-2">
        <FormInput
          ref={inputRef}
          id="title"
          onBlur={onBlur}
          defaultValue={title}
          className="text-lg font-bold px-[7px] py-1 h-7 bg-transparent focus-visible:outline-none focus-visible:ring-transparent border-none"
        />
      </form>
    )
  }

  return (
    <div>
      <Button onClick={enableEditing} variant={"transparent"} className="font-bold text-lg h-auto w-auto p-1 px-2">
        {title}
      </Button>

    </div>
  )
}

export default BoardTitleForm