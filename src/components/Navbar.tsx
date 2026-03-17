import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, Menu, X } from "lucide-react";
import { SearchBar } from "./SearchBar";

export const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();

  const links = [
    { to: "/", label: "Home" },
    { to: "/schools", label: "Schools" },
    { to: "/colleges", label: "Colleges" },
    { to: "/dashboard", label: "Dashboard" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary">
              <span className="text-sm font-bold text-primary-foreground">S</span>
            </div>
            <span className="text-lg font-bold tracking-tight">Seatify AI</span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  isActive(link.to)
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="hidden md:flex"
            onClick={() => setSearchOpen(!searchOpen)}
          >
            <Search className="h-4 w-4" />
          </Button>

          <div className="hidden items-center gap-2 md:flex">
            <Button variant="ghost" size="sm">Log in</Button>
            <Button size="sm" className="gradient-primary border-0 text-primary-foreground">Sign up</Button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {searchOpen && (
        <div className="border-t bg-background p-4">
          <div className="container">
            <SearchBar onClose={() => setSearchOpen(false)} />
          </div>
        </div>
      )}

      {mobileOpen && (
        <div className="border-t bg-background p-4 md:hidden">
          <nav className="flex flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  isActive(link.to)
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-3 flex gap-2 border-t pt-3">
              <Button variant="ghost" size="sm" className="flex-1">Log in</Button>
              <Button size="sm" className="flex-1 gradient-primary border-0 text-primary-foreground">Sign up</Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
