import { z } from "zod"
import { isValidPhoneNumber } from "react-phone-number-input";



// Login Schema
const loginSchema = z.object({

    // Email
    email: z.string()
        .min(1, "Your email is required")
        .email("Invalid email address"),

    // Password
    password: z.string()
        .min(1, "Your password is required")
        .regex(/^(?=.*[0-9]).*$/, "Password must contain one digit from 1 to 9")
        .regex(/^(?=.*[a-z]).*$/, "Password must contain one lowercase letter")
        .regex(/^(?=.*[A-Z]).*$/, "Password must contain one uppercase letter")
        .regex(/^(?=.*\W).*$/, "Password must contain one special character")
        .regex(/^(?!.* ).*$/, "Password must not contain any spaces")
        .regex(/^.{8,25}$/, "Password must be 8-25 characters long"),
})

// Export Schema
type LoginValues = z.infer<typeof loginSchema>;

// Register Schema
const registerSchema = z.object({
    firstName: z
        .string("Please enter your first name")
        .trim()
        .min(1, "Your first name is required")
        .regex(/^[a-zA-Z]+$/, "First name can contain letters only, without spaces or symbols."),
    lastName: z
        .string("Please enter your last name")
        .trim()
        .min(1, "Your last name is required")
        .regex(/^[a-zA-Z]+$/, "Last name can contain letters only, without spaces or symbols."),
    username: z
        .string("Please enter your username")
        .trim()
        .min(1, "Your username is required"),
    email: z
        .string("Please enter your email")
        .nonempty("Your email is required")
        .email("Invalid email address"),
    password: z.string()
        .min(1, "Your password is required")
        .regex(/^(?=.*[0-9]).*$/, "Password must contain one digit from 1 to 9")
        .regex(/^(?=.*[a-z]).*$/, "Password must contain one lowercase letter")
        .regex(/^(?=.*[A-Z]).*$/, "Password must contain one uppercase letter")
        .regex(/^(?=.*\W).*$/, "Password must contain one special character")
        .regex(/^(?!.* ).*$/, "Password must not contain any spaces")
        .regex(/^.{8,25}$/, "Password must be 8-25 characters long"),
    rePassword: z.string('Please enter your password').nonempty("Your password is required"),
    phone: z.string()
        .min(1, "Phone number is required")
        .refine((data) => isValidPhoneNumber(data, "EG"), "Please enter a valid Egyptian phone number"),
}).refine((data) => data.password === data.rePassword, {
    path: ["repassword"],
    error: "Passwords do not match",
})

// Export Schema
type RegisterValues = z.infer<typeof registerSchema>;


// Forgot Password Schema
const EmailSchema = z.object({
    email: z.string('Please enter your email').nonempty("Your email is required").email("Invalid email address"),
})

// Export Schema
type EmailValues = z.infer<typeof EmailSchema>;



// Verify Schema
const verifySchema = z.object({
    resetCode: z.string('Please enter the 6-digits code').nonempty("The code is required").length(6, "The code must be 6 digits"),
})


// Export Schema
type VerifyValues = z.infer<typeof verifySchema>;

// Create Password Schema
const createPasswordSchema = z.object({
    newPassword: z.string()
        .min(1, "Your password is required")
        .regex(/^(?=.*[0-9]).*$/, "Password must contain one digit from 1 to 9")
        .regex(/^(?=.*[a-z]).*$/, "Password must contain one lowercase letter")
        .regex(/^(?=.*[A-Z]).*$/, "Password must contain one uppercase letter")
        .regex(/^(?=.*\W).*$/, "Password must contain one special character")
        .regex(/^(?!.* ).*$/, "Password must not contain any spaces")
        .regex(/^.{8,25}$/, "Password must be 8-25 characters long"),
    confirmPassword: z.string('Please enter your password').nonempty("Your password is required"),
}).refine((data) => data.newPassword === data.confirmPassword, {
    path: ["confirmPassword"],
    error: "Passwords do not match",
});


// Export Schema
type CreatePasswordValues = z.infer<typeof createPasswordSchema>;



export { loginSchema, registerSchema, verifySchema, EmailSchema, createPasswordSchema };

// Export Type
export type { LoginValues, RegisterValues, VerifyValues, EmailValues, CreatePasswordValues };