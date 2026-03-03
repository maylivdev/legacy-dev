import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MapPin } from 'lucide-react';
import { SAMPLE_BEARERS, REGIONS, SAMPLE_BEARER_ELEMENTS } from '@/data/seed';
import { getLocalizedField } from '@/types';
import type { Language } from '@/types';
import VideoGallery from '@/components/elements/VideoGallery';
import RelatedElements from '@/components/elements/RelatedElements';
import ShareButtons from '@/components/elements/ShareButtons';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function BearerDetail() {
  const { id } = useParams<{ id: string }>();
  const { t, i18n } = useTranslation();
  const lang = i18n.language as Language;

  const bearer = SAMPLE_BEARERS.find((b) => b.id === id);

  if (!bearer) {
    return (
      <div className="container py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">{t('bearer_detail.not_found')}</h1>
        <Button asChild>
          <Link to="/bearers">{t('bearer_detail.back_to_bearers')}</Link>
        </Button>
      </div>
    );
  }

  const region = REGIONS.find((r) => r.id === bearer.region_id);
  const elementCount = SAMPLE_BEARER_ELEMENTS.filter((be) => be.bearer_id === bearer.id).length;

  return (
    <div className="container py-8">
      {/* Breadcrumbs */}
      <nav className="mb-6 text-sm text-muted-foreground">
        <Link to="/" className="hover:text-primary">{t('nav.home')}</Link>
        <span className="mx-2">/</span>
        <Link to="/bearers" className="hover:text-primary">{t('nav.bearers')}</Link>
        <span className="mx-2">/</span>
        <span className="text-foreground font-medium">{bearer.full_name}</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main */}
        <div className="flex-1 space-y-8 min-w-0">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <img
              src={bearer.photo_url}
              alt={bearer.full_name}
              className="h-40 w-40 rounded-full object-cover border-4 border-background shadow-lg shrink-0"
            />
            <div className="text-center sm:text-left">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{bearer.full_name}</h1>
              {region && (
                <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium bg-muted text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  {getLocalizedField(region, 'name', lang)}
                </span>
              )}
            </div>
          </div>

          {/* Biography */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">{t('bearer_detail.biography')}</h2>
            <div className="leading-relaxed space-y-4">
              {bearer.biography.split('\n\n').map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </section>

          {/* Awards */}
          {bearer.awards && (
            <section>
              <h2 className="text-2xl font-semibold mb-4">{t('bearer_detail.awards')}</h2>
              <p className="leading-relaxed">{bearer.awards}</p>
            </section>
          )}

          {/* Video interviews */}
          <VideoGallery videos={bearer.video_interviews} title={t('bearer_detail.video_interviews')} />
        </div>

        {/* Sidebar */}
        <aside className="w-full lg:w-80 shrink-0 space-y-6">
          <Card>
            <CardContent className="p-5 space-y-3">
              <h3 className="font-semibold">{t('element_detail.quick_info')}</h3>
              <div className="space-y-2.5 text-sm">
                {region && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground shrink-0" />
                    <span>{getLocalizedField(region, 'name', lang)}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">{t('bearer_detail.practiced_elements')}:</span>
                  <span className="font-medium">{elementCount}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <RelatedElements bearerId={bearer.id} />
          <ShareButtons url={`/bearers/${bearer.id}`} title={bearer.full_name} />
        </aside>
      </div>
    </div>
  );
}
