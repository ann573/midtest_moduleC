import * as z from 'zod'

export const productSchema = z.object({
    title: z.string().min(3),
    price: z.number().positive("Giá cần lớn hơn 0"),
    description: z.string().optional(),
    category: z.string(),
})