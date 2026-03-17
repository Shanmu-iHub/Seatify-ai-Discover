import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export const HeroSection = () => (
  <section className="relative overflow-hidden">
    <div className="absolute inset-0 gradient-subtle" />
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,hsl(238_76%_60%_/_0.15),transparent)]" />

    <div className="container relative py-24 md:py-32 lg:py-40">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="mx-auto max-w-3xl text-center"
      >
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-card px-4 py-1.5 text-sm">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          <span className="text-muted-foreground">AI-Powered Education Discovery</span>
        </div>

        <h1 className="mb-6 text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl">
          Discover the Best Schools
          <br />
          <span className="text-gradient">and Colleges with AI</span>
        </h1>

        <p className="mx-auto mb-8 max-w-xl text-lg text-muted-foreground">
          Seatify AI automatically organizes institutions and courses so students can explore and compare education options easily.
        </p>

        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Button asChild size="lg" className="gradient-primary border-0 text-primary-foreground px-8">
            <Link to="/schools">
              Explore Schools
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="px-8">
            <Link to="/colleges">Explore Colleges</Link>
          </Button>
        </div>
      </motion.div>
    </div>
  </section>
);
