import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import MediaLibraryClient from "./MediaLibraryClient";

export default async function MediaLibraryPage() {
  const session = await auth();

  if (!session) {
    redirect("/admin/login");
  }

  // Fetch initial media files
  const media = await prisma.media.findMany({
    orderBy: { createdAt: "desc" },
    take: 24,
  });

  const total = await prisma.media.count();

  return (
    <MediaLibraryClient
      user={session.user}
      initialMedia={media}
      initialTotal={total}
    />
  );
}
