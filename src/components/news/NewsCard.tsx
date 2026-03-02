import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Calendar } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { getLocalizedField } from '@/types';
import type { NewsItem, Language } from '@/types';

interface Props {
  news: NewsItem;
  layout?: 'vertical' | 'horizontal';
}

export default function NewsCard({ news, layout = 'vertical' }: Props) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as Language;

  const categoryKey = `news_page.category.${news.category}` as const;

  if (layout === 'horizontal') {
    return (
      <Link to={`/news/${news.id}`}>
        <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
          <div className="flex flex-col sm:flex-row">
            <div className="aspect-video sm:aspect-auto sm:w-64 shrink-0 bg-muted flex items-center justify-center">
              <div className="h-10 w-10 rounded bg-secondary/30" />
            </div>
            <CardContent className="flex-1 p-4">
              <span className="mb-2 inline-block rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                {t(categoryKey)}
              </span>
              <h3 className="mb-1.5 font-semibold leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                {getLocalizedField(news, 'title', lang)}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                {getLocalizedField(news, 'content', lang)}
              </p>
              <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" />
                {news.published_at}
              </p>
            </CardContent>
          </div>
        </Card>
      </Link>
    );
  }

  return (
    <Link to={`/news/${news.id}`}>
      <Card className="group h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        <div className="aspect-video bg-muted flex items-center justify-center">
          <div className="h-10 w-10 rounded bg-secondary/30" />
        </div>
        <CardContent className="p-4">
          <span className="mb-2 inline-block rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
            {t(categoryKey)}
          </span>
          <h3 className="mb-1.5 font-semibold leading-snug line-clamp-2 group-hover:text-primary transition-colors">
            {getLocalizedField(news, 'title', lang)}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
            {getLocalizedField(news, 'content', lang)}
          </p>
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            {news.published_at}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
