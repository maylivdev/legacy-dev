import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';
import type { Language } from '@/types';

const ROLE_LABELS: Record<string, string> = {
  super_admin: 'Super Admin',
  administrator: 'Administrator',
  editor: 'Editor',
  moderator: 'Moderator',
  source: 'Source',
};

const LANGUAGES: { code: Language; label: string }[] = [
  { code: 'kk', label: 'Қазақша' },
  { code: 'ru', label: 'Русский' },
  { code: 'en', label: 'English' },
];

export default function TopBar() {
  const { t, i18n } = useTranslation();
  const { user, logout } = useAuth();

  return (
    <header className="h-14 flex items-center gap-3 border-b bg-background px-4">
      <SidebarTrigger />

      <div className="flex-1" />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="gap-1.5">
            <Globe className="h-4 w-4" />
            <span className="uppercase text-xs font-semibold">{i18n.language}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {LANGUAGES.map((lang) => (
            <DropdownMenuItem key={lang.code} onClick={() => i18n.changeLanguage(lang.code)}>
              {lang.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {user && (
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium hidden sm:inline">{user.full_name}</span>
          <Badge variant="secondary" className="text-[10px]">{ROLE_LABELS[user.role]}</Badge>
        </div>
      )}
    </header>
  );
}
