import { CardHeader, Divider, CardBody } from "@nextui-org/react";
import Image from "next/image";
import EditForm from "../EditForm";
import StarButton from "@/match-app/app/components/StarButton";
import { getAuthUserId } from "@/match-app/app/actions/authActions";
import { getMemberByUserId, getMemberPhotosByUserId } from "@/match-app/app/actions/memberActions";
import ImageUploadButton from "@/match-app/app/components/ImageUploadButton";
import MemberPhotoUpload from "./MemberPhotoUpload";
import MemberImage from "@/match-app/app/components/MemberImage";
import MemberPhotos from "@/match-app/app/components/MemberPhotos";

const page = async () => {
  const userId = await getAuthUserId();
  const member = await getMemberByUserId(userId)
  const photos = await getMemberPhotosByUserId(userId);

  return (
    <div>
      <CardHeader className="text-2xl font-semibold text-secondary">
        Edit Profile
      </CardHeader>
      <Divider />
      <CardBody>
        <MemberPhotoUpload />
       <MemberPhotos photos={photos} editing={true} mainImageUrl= {member.image}/>
      </CardBody>
    </div>
  );
};

export default page;
