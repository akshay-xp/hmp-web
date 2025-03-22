import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

const changePasswordFormSchema = z
  .object({
    currentPassword: z.string().nonempty("Current password cannot be empty"),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/\d/, "Password must contain at least one number")
      .regex(
        /[^A-Za-z0-9]/,
        "Password must contain at least one special character"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match. Please re-enter your password",
    path: ["confirmPassword"],
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: "New password must be different from the current password",
    path: ["newPassword"],
  })

export type ChangePasswordFormData = z.infer<typeof changePasswordFormSchema>
export const changePasswordFormResolver = zodResolver(changePasswordFormSchema)
