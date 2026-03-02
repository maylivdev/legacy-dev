import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Search, ArrowRight, MapPin, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { SAMPLE_ELEMENTS, SAMPLE_NEWS, UNESCO_DOMAINS, REGIONS } from '@/data/seed';
import { getLocalizedField } from '@/types';
import type { Language } from '@/types';
import ElementCard from '@/components/elements/ElementCard';
import NewsCard from '@/components/news/NewsCard';
import MapView from '@/components/map/MapView';

export default function Index() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as Language;

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-primary py-20 text-primary-foreground lg:py-32">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'repeating-linear-gradient(45deg, currentColor 0, currentColor 1px, transparent 0, transparent 50%)',
            backgroundSize: '20px 20px',
          }} />
        </div>
        <div className="container relative">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              {t('hero.title')}
            </h1>
            <p className="mb-8 text-lg opacity-90 sm:text-xl">
              {t('hero.subtitle')}
            </p>
            <div className="mx-auto flex max-w-lg gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 opacity-50" />
                <Link to="/search" className="block">
                  <Input
                    placeholder={t('hero.search_placeholder')}
                    className="h-12 border-primary-foreground/20 bg-primary-foreground/10 pl-10 text-primary-foreground placeholder:text-primary-foreground/50 focus-visible:ring-primary-foreground/30 cursor-pointer"
                    readOnly
                  />
                </Link>
              </div>
              <Link to="/catalog">
                <Button size="lg" variant="secondary" className="h-12 font-semibold">
                  {t('hero.explore')}
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Elements */}
      <section className="container py-16">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold">{t('sections.featured_elements')}</h2>
          <Link to="/catalog">
            <Button variant="ghost" size="sm">
              {t('sections.view_all')} <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SAMPLE_ELEMENTS.slice(0, 6).map((el) => (
            <ElementCard key={el.id} element={el} />
          ))}
        </div>
      </section>

      {/* Interactive Map */}
      <section className="bg-muted py-16">
        <div className="container">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold">{t('sections.map_title')}</h2>
            <p className="mt-2 text-muted-foreground">{t('sections.map_subtitle')}</p>
          </div>
          <div className="mx-auto max-w-5xl">
            <MapView elements={SAMPLE_ELEMENTS} height="400px" showReset={false} />
            <div className="mt-4 text-center">
              <Link to="/map">
                <Button variant="outline" className="gap-2">
                  <MapPin className="h-4 w-4" />
                  {t('map_page.view_full_map')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="container py-16">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold">{t('sections.latest_news')}</h2>
          <Link to="/news">
            <Button variant="ghost" size="sm">
              {t('sections.view_all')} <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SAMPLE_NEWS.slice(0, 3).map((news) => (
            <NewsCard key={news.id} news={news} />
          ))}
        </div>
      </section>

      {/* International Resources */}
      <section className="border-t bg-muted py-16">
        <div className="container">
          <h2 className="mb-8 text-center text-2xl font-bold">{t('sections.resources')}</h2>
          <div className="mx-auto grid max-w-2xl gap-4 sm:grid-cols-2">
            <a href="https://www.unesco.org" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-lg border bg-card p-4 transition-shadow hover:shadow-md">
              <ExternalLink className="h-5 w-5 text-primary" />
              <span className="font-medium">{t('footer.unesco')}</span>
            </a>
            <a href="https://ich.unesco.org" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-lg border bg-card p-4 transition-shadow hover:shadow-md">
              <ExternalLink className="h-5 w-5 text-primary" />
              <span className="font-medium">{t('footer.ich_convention')}</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
