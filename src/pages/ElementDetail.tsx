import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MapPin, Calendar, Tag } from 'lucide-react';
import { SAMPLE_ELEMENTS, REGIONS, UNESCO_DOMAINS } from '@/data/seed';
import { getLocalizedField } from '@/types';
import type { Language } from '@/types';
import { DOMAIN_COLORS } from '@/lib/constants';
import PhotoGallery from '@/components/elements/PhotoGallery';
import VideoGallery from '@/components/elements/VideoGallery';
import AudioPlayer from '@/components/elements/AudioPlayer';
import QuickInfoCard from '@/components/elements/QuickInfoCard';
import LocationMap from '@/components/elements/LocationMap';
import RelatedBearers from '@/components/elements/RelatedBearers';
import ShareButtons from '@/components/elements/ShareButtons';
import { Button } from '@/components/ui/button';

export default function ElementDetail() {
  const { id } = useParams<{ id: string }>();
  const { t, i18n } = useTranslation();
  const lang = i18n.language as Language;

  const element = SAMPLE_ELEMENTS.find((e) => e.id === id);

  if (!element) {
    return (
      <div className="container py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">{t('element_detail.not_found')}</h1>
        <Button asChild>
          <Link to="/catalog">{t('element_detail.back_to_catalog')}</Link>
        </Button>
      </div>
    );
  }

  const region = REGIONS.find((r) => r.id === element.region_id);
  const domain = UNESCO_DOMAINS.find((d) => d.id === element.unesco_domain_id);
  const domainColor = DOMAIN_COLORS[element.unesco_domain_id] || 'hsl(var(--primary))';
  const elName = getLocalizedField(element, 'name', lang);

  return (
    <div>
      {/* Hero */}
      <div className="relative h-[250px] md:h-[400px] bg-muted overflow-hidden">
        {element.photos.length > 0 ? (
          <img src={element.photos[0]} alt={elName} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <div className="container">
            <nav className="mb-3 text-sm text-white/70">
              <Link to="/" className="hover:text-white">{t('nav.home')}</Link>
              <span className="mx-2">/</span>
              <Link to="/catalog" className="hover:text-white">{t('nav.catalog')}</Link>
              <span className="mx-2">/</span>
              <span className="text-white">{elName}</span>
            </nav>
            <h1 className="text-2xl md:text-4xl font-bold text-white">{elName}</h1>
          </div>
        </div>
      </div>

      <div className="container py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main content */}
          <div className="flex-1 space-y-8 min-w-0">
            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              {domain && (
                <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium text-white" style={{ backgroundColor: domainColor }}>
                  <Tag className="h-3 w-3" />
                  {getLocalizedField(domain, 'name', lang)}
                </span>
              )}
              {region && (
                <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium bg-muted text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  {getLocalizedField(region, 'name', lang)}
                </span>
              )}
              <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium bg-muted text-muted-foreground">
                <Calendar className="h-3 w-3" />
                {element.created_at}
              </span>
            </div>

            {/* Brief description */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">{t('element_detail.brief_description')}</h2>
              <p className="text-lg leading-relaxed text-foreground">
                {getLocalizedField(element, 'brief_description', lang)}
              </p>
            </section>

            {/* Detailed description */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">{t('element_detail.detailed_description')}</h2>
              <div className="leading-relaxed text-foreground space-y-4">
                {getLocalizedField(element, 'detailed_description', lang).split('\n\n').map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </section>

            <PhotoGallery photos={element.photos} />
            <VideoGallery videos={element.videos} />
            <AudioPlayer audioFiles={element.audio} />
          </div>

          {/* Sidebar */}
          <aside className="w-full lg:w-80 shrink-0 space-y-6">
            <QuickInfoCard
              regionName={region ? getLocalizedField(region, 'name', lang) : ''}
              regionId={element.region_id}
              domainName={domain ? getLocalizedField(domain, 'name', lang) : ''}
              domainId={element.unesco_domain_id}
              status={element.status}
              dateAdded={element.created_at}
            />
            <LocationMap
              latitude={element.latitude}
              longitude={element.longitude}
              name={elName}
              color={domainColor}
            />
            <RelatedBearers elementId={element.id} />
            <ShareButtons url={`/catalog/${element.id}`} title={elName} />
          </aside>
        </div>
      </div>
    </div>
  );
}
