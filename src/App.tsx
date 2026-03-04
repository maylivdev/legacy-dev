import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Layout from "./components/layout/Layout";
import Index from "./pages/Index";
import Catalog from "./pages/Catalog";
import ElementDetail from "./pages/ElementDetail";
import Bearers from "./pages/Bearers";
import BearerDetail from "./pages/BearerDetail";
import News from "./pages/News";
import NewsDetail from "./pages/NewsDetail";
import SearchPage from "./pages/SearchPage";
import MapPage from "./pages/MapPage";
import NotFound from "./pages/NotFound";
import Login from "./pages/admin/Login";
import AdminLayout from "./components/admin/AdminLayout";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import Dashboard from "./pages/admin/Dashboard";
import ElementsList from "./pages/admin/elements/ElementsList";
import ElementForm from "./pages/admin/elements/ElementForm";
import BearersList from "./pages/admin/bearers/BearersList";
import BearerForm from "./pages/admin/bearers/BearerForm";
import NewsList from "./pages/admin/news/NewsList";
import NewsForm from "./pages/admin/news/NewsForm";
import UsersList from "./pages/admin/users/UsersList";
import './i18n';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Index />} />
              <Route path="/catalog" element={<Catalog />} />
              <Route path="/catalog/:id" element={<ElementDetail />} />
              <Route path="/bearers" element={<Bearers />} />
              <Route path="/bearers/:id" element={<BearerDetail />} />
              <Route path="/news" element={<News />} />
              <Route path="/news/:id" element={<NewsDetail />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/map" element={<MapPage />} />
              <Route path="*" element={<NotFound />} />
            </Route>
            {/* Admin routes */}
            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
              <Route index element={<Dashboard />} />
              <Route path="elements" element={<ElementsList />} />
              <Route path="elements/new" element={<ElementForm />} />
              <Route path="elements/:id/edit" element={<ElementForm />} />
              <Route path="bearers" element={<BearersList />} />
              <Route path="bearers/new" element={<BearerForm />} />
              <Route path="bearers/:id/edit" element={<BearerForm />} />
              <Route path="news" element={<NewsList />} />
              <Route path="news/new" element={<NewsForm />} />
              <Route path="news/:id/edit" element={<NewsForm />} />
              <Route path="users" element={<UsersList />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
