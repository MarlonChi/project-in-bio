import { Metadata } from "next";

import { Header } from "@/app/components/landing-page/header";
import PlanButtons from "./plan-buttons";

export const metadata: Metadata = {
  title: "ProjectInBio - Upgrade",
  description: "ProjectInBio - A plataforma de gestão de projetos em biologia.",
};

const Upgrade = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-4">
      <Header />
      <h2 className="text-2xl font-bold">Escolha o plano</h2>
      <PlanButtons />
    </div>
  );
};

export default Upgrade;
