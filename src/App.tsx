import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from "lucide-react";




const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
     
<Router>
  <Routes>
    <Route path="/" element={<Home />} />
    {/* other routes */}
  </Routes>
</Router>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
