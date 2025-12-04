import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import ProductsClient from "./ProductsClient";

export default async function ProductsPage() {
  const session = await auth();

  if (!session) {
    redirect("/admin/login");
  }

  const products = await prisma.product.findMany({
    orderBy: { order: "asc" },
  });

  return <ProductsClient user={session.user} initialProducts={products} />;
}
