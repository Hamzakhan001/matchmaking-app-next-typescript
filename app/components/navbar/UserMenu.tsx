'use client'

import { Session } from 'next-auth';
import { 
  Dropdown, 
  DropdownTrigger, 
  Avatar, 
  DropdownItem, 
  DropdownSection, 
  DropdownMenu 
} from "@nextui-org/react";

import React from 'react'
import { signOutUser } from '@/match-app/app/actions/authActions';

type Props = {
    user: Session['user']
}

const UserMenu = ({user}: Props) => {
  return (
    <Dropdown placement="bottom-end">
        <DropdownTrigger>
            <Avatar 
              isBordered
              as='button'
              className='transition-transform'
              color='secondary'
              name={user?.name || 'user'}
              size='sm'
              src={user?.image || '/images/user.png'}
            />
        </DropdownTrigger>

        <DropdownMenu variant='flat' aria-label='User actions menu'>
            
            <DropdownSection showDivider>
                <DropdownItem 
                  key='signInAs' 
                  isReadOnly 
                  as='span' 
                  className='h-14 flex flex-row'
                  aria-label='User info'
                >
                    Signed in as {user?.name || 'user'}
                </DropdownItem>
            </DropdownSection>

            <DropdownItem key='editProfile'>
                Edit Profile
            </DropdownItem>

            <DropdownItem 
              color='danger' 
              key='logOut' 
              onPress={async () => signOutUser()}
            >
                Logout
            </DropdownItem>
    
        </DropdownMenu>
    </Dropdown>
  )
}

export default UserMenu