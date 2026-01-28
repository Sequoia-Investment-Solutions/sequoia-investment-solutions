import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const solutions = [
  { title: "Retail Portfolios", href: "/solutions/retail", description: "Tailored investment solutions for individual investors" },
  { title: "Institutional Portfolios", href: "/solutions/institutional", description: "Sophisticated strategies for institutional clients" },
  { title: "Structured Portfolios", href: "/solutions/structured", description: "Bespoke structured investment products" },
  { title: "Model Portfolio Service", href: "/solutions/model-portfolio", description: "Ready-to-use model portfolios for advisers" },
  { title: "Reporting Solutions", href: "/solutions/reporting", description: "Comprehensive client reporting tools" },
];

const tools = [
  { title: "Fund Comparison Hub", href: "/fund-comparison", description: "Compare funds side-by-side" },
  { title: "Risk Profiling Quiz", href: "/tools/risk-profile", description: "Assess your client's risk appetite" },
  { title: "Fund Questionnaire", href: "/tools/questionnaire", description: "Get personalized fund recommendations" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + "/");

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <span className="text-lg font-bold text-primary-foreground font-serif">S</span>
          </div>
          <span className="text-xl font-semibold text-foreground font-serif">Sequoia</span>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link to="/">
                <NavigationMenuLink className={cn(
                  "group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                  isActive("/") && location.pathname === "/" && "text-primary font-semibold"
                )}>
                  Home
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link to="/about">
                <NavigationMenuLink className={cn(
                  "group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                  isActive("/about") && "text-primary font-semibold"
                )}>
                  About Us
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className={cn(isActive("/solutions") && "text-primary font-semibold")}>
                Our Solutions
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[500px] gap-3 p-4 md:grid-cols-2 bg-popover">
                  {solutions.map((solution) => (
                    <li key={solution.href}>
                      <NavigationMenuLink asChild>
                        <Link
                          to={solution.href}
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">{solution.title}</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            {solution.description}
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className={cn(isActive("/tools") || isActive("/fund-comparison") && "text-primary font-semibold")}>
                Tools
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 bg-popover">
                  {tools.map((tool) => (
                    <li key={tool.href}>
                      <NavigationMenuLink asChild>
                        <Link
                          to={tool.href}
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">{tool.title}</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            {tool.description}
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link to="/insights">
                <NavigationMenuLink className={cn(
                  "group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                  isActive("/insights") && "text-primary font-semibold"
                )}>
                  Insights
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link to="/contact">
                <NavigationMenuLink className={cn(
                  "group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                  isActive("/contact") && "text-primary font-semibold"
                )}>
                  Contact
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="hidden lg:flex items-center gap-3">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/portal">Adviser Portal</Link>
          </Button>
          <Button size="sm" asChild>
            <Link to="/contact">Get Started</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border bg-background">
          <nav className="container py-4 space-y-4">
            <Link to="/" className="block py-2 text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
              Home
            </Link>
            <Link to="/about" className="block py-2 text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
              About Us
            </Link>
            <div className="space-y-2">
              <div className="flex items-center gap-1 py-2 text-sm font-medium text-muted-foreground">
                Our Solutions <ChevronDown className="h-4 w-4" />
              </div>
              {solutions.map((solution) => (
                <Link
                  key={solution.href}
                  to={solution.href}
                  className="block py-2 pl-4 text-sm text-muted-foreground hover:text-foreground"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {solution.title}
                </Link>
              ))}
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-1 py-2 text-sm font-medium text-muted-foreground">
                Tools <ChevronDown className="h-4 w-4" />
              </div>
              {tools.map((tool) => (
                <Link
                  key={tool.href}
                  to={tool.href}
                  className="block py-2 pl-4 text-sm text-muted-foreground hover:text-foreground"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {tool.title}
                </Link>
              ))}
            </div>
            <Link to="/insights" className="block py-2 text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
              Insights
            </Link>
            <Link to="/contact" className="block py-2 text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
              Contact
            </Link>
            <div className="flex flex-col gap-2 pt-4 border-t border-border">
              <Button variant="outline" size="sm" asChild>
                <Link to="/portal" onClick={() => setMobileMenuOpen(false)}>Adviser Portal</Link>
              </Button>
              <Button size="sm" asChild>
                <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>Get Started</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
