import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { SAMPLE_BEARERS, SAMPLE_BEARER_ELEMENTS, REGIONS } from '@/data/seed';
import { useAuth } from '@/contexts/AuthContext';
import { canCreate, canDelete } from '@/lib/permissions';
import { getLocalizedField, type Language } from '@/types';
import { toast } from 'sonner';

export default function BearersList() {
  const { t, i18n } = useTranslation();
  const { user } = useAuth();
  const lang = i18n.language as Language;
  const [search, setSearch] = useState('');

  const filtered = SAMPLE_BEARERS.filter(b =>
    !search || b.full_name.toLowerCase().includes(search.toLowerCase())
  );

  const getRegionName = (id: string) => getLocalizedField(REGIONS.find(r => r.id === id) || REGIONS[0], 'name', lang);
  const getElementCount = (id: string) => SAMPLE_BEARER_ELEMENTS.filter(be => be.bearer_id === id).length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h1 className="text-2xl font-bold">{t('admin.bearers.title')}</h1>
        {user && canCreate(user.role, 'bearer') && (
          <Button asChild><Link to="/admin/bearers/new"><Plus className="h-4 w-4 mr-1" />{t('admin.bearers.add_new')}</Link></Button>
        )}
      </div>

      <Input placeholder={t('bearers_page.search_placeholder')} value={search} onChange={e => setSearch(e.target.value)} className="max-w-xs" />

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16" />
              <TableHead>Name</TableHead>
              <TableHead className="hidden md:table-cell">{t('filters.region')}</TableHead>
              <TableHead className="hidden md:table-cell">Elements</TableHead>
              <TableHead className="w-24" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map(b => (
              <TableRow key={b.id}>
                <TableCell><img src={b.photo_url} alt="" className="h-10 w-10 rounded-full object-cover" /></TableCell>
                <TableCell className="font-medium">{b.full_name}</TableCell>
                <TableCell className="hidden md:table-cell text-sm text-muted-foreground">{getRegionName(b.region_id)}</TableCell>
                <TableCell className="hidden md:table-cell text-sm">{getElementCount(b.id)}</TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <Button asChild variant="ghost" size="icon"><Link to={`/admin/bearers/${b.id}/edit`}><Pencil className="h-4 w-4" /></Link></Button>
                    {user && canDelete(user.role, 'bearer') && (
                      <AlertDialog>
                        <AlertDialogTrigger asChild><Button variant="ghost" size="icon"><Trash2 className="h-4 w-4 text-destructive" /></Button></AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader><AlertDialogTitle>{t('admin.messages.delete_confirm')}</AlertDialogTitle><AlertDialogDescription>{b.full_name}</AlertDialogDescription></AlertDialogHeader>
                          <AlertDialogFooter><AlertDialogCancel>{t('admin.form.cancel')}</AlertDialogCancel><AlertDialogAction onClick={() => toast.success(t('admin.messages.delete_success'))} className="bg-destructive text-destructive-foreground">{t('admin.elements.delete')}</AlertDialogAction></AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
