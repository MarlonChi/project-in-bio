import Link from "next/link";
import { Github, Instagram, Linkedin, Twitter } from "lucide-react";

import { Button } from "../ui/button";
import EditSocialLinks from "./user-card/edit-social-links";
import { ProfileData } from "@/app/server/get-profile-data";
import { AddCustomLink } from "./user-card/add-custom-link";
import { formatUrl } from "@/app/lib/utils";

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
              href={formatUrl(profileData?.socialMedias?.github)}
              target="_blank"
              className="p-3 rounded-xl bg-[#1e1e1e] hover:bg-[#2e2e2e]"
            >
              <Github />
            </Link>
          )}

          {profileData?.socialMedias?.instagram && (
            <Link
              href={formatUrl(profileData?.socialMedias?.instagram)}
              target="_blank"
              className="p-3 rounded-xl bg-[#1e1e1e] hover:bg-[#2e2e2e]"
            >
              <Instagram />
            </Link>
          )}

          {profileData?.socialMedias?.linkedin && (
            <Link
              href={formatUrl(profileData?.socialMedias?.linkedin)}
              target="_blank"
              className="p-3 rounded-xl bg-[#1e1e1e] hover:bg-[#2e2e2e]"
            >
              <Linkedin />
            </Link>
          )}
          {profileData?.socialMedias?.twitter && (
            <Link
              href={formatUrl(profileData?.socialMedias?.twitter)}
              target="_blank"
              className="p-3 rounded-xl bg-[#1e1e1e] hover:bg-[#2e2e2e]"
            >
              <Twitter />
            </Link>
          )}
          <EditSocialLinks socialMedias={profileData?.socialMedias} />
        </div>
      </div>
      <div className="flex flex-col gap-3 w-full h-[172px]">
        <div className="w-full flex flex-col items-center gap-3">
          {profileData?.link1 && (
            <Link
              href={formatUrl(profileData.link1.url)}
              target="_blank"
              className="w-full"
            >
              <Button className="w-full">{profileData.link1.title}</Button>
            </Link>
          )}
          {profileData?.link2 && (
            <Link
              href={formatUrl(profileData.link2.url)}
              target="_blank"
              className="w-full"
            >
              <Button className="w-full">{profileData.link2.title}</Button>
            </Link>
          )}
          {profileData?.link3 && (
            <Link
              href={formatUrl(profileData.link3.url)}
              target="_blank"
              className="w-full"
            >
              <Button className="w-full">{profileData.link3.title}</Button>
            </Link>
          )}
        </div>
      </div>
      <AddCustomLink />
    </div>
  );
};
