import { notFound } from "next/navigation";
import React from "react";
import { getMemberByUserId } from "../../actions/memberActions";
import { Card, CardBody, Divider } from "@nextui-org/react";
import EditForm from "./EditForm";
import { getAuthUserId } from "../../actions/authActions";

const page = async() => {

    const userId = await getAuthUserId()
    const member = await getMemberByUserId(userId)

    if(!member) return notFound()
  return (
    <div>
      <CardHeader className='text-2xl font-semibold text-secondary'>Edit Profile</CardHeader>
      <Divider />
      <CardBody>
        <EditForm member= {member}/>
      </CardBody>

    </div>
  )
}

export default page