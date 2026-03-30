'use client'

import { useRouter } from 'next/router';
import React from 'react'
import { toggleLikeMember } from '../actions/likeActions';
import { px } from 'framer-motion';


type Props = {
    targetId: string;
    hasLiked: string;
}



const LikeButton = ({targetId, hasLiked}: Props) => {
    const router = useRouter();

    async function toggleike(){
        await toggleLikeMember(targetId, hasLiked)
        router.refresh();
    }
    
  return (
    <div onClick={toggleike} className='relative hover:opacity-80 transition cursor-pointer'>
        <AiOutlineHeart size={30} className={'fill-white absolute -top-[2px] -right-2[px]'} />
        <AiFillHeart size={24} className={hasLiked? 'fill-rose-500': 'fill-neutral-500/70'}
    </div>
  )
}

export default LikeButton