import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProjectCard } from "@/components/ProjectCard";
import { SectionHeader } from "@/components/SectionHeader";
import { useProjects } from "@/hooks/use-portfolio";
import { Loader2 } from "lucide-react";

export default function Projects() {
  const { data: projects, isLoading } = useProjects();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <main className="container mx-auto px-6 pt-32 pb-20">
        <SectionHeader 
          title="Featured Projects" 
          subtitle="A collection of my recent work, side projects, and experiments." 
        />

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects?.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        )}

        {projects && projects.length === 0 && (
          <div className="text-center py-20 bg-card rounded-3xl border border-white/5">
            <h3 className="text-xl font-bold mb-2">No projects found</h3>
            <p className="text-muted-foreground">Check back soon for updates!</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
