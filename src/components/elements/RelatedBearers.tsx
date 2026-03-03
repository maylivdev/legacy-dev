import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { SAMPLE_BEARERS, SAMPLE_BEARER_ELEMENTS } from '@/data/seed';

interface Props {
  elementId: string;
}

export default function RelatedBearers({ elementId }: Props) {
  const { t } = useTranslation();

  const bearerIds = SAMPLE_BEARER_ELEMENTS.filter((be) => be.element_id === elementId).map((be) => be.bearer_id);
  const bearers = SAMPLE_BEARERS.filter((b) => bearerIds.includes(b.id));

  if (bearers.length === 0) return null;

  const shown = bearers.slice(0, 5);

  return (
    <div>
      <h3 className="text-sm font-semibold mb-3">{t('element_detail.related_bearers')}</h3>
      <div className="space-y-3">
        {shown.map((bearer) => (
          <Link key={bearer.id} to={`/bearers/${bearer.id}`} className="flex items-center gap-3 group">
            <img
              src={bearer.photo_url}
              alt={bearer.full_name}
              className="h-12 w-12 rounded-full object-cover shrink-0 border"
            />
            <span className="text-sm font-medium group-hover:text-primary transition-colors line-clamp-1">
              {bearer.full_name}
            </span>
          </Link>
        ))}
      </div>
      {bearers.length > 5 && (
        <Link to="/bearers" className="mt-2 inline-block text-sm text-primary hover:underline">
          {t('element_detail.show_all')} →
        </Link>
      )}
    </div>
  );
}
