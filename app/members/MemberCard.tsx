import React from 'react'
import { Member } from '../../lib/generated/prisma';
import { Card, CardFooter, Image } from '@nextui-org/react';

type Props = {
    member: Member
}

const MemberCard = ({ member }: Props) => {
    return (
        <Card fullwidth>
            <Image
                isZoomed
                alt={member.name}
                width={300}
                src={member.image || 'https://via.placeholder.com/300'}
                className='aspect-square object-cover'
            />
            <CardFooter>
                <div className='flex flex-col text-white'>
                    <span className='font-semibold'>{member.name}</span>
                    <span className='text-sm'>{member.city}</span>

                </div>
            </CardFooter>
        </Card> >
  )
}

export default MemberCard