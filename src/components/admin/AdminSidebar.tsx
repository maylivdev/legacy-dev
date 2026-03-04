import { useTranslation } from 'react-i18next';
import { useLocation, Link } from 'react-router-dom';
import { LayoutDashboard, Layers, Users, Newspaper, Shield, ExternalLink, LogOut } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
} from '@/components/ui/sidebar';
import { useAuth } from '@/contexts/AuthContext';
import { canManageUsers } from '@/lib/permissions';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { SAMPLE_ELEMENTS, SAMPLE_NEWS } from '@/data/seed';

export default function AdminSidebar() {
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const location = useLocation();
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';

  const draftCount = SAMPLE_ELEMENTS.filter(e => e.status === 'draft').length;

  const menuItems = [
    { to: '/admin', icon: LayoutDashboard, label: t('admin.dashboard') },
    { to: '/admin/elements', icon: Layers, label: t('admin.elements.title'), badge: draftCount || undefined },
    { to: '/admin/bearers', icon: Users, label: t('admin.bearers.title') },
    { to: '/admin/news', icon: Newspaper, label: t('admin.news.title') },
  ];

  if (user && canManageUsers(user.role)) {
    menuItems.push({ to: '/admin/users', icon: Shield, label: t('admin.users.title'), badge: undefined });
  }

  const isActive = (path: string) => {
    if (path === '/admin') return location.pathname === '/admin';
    return location.pathname.startsWith(path);
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            {!collapsed && (
              <Link to="/admin" className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded bg-primary text-primary-foreground font-bold text-sm">М</div>
                <span className="font-semibold text-sidebar-foreground">МЕММ Admin</span>
              </Link>
            )}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.to}>
                  <SidebarMenuButton asChild isActive={isActive(item.to)}>
                    <Link to={item.to} className="flex items-center gap-2">
                      <item.icon className="h-4 w-4 shrink-0" />
                      {!collapsed && (
                        <span className="flex-1">{item.label}</span>
                      )}
                      {!collapsed && item.badge ? (
                        <span className="ml-auto rounded-full bg-destructive px-1.5 py-0.5 text-[10px] font-semibold text-destructive-foreground">
                          {item.badge}
                        </span>
                      ) : null}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link to="/" target="_blank" className="flex items-center gap-2 text-sidebar-foreground/70">
                <ExternalLink className="h-4 w-4 shrink-0" />
                {!collapsed && <span>View Public Site</span>}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={logout} className="flex items-center gap-2 text-sidebar-foreground/70 hover:text-destructive">
              <LogOut className="h-4 w-4 shrink-0" />
              {!collapsed && <span>{t('admin.logout')}</span>}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
