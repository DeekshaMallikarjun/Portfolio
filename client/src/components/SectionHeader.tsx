import { motion } from "framer-motion";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  alignment?: "left" | "center";
}

export function SectionHeader({ title, subtitle, alignment = "center" }: SectionHeaderProps) {
  return (
    <div className={`mb-12 ${alignment === "center" ? "text-center" : "text-left"}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-secondary text-glow">
            {title}
          </span>
        </h2>
        {subtitle && (
          <div className="w-full flex justify-center">
             <p className={`text-muted-foreground text-lg max-w-2xl ${alignment === "left" ? "mr-auto" : "mx-auto"}`}>
               {subtitle}
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
