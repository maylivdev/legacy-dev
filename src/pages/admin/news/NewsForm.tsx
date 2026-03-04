import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { SAMPLE_NEWS } from '@/data/seed';
import { useAuth } from '@/contexts/AuthContext';
import { canPublish } from '@/lib/permissions';
import { toast } from 'sonner';
import { ArrowLeft, Save } from 'lucide-react';

const CATEGORIES = ['new_elements', 'festivals', 'research', 'cooperation', 'education', 'publications'] as const;

export default function NewsForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { user } = useAuth();
  const isEdit = !!id;
  const existing = isEdit ? SAMPLE_NEWS.find(n => n.id === id) : null;

  const [form, setForm] = useState({
    title_kk: existing?.title_kk || '',
    title_ru: existing?.title_ru || '',
    title_en: existing?.title_en || '',
    content_kk: existing?.content_kk || '',
    content_ru: existing?.content_ru || '',
    content_en: existing?.content_en || '',
    category: existing?.category || '' as string,
    featured_image_url: existing?.featured_image_url || '',
  });

  const update = (field: string, value: string) => setForm(prev => ({ ...prev, [field]: value }));

  const handleSubmit = (status: 'draft' | 'published') => {
    if (!form.title_kk || !form.title_ru || !form.category) {
      toast.error(t('admin.form.required'));
      return;
    }
    toast.success(t('admin.messages.save_success'));
    navigate('/admin/news');
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => navigate('/admin/news')}><ArrowLeft className="h-4 w-4" /></Button>
        <h1 className="text-2xl font-bold">{isEdit ? t('admin.elements.edit') : t('admin.news.add_new')}</h1>
      </div>

      <Card>
        <CardHeader><CardTitle>{t('admin.form.basic_info')}</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {(['kk', 'ru', 'en'] as const).map(l => (
            <div key={l} className="space-y-2">
              <Label>Title ({l.toUpperCase()})</Label>
              <Input value={form[`title_${l}`]} onChange={e => update(`title_${l}`, e.target.value)} required />
            </div>
          ))}
          <Separator />
          {(['kk', 'ru', 'en'] as const).map(l => (
            <div key={`c_${l}`} className="space-y-2">
              <Label>Content ({l.toUpperCase()})</Label>
              <Textarea value={form[`content_${l}`]} onChange={e => update(`content_${l}`, e.target.value)} rows={12} />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>{t('admin.form.classification')}</CardTitle></CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>Category</Label>
            <Select value={form.category} onValueChange={v => update('category', v)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {CATEGORIES.map(c => <SelectItem key={c} value={c}>{t(`news_page.category.${c}`)}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Featured Image URL</Label>
            <Input value={form.featured_image_url} onChange={e => update('featured_image_url', e.target.value)} placeholder="https://..." />
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-3 justify-end">
        <Button variant="outline" onClick={() => navigate('/admin/news')}>{t('admin.form.cancel')}</Button>
        <Button variant="secondary" onClick={() => handleSubmit('draft')}><Save className="h-4 w-4 mr-1" />{t('admin.form.save_draft')}</Button>
        {user && canPublish(user.role) && (
          <Button onClick={() => handleSubmit('published')}>{t('admin.form.publish')}</Button>
        )}
      </div>
    </div>
  );
}
