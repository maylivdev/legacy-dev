import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { SAMPLE_ELEMENTS, SAMPLE_BEARER_ELEMENTS, UNESCO_DOMAINS } from '@/data/seed';
import { getLocalizedField } from '@/types';
import type { Language } from '@/types';
import { DOMAIN_COLORS } from '@/lib/constants';

interface Props {
  bearerId: string;
}

export default function RelatedElements({ bearerId }: Props) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as Language;

  const elementIds = SAMPLE_BEARER_ELEMENTS.filter((be) => be.bearer_id === bearerId).map((be) => be.element_id);
  const elements = SAMPLE_ELEMENTS.filter((e) => elementIds.includes(e.id));

  if (elements.length === 0) return null;

  return (
    <div>
      <h3 className="text-sm font-semibold mb-3">{t('bearer_detail.practiced_elements')}</h3>
      <div className="space-y-3">
        {elements.map((el) => {
          const domain = UNESCO_DOMAINS.find((d) => d.id === el.unesco_domain_id);
          const color = DOMAIN_COLORS[el.unesco_domain_id] || 'hsl(var(--primary))';
          return (
            <Link key={el.id} to={`/catalog/${el.id}`} className="block group rounded-lg border p-3 hover:border-primary/50 transition-colors">
              <p className="text-sm font-medium group-hover:text-primary transition-colors line-clamp-1">
                {getLocalizedField(el, 'name', lang)}
              </p>
              {domain && (
                <span className="mt-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-medium text-white" style={{ backgroundColor: color }}>
                  {getLocalizedField(domain, 'name', lang)}
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
