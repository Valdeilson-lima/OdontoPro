"use client";
import Image from "next/image";
import { useState } from "react";
import semImg from "@/../public/foto1.png";
import { Loader, Upload } from "lucide-react";
import { toast } from "sonner";
import { updateProfileAvatar } from "../_actions/update-avatar";
import { useSession } from "next-auth/react";

interface AvatarProfileProps {
  avatarUrl: string | null;
  userId: string;
}

export function AvatarProfile({ avatarUrl, userId }: AvatarProfileProps) {
  const [previewImage, setPreviewImage] = useState(avatarUrl);
  const [loading, setLoading] = useState(false);

  const { update } = useSession();

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      setLoading(true);
      const image = e.target.files[0];

      if (
        image.type !== "image/jpeg" &&
        image.type !== "image/png" &&
        image.type !== "image/jpg"
      ) {
        toast.error("Formato de imagem inválido. Utilize JPG, JPEG ou PNG.");
        setLoading(false);
        return;
      }

      const newFileName = `avatar_${userId}.${image.type.split("/")[1]}`;
      const renamedImage = new File([image], newFileName, { type: image.type });

      const urlImage = await uploadImageToServer(renamedImage);

      if (!urlImage || urlImage === "") {
        toast.error("Falha ao enviar a imagem.");
        setLoading(false);
        return;
      }

      setPreviewImage(urlImage);

      await updateProfileAvatar({ avatarUrl: urlImage });
      await update({
        image: urlImage,
      });
      setLoading(false);
    }
  }

  async function uploadImageToServer(imageFile: File): Promise<string | null> {
    try {
      toast("Enviando imagem...");
      const formData = new FormData();
      formData.append("file", imageFile);
      formData.append("userId", userId);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        return null;
      }

      const data = await response.json();

      const secureUrl = data?.result?.secure_url ?? data?.result?.url ?? null;
      if (secureUrl) {
        toast.success("Imagem enviada com sucesso!");
        return secureUrl as string;
      }
      toast.error("Falha ao obter URL da imagem.");
      return null;
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  }

  return (
    <div className="w-32 h-32 rounded-full overflow-hidden flex items-center justify-center relative md:w-48 md:h-48">
      <div
        className="relative flex items-center justify-center w-full h-full cursor-pointer "
        title="Atualizar Imagem"
      >
        <span className="absolute cursor-pointer z-[2] bg-sky-50/80 p-2 rounded-full shadow-xl">
          {loading ? (
            <Loader className="w-5 h-5 text-sky-700 animate-spin" />
          ) : (
            <Upload className="w-5 h-5 text-sky-700" />
          )}
        </span>
        <input
          type="file"
          className="cursor-pointer relative z-50 w-48 h-48 opacity-0"
          onChange={handleUpload}
        />
      </div>
      {previewImage ? (
        <Image
          src={previewImage}
          alt={`Avatar of user ${userId}`}
          fill
          className="object-cover"
          quality={100}
          priority
          sizes="(max-width: 480px) 100vw (max-width: 1024px) 75vw, 60vw"
        />
      ) : (
        <Image
          src={semImg}
          alt="Default avatar"
          fill
          className="object-cover"
          quality={100}
          priority
          sizes="(max-width: 480px) 100vw (max-width: 1024px) 75vw, 60vw"
        />
      )}
    </div>
  );
}
