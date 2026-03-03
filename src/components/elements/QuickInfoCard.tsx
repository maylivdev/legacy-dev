import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { MapPin, Tag, Calendar, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { DOMAIN_COLORS } from '@/lib/constants';

interface Props {
  regionName: string;
  regionId: string;
  domainName: string;
  domainId: string;
  status: string;
  dateAdded: string;
}

export default function QuickInfoCard({ regionName, regionId, domainName, domainId, status, dateAdded }: Props) {
  const { t } = useTranslation();
  const domainColor = DOMAIN_COLORS[domainId] || 'hsl(var(--primary))';

  return (
    <Card>
      <CardContent className="p-5 space-y-3">
        <h3 className="font-semibold">{t('element_detail.quick_info')}</h3>
        <div className="space-y-2.5 text-sm">
          <Link to={`/catalog?region=${regionId}`} className="flex items-center gap-2 hover:text-primary transition-colors">
            <MapPin className="h-4 w-4 text-muted-foreground shrink-0" />
            <span>{regionName}</span>
          </Link>
          <Link to={`/catalog?domain=${domainId}`} className="flex items-center gap-2 hover:text-primary transition-colors">
            <span className="h-3 w-3 rounded-full shrink-0" style={{ backgroundColor: domainColor }} />
            <span>{domainName}</span>
          </Link>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-muted-foreground shrink-0" />
            <span>{status === 'published' ? t('element_detail.status_published') : t('element_detail.status_draft')}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground shrink-0" />
            <span>{dateAdded}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
