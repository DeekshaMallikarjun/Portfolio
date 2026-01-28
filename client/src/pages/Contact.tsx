import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SectionHeader } from "@/components/SectionHeader";
import { useContact } from "@/hooks/use-portfolio";
import { insertContactMessageSchema } from "@shared/schema";
import { Mail, MessageSquare, User, Send, Loader2 } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// Schema for client-side validation
const formSchema = insertContactMessageSchema;
type FormValues = z.infer<typeof formSchema>;

export default function Contact() {
  const { mutate, isPending } = useContact();
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  function onSubmit(data: FormValues) {
    mutate(data, {
      onSuccess: () => {
        form.reset();
        setSubmitted(true);
      }
    });
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <main className="container mx-auto px-6 pt-32 pb-20">
        <SectionHeader 
          title="Get In Touch" 
          subtitle="Have a project in mind or just want to say hi? I'd love to hear from you." 
        />

        <div className="max-w-2xl mx-auto">
          {submitted ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-card border border-primary/20 p-10 rounded-3xl text-center shadow-[0_0_30px_rgba(6,182,212,0.1)]"
            >
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
                <Send className="w-10 h-10" />
              </div>
              <h3 className="text-3xl font-display font-bold mb-4">Message Sent!</h3>
              <p className="text-muted-foreground text-lg mb-8">
                Thank you for reaching out. I'll respond to your message as soon as possible.
              </p>
              <button 
                onClick={() => setSubmitted(false)}
                className="text-primary font-bold hover:underline"
              >
                Send another message
              </button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card/50 backdrop-blur-xl border border-white/5 p-8 md:p-12 rounded-3xl relative overflow-hidden"
            >
              {/* Decorative gradient glow */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-secondary/20 blur-[80px] rounded-full pointer-events-none" />
              <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-primary/20 blur-[80px] rounded-full pointer-events-none" />

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 relative z-10">
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <User className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                              <Input 
                                placeholder="Your Name" 
                                className="pl-10 bg-background/50 border-white/10 focus:border-primary/50 min-h-[50px]" 
                                {...field} 
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Mail className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                              <Input 
                                placeholder="hello@example.com" 
                                className="pl-10 bg-background/50 border-white/10 focus:border-primary/50 min-h-[50px]" 
                                {...field} 
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                            <Textarea 
                              placeholder="Tell me about your project..." 
                              className="pl-10 min-h-[150px] bg-background/50 border-white/10 focus:border-primary/50 resize-none pt-3" 
                              {...field} 
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <button
                    type="submit"
                    disabled={isPending}
                    className="w-full py-4 rounded-xl font-bold text-lg bg-gradient-to-r from-primary to-secondary text-white hover:shadow-[0_0_20px_rgba(192,38,211,0.5)] transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" /> Sending...
                      </>
                    ) : (
                      <>
                        Send Message <Send className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </form>
              </Form>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
