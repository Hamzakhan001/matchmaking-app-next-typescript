'use client'

import {useForm} from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardBody, CardHeader, Input, Button } from "@nextui-org/react";
import { GiPadlock } from "react-icons/gi";
import { registerSchema, RegisterSchema } from "@/match-app/lib/schmeas/registerSchema";
import { registeredUser } from '@/match-app/app/actions/authActions';
import { handleFormServerErrors } from '@/match-app/lib/utils';


const RegisterForm = () => {
    const {register, handleSubmit, setError, formState: {errors,isValid, isSubmitting}} = useForm<RegisterSchema>({
        resolver: zodResolver(registerSchema),
        mode: 'onTouched'
    })

    const onSubmit = async (data: RegisterSchema) => {
        const result = await registeredUser(data);

        if(result.status === 'success') {
            console.log('User registered successfully', result.data);
        } else {
            handleFormServerErrors(result, setError)
        }
    }

  return (
     <Card className="w-2/5 mx-auto">
        <CardHeader className="flex flex-col items-center justify-center">
            <div className="flex flex-col gap-2 items-center text-secondary">
                <div className="flex flex-row items-center gap-3">
                    <GiPadlock size={30} />
                    <h1 className="text-3xl font-semibold">Register</h1>
                </div>
                <p className="text-neutral-500">Welcome back to match</p>
            </div>
        </CardHeader>
        <CardBody>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-4">
                    <Input 
                    defaultValue=""
                    label="Email"
                    variant= "bordered"
                    {...register('email')}
                    isInvalid={!!errors.email}
                    errorMessage={errors.email?.message}
                    />
                    <Input 
                    defaultValue=""
                    label="Password"
                    variant= "bordered"
                    type="password"
                    {...register('password')}
                    isInvalid={!!errors.password}
                    errorMessage={errors.password?.message}
                    />
                    {errors.root?.serverError && (
                        <p className="text-red-500 text-sm">{errors.root.serverError.message}</p>
                    )}
                    <Button isDisabled={!isValid} isLoading={isSubmitting} fullWidth color="secondary" type="submit">
                        Register
                    </Button>
                </div>
            </form>
        </CardBody>
    </Card>
  )
}

export default RegisterForm