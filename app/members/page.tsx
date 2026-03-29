import { getMembers } from '../actions/memberActions';


const MmebersPage = async() => {

  const members = await getMembers();

  return (
    <div className='mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {members && members.map((member) => (
          <li key={member.id}>{member.name}</li>
        ))}
    </div>
  )
}

export default MmebersPage