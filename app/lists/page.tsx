import React from 'react'
import { fetchCurrentUserLikes, fetchLikedMembers } from '@/match-app/app/actions/likeActions'
import ListTab from './ListTab'

const page = async ({searchParams}: {searchParams:{type:string}}) => {

    const likeIds = await fetchCurrentUserLikes()
    const members = await fetchLikedMembers(searchParams.type);
  return (
    <div>
        <ListTab members={members} likeIds={likeIds} />
    </div>
  )
}

export default page