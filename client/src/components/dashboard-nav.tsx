import { Link } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Youtube,
  Users,
  Settings,
  LogOut,
  Menu,
  Upload,
  MessageSquare,
  X,
} from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { cn } from "../lib/utils";

const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Channels",
    href: "/dashboard/channels",
    icon: Youtube,
  },
  {
    title: "Upload Video",
    href: "/dashboard/upload",
    icon: Upload,
  },
  {
    title: "Team",
    href: "/dashboard/team",
    icon: Users,
  },
  {
    title: "AI Assistant",
    href: "/dashboard/ai-assistant",
    icon: MessageSquare,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
]

export function DashboardNav() {
  const pathname = "";
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <>
      <div className="md:hidden flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <Youtube className="h-6 w-6 text-red-600" />
          <span className="text-xl font-bold">TubeMetrics</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setMobileNavOpen(!mobileNavOpen)}
        >
          {mobileNavOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>
      </div>

      <div
        className={cn(
          "fixed inset-0 top-[65px] z-50 bg-background md:static md:block",
          mobileNavOpen ? "block" : "hidden",
        )}
      >
        <div className="space-y-4 py-4">
          <div className="hidden md:flex px-3 py-2 items-center gap-2">
            <Youtube className="h-6 w-6 text-red-600" />
            <span className="text-xl font-bold">TubeMetrics</span>
          </div>
          <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
              Navigation
            </h2>
            <div className="space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setMobileNavOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                    pathname === item.href
                      ? "bg-accent text-accent-foreground"
                      : "transparent",
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="absolute bottom-4 left-0 right-0 px-7">
          <Button variant="outline" className="justify-start gap-3" asChild>
            <Link to="/">
              <LogOut className="h-5 w-5" />
              Logout
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
}
