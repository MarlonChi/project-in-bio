import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Metadata } from "next";

import { ProjectCard } from "@/app/components/commons/project-card";
import { TotalVisits } from "@/app/components/commons/total-visits";
import { UserCard } from "@/app/components/commons/user-card";
import {
  getProfileData,
  getProfileProjects,
} from "@/app/server/get-profile-data";
import { auth } from "@/app/lib/auth";
import { NewProject } from "./new-project";
import { getDownloadURLFromPath } from "@/app/lib/firebase";
import { increaseProfileVisits } from "@/app/actions/increase-profile-visits";

export const metadata: Metadata = {
  title: "ProjectInBio - Perfil",
  description: "ProjectInBio - A plataforma de gestão de projetos em biologia.",
};

const ProfilePage = async ({
  params,
}: {
  params: Promise<{ profileId: string }>;
}) => {
  const { profileId } = await params;

  const profileData = await getProfileData(profileId);

  if (!profileData) return notFound();

  const projects = await getProfileProjects(profileId);

  const session = await auth();

  const isOwner = profileData.userId === session?.user?.id;

  if (!isOwner) {
    await increaseProfileVisits(profileId);
  }

  if (isOwner && !session?.user.isSubscribed && !session?.user.isTrial) {
    redirect(`/${profileId}/upgrade`);
  }

  return (
    <div className="relative h-screen flex p-20 overflow-hidden">
      {session?.user.isTrial && !session.user.isSubscribed && (
        <div className="fixed top-0 left-0 w-full flex justify-center items-center gap-1 py-2 bg-background-tertiary">
          <span>Você está usando a versão trial.</span>
          <Link href={`/${profileId}/upgrade`}>
            <button className="text-accent-green font-bold">
              Faça o upgrade agora!
            </button>
          </Link>
        </div>
      )}
      <div className="w-1/2 flex justify-center h-min">
        <UserCard profileData={profileData} isOwner={isOwner} />
      </div>
      <div className="w-ful flex justify-center content-start gap-4 flex-wrap overflow-y-auto">
        {projects.map(async (project) => (
          <ProjectCard
            key={project.id}
            project={project}
            isOwner={isOwner}
            img={await getDownloadURLFromPath(project.imagePath)}
          />
        ))}

        {isOwner && <NewProject profileId={profileId} />}
      </div>
      <div className="absolute bottom-4 right-0 left-0 w-min mx-auto">
        <TotalVisits totalVisits={profileData.totalVisits} showBar />
      </div>
    </div>
  );
};

export default ProfilePage;
