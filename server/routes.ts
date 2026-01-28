import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Projects
  app.get(api.projects.list.path, async (req, res) => {
    const projects = await storage.getProjects();
    res.json(projects);
  });

  app.get(api.projects.get.path, async (req, res) => {
    const project = await storage.getProject(Number(req.params.id));
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  });

  // Skills
  app.get(api.skills.list.path, async (req, res) => {
    const skills = await storage.getSkills();
    res.json(skills);
  });

  // Experience
  app.get(api.experience.list.path, async (req, res) => {
    const experience = await storage.getExperience();
    res.json(experience);
  });

  // Education
  app.get(api.education.list.path, async (req, res) => {
    const education = await storage.getEducation();
    res.json(education);
  });

  // Contact
  app.post(api.contact.create.path, async (req, res) => {
    try {
      const input = api.contact.create.input.parse(req.body);
      const message = await storage.createContactMessage(input);
      res.status(201).json(message);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  // Seed Data
  const projectsList = await storage.getProjects();
  if (projectsList.length === 0) {
    await seedDatabase();
  }

  return httpServer;
}

async function seedDatabase() {
  console.log('Seeding database...');
  
  // Skills
  await storage.createSkill({ name: "React", category: "Frontend", proficiency: 95 });
  await storage.createSkill({ name: "TypeScript", category: "Languages", proficiency: 90 });
  await storage.createSkill({ name: "Node.js", category: "Backend", proficiency: 85 });
  await storage.createSkill({ name: "PostgreSQL", category: "Database", proficiency: 80 });
  await storage.createSkill({ name: "Tailwind CSS", category: "Frontend", proficiency: 95 });

  // Projects
  await storage.createProject({
    title: "E-Commerce Dashboard",
    description: "A comprehensive analytics dashboard for online retailers featuring real-time data visualization.",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2426&q=80",
    projectUrl: "https://example.com",
    repoUrl: "https://github.com",
    tags: ["React", "D3.js", "Node.js"]
  });

  await storage.createProject({
    title: "Social Media App",
    description: "A modern social platform connecting developers worldwide.",
    imageUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&auto=format&fit=crop&w=2574&q=80",
    projectUrl: "https://example.com",
    repoUrl: "https://github.com",
    tags: ["Next.js", "Prisma", "Socket.io"]
  });

  await storage.createProject({
    title: "AI Code Assistant",
    description: "An intelligent coding companion that suggests optimizations and fixes bugs.",
    imageUrl: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2670&q=80",
    projectUrl: "https://example.com",
    repoUrl: "https://github.com",
    tags: ["Python", "TensorFlow", "FastAPI"]
  });

  // Experience
  await storage.createExperience({
    role: "Senior Full Stack Developer",
    company: "Tech Innovators Inc.",
    duration: "2021 - Present",
    description: "Leading a team of 5 developers building scalable web applications. improved performance by 40%."
  });

  await storage.createExperience({
    role: "Frontend Developer",
    company: "Creative Digital Agency",
    duration: "2019 - 2021",
    description: "Developed award-winning websites for high-profile clients using React and WebGL."
  });

  // Education
  await storage.createEducation({
    degree: "Bachelor of Science in Computer Science",
    institution: "University of Technology",
    year: "2015 - 2019"
  });

  console.log('Database seeded!');
}
