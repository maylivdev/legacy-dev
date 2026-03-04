import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { SAMPLE_NEWS } from '@/data/seed';
import { useAuth } from '@/contexts/AuthContext';
import { canCreate, canDelete } from '@/lib/permissions';
import { getLocalizedField, type Language } from '@/types';
import { toast } from 'sonner';

export default function NewsList() {
  const { t, i18n } = useTranslation();
  const { user } = useAuth();
  const lang = i18n.language as Language;
  const [search, setSearch] = useState('');

  const filtered = SAMPLE_NEWS.filter(n => {
    const title = getLocalizedField(n, 'title', lang).toLowerCase();
    return !search || title.includes(search.toLowerCase());
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h1 className="text-2xl font-bold">{t('admin.news.title')}</h1>
        {user && canCreate(user.role, 'news') && (
          <Button asChild><Link to="/admin/news/new"><Plus className="h-4 w-4 mr-1" />{t('admin.news.add_new')}</Link></Button>
        )}
      </div>

      <Input placeholder={t('news_page.search_placeholder')} value={search} onChange={e => setSearch(e.target.value)} className="max-w-xs" />

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16" />
              <TableHead>Title</TableHead>
              <TableHead className="hidden md:table-cell">Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">Date</TableHead>
              <TableHead className="w-24" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map(n => (
              <TableRow key={n.id}>
                <TableCell><img src={n.featured_image_url} alt="" className="h-10 w-14 rounded object-cover" /></TableCell>
                <TableCell className="font-medium">{getLocalizedField(n, 'title', lang)}</TableCell>
                <TableCell className="hidden md:table-cell"><Badge variant="outline">{t(`news_page.category.${n.category}`)}</Badge></TableCell>
                <TableCell><Badge variant={n.status === 'published' ? 'default' : 'secondary'}>{n.status === 'published' ? t('admin.elements.status_published') : t('admin.elements.status_draft')}</Badge></TableCell>
                <TableCell className="hidden md:table-cell text-sm text-muted-foreground">{n.published_at}</TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <Button asChild variant="ghost" size="icon"><Link to={`/admin/news/${n.id}/edit`}><Pencil className="h-4 w-4" /></Link></Button>
                    {user && canDelete(user.role, 'news') && (
                      <AlertDialog>
                        <AlertDialogTrigger asChild><Button variant="ghost" size="icon"><Trash2 className="h-4 w-4 text-destructive" /></Button></AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader><AlertDialogTitle>{t('admin.messages.delete_confirm')}</AlertDialogTitle><AlertDialogDescription>{getLocalizedField(n, 'title', lang)}</AlertDialogDescription></AlertDialogHeader>
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
