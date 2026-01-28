import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Solutions from "./pages/Solutions";
import Insights from "./pages/Insights";
import Contact from "./pages/Contact";
import FundComparison from "./pages/FundComparison";
import Questionnaire from "./pages/Questionnaire";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/solutions/:type" element={<Solutions />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/insights/:slug" element={<Insights />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/fund-comparison" element={<FundComparison />} />
          <Route path="/tools/questionnaire" element={<Questionnaire />} />
          <Route path="/tools/risk-profile" element={<Contact />} />
          <Route path="/portal" element={<Contact />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
