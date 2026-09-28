
import { z as zod} from "zod";


export const createPostSchema = zod.object({
    title : zod.string().trim().min(3).max(255),
    content : zod.string().trim().min(10),
    status: zod.enum(["draft", "published"]).default("draft"),
    coverImage: zod.url().optional()
});



export const updatePostSchema = zod.object({
    title : zod.string().trim().min(3).max(255).optional(),
    content : zod.string().trim().min(10).optional(),
    status: zod.enum(["draft", "published"]).optional(),
    coverImage: zod.url().optional()
}).refine()

