import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

const solutions = [
  { title: "Retail Portfolios", href: "/solutions/retail", description: "Tailored investment solutions for individual investors" },
  { title: "Institutional Portfolios", href: "/solutions/institutional", description: "Sophisticated strategies for institutional clients" },
  { title: "Structured Portfolios", href: "/solutions/structured", description: "Bespoke structured investment products" },
  { title: "Model Portfolio Service", href: "/solutions/model-portfolio", description: "Ready-to-use model portfolios for advisers" },
  { title: "Reporting Solutions", href: "/solutions/reporting", description: "Comprehensive client reporting tools" },
];

const tools = [
  { title: "Fund Comparison Hub", href: "/fund-comparison", description: "Compare funds side-by-side" },
  { title: "DFM Value Calculator", href: "/tools/dfm-calculator", description: "Demonstrate DFM benefits to clients" },
  { title: "Risk Profiling Quiz", href: "/tools/risk-profile", description: "Assess your client's risk appetite" },
  { title: "Fund Questionnaire", href: "/tools/questionnaire", description: "Get personalized fund recommendations" },
];

const mainNavItems = [
  { title: "Home", href: "/" },
  { title: "About", href: "/about" },
  { title: "Insights", href: "/insights" },
  { title: "Contact", href: "/contact" },
];

export function Header() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + "/");

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <span className="text-lg font-bold text-primary-foreground font-serif">S</span>
          </div>
          <span className="text-xl font-semibold text-foreground font-serif hidden sm:inline">Sequoia</span>
        </Link>

        {/* Desktop Navigation - Large screens */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            {mainNavItems.slice(0, 2).map((item) => (
              <NavigationMenuItem key={item.href}>
                <Link to={item.href}>
                  <NavigationMenuLink className={cn(
                    "group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                    isActive(item.href) && (item.href === "/" ? location.pathname === "/" : true) && "text-primary font-semibold"
                  )}>
                    {item.title === "About" ? "About Us" : item.title}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}

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
              <NavigationMenuTrigger className={cn((isActive("/tools") || isActive("/fund-comparison")) && "text-primary font-semibold")}>
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

            {mainNavItems.slice(2).map((item) => (
              <NavigationMenuItem key={item.href}>
                <Link to={item.href}>
                  <NavigationMenuLink className={cn(
                    "group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                    isActive(item.href) && "text-primary font-semibold"
                  )}>
                    {item.title}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Mobile/Tablet Navigation - Always visible, horizontal scroll */}
        <nav className="lg:hidden flex items-center gap-1 overflow-x-auto scrollbar-hide">
          {mainNavItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "shrink-0 px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors hover:bg-accent hover:text-accent-foreground",
                isActive(item.href) && (item.href === "/" ? location.pathname === "/" : true) && "text-primary font-semibold bg-primary/10"
              )}
            >
              {item.title}
            </Link>
          ))}
          
          {/* Solutions Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className={cn(
              "shrink-0 px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors hover:bg-accent hover:text-accent-foreground inline-flex items-center gap-0.5",
              isActive("/solutions") && "text-primary font-semibold bg-primary/10"
            )}>
              Solutions
              <ChevronDown className="h-3 w-3" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {solutions.map((solution) => (
                <DropdownMenuItem key={solution.href} asChild>
                  <Link to={solution.href} className="flex flex-col items-start gap-0.5">
                    <span className="font-medium">{solution.title}</span>
                    <span className="text-xs text-muted-foreground line-clamp-1">{solution.description}</span>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Tools Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className={cn(
              "shrink-0 px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors hover:bg-accent hover:text-accent-foreground inline-flex items-center gap-0.5",
              (isActive("/tools") || isActive("/fund-comparison")) && "text-primary font-semibold bg-primary/10"
            )}>
              Tools
              <ChevronDown className="h-3 w-3" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {tools.map((tool) => (
                <DropdownMenuItem key={tool.href} asChild>
                  <Link to={tool.href} className="flex flex-col items-start gap-0.5">
                    <span className="font-medium">{tool.title}</span>
                    <span className="text-xs text-muted-foreground line-clamp-1">{tool.description}</span>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/portal">Adviser Portal</Link>
          </Button>
          <Button size="sm" asChild>
            <Link to="/contact">Get Started</Link>
          </Button>
        </div>

        {/* Mobile CTA - Just Get Started */}
        <div className="md:hidden shrink-0">
          <Button size="sm" asChild>
            <Link to="/contact">Get Started</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
