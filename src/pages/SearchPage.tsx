import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Search, FileText, Users, Newspaper } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import ElementCard from '@/components/elements/ElementCard';
import NewsCard from '@/components/news/NewsCard';
import { SAMPLE_ELEMENTS, SAMPLE_NEWS } from '@/data/seed';
import { getLocalizedField } from '@/types';
import type { Language } from '@/types';

export default function SearchPage() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as Language;
  const [query, setQuery] = useState('');

  const q = query.toLowerCase().trim();

  const elements = useMemo(() => {
    if (!q) return [];
    return SAMPLE_ELEMENTS.filter(
      (el) =>
        el.status === 'published' &&
        (getLocalizedField(el, 'name', lang).toLowerCase().includes(q) ||
          getLocalizedField(el, 'brief_description', lang).toLowerCase().includes(q))
    );
  }, [q, lang]);

  const news = useMemo(() => {
    if (!q) return [];
    return SAMPLE_NEWS.filter(
      (n) =>
        n.status === 'published' &&
        (getLocalizedField(n, 'title', lang).toLowerCase().includes(q) ||
          getLocalizedField(n, 'content', lang).toLowerCase().includes(q))
    );
  }, [q, lang]);

  const total = elements.length + news.length;

  return (
    <div className="container py-8">
      <nav className="mb-6 text-sm text-muted-foreground">
        <Link to="/" className="hover:text-primary">{t('nav.home')}</Link>
        <span className="mx-2">/</span>
        <span className="text-foreground font-medium">{t('search_page.title')}</span>
      </nav>

      <h1 className="mb-6 text-2xl font-bold lg:text-3xl">{t('search_page.title')}</h1>

      <div className="relative mx-auto mb-8 max-w-2xl">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t('search_page.placeholder')}
          className="h-12 pl-12 text-base"
          autoFocus
        />
      </div>

      {!q ? (
        <p className="text-center text-muted-foreground">{t('search_page.type_to_search')}</p>
      ) : (
        <Tabs defaultValue="all">
          <TabsList className="mb-6">
            <TabsTrigger value="all">
              {t('search_page.all')} <Badge variant="secondary" className="ml-1.5">{total}</Badge>
            </TabsTrigger>
            <TabsTrigger value="elements">
              {t('search_page.elements')} <Badge variant="secondary" className="ml-1.5">{elements.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="news">
              {t('search_page.news_tab')} <Badge variant="secondary" className="ml-1.5">{news.length}</Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            {total === 0 ? (
              <p className="text-center text-muted-foreground py-12">{t('search_page.no_results')}</p>
            ) : (
              <div className="space-y-8">
                {elements.length > 0 && (
                  <section>
                    <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                      <FileText className="h-5 w-5 text-primary" /> {t('search_page.elements')}
                    </h2>
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                      {elements.map((el) => <ElementCard key={el.id} element={el} />)}
                    </div>
                  </section>
                )}
                {news.length > 0 && (
                  <section>
                    <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                      <Newspaper className="h-5 w-5 text-primary" /> {t('search_page.news_tab')}
                    </h2>
                    <div className="space-y-4">
                      {news.map((n) => <NewsCard key={n.id} news={n} layout="horizontal" />)}
                    </div>
                  </section>
                )}
              </div>
            )}
          </TabsContent>

          <TabsContent value="elements">
            {elements.length === 0 ? (
              <p className="text-center text-muted-foreground py-12">{t('search_page.no_results')}</p>
            ) : (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {elements.map((el) => <ElementCard key={el.id} element={el} />)}
              </div>
            )}
          </TabsContent>

          <TabsContent value="news">
            {news.length === 0 ? (
              <p className="text-center text-muted-foreground py-12">{t('search_page.no_results')}</p>
            ) : (
              <div className="space-y-4">
                {news.map((n) => <NewsCard key={n.id} news={n} layout="horizontal" />)}
              </div>
            )}
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
