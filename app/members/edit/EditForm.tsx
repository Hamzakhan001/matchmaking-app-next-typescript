'use client'

import { Member } from '../../lib/generated/prisma';
import { MemberEditSchema, memberEditSchema } from '@/lib/schmeas/memberEditSchema';
import { Button, Input, Textarea } from '@nextui-org/react';
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';


type Props = {
    member: Member

}

function EditForm({member}: Props) {
  const {register, handleSubmit, reset, formState: 
    {isValid, isDirty, isSubmitting, errors}
  } = useForm<MemberEditSchema>({
    resolver: zodResolver(memberEditSchema),
    mode: 'onTouched'
  })

  useEffect(() => {
    if(member) {
        reset({
            name: member.name,
            description: member.description,
            city: member.city,
            country: member.country
        })
    }
  },[member, reset])


  const onSubmit = (data: MemberEditSchema) => {
    console.log(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col space-y-4'>
        <Input 
            label = 'Name'
            variant = 'bordered'
            {...register('name')}
            defaultValue = {member.name}
            isInvalid= {!!erors.name}
            errorMessage = {errors.name?.message}
        />
        <Textarea 
        label = 'Description'
            variant = 'bordered'
            {...register('description')}
            defaultValue = {member.description}
            isInvalid= {!!erors.description}
            errorMessage = {errors.description?.message}
            minRows= {6}
        
        />
        <div className='flex flex-row gap-4'>
             <Input 
            label = 'City'
            variant = 'bordered'
            {...register('city')}
            defaultValue = {member.city}
            isInvalid= {!!erors.city}
            errorMessage = {errors.city?.message}
        />
         <Input 
            label = 'Country'
            variant = 'bordered'
            {...register('country')}
            defaultValue = {member.country}
            isInvalid= {!!erors.country}
            errorMessage = {errors.country?.message}
        />
        </div>
        <Button type="submit" className='flex self-end' variant='solid' isDisabled={!isValid || !isDirty}
        isLoading= {isSubmitting} color='secondary'
        >
            Update Profile
        </Button>
    </form>
  )
}

export default EditForm