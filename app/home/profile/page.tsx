"use client";

import ProfileBio from "@/components/profile/profile-bio";
import ProfileCert from "@/components/profile/profile-cert";
import ImageAvatar from "@/components/profile/image-avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ProfilePage = () => {
  return (
    <main>
      <Tabs defaultValue="bio" className="w-full">
        <header className="h-24 bg-wallet bg-center bg-no-repeat bg-cover rounded-md relative">
          <div className="absolute top-1/4 left-0">
            <ImageAvatar />
          </div>
          <TabsList className="absolute bottom-0 right-0">
            <TabsTrigger value={"bio"}>Bio Data</TabsTrigger>
            <TabsTrigger value={"cert"}>Certification</TabsTrigger>
          </TabsList>
        </header>

        <TabsContent value="bio">
          <ProfileBio />
        </TabsContent>

        <TabsContent value="cert">
          <ProfileCert />
        </TabsContent>
      </Tabs>
    </main>
  );
};

export default ProfilePage;
