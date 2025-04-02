import Link from "next/link";
import { Github, Instagram, Linkedin, Twitter, Plus } from "lucide-react";

import { Button } from "../ui/button";
import EditSocialLinks from "./user-card/edit-social-links";
import { ProfileData } from "@/app/server/get-profile-data";

// const Icons = [Github, Instagram, Linkedin, Twitter];

export const UserCard = ({ profileData }: { profileData?: ProfileData }) => {
  return (
    <div className="w-[348px] flex flex-col gap-5 items-center p-5 border border-white-10 bg-[#121212] rounded-3xl text-white">
      <div className="size-48">
        <img
          src="/me.png"
          alt="Marlon"
          className="rounded-full object-cover w-full h-full"
        />
      </div>
      <div className="flex flex-col gap-2 w-full">
        <div className="flex items-center gap-2">
          <h3 className="text-3xl font-bold min-w-0 overflow-hidden">
            Marlon Chiodelli
          </h3>
        </div>
        <p className="opacity-40">"Eu faço produtos para a Internet"</p>
      </div>
      <div className="flex flex-col gap-2 w-full">
        <span className="uppercase text-xs font-medium">Links</span>
        <div className="flex gap-3">
          {profileData?.socialMedias?.github && (
            <Link
              href={profileData?.socialMedias?.github}
              target="_blank"
              className="p-3 rounded-xl bg-[#1e1e1e] hover:bg-[#2e2e2e]"
            >
              <Github />
            </Link>
          )}

          {profileData?.socialMedias?.instagram && (
            <Link
              href={profileData?.socialMedias?.instagram}
              target="_blank"
              className="p-3 rounded-xl bg-[#1e1e1e] hover:bg-[#2e2e2e]"
            >
              <Instagram />
            </Link>
          )}

          {profileData?.socialMedias?.linkedin && (
            <Link
              href={profileData?.socialMedias?.linkedin}
              target="_blank"
              className="p-3 rounded-xl bg-[#1e1e1e] hover:bg-[#2e2e2e]"
            >
              <Linkedin />
            </Link>
          )}
          {profileData?.socialMedias?.twitter && (
            <Link
              href={profileData?.socialMedias?.twitter}
              target="_blank"
              className="p-3 rounded-xl bg-[#1e1e1e] hover:bg-[#2e2e2e]"
            >
              <Twitter />
            </Link>
          )}
          {/* {Icons.map((Icon, index) => (
            <button
              key={index}
              className="p-3 rounded-xl bg-[#1e1e1e] hover:bg-[#2e2e2e]"
            >
              <Icon />
            </button>
          ))} */}
          <EditSocialLinks socialMedias={profileData?.socialMedias} />
        </div>
      </div>
      <div className="flex flex-col gap-3 w-full h-[172px]">
        <div className="w-full flex flex-col items-center gap-3">
          <Button className="w-full">Template SaaS - Compre Agora</Button>
          <button className="p-3 rounded-xl bg-[#1e1e1e] hover:bg-[#2e2e2e]">
            <Plus />
          </button>
        </div>
      </div>
    </div>
  );
};
