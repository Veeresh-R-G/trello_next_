
import {z} from "zod"

//Generic Errors 
export type FieldError<T> = {
    [K in keyof T]?: string[]
};


export type ActionState<TInput, TOutput> = {
    fieldErrors?: FieldError<TInput>;
    error?: string | null;
    data?: TOutput;
}


export const createSafeAction = <TInput, TOutput>(
    schema: z.Schema<TInput>,
    handler: (validatedData: TInput) => Promise<ActionState<TInput,TOutput>>
) => {
    return async(data: TInput) : Promise<ActionState<TInput,TOutput>> =>{
        const validationResult = schema.safeParse(data);

        // Zod Validation failed
        if(!validationResult.success){
            return {
                fieldErrors: validationResult.error.flatten().fieldErrors as FieldError<TInput>
            };
        }

        return handler(validationResult.data)

    }
}