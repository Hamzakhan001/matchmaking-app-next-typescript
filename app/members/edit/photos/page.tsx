import { CardHeader, Divider, CardBody } from "@nextui-org/react";
import EditForm from "../EditForm";

const page = () => {
  return (
    <div>
      <CardHeader className="text-2xl font-semibold text-secondary">
        Edit Profile
      </CardHeader>
      <Divider />
      <CardBody>
        Photos
      </CardBody>
    </div>
  );
};

export default page;
