import { Github, Linkedin, Twitter, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/50 backdrop-blur-xl mt-20">
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col gap-2 text-center md:text-left">
            <h3 className="text-xl font-display font-bold text-white">Let's Connect</h3>
            <p className="text-muted-foreground">Building the future, one pixel at a time.</p>
          </div>

          <div className="flex gap-6">
            <SocialLink href="https://github.com" icon={<Github className="w-5 h-5" />} />
            <SocialLink href="https://linkedin.com" icon={<Linkedin className="w-5 h-5" />} />
            <SocialLink href="https://twitter.com" icon={<Twitter className="w-5 h-5" />} />
          </div>
        </div>

        <div className="border-t border-white/5 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Portfolio. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-secondary fill-secondary" /> and React
          </p>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="p-3 rounded-full bg-white/5 hover:bg-primary/20 hover:text-primary transition-all duration-300 hover:scale-110"
    >
      {icon}
    </a>
  );
}
