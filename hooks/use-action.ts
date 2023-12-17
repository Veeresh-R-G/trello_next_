import { useState, useCallback } from "react";  

import { ActionState, FieldError } from "@/lib/create-safe-action";


type Action<TInput,TOutput> = (data: TInput) => Promise<ActionState<TInput,TOutput>>;

interface UseActionOptions<TOutput>{
    onSuccess?: (data: TOutput) => void;
    onError?: (error: string) => void;
    onComplete?: () => void;
}

export const UseAction = <TInput, TOutput>(
    action: Action<TInput, TOutput>,
    options: UseActionOptions<TOutput> = {}
) => {


    //All States to set up the 
    const [fieldErrors, setFieldErrors] = useState<FieldError<TInput> | undefined>(undefined);

    const [error, setErrors] = useState<string | undefined>(undefined)

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [data, setData] = useState<TOutput | undefined>(undefined)

    const execute = useCallback(
        async(input: TInput) => {
            setIsLoading(true);
            try{
                const result = await action(input);

                if(!result){
                    return;
                }

                
                setFieldErrors(result.fieldErrors);
                

                if(result.error){
                    setErrors(result.error)
                    options.onError?.(result.error)
                }

                if(result.data){
                    setData(result.data)
                    options.onSuccess?.(result.data)
                }
            }
           finally{
            setIsLoading(false);
            options.onComplete?.()
           }
        },
        [action,options]
    );

    return {
        execute,
        fieldErrors,
        error,
        data,
        isLoading
    };
}