'use client'
import React from 'react'
import ImageUploadButton from '@/match-app/app/components/ImageUploadButton'
import { useRouter } from 'next/navigation';
import { addImage } from '@/match-app/app/actions/userActions'
import { CloudinaryUploadWidgetResults } from 'next-cloudinary'
import { toast } from 'react-toastify'

const MemberPhotoUpload = () => {
    const router = useRouter()

    const onAddImage = async (result: CloudinaryUploadWidgetResults) => {
        if(result.info && typeof result.info === 'object') {
            await addImage(result.info.secure_url, result.info.public_id)
            router.refresh();
        }
        else {
            toast.error('Problem adding image')
        }
    } 
  return (
     <div className="pt-5 pl-5">
            <ImageUploadButton  onUploadImage={onAddImage}/>
        </div>
  )
}

export default MemberPhotoUpload