import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import "dotenv/config";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seed...");

  // Create default admin user
  const hashedPassword = await bcrypt.hash("admin123", 12);

  const admin = await prisma.admin.upsert({
    where: { email: "admin@codemoly.com" },
    update: {},
    create: {
      email: "admin@codemoly.com",
      password: hashedPassword,
      name: "Super Admin",
      role: "SUPER_ADMIN",
    },
  });
  console.log("✅ Admin user created:", admin.email);

  // Create default site settings
  const siteSettings = await prisma.siteSettings.upsert({
    where: { id: "main" },
    update: {},
    create: {
      id: "main",
      heroVideoUrl: "https://www.youtube.com/embed/9s2ydfkRz2E",
      servicesTitle: "Intelligent Solutions for Every Business Need",
      servicesDesc:
        "Transform your operations with our comprehensive suite of AI-powered automation services, designed to optimize efficiency, reduce costs, and drive sustainable growth.",
    },
  });
  console.log("✅ Site settings created");

  // Create default event section settings
  const eventSettings = await prisma.eventSectionSettings.upsert({
    where: { id: "main" },
    update: {},
    create: {
      id: "main",
      sectionTitle: "Global Events",
      sectionDesc:
        "Experience CodeMoly on the world stage at VivaTech 2025 and other premier global tech events. We connect with innovators, startups, and industry leaders to share ideas, build partnerships, and showcase our cutting-edge solutions. At CodeMoly, we're more than just a top-tier development firm — we're a global community of passionate developers and tech professionals dedicated to learning, growing, and creating impactful success stories.",
      displayMode: "GRID",
      autoSlideDelay: 5000,
    },
  });
  console.log("✅ Event section settings created");

  // Seed default services (from current AIAutomations.tsx)
  const services = [
    {
      title: "n8n Workflow Automation",
      description:
        "Build powerful automation workflows with n8n's visual interface. Connect 400+ apps and services to streamline your business processes without coding.",
      icon: "Workflow",
      gradient: "from-blue-600 via-purple-600 to-indigo-700",
      features: [
        "400+ App Integrations",
        "Visual Workflow Builder",
        "Custom API Connections",
      ],
      stats: { integrations: "400+", workflows: "Unlimited", setup: "No-Code" },
      order: 1,
    },
    {
      title: "E-commerce AI Automation",
      description:
        "Supercharge your online store with AI-powered inventory management, dynamic pricing, personalized recommendations, and automated customer service.",
      icon: "Store",
      gradient: "from-emerald-500 via-teal-600 to-cyan-700",
      features: [
        "Smart Inventory Management",
        "Dynamic Pricing AI",
        "Personalized Recommendations",
      ],
      stats: { sales: "+35%", efficiency: "80%", automation: "24/7" },
      order: 2,
    },
    {
      title: "Custom AI Agents",
      description:
        "Deploy intelligent AI agents tailored to your business needs. From customer service to data analysis, our custom agents work around the clock.",
      icon: "Bot",
      gradient: "from-orange-500 via-red-500 to-pink-600",
      features: [
        "Custom Training",
        "Multi-Platform Deploy",
        "Continuous Learning",
      ],
      stats: { accuracy: "95%", response: "<2s", availability: "24/7" },
      order: 3,
    },
    {
      title: "Business Operations Automation",
      description:
        "Streamline your entire business operations with intelligent automation. From HR processes to financial workflows, eliminate manual tasks.",
      icon: "Settings",
      gradient: "from-violet-600 via-purple-600 to-fuchsia-700",
      features: [
        "HR Process Automation",
        "Financial Workflows",
        "Document Management",
      ],
      stats: { efficiency: "75%", time_saved: "30hrs/week", errors: "-90%" },
      order: 4,
    },
    {
      title: "Marketing Automation with AI",
      description:
        "Transform your marketing with AI-driven campaigns, automated lead nurturing, social media management, and intelligent customer segmentation.",
      icon: "Target",
      gradient: "from-pink-500 via-rose-600 to-red-700",
      features: [
        "AI Campaign Optimization",
        "Lead Scoring",
        "Social Media Automation",
      ],
      stats: { conversion: "+45%", leads: "3x more", roi: "+120%" },
      order: 5,
    },
    {
      title: "Support Assistant Automation",
      description:
        "Deploy intelligent support assistants that handle customer inquiries, provide instant solutions, and escalate complex issues to human agents.",
      icon: "MessageSquare",
      gradient: "from-cyan-500 via-blue-600 to-indigo-700",
      features: [
        "Intelligent Ticket Routing",
        "24/7 Customer Support",
        "Multi-language Support",
      ],
      stats: { resolution: "85%", response: "Instant", satisfaction: "96%" },
      order: 6,
    },
  ];

  for (const service of services) {
    await prisma.service.upsert({
      where: { id: `service-${service.order}` },
      update: service,
      create: {
        id: `service-${service.order}`,
        ...service,
      },
    });
  }
  console.log("✅ Services seeded:", services.length);

  // Seed default products (from current ProductShowcase.tsx)
  const products = [
    {
      title: "MolyEcom - AI-Powered E-commerce Platform",
      description:
        "Complete e-commerce solution with AI-driven product recommendations, automated inventory management, and intelligent customer analytics for maximum sales conversion.",
      category: "E-COMMERCE PLATFORM",
      image: "/molyecom.jpg",
      icon: "ShoppingCart",
      gradient: "from-purple-600 via-blue-600 to-cyan-500",
      stats: { stores: "500+", conversion: "35%", revenue: "+180%" },
      features: [
        "AI Product Recommendations",
        "Smart Inventory Management",
        "Customer Analytics",
        "Multi-Channel Integration",
      ],
      demoUrl: "#",
      detailsSlug: "molyecom",
      order: 1,
    },
    {
      title: "MolyLearn - Smart LMS Platform",
      description:
        "Intelligent learning management system with AI-powered course creation, personalized learning paths, and advanced analytics for enhanced educational outcomes.",
      category: "LEARNING MANAGEMENT",
      image: "/molylearn.jpg",
      icon: "GraduationCap",
      gradient: "from-emerald-500 via-teal-600 to-blue-600",
      stats: { students: "50K+", completion: "89%", satisfaction: "4.8/5" },
      features: [
        "AI Course Generation",
        "Personalized Learning Paths",
        "Progress Analytics",
        "Interactive Assessments",
      ],
      demoUrl: "#",
      detailsSlug: "molylearn",
      order: 2,
    },
    {
      title: "MolyFlow - CRM Automation System",
      description:
        "Comprehensive CRM solution with intelligent lead management, automated sales workflows, and AI-powered customer insights for enhanced relationship management.",
      category: "CRM AUTOMATION",
      image: "/molyflow.jpg",
      icon: "Users",
      gradient: "from-orange-500 via-pink-500 to-purple-600",
      stats: { leads: "25K+", conversion: "42%", automation: "90%" },
      features: [
        "Smart Lead Scoring",
        "Automated Workflows",
        "Customer Journey Mapping",
        "Sales Pipeline Analytics",
      ],
      demoUrl: "#",
      detailsSlug: "molyflow",
      order: 3,
    },
    {
      title: "Bebsadar - POS and Inventory Management System",
      description:
        "Advanced point-of-sale and inventory management solution with real-time stock tracking, automated reordering, and comprehensive sales analytics for retail businesses.",
      category: "POS & INVENTORY",
      image: "/bebsadar.jpg",
      icon: "BarChart3",
      gradient: "from-indigo-600 via-purple-600 to-pink-500",
      stats: { transactions: "1M+", accuracy: "99.8%", uptime: "24/7" },
      features: [
        "Real-time Inventory Tracking",
        "Automated Reordering",
        "Sales Analytics Dashboard",
        "Multi-location Support",
      ],
      demoUrl: "#",
      detailsSlug: "bebsadar",
      order: 4,
    },
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { detailsSlug: product.detailsSlug },
      update: product,
      create: product,
    });
  }
  console.log("✅ Products seeded:", products.length);

  // Seed default events (from current Events.tsx)
  const events = [
    {
      title: "VivaTech 2025",
      subtitle: "In Paris",
      mediaType: "IMAGE" as const,
      mediaUrl: "/event-1.jpg",
      gradient: "from-blue-600 to-cyan-500",
      order: 1,
    },
    {
      title: "VivaTech 2025",
      subtitle: "In Paris",
      mediaType: "IMAGE" as const,
      mediaUrl: "/event-2.jpg",
      gradient: "from-orange-500 to-yellow-400",
      order: 2,
    },
    {
      title: "VivaTech 2025",
      subtitle: "In Paris",
      mediaType: "IMAGE" as const,
      mediaUrl: "/event-3.jpg",
      gradient: "from-green-500 to-emerald-400",
      order: 3,
    },
    {
      title: "VivaTech 2025",
      subtitle: "In Paris",
      mediaType: "IMAGE" as const,
      mediaUrl: "/event-4.jpg",
      gradient: "from-purple-500 to-pink-400",
      order: 4,
    },
  ];

  for (const event of events) {
    await prisma.event.upsert({
      where: { id: `event-${event.order}` },
      update: event,
      create: {
        id: `event-${event.order}`,
        ...event,
      },
    });
  }
  console.log("✅ Events seeded:", events.length);

  console.log("\n🎉 Seed completed successfully!");
  console.log("\n📝 Default admin credentials:");
  console.log("   Email: admin@codemoly.com");
  console.log("   Password: admin123");
  console.log("\n⚠️  Please change the password after first login!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
