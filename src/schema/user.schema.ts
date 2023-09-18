import {TypeOf, object, string} from 'zod';

export const createUserSchema = object({
    body: object({
        name: string({
            required_error: "Name is required"
        }),
        email: string({
            required_error: "Email is required"
        }).email("Not a valid email"),
        password: string({
            required_error: "Password is required"
        }).min(6).max(12),
        passwordConfirmation: string({
            required_error: "PasswordConfirmation is required"
        })
    }).refine((data) => data.password === data.passwordConfirmation, {
        message: "Passwords do not match",
        path: ["passwordConfirmation"]
    })
})

export type createUserInput = Omit<TypeOf<typeof createUserSchema>['body'], "passwordConfirmation">
