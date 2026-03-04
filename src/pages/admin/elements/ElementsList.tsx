import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Plus, Pencil, Trash2, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { SAMPLE_ELEMENTS, REGIONS, UNESCO_DOMAINS } from '@/data/seed';
import { useAuth } from '@/contexts/AuthContext';
import { canCreate, canDelete, canPublish } from '@/lib/permissions';
import { getLocalizedField, type Language } from '@/types';
import { toast } from 'sonner';

export default function ElementsList() {
  const { t, i18n } = useTranslation();
  const { user } = useAuth();
  const lang = i18n.language as Language;
  const [search, setSearch] = useState('');
  const [regionFilter, setRegionFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = SAMPLE_ELEMENTS.filter(el => {
    const name = getLocalizedField(el, 'name', lang).toLowerCase();
    if (search && !name.includes(search.toLowerCase())) return false;
    if (regionFilter !== 'all' && el.region_id !== regionFilter) return false;
    if (statusFilter !== 'all' && el.status !== statusFilter) return false;
    return true;
  });

  const getRegionName = (id: string) => getLocalizedField(REGIONS.find(r => r.id === id) || REGIONS[0], 'name', lang);
  const getDomainName = (id: string) => getLocalizedField(UNESCO_DOMAINS.find(d => d.id === id) || UNESCO_DOMAINS[0], 'name', lang);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h1 className="text-2xl font-bold">{t('admin.elements.title')}</h1>
        {user && canCreate(user.role, 'element') && (
          <Button asChild>
            <Link to="/admin/elements/new"><Plus className="h-4 w-4 mr-1" />{t('admin.elements.add_new')}</Link>
          </Button>
        )}
      </div>

      <div className="flex flex-wrap gap-3">
        <Input placeholder={t('catalog.search_placeholder')} value={search} onChange={e => setSearch(e.target.value)} className="max-w-xs" />
        <Select value={regionFilter} onValueChange={setRegionFilter}>
          <SelectTrigger className="w-48"><SelectValue placeholder={t('filters.all_regions')} /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t('filters.all_regions')}</SelectItem>
            {REGIONS.map(r => <SelectItem key={r.id} value={r.id}>{getLocalizedField(r, 'name', lang)}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="published">{t('admin.elements.status_published')}</SelectItem>
            <SelectItem value="draft">{t('admin.elements.status_draft')}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16" />
              <TableHead>{t('catalog.search_placeholder').replace('...', '')}</TableHead>
              <TableHead className="hidden md:table-cell">{t('filters.region')}</TableHead>
              <TableHead className="hidden lg:table-cell">{t('filters.domain')}</TableHead>
              <TableHead>{t('admin.form.status')}</TableHead>
              <TableHead className="w-32" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map(el => (
              <TableRow key={el.id}>
                <TableCell>
                  {el.photos[0] && <img src={el.photos[0]} alt="" className="h-10 w-10 rounded object-cover" />}
                </TableCell>
                <TableCell className="font-medium">{getLocalizedField(el, 'name', lang)}</TableCell>
                <TableCell className="hidden md:table-cell text-sm text-muted-foreground">{getRegionName(el.region_id)}</TableCell>
                <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">{getDomainName(el.unesco_domain_id)}</TableCell>
                <TableCell>
                  <Badge variant={el.status === 'published' ? 'default' : 'secondary'}>
                    {el.status === 'published' ? t('admin.elements.status_published') : t('admin.elements.status_draft')}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <Button asChild variant="ghost" size="icon">
                      <Link to={`/admin/elements/${el.id}/edit`}><Pencil className="h-4 w-4" /></Link>
                    </Button>
                    {user && canDelete(user.role, 'element') && (
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon"><Trash2 className="h-4 w-4 text-destructive" /></Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>{t('admin.messages.delete_confirm')}</AlertDialogTitle>
                            <AlertDialogDescription>{getLocalizedField(el, 'name', lang)}</AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>{t('admin.form.cancel')}</AlertDialogCancel>
                            <AlertDialogAction onClick={() => toast.success(t('admin.messages.delete_success'))} className="bg-destructive text-destructive-foreground">{t('admin.elements.delete')}</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && (
              <TableRow><TableCell colSpan={6} className="text-center py-8 text-muted-foreground">{t('catalog.no_results')}</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
