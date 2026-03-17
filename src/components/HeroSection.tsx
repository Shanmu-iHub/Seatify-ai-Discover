import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export const HeroSection = () => (
  <section className="relative overflow-hidden pb-20 pt-24 md:pb-32 md:pt-32 lg:pb-40 lg:pt-40">
    <div className="absolute inset-0 bg-background" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,hsl(var(--primary)/0.15),transparent_70%)]" />
    <div className="absolute -top-[10%] left-[5%] h-[40%] w-[40%] rounded-full bg-primary/5 blur-[120px]" />
    <div className="absolute bottom-[0%] right-[5%] h-[40%] w-[40%] rounded-full bg-primary/5 blur-[120px]" />

    <div className="container relative">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mx-auto max-w-4xl text-center animate-float"
      >
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-white/50 px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider backdrop-blur-md dark:bg-black/50">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          <span className="text-foreground/80">AI-Powered Education Discovery</span>
        </div>

        <h1 className="mb-6 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-5xl leading-tight">
          Find Your Future
          <br />
          <span className="text-gradient">with Seatify AI</span>
        </h1>

        <p className="mx-auto mb-8 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg opacity-90">
          We leverage advanced AI to discover, organize, and present the most accurate institutional data, helping students make informed choices effortlessly.
        </p>

        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button asChild size="lg" className="h-12 rounded-2xl gradient-primary border-0 text-white px-8 text-sm font-bold shadow-md hover:shadow-lg transition-all">
            <Link to="/schools">
              Explore Schools
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="h-14 rounded-full px-10 text-base font-semibold backdrop-blur-sm bg-background/50">
            <Link to="/colleges">Explore Colleges</Link>
          </Button>
        </div>
      </motion.div>
    </div>
  </section>
);
