"use client";

import { ChangeEvent, startTransition, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowUpFromLine, Plus } from "lucide-react";

import { Modal } from "@/app/components/ui/modal";
import { TextInput } from "@/app/components/ui/text-input";
import { TextArea } from "@/app/components/ui/text-area";
import { Button } from "@/app/components/ui/button";
import { compressFiles } from "@/app/lib/utils";
import { createProject } from "@/app/actions/create-project";

interface NewProjectProps {
  profileId: string;
}

export const NewProject = ({ profileId }: NewProjectProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const [projectName, setProjectName] = useState<string>("");
  const [projectDescription, setProjectDescription] = useState<string>("");
  const [projectUrl, setProjectUrl] = useState<string>("");
  const [projectImage, setProjectImage] = useState<string | null>("");

  const [isCreatingProject, setIsCreatingProject] = useState<boolean>(false);

  const router = useRouter();

  const handleOpenModal = () => setIsOpen(true);

  const handleCloseModal = () => setIsOpen(false);

  const triggerImageInput = (id: string) => {
    document.getElementById(id)?.click();
  };

  const handleImageInput = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      return imageUrl;
    }

    return null;
  };

  const handleSaveProject = async () => {
    setIsCreatingProject(true);
    const imagesInput = document.getElementById(
      "imageInput"
    ) as HTMLInputElement;

    if (!imagesInput.files) return;

    const compressedFile = await compressFiles(Array.from(imagesInput.files));

    const formData = new FormData();

    formData.append("file", compressedFile[0]);
    formData.append("profileId", profileId);
    formData.append("name", projectName);
    formData.append("description", projectDescription);
    formData.append("url", projectUrl);

    await createProject(formData);

    startTransition(() => {
      setIsOpen(false);
      setIsCreatingProject(false);
      setProjectName("");
      setProjectDescription("");
      setProjectUrl("");
      setProjectImage(null);
      router.refresh();
    });
  };

  return (
    <>
      <button
        onClick={handleOpenModal}
        className="w-[340px] h-[132px] rounded-[20px] bg-background-secondary flex items-center gap-2 justify-center hover:border border-dashed"
      >
        <Plus className="size-10 text-accent-green" />
        <span>Novo projeto</span>
      </button>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className="bg-background-primary p-8 rounded-[20px] flex flex-col justify-between gap-10">
          <p className="text-white font-bold text-xl">Novo projeto</p>
          <div className="flex gap-10">
            <div className="flex flex-col items-center gap-3 text-xs">
              <div className="w-[100px] h-[100px] rounded-xl bg-background-tertiary overflow-hidden">
                {projectImage ? (
                  <img
                    src={projectImage}
                    alt={projectName ?? ""}
                    className="object-cover object-center"
                  />
                ) : (
                  <button
                    className="w-full h-full cursor-pointer"
                    onClick={() => triggerImageInput("imageInput")}
                  >
                    100x100
                  </button>
                )}
              </div>
              <button
                className="text-white flex items-center gap-2 cursor-pointer"
                onClick={() => triggerImageInput("imageInput")}
              >
                <ArrowUpFromLine className="size-4" />
                <span>Adicionar imagem</span>
              </button>
              <input
                type="file"
                id="imageInput"
                accept="image/*"
                className="hidden"
                onChange={(e) => setProjectImage(handleImageInput(e))}
              />
            </div>
            <div className="flex flex-col gap-4 w-[293px]">
              <div className="flex flex-col gap-1">
                <label htmlFor="project-name" className="text-white font-bold">
                  Titulo do projeto
                </label>
                <TextInput
                  id="project-name"
                  placeholder="Digite o nome do projeto"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="project-description"
                  className="text-white font-bold"
                >
                  Descrição do projeto
                </label>
                <TextArea
                  id="project-description"
                  placeholder="Descreva o que o projeto faz"
                  className="h-36"
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="project-url" className="text-white font-bold">
                  URL do projeto
                </label>
                <TextInput
                  id="project-url"
                  placeholder="Digite a URL do seu projeto"
                  value={projectUrl}
                  onChange={(e) => setProjectUrl(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="flex gap-4 justify-end">
            <button
              className="font-bold text-white cursor-pointer"
              onClick={handleCloseModal}
            >
              Voltar
            </button>
            <Button onClick={handleSaveProject} disabled={isCreatingProject}>
              Salvar
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};
