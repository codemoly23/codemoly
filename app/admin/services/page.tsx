import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import ServicesClient from "./ServicesClient";

export default async function ServicesPage() {
  const session = await auth();

  if (!session) {
    redirect("/admin/login");
  }

  // Fetch all services
  const services = await prisma.service.findMany({
    orderBy: { order: "asc" },
  });

  return <ServicesClient user={session.user} initialServices={services} />;
}
