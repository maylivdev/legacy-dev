import { useState, useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Search, X, MapPin, SearchX, RotateCcw } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { REGIONS } from '@/data/seed';
import { getLocalizedField } from '@/types';
import type { Language } from '@/types';

// No real bearer data yet — show placeholder state
export default function BearersPage() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as Language;
  const [search, setSearch] = useState('');
  const [regionId, setRegionId] = useState('all');

  return (
    <div className="container py-8">
      <nav className="mb-6 text-sm text-muted-foreground">
        <Link to="/" className="hover:text-primary">{t('nav.home')}</Link>
        <span className="mx-2">/</span>
        <span className="text-foreground font-medium">{t('bearers_page.title')}</span>
      </nav>

      <h1 className="mb-6 text-2xl font-bold lg:text-3xl">{t('bearers_page.title')}</h1>

      {/* Filters bar */}
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

      {/* Empty state — no bearer data yet */}
      <div className="flex flex-col items-center justify-center rounded-xl border bg-card py-16">
        <SearchX className="mb-4 h-12 w-12 text-muted-foreground/40" />
        <p className="text-lg font-semibold">{t('bearers_page.no_results')}</p>
        <p className="mt-1 text-sm text-muted-foreground">{t('catalog.no_results_hint')}</p>
      </div>
    </div>
  );
}
