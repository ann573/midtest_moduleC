import * as z from "zod";

export const registerSchema = z
  .object({
    email: z.string().email("Phải là email"),
    password: z.string().min(6, "Tối thiểu 6 ký tự"),
    confirmPassword: z.string().min(6, "Tối thiểu 6 ký tự"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords không trùng nhau",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z.string().email("Phải là email"),
  password: z.string().min(6, "Tối thiểu 6 ký tự"),
});
