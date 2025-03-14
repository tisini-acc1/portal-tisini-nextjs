import ProfileBio from "@/components/profile/profile-bio";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";

const ProfilePage = () => {
  return (
    <main>
      <Tabs defaultValue="bio" className="w-full">
        <header className="h-24 bg-wallet bg-center bg-no-repeat bg-cover rounded-md relative">
          <div className="absolute top-1/4 left-0">
            <Image
              src={"/avatar.webp"}
              alt="profile"
              width={100}
              height={100}
              className="rounded-full"
            />
          </div>
          <TabsList className="absolute bottom-0 right-0">
            <TabsTrigger value={"bio"}>Bio Data</TabsTrigger>
            <TabsTrigger value={"img"}>Image</TabsTrigger>
            <TabsTrigger value={"cert"}>Certification</TabsTrigger>
          </TabsList>
        </header>

        <TabsContent value="bio">
          <ProfileBio />
        </TabsContent>
        <TabsContent value="img">Image</TabsContent>
        <TabsContent value="cert">Certifications</TabsContent>
      </Tabs>
    </main>
  );
};

export default ProfilePage;
