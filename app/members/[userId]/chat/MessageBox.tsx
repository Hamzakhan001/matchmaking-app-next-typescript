import React from 'react'
import { MessageDto } from '@/match-app/lib/types';
import clsx from 'clsx'


type Props = {
    message: MessageDto;
    currentUserId: string;
}


const MessageBox = async ({message, currentUserId}: Props) => {
    const isCurrentUserSender = message.senderId === currentUserId;

  return (
    <div className='grid grid-rows-1'>
        <div className={clsx('flex gap-2 mb-3', 
        {
            'justify-end text-right': isCurrentUserSender,
            'justify-start': !isCurrentUserSender
            
        })}>
            

        </div>
    </div>
  )
}

export default MessageBox