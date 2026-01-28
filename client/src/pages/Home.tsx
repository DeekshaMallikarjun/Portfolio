import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Download, Code, Cpu, Globe } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SectionHeader } from "@/components/SectionHeader";
import { useSkills } from "@/hooks/use-portfolio";

export default function Home() {
  const { data: skills } = useSkills();

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 px-6">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[128px] animate-pulse delay-1000" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,black,transparent)]" />
        </div>

        <div className="container relative z-10 mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-2 mb-6 rounded-full border border-primary/30 bg-primary/10 text-primary font-mono text-sm"
          >
            Full Stack Developer & UI Designer
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-6xl md:text-8xl font-display font-bold tracking-tight mb-6"
          >
            Building the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-secondary text-glow">
              Digital Future
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            I craft immersive web experiences with modern technologies. 
            Focused on performance, accessibility, and futuristic design.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link href="/projects" className="px-8 py-4 rounded-xl bg-primary text-primary-foreground font-bold text-lg hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] transition-all duration-300 hover:-translate-y-1 flex items-center gap-2">
              View Work <ArrowRight className="w-5 h-5" />
            </Link>
            <a href="/resume.pdf" className="px-8 py-4 rounded-xl bg-card border border-white/10 hover:border-primary/50 text-foreground font-bold text-lg transition-all duration-300 hover:-translate-y-1 flex items-center gap-2">
              Download CV <Download className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Skills Marquee */}
      <section className="py-20 border-y border-white/5 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <SectionHeader title="Tech Stack" subtitle="Technologies I use to bring ideas to life" />
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {skills?.slice(0, 8).map((skill, i) => (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-card border border-white/5 hover:border-primary/30 transition-all group"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    {skill.category === "Frontend" ? <Globe className="w-6 h-6" /> : 
                     skill.category === "Backend" ? <Cpu className="w-6 h-6" /> : 
                     <Code className="w-6 h-6" />}
                  </span>
                  <span className="text-2xl font-bold font-mono text-muted-foreground group-hover:text-primary transition-colors">
                    {skill.proficiency}%
                  </span>
                </div>
                <h3 className="text-xl font-bold font-display">{skill.name}</h3>
                <div className="w-full bg-muted h-2 mt-4 rounded-full overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-primary to-secondary h-full rounded-full"
                    style={{ width: `${skill.proficiency}%` }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link href="/projects" className="text-primary hover:text-primary/80 font-medium underline underline-offset-4">
              See detailed skills in projects →
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
