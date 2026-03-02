import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import MapView from '@/components/map/MapView';
import MapLegend from '@/components/map/MapLegend';
import { SAMPLE_ELEMENTS, REGIONS, UNESCO_DOMAINS } from '@/data/seed';
import { getLocalizedField } from '@/types';
import type { Language } from '@/types';

export default function MapPage() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as Language;
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [selectedDomains, setSelectedDomains] = useState<string[]>([]);

  const filtered = useMemo(() => {
    return SAMPLE_ELEMENTS.filter((el) => {
      if (selectedRegions.length > 0 && !selectedRegions.includes(el.region_id)) return false;
      if (selectedDomains.length > 0 && !selectedDomains.includes(el.unesco_domain_id)) return false;
      return true;
    });
  }, [selectedRegions, selectedDomains]);

  const toggleRegion = (id: string) =>
    setSelectedRegions((prev) => (prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]));
  const toggleDomain = (id: string) =>
    setSelectedDomains((prev) => (prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]));

  return (
    <div className="container py-8">
      <nav className="mb-6 text-sm text-muted-foreground">
        <Link to="/" className="hover:text-primary">{t('nav.home')}</Link>
        <span className="mx-2">/</span>
        <span className="text-foreground font-medium">{t('map_page.title')}</span>
      </nav>

      <h1 className="mb-6 text-2xl font-bold lg:text-3xl">{t('map_page.title')}</h1>

      <div className="flex gap-6">
        {/* Sidebar filters */}
        <aside className="hidden w-64 shrink-0 lg:block space-y-4">
          <MapLegend />

          <div className="rounded-lg border bg-card p-4">
            <h3 className="mb-2 text-sm font-semibold">{t('catalog.filter_region')}</h3>
            <ScrollArea className="h-48">
              <div className="space-y-1 pr-2">
                {REGIONS.map((r) => (
                  <label key={r.id} className="flex items-center gap-2 rounded px-2 py-1 text-xs hover:bg-muted cursor-pointer">
                    <Checkbox checked={selectedRegions.includes(r.id)} onCheckedChange={() => toggleRegion(r.id)} />
                    <span className="truncate">{getLocalizedField(r, 'name', lang)}</span>
                  </label>
                ))}
              </div>
            </ScrollArea>
          </div>

          <div className="rounded-lg border bg-card p-4">
            <h3 className="mb-2 text-sm font-semibold">{t('catalog.filter_domain')}</h3>
            <div className="space-y-1">
              {UNESCO_DOMAINS.map((d) => (
                <label key={d.id} className="flex items-center gap-2 rounded px-2 py-1 text-xs hover:bg-muted cursor-pointer">
                  <Checkbox checked={selectedDomains.includes(d.id)} onCheckedChange={() => toggleDomain(d.id)} />
                  <span className="truncate">{getLocalizedField(d, 'name', lang)}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Map */}
        <div className="flex-1">
          <MapView elements={filtered} height="calc(100vh - 220px)" />
        </div>
      </div>
    </div>
  );
}
