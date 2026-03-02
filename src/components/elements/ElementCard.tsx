import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { getLocalizedField } from '@/types';
import type { IchElement, Language } from '@/types';
import { REGIONS, UNESCO_DOMAINS } from '@/data/seed';
import { DOMAIN_COLORS } from '@/lib/constants';

interface Props {
  element: IchElement;
}

export default function ElementCard({ element }: Props) {
  const { i18n } = useTranslation();
  const lang = i18n.language as Language;
  const region = REGIONS.find((r) => r.id === element.region_id);
  const domain = UNESCO_DOMAINS.find((d) => d.id === element.unesco_domain_id);
  const domainColor = DOMAIN_COLORS[element.unesco_domain_id] || 'hsl(var(--primary))';

  return (
    <Link to={`/catalog/${element.id}`}>
      <Card className="group h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        <div className="relative aspect-[4/3] bg-muted flex items-center justify-center">
          <MapPin className="h-12 w-12 text-muted-foreground/30" />
          {domain && (
            <span
              className="absolute top-3 left-3 rounded-full px-2.5 py-1 text-xs font-semibold text-white shadow-sm"
              style={{ backgroundColor: domainColor }}
            >
              {getLocalizedField(domain, 'name', lang)}
            </span>
          )}
        </div>
        <CardContent className="p-4">
          <h3 className="mb-1.5 font-semibold text-base leading-snug line-clamp-2 group-hover:text-primary transition-colors">
            {getLocalizedField(element, 'name', lang)}
          </h3>
          {region && (
            <p className="mb-2 flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3 shrink-0" />
              {getLocalizedField(region, 'name', lang)}
            </p>
          )}
          <p className="text-sm text-muted-foreground line-clamp-3">
            {getLocalizedField(element, 'brief_description', lang)}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
