import { Link } from "react-router-dom";

export const Footer = () => (
  <footer className="border-t bg-muted/30">
    <div className="container py-12">
      <div className="grid gap-8 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary">
              <span className="text-sm font-bold text-primary-foreground">S</span>
            </div>
            <span className="text-lg font-bold">Seatify AI</span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            AI-powered school and college discovery platform for students.
          </p>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold">Platform</h4>
          <div className="flex flex-col gap-2">
            <Link to="/schools" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Schools</Link>
            <Link to="/colleges" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Colleges</Link>
            <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Dashboard</Link>
          </div>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold">Resources</h4>
          <div className="flex flex-col gap-2">
            <span className="text-sm text-muted-foreground">Documentation</span>
            <span className="text-sm text-muted-foreground">API Reference</span>
            <span className="text-sm text-muted-foreground">Blog</span>
          </div>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold">Company</h4>
          <div className="flex flex-col gap-2">
            <span className="text-sm text-muted-foreground">About</span>
            <span className="text-sm text-muted-foreground">Careers</span>
            <span className="text-sm text-muted-foreground">Contact</span>
          </div>
        </div>
      </div>
      <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
        © 2026 Seatify AI. All rights reserved.
      </div>
    </div>
  </footer>
);
