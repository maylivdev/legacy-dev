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
import { SAMPLE_ELEMENTS, REGIONS, UNESCO_DOMAINS } from '@/data/seed';
import { getLocalizedField, type Language } from '@/types';
import { useAuth } from '@/contexts/AuthContext';
import { canPublish } from '@/lib/permissions';
import { toast } from 'sonner';
import { ArrowLeft, Save } from 'lucide-react';

export default function ElementForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { user } = useAuth();
  const lang = i18n.language as Language;
  const isEdit = !!id;

  const existing = isEdit ? SAMPLE_ELEMENTS.find(e => e.id === id) : null;

  const [form, setForm] = useState({
    name_kk: existing?.name_kk || '',
    name_ru: existing?.name_ru || '',
    name_en: existing?.name_en || '',
    brief_description_kk: existing?.brief_description_kk || '',
    brief_description_ru: existing?.brief_description_ru || '',
    brief_description_en: existing?.brief_description_en || '',
    detailed_description_kk: existing?.detailed_description_kk || '',
    detailed_description_ru: existing?.detailed_description_ru || '',
    detailed_description_en: existing?.detailed_description_en || '',
    region_id: existing?.region_id || '',
    unesco_domain_id: existing?.unesco_domain_id || '',
    latitude: existing?.latitude?.toString() || '',
    longitude: existing?.longitude?.toString() || '',
    status: existing?.status || 'draft' as 'draft' | 'published',
  });

  const [loading, setLoading] = useState(false);

  const update = (field: string, value: string) => setForm(prev => ({ ...prev, [field]: value }));

  const handleSubmit = (publishStatus: 'draft' | 'published') => {
    if (!form.name_kk || !form.name_ru || !form.region_id || !form.unesco_domain_id) {
      toast.error(t('admin.form.required'));
      return;
    }
    setLoading(true);
    // Simulate save
    setTimeout(() => {
      setLoading(false);
      toast.success(t('admin.messages.save_success'));
      navigate('/admin/elements');
    }, 500);
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => navigate('/admin/elements')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold">
          {isEdit ? t('admin.elements.edit') : t('admin.elements.add_new')}
        </h1>
      </div>

      <Card>
        <CardHeader><CardTitle>{t('admin.form.basic_info')}</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {(['kk', 'ru', 'en'] as const).map(l => (
            <div key={l} className="space-y-2">
              <Label>Name ({l.toUpperCase()})</Label>
              <Input value={form[`name_${l}`]} onChange={e => update(`name_${l}`, e.target.value)} required />
            </div>
          ))}
          <Separator />
          {(['kk', 'ru', 'en'] as const).map(l => (
            <div key={`brief_${l}`} className="space-y-2">
              <Label>{t('element_detail.brief_description')} ({l.toUpperCase()})</Label>
              <Textarea value={form[`brief_description_${l}`]} onChange={e => update(`brief_description_${l}`, e.target.value)} rows={3} />
            </div>
          ))}
          <Separator />
          {(['kk', 'ru', 'en'] as const).map(l => (
            <div key={`det_${l}`} className="space-y-2">
              <Label>{t('element_detail.detailed_description')} ({l.toUpperCase()})</Label>
              <Textarea value={form[`detailed_description_${l}`]} onChange={e => update(`detailed_description_${l}`, e.target.value)} rows={8} />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>{t('admin.form.classification')}</CardTitle></CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>{t('filters.region')}</Label>
            <Select value={form.region_id} onValueChange={v => update('region_id', v)}>
              <SelectTrigger><SelectValue placeholder={t('filters.all_regions')} /></SelectTrigger>
              <SelectContent>
                {REGIONS.map(r => <SelectItem key={r.id} value={r.id}>{getLocalizedField(r, 'name', lang)}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>{t('filters.domain')}</Label>
            <Select value={form.unesco_domain_id} onValueChange={v => update('unesco_domain_id', v)}>
              <SelectTrigger><SelectValue placeholder={t('filters.all_domains')} /></SelectTrigger>
              <SelectContent>
                {UNESCO_DOMAINS.map(d => <SelectItem key={d.id} value={d.id}>{getLocalizedField(d, 'name', lang)}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>{t('admin.form.location')}</CardTitle></CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>{t('admin.form.latitude')}</Label>
            <Input type="number" step="0.0001" value={form.latitude} onChange={e => update('latitude', e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>{t('admin.form.longitude')}</Label>
            <Input type="number" step="0.0001" value={form.longitude} onChange={e => update('longitude', e.target.value)} />
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-3 justify-end">
        <Button variant="outline" onClick={() => navigate('/admin/elements')}>{t('admin.form.cancel')}</Button>
        <Button variant="secondary" onClick={() => handleSubmit('draft')} disabled={loading}>
          <Save className="h-4 w-4 mr-1" />{t('admin.form.save_draft')}
        </Button>
        {user && canPublish(user.role) && (
          <Button onClick={() => handleSubmit('published')} disabled={loading}>
            {t('admin.form.publish')}
          </Button>
        )}
      </div>
    </div>
  );
}
