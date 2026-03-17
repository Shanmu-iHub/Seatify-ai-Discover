import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, Menu, X } from "lucide-react";
import { SearchBar } from "./SearchBar";
import { SyncButton } from "./SyncButton";

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
    <header className="sticky top-0 z-50 border-b bg-background/70 backdrop-blur-2xl transition-all duration-300">
      <div className="container flex h-20 items-center justify-between">
        <div className="flex items-center gap-10">
          <Link to="/" className="flex items-center gap-3 transition-opacity hover:opacity-80">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-primary shadow-lg shadow-primary/20">
              <span className="text-lg font-black text-white">S</span>
            </div>
            <span className="text-xl font-black tracking-tighter text-foreground">Seatify<span className="text-primary">AI</span></span>
          </Link>

          <nav className="hidden items-center gap-2 md:flex">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`rounded-xl px-4 py-2 text-sm font-bold tracking-tight transition-all ${isActive(link.to)
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground/80 hover:bg-muted/50 hover:text-foreground"
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="hidden h-10 w-10 rounded-xl md:flex"
            onClick={() => setSearchOpen(!searchOpen)}
          >
            <Search className="h-5 w-5" />
          </Button>

          <div className="hidden items-center gap-3 md:flex">
            <SyncButton />
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-xl md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
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
        <div className="border-t bg-background/90 p-6 md:hidden backdrop-blur-xl">
          <nav className="flex flex-col gap-3">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`rounded-2xl px-5 py-4 text-base font-bold transition-all ${isActive(link.to)
                  ? "bg-primary text-white shadow-lg shadow-primary/20"
                  : "bg-muted/50 text-muted-foreground hover:bg-muted"
                  }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-6 border-t pt-6">
              <SyncButton />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
