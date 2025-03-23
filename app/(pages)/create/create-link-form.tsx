"use client";

import { useState } from "react";

import { Button } from "@/app/components/ui/button";
import { TextInput } from "@/app/components/ui/text-input";
import { sanitizeLink } from "@/app/lib/utils";
import { verifyLink } from "@/app/actions/verify-link";
import { createLink } from "@/app/actions/create-link";
import { useRouter } from "next/navigation";

export const CreateLinkForm = () => {
  const router = useRouter();

  const [link, setLink] = useState<string>("");
  const [error, setError] = useState<string>("");

  function handleLinkChange(value: string) {
    setLink(sanitizeLink(value));
    setError("");
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!link) {
      setError("O link não pode ser vazio");
    }

    const isLinkTaken = await verifyLink(link);

    if (isLinkTaken) {
      setError("O link já está em uso");
    }

    const isLinkCreated = await createLink(link);

    if (!isLinkCreated) {
      setError("Ocorreu um erro ao criar o link, tente novamente.");
    }

    router.push(`${link}`);
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="w-full flex items-center gap-2">
        <span className="text-white">projectinbio.com/</span>
        <TextInput
          value={link}
          onChange={(e) => handleLinkChange(e.target.value)}
        />
        <Button className="w-[126px] cursor-pointer">Criar</Button>
      </form>
      <div>
        <span className="text-accent-pink">{error}</span>
      </div>
    </>
  );
};
