import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Linkedin, Twitter } from "lucide-react";

const footerLinks = {
  solutions: [
    { title: "Retail Portfolios", href: "/solutions/retail" },
    { title: "Institutional Portfolios", href: "/solutions/institutional" },
    { title: "Structured Portfolios", href: "/solutions/structured" },
    { title: "Model Portfolio Service", href: "/solutions/model-portfolio" },
    { title: "Reporting Solutions", href: "/solutions/reporting" },
  ],
  resources: [
    { title: "Fund Comparison", href: "/fund-comparison" },
    { title: "DFM Value Calculator", href: "/tools/dfm-calculator" },
    { title: "Risk Profiling Quiz", href: "/tools/risk-profile" },
    { title: "Market Insights", href: "/insights" },
    { title: "Knowledge Centre", href: "/insights/knowledge" },
  ],
  company: [
    { title: "About Us", href: "/about" },
    { title: "Our Team", href: "/about#team" },
    { title: "Careers", href: "/careers" },
    { title: "Contact", href: "/contact" },
  ],
  legal: [
    { title: "Privacy Policy", href: "/privacy" },
    { title: "Terms of Service", href: "/terms" },
    { title: "Regulatory Information", href: "/regulatory" },
    { title: "Cookie Policy", href: "/cookies" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container py-12 lg:py-16">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-6">
          {/* Brand */}
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <span className="text-lg font-bold text-primary-foreground font-serif">S</span>
              </div>
              <span className="text-xl font-semibold text-foreground font-serif">Sequoia</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs mb-6">
              Empowering financial advisers with institutional-grade investment solutions and exceptional client service.
            </p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+44 (0) 20 7123 4567</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>advisers@sequoia-invest.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>London, United Kingdom</span>
              </div>
            </div>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Solutions</h3>
            <ul className="space-y-2">
              {footerLinks.solutions.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Resources</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Sequoia Investment Solutions. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
              <Twitter className="h-5 w-5" />
            </a>
          </div>
        </div>

        {/* Regulatory Notice */}
        <div className="mt-8 pt-6 border-t border-border">
          <p className="text-xs text-muted-foreground leading-relaxed">
            Sequoia Investment Solutions is authorised and regulated by the Financial Conduct Authority. 
            Past performance is not a reliable indicator of future results. The value of investments and 
            the income from them can go down as well as up and investors may not get back the amount 
            originally invested. This website is intended for professional advisers only.
          </p>
        </div>
      </div>
    </footer>
  );
}
