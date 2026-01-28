import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SectionHeader } from "@/components/SectionHeader";
import { useExperience, useEducation } from "@/hooks/use-portfolio";
import { Briefcase, GraduationCap, Calendar } from "lucide-react";

export default function Experience() {
  const { data: experience } = useExperience();
  const { data: education } = useEducation();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <main className="container mx-auto px-6 pt-32 pb-20">
        <SectionHeader 
          title="Journey" 
          subtitle="My professional path and educational background." 
        />

        <div className="grid md:grid-cols-2 gap-16 max-w-6xl mx-auto">
          {/* Experience Column */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-lg bg-primary/10 text-primary">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-display font-bold">Work Experience</h3>
            </div>

            <div className="space-y-8">
              {experience?.map((job, index) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative pl-8 border-l border-white/10"
                >
                  <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-primary" />
                  <span className="inline-flex items-center gap-2 text-sm text-primary font-mono mb-2 bg-primary/5 px-2 py-1 rounded">
                    <Calendar className="w-3 h-3" /> {job.duration}
                  </span>
                  <h4 className="text-xl font-bold text-white mb-1">{job.role}</h4>
                  <div className="text-lg text-secondary font-medium mb-3">{job.company}</div>
                  <p className="text-muted-foreground leading-relaxed">
                    {job.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Education Column */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-lg bg-secondary/10 text-secondary">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-display font-bold">Education</h3>
            </div>

            <div className="space-y-8">
              {education?.map((edu, index) => (
                <motion.div
                  key={edu.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative pl-8 border-l border-white/10"
                >
                  <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-secondary" />
                  <span className="inline-flex items-center gap-2 text-sm text-secondary font-mono mb-2 bg-secondary/5 px-2 py-1 rounded">
                    <Calendar className="w-3 h-3" /> {edu.year}
                  </span>
                  <h4 className="text-xl font-bold text-white mb-1">{edu.degree}</h4>
                  <div className="text-lg text-muted-foreground font-medium mb-3">{edu.institution}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
