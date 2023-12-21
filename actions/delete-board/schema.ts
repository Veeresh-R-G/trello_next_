import {z} from "zod";

export const DeleteBoard = z.object({

    id: z.string({
        required_error: "Board id is required",
        invalid_type_error: "Board id must be a string",
    }),

})