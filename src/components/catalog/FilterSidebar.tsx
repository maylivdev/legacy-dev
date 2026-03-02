import { useTranslation } from 'react-i18next';
import { Search, X, RotateCcw } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { REGIONS, UNESCO_DOMAINS } from '@/data/seed';
import { getLocalizedField } from '@/types';
import type { Language } from '@/types';
import { Badge } from '@/components/ui/badge';

export type SortOption = 'name_asc' | 'name_desc' | 'date_new' | 'date_old';

export interface FilterState {
  search: string;
  regions: string[];
  domains: string[];
  sort: SortOption;
}

interface Props {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onReset: () => void;
  showDomains?: boolean;
}

export default function FilterSidebar({ filters, onChange, onReset, showDomains = true }: Props) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as Language;

  const activeCount = filters.regions.length + filters.domains.length + (filters.search ? 1 : 0);

  const toggleRegion = (id: string) => {
    const next = filters.regions.includes(id)
      ? filters.regions.filter((r) => r !== id)
      : [...filters.regions, id];
    onChange({ ...filters, regions: next });
  };

  const toggleDomain = (id: string) => {
    const next = filters.domains.includes(id)
      ? filters.domains.filter((d) => d !== id)
      : [...filters.domains, id];
    onChange({ ...filters, domains: next });
  };

  return (
    <div className="space-y-5">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={filters.search}
          onChange={(e) => onChange({ ...filters, search: e.target.value })}
          placeholder={t('catalog.search_placeholder')}
          className="pl-9 pr-8"
        />
        {filters.search && (
          <button
            onClick={() => onChange({ ...filters, search: '' })}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Sort */}
      <div>
        <label className="mb-1.5 block text-sm font-medium">{t('catalog.sort_by')}</label>
        <Select value={filters.sort} onValueChange={(v) => onChange({ ...filters, sort: v as SortOption })}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name_asc">{t('catalog.sort_name_asc')}</SelectItem>
            <SelectItem value="name_desc">{t('catalog.sort_name_desc')}</SelectItem>
            <SelectItem value="date_new">{t('catalog.sort_date_new')}</SelectItem>
            <SelectItem value="date_old">{t('catalog.sort_date_old')}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Separator />

      {/* Region filter */}
      <div>
        <div className="mb-2 flex items-center justify-between">
          <label className="text-sm font-medium">
            {t('catalog.filter_region')}
            {filters.regions.length > 0 && (
              <Badge variant="secondary" className="ml-2">{filters.regions.length}</Badge>
            )}
          </label>
          {filters.regions.length > 0 && (
            <button onClick={() => onChange({ ...filters, regions: [] })} className="text-xs text-primary hover:underline">
              {t('filters.clear')}
            </button>
          )}
        </div>
        <ScrollArea className="h-48">
          <div className="space-y-1 pr-3">
            {REGIONS.map((region) => (
              <label key={region.id} className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-muted cursor-pointer">
                <Checkbox
                  checked={filters.regions.includes(region.id)}
                  onCheckedChange={() => toggleRegion(region.id)}
                />
                <span className="truncate">{getLocalizedField(region, 'name', lang)}</span>
              </label>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Domain filter */}
      {showDomains && (
        <>
          <Separator />
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="text-sm font-medium">
                {t('catalog.filter_domain')}
                {filters.domains.length > 0 && (
                  <Badge variant="secondary" className="ml-2">{filters.domains.length}</Badge>
                )}
              </label>
              {filters.domains.length > 0 && (
                <button onClick={() => onChange({ ...filters, domains: [] })} className="text-xs text-primary hover:underline">
                  {t('filters.clear')}
                </button>
              )}
            </div>
            <div className="space-y-1">
              {UNESCO_DOMAINS.map((domain) => (
                <label key={domain.id} className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-muted cursor-pointer">
                  <Checkbox
                    checked={filters.domains.includes(domain.id)}
                    onCheckedChange={() => toggleDomain(domain.id)}
                  />
                  <span className="truncate">{getLocalizedField(domain, 'name', lang)}</span>
                </label>
              ))}
            </div>
          </div>
        </>
      )}

      <Separator />

      {/* Reset */}
      <Button variant="outline" size="sm" className="w-full gap-2" onClick={onReset} disabled={activeCount === 0}>
        <RotateCcw className="h-3.5 w-3.5" />
        {t('catalog.reset_filters')}
      </Button>
    </div>
  );
}
