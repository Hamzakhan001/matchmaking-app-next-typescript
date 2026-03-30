import React from 'react'
import { Member } from '../../lib/generated/prisma';
import { Card, CardFooter, Image, Link } from '@nextui-org/react';
import { calculateAge } from '@/match-app/lib/utils';

type Props = {
    member: Member
}

const MemberCard = ({ member }: Props) => {
    return (
        <Card fullwidth
            as={Link}
            href={`/members/${member.userId}`}
            isPressable
        >
            <Image
                isZoomed
                alt={member.name}
                width={300}
                src={member.image || 'https://via.placeholder.com/300'}
                className='aspect-square object-cover'
            />
            <CardFooter className='flex justify-start bg-black overflow-hidden absolute bottom-0 z-10 bg-dark'>
                <div className='flex flex-col text-white'>
                    <span className='font-semibold'>{member.name} , {calculateAge(member.dateOfBirth)}</span>
                    <span className='text-sm'>{member.city}</span>
                </div>
            </CardFooter>
        </Card>
    )
}

export default MemberCard