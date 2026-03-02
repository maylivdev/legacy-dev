import { useMemo } from 'react';
import type { IchElement, Language } from '@/types';
import { getLocalizedField } from '@/types';
import type { FilterState } from '@/components/catalog/FilterSidebar';

export function useFilteredElements(elements: IchElement[], filters: FilterState, lang: Language) {
  return useMemo(() => {
    let result = elements.filter((el) => el.status === 'published');

    // Search
    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (el) =>
          getLocalizedField(el, 'name', lang).toLowerCase().includes(q) ||
          getLocalizedField(el, 'brief_description', lang).toLowerCase().includes(q)
      );
    }

    // Regions
    if (filters.regions.length > 0) {
      result = result.filter((el) => filters.regions.includes(el.region_id));
    }

    // Domains
    if (filters.domains.length > 0) {
      result = result.filter((el) => filters.domains.includes(el.unesco_domain_id));
    }

    // Sort
    result.sort((a, b) => {
      const nameA = getLocalizedField(a, 'name', lang);
      const nameB = getLocalizedField(b, 'name', lang);
      switch (filters.sort) {
        case 'name_asc': return nameA.localeCompare(nameB);
        case 'name_desc': return nameB.localeCompare(nameA);
        case 'date_new': return b.created_at.localeCompare(a.created_at);
        case 'date_old': return a.created_at.localeCompare(b.created_at);
        default: return 0;
      }
    });

    return result;
  }, [elements, filters, lang]);
}
