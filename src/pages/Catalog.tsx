import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { SlidersHorizontal, SearchX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { Skeleton } from '@/components/ui/skeleton';
import FilterSidebar, { type FilterState } from '@/components/catalog/FilterSidebar';
import ElementCard from '@/components/elements/ElementCard';
import { useFilteredElements } from '@/hooks/use-filtered-elements';
import { SAMPLE_ELEMENTS } from '@/data/seed';
import { ITEMS_PER_PAGE } from '@/lib/constants';
import type { Language } from '@/types';

const DEFAULT_FILTERS: FilterState = { search: '', regions: [], domains: [], sort: 'name_asc' };

export default function Catalog() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as Language;
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [page, setPage] = useState(1);

  const filtered = useFilteredElements(SAMPLE_ELEMENTS, filters, lang);
  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paged = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const handleFilterChange = useCallback((f: FilterState) => { setFilters(f); setPage(1); }, []);
  const handleReset = useCallback(() => { setFilters(DEFAULT_FILTERS); setPage(1); }, []);

  const from = filtered.length === 0 ? 0 : (page - 1) * ITEMS_PER_PAGE + 1;
  const to = Math.min(page * ITEMS_PER_PAGE, filtered.length);

  return (
    <div className="container py-8">
      {/* Breadcrumbs */}
      <nav className="mb-6 text-sm text-muted-foreground">
        <Link to="/" className="hover:text-primary">{t('nav.home')}</Link>
        <span className="mx-2">/</span>
        <span className="text-foreground font-medium">{t('catalog.title')}</span>
      </nav>

      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold lg:text-3xl">{t('catalog.title')}</h1>

        {/* Mobile filter trigger */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2 lg:hidden">
              <SlidersHorizontal className="h-4 w-4" />
              {t('filters.search')}
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80 p-5">
            <SheetTitle className="mb-4">{t('filters.search')}</SheetTitle>
            <FilterSidebar filters={filters} onChange={handleFilterChange} onReset={handleReset} />
          </SheetContent>
        </Sheet>
      </div>

      <div className="flex gap-8">
        {/* Desktop sidebar */}
        <aside className="hidden w-72 shrink-0 lg:block">
          <div className="sticky top-24 rounded-xl border bg-card p-5">
            <FilterSidebar filters={filters} onChange={handleFilterChange} onReset={handleReset} />
          </div>
        </aside>

        {/* Results */}
        <div className="flex-1">
          {/* Results count */}
          <p className="mb-4 text-sm text-muted-foreground">
            {t('catalog.showing_results', { from, to, total: filtered.length })}
          </p>

          {paged.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {paged.map((el) => (
                <ElementCard key={el.id} element={el} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-xl border bg-card py-16">
              <SearchX className="mb-4 h-12 w-12 text-muted-foreground/40" />
              <p className="text-lg font-semibold">{t('catalog.no_results')}</p>
              <p className="mt-1 text-sm text-muted-foreground">{t('catalog.no_results_hint')}</p>
              <Button variant="outline" size="sm" className="mt-4" onClick={handleReset}>
                {t('catalog.reset_filters')}
              </Button>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8 flex items-center justify-center gap-1">
              <Button variant="outline" size="sm" disabled={page === 1} onClick={() => { setPage(page - 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                ←
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <Button
                  key={p}
                  variant={p === page ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => { setPage(p); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                >
                  {p}
                </Button>
              ))}
              <Button variant="outline" size="sm" disabled={page === totalPages} onClick={() => { setPage(page + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                →
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
