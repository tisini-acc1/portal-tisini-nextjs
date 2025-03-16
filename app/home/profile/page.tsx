"use client";

import ProfileBio from "@/components/profile/profile-bio";
import ProfileCert from "@/components/profile/profile-cert";
import ImageAvatar from "@/components/profile/image-avatar";
import ProfileImage from "@/components/profile/profile-image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { getTournaments } from "@/actions/php-actions";

const ProfilePage = () => {
  const { data } = useQuery({
    queryKey: ["usrTournaments"],
    queryFn: () => getTournaments(),
  });

  console.log(data);

  return (
    <main>
      <Tabs defaultValue="bio" className="w-full">
        <header className="h-24 bg-wallet bg-center bg-no-repeat bg-cover rounded-md relative">
          <div className="absolute top-1/4 left-0">
            <ImageAvatar />
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
        <TabsContent value="img">
          <ProfileImage />
        </TabsContent>
        <TabsContent value="cert">
          <ProfileCert />
        </TabsContent>
      </Tabs>
    </main>
  );
};

export default ProfilePage;
