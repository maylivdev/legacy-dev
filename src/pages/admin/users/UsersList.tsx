import { useTranslation } from 'react-i18next';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { SAMPLE_USERS } from '@/lib/permissions';
import { REGIONS } from '@/data/seed';
import { getLocalizedField, type Language } from '@/types';

const ROLE_COLORS: Record<string, string> = {
  super_admin: 'bg-destructive/10 text-destructive',
  administrator: 'bg-primary/10 text-primary',
  editor: 'bg-accent/10 text-accent-foreground',
  moderator: 'bg-secondary/10 text-secondary-foreground',
  source: 'bg-muted text-muted-foreground',
};

export default function UsersList() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as Language;

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{t('admin.users.title')}</h1>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>{t('admin.users.role')}</TableHead>
              <TableHead className="hidden md:table-cell">{t('admin.users.status')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {SAMPLE_USERS.map(u => (
              <TableRow key={u.id}>
                <TableCell className="font-medium">{u.full_name}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{u.email}</TableCell>
                <TableCell>
                  <Badge className={ROLE_COLORS[u.role]} variant="outline">{u.role}</Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <Badge variant={u.status === 'active' ? 'default' : 'secondary'}>{t(`admin.users.${u.status}`)}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
