// schemas/addressSchema.ts
import { z } from "zod";

export const addressSchema = z
    .object({
        firstName:   z.string().nonempty("First name is required"),
        lastName:    z.string().nonempty("Last name is required"),
        email:       z.string().email("Invalid email address"),
        password:    z
            .string()
            .min(8, "Password must be at least 8 characters")
            .regex(/[A-Z]/, "Must contain an uppercase letter")
            .regex(/[0-9]/, "Must contain a number")
            .regex(/[^A-Za-z0-9]/, "Must contain a special character"),
        yearOfBirth: z.string().nonempty("Year of birth is required"),
        gender:      z.string().nonempty("Gender is required"),
        country:     z.string().nonempty( "Country is required"),
        state:       z.string().nonempty("State/Province is required"),
        zipCode:     z.string().nonempty("ZIP/postal code is required"),
    })
    .superRefine((data, ctx) => {
        // ✅ Validate age
        const birthYear = parseInt(data.yearOfBirth, 10);
        const currentYear = new Date().getFullYear();
        const age = currentYear - birthYear;

        if (isNaN(birthYear) || age < 13) {
            ctx.addIssue({
                path: ["yearOfBirth"],
                code: z.ZodIssueCode.custom,
                message: "You must be at least 13 years old to register",
            });
        }
    });

// Export a TS type if you like:
export type AddressForm = z.infer<typeof addressSchema>;
