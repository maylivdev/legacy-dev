import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SAMPLE_BEARERS, REGIONS } from '@/data/seed';
import { getLocalizedField, type Language } from '@/types';
import { toast } from 'sonner';
import { ArrowLeft, Save } from 'lucide-react';

export default function BearerForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const lang = i18n.language as Language;
  const isEdit = !!id;
  const existing = isEdit ? SAMPLE_BEARERS.find(b => b.id === id) : null;

  const [form, setForm] = useState({
    full_name: existing?.full_name || '',
    biography: existing?.biography || '',
    region_id: existing?.region_id || '',
    awards: existing?.awards || '',
  });

  const update = (field: string, value: string) => setForm(prev => ({ ...prev, [field]: value }));

  const handleSave = () => {
    if (!form.full_name || !form.biography || !form.region_id) {
      toast.error(t('admin.form.required'));
      return;
    }
    toast.success(t('admin.messages.save_success'));
    navigate('/admin/bearers');
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => navigate('/admin/bearers')}><ArrowLeft className="h-4 w-4" /></Button>
        <h1 className="text-2xl font-bold">{isEdit ? t('admin.elements.edit') : t('admin.bearers.add_new')}</h1>
      </div>

      <Card>
        <CardHeader><CardTitle>{t('admin.form.basic_info')}</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Full Name</Label>
            <Input value={form.full_name} onChange={e => update('full_name', e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label>{t('filters.region')}</Label>
            <Select value={form.region_id} onValueChange={v => update('region_id', v)}>
              <SelectTrigger><SelectValue placeholder={t('filters.all_regions')} /></SelectTrigger>
              <SelectContent>{REGIONS.map(r => <SelectItem key={r.id} value={r.id}>{getLocalizedField(r, 'name', lang)}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>{t('bearer_detail.biography')}</Label>
            <Textarea value={form.biography} onChange={e => update('biography', e.target.value)} rows={8} required />
          </div>
          <div className="space-y-2">
            <Label>{t('bearer_detail.awards')}</Label>
            <Textarea value={form.awards} onChange={e => update('awards', e.target.value)} rows={4} />
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-3 justify-end">
        <Button variant="outline" onClick={() => navigate('/admin/bearers')}>{t('admin.form.cancel')}</Button>
        <Button onClick={handleSave}><Save className="h-4 w-4 mr-1" />{t('admin.form.save')}</Button>
      </div>
    </div>
  );
}
