import { useTranslation } from 'react-i18next';
import { UNESCO_DOMAINS } from '@/data/seed';
import { DOMAIN_COLORS } from '@/lib/constants';
import { getLocalizedField } from '@/types';
import type { Language } from '@/types';

export default function MapLegend() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as Language;

  return (
    <div className="rounded-lg border bg-card p-4">
      <h3 className="mb-3 text-sm font-semibold">{t('map_page.legend')}</h3>
      <div className="space-y-2">
        {UNESCO_DOMAINS.map((d) => (
          <div key={d.id} className="flex items-center gap-2">
            <span
              className="h-3.5 w-3.5 rounded-full shrink-0"
              style={{ backgroundColor: DOMAIN_COLORS[d.id] || '#6b7280' }}
            />
            <span className="text-xs">{getLocalizedField(d, 'name', lang)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
