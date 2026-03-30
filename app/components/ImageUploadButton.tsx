'use client'

import React from 'react';
import {CldUploadButton, CloudinaryUploadWidgetResults} from 'next-cloudinary';
import {HiPhoto} from 'react-icons/hi2';


type Props = {
    onUploadImage: (result: CloudinaryUploadWidgetResults) => void;
}


function ImageUploadButton({onUploadImage}: Props) {
  return (
    <CldUploadButton
    options = {{maxFiles: 1}}
    onSuccess={onUploadImage}
    signatureEndpoint='/api/sign-image'
    uploadPreset='match-demo'
    className='flex items-center gap-2 bg-secndary text-white rounded-lg py-2 px-4 hover:bg-secondary/70'
    >
        <HiPhoto size={28} />
        Upload Image

    </CldUploadButton>
  )
}

export default ImageUploadButton