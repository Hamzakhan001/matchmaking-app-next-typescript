import { CardHeader, Divider, CardBody } from "@nextui-org/react";
import Image from "next/image";
import EditForm from "../EditForm";
import StarButton from "@/match-app/app/components/StarButton";
import { getAuthUserId } from "@/match-app/app/actions/authActions";
import { getMemberPhotosByUserId } from "@/match-app/app/actions/memberActions";

const page = async () => {
  const userId = await getAuthUserId();
  const photos = await getMemberPhotosByUserId(userId);

  return (
    <div>
      <CardHeader className="text-2xl font-semibold text-secondary">
        Edit Profile
      </CardHeader>
      <Divider />
      <CardBody>
        <div className="grid grid-cols-5 gap-3 p-5">
          {photos &&
            photos?.map((photo) => (
              <div key={photo.id} className="relative">
                <Image
                  width={220}
                  height={220}
                  src={photo.url}
                  alt="Image of the user"
                />

                <div className="absolute top-3 left-3 z-50">
                  <StarButton selected={true} loading={false} />
                </div>
                <div className="absolute top-3 right-3 z-50">
                  <StarButton selected={false} loading={false} />
                </div>
              </div>
            ))}
        </div>
      </CardBody>
    </div>
  );
};

export default page;
