import { useState, useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import NewsCard from '@/components/news/NewsCard';
import { SAMPLE_NEWS } from '@/data/seed';
import { getLocalizedField } from '@/types';
import type { Language, NewsItem } from '@/types';
import { NEWS_PER_PAGE } from '@/lib/constants';

const CATEGORIES = ['new_elements', 'festivals', 'research', 'cooperation', 'education', 'publications'] as const;

export default function NewsPage() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as Language;
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let result = SAMPLE_NEWS.filter((n) => n.status === 'published');
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (n) =>
          getLocalizedField(n, 'title', lang).toLowerCase().includes(q) ||
          getLocalizedField(n, 'content', lang).toLowerCase().includes(q)
      );
    }
    if (category !== 'all') {
      result = result.filter((n) => n.category === category);
    }
    return result.sort((a, b) => b.published_at.localeCompare(a.published_at));
  }, [search, category, lang]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / NEWS_PER_PAGE));
  const paged = filtered.slice((page - 1) * NEWS_PER_PAGE, page * NEWS_PER_PAGE);

  return (
    <div className="container py-8">
      <nav className="mb-6 text-sm text-muted-foreground">
        <Link to="/" className="hover:text-primary">{t('nav.home')}</Link>
        <span className="mx-2">/</span>
        <span className="text-foreground font-medium">{t('news_page.title')}</span>
      </nav>

      <h1 className="mb-6 text-2xl font-bold lg:text-3xl">{t('news_page.title')}</h1>

      {/* Filters */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder={t('news_page.search_placeholder')}
            className="pl-9"
          />
        </div>
        <Select value={category} onValueChange={(v) => { setCategory(v); setPage(1); }}>
          <SelectTrigger className="w-full sm:w-56">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t('news_page.all_categories')}</SelectItem>
            {CATEGORIES.map((cat) => (
              <SelectItem key={cat} value={cat}>{t(`news_page.category.${cat}`)}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* News list */}
      {paged.length > 0 ? (
        <div className="space-y-4">
          {paged.map((news) => (
            <NewsCard key={news.id} news={news} layout="horizontal" />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-xl border bg-card py-16">
          <p className="text-lg font-semibold">{t('news_page.no_results')}</p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-1">
          <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage(page - 1)}>←</Button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <Button key={p} variant={p === page ? 'default' : 'outline'} size="sm" onClick={() => setPage(p)}>{p}</Button>
          ))}
          <Button variant="outline" size="sm" disabled={page === totalPages} onClick={() => setPage(page + 1)}>→</Button>
        </div>
      )}
    </div>
  );
}
