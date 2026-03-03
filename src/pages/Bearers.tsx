import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Search, SearchX, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { REGIONS, SAMPLE_BEARERS, SAMPLE_BEARER_ELEMENTS } from '@/data/seed';
import { getLocalizedField } from '@/types';
import type { Language } from '@/types';

export default function BearersPage() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as Language;
  const [search, setSearch] = useState('');
  const [regionId, setRegionId] = useState('all');

  const filtered = useMemo(() => {
    let result = [...SAMPLE_BEARERS];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter((b) => b.full_name.toLowerCase().includes(q));
    }
    if (regionId !== 'all') {
      result = result.filter((b) => b.region_id === regionId);
    }
    return result;
  }, [search, regionId]);

  return (
    <div className="container py-8">
      <nav className="mb-6 text-sm text-muted-foreground">
        <Link to="/" className="hover:text-primary">{t('nav.home')}</Link>
        <span className="mx-2">/</span>
        <span className="text-foreground font-medium">{t('bearers_page.title')}</span>
      </nav>

      <h1 className="mb-6 text-2xl font-bold lg:text-3xl">{t('bearers_page.title')}</h1>

      <div className="mb-6 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t('bearers_page.search_placeholder')}
            className="pl-9"
          />
        </div>
        <Select value={regionId} onValueChange={setRegionId}>
          <SelectTrigger className="w-full sm:w-56">
            <SelectValue placeholder={t('filters.all_regions')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t('filters.all_regions')}</SelectItem>
            {REGIONS.map((r) => (
              <SelectItem key={r.id} value={r.id}>{getLocalizedField(r, 'name', lang)}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {filtered.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((bearer) => {
            const region = REGIONS.find((r) => r.id === bearer.region_id);
            const elCount = SAMPLE_BEARER_ELEMENTS.filter((be) => be.bearer_id === bearer.id).length;
            return (
              <Link key={bearer.id} to={`/bearers/${bearer.id}`}>
                <Card className="group h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <CardContent className="p-5 flex items-start gap-4">
                    <img
                      src={bearer.photo_url}
                      alt={bearer.full_name}
                      className="h-16 w-16 rounded-full object-cover shrink-0 border"
                    />
                    <div className="min-w-0">
                      <h3 className="font-semibold leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                        {bearer.full_name}
                      </h3>
                      {region && (
                        <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                          <MapPin className="h-3 w-3 shrink-0" />
                          {getLocalizedField(region, 'name', lang)}
                        </p>
                      )}
                      <p className="mt-1 text-xs text-muted-foreground">
                        {t('bearers_page.practices')}: {elCount}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-xl border bg-card py-16">
          <SearchX className="mb-4 h-12 w-12 text-muted-foreground/40" />
          <p className="text-lg font-semibold">{t('bearers_page.no_results')}</p>
          <p className="mt-1 text-sm text-muted-foreground">{t('catalog.no_results_hint')}</p>
        </div>
      )}
    </div>
  );
}
