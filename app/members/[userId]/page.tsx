import { notFound } from 'next/navigation';
import React from 'react'
import { getMemberByUserId } from '../../actions/memberActions';

const MemberDetailedPage = async ({params}: {params: {userId: string}}) => {

    const member = await getMemberByUserId(params.userId);
    if(!member) {
        return notFound();
    }
  return (
    <div>
      <h1>{member.name}</h1>
      <p>{member.bio}</p>
    </div>
  )
}

export default MemberDetailedPage