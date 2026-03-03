import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Calendar, ArrowLeft } from 'lucide-react';
import { SAMPLE_NEWS } from '@/data/seed';
import { getLocalizedField } from '@/types';
import type { Language } from '@/types';
import ShareButtons from '@/components/elements/ShareButtons';
import NewsCard from '@/components/news/NewsCard';
import { Button } from '@/components/ui/button';

export default function NewsDetail() {
  const { id } = useParams<{ id: string }>();
  const { t, i18n } = useTranslation();
  const lang = i18n.language as Language;

  const news = SAMPLE_NEWS.find((n) => n.id === id);

  if (!news) {
    return (
      <div className="container py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">{t('news_detail.not_found')}</h1>
        <Button asChild>
          <Link to="/news">{t('news_detail.back_to_news')}</Link>
        </Button>
      </div>
    );
  }

  const title = getLocalizedField(news, 'title', lang);
  const content = getLocalizedField(news, 'content', lang);
  const categoryKey = `news_page.category.${news.category}` as const;

  // Related news: same category, different id
  const relatedNews = SAMPLE_NEWS.filter((n) => n.id !== news.id && n.category === news.category && n.status === 'published').slice(0, 3);

  return (
    <div className="container py-8">
      <div className="max-w-3xl mx-auto">
        {/* Breadcrumbs */}
        <nav className="mb-6 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-primary">{t('nav.home')}</Link>
          <span className="mx-2">/</span>
          <Link to="/news" className="hover:text-primary">{t('nav.news')}</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground font-medium line-clamp-1">{title}</span>
        </nav>

        {/* Category badge */}
        <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary mb-4">
          {t(categoryKey)}
        </span>

        <h1 className="text-3xl md:text-4xl font-bold mb-4">{title}</h1>

        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
          <span className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4" />
            {news.published_at}
          </span>
          <span>{t('news_detail.published_by')}: {news.created_by}</span>
        </div>

        {/* Featured image */}
        {news.featured_image_url && (
          <div className="aspect-[2/1] rounded-lg overflow-hidden bg-muted mb-8">
            <img
              src={news.featured_image_url}
              alt={title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        )}

        {/* Content */}
        <div className="leading-[1.7] text-base md:text-lg space-y-4 mb-8">
          {content.split('\n\n').map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <div className="flex items-center justify-between border-t pt-6">
          <Button variant="outline" size="sm" asChild>
            <Link to="/news">
              <ArrowLeft className="h-4 w-4 mr-1" />
              {t('news_detail.back_to_news')}
            </Link>
          </Button>
          <ShareButtons url={`/news/${news.id}`} title={title} />
        </div>

        {/* Related news */}
        {relatedNews.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-semibold mb-6">{t('news_detail.related_news')}</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {relatedNews.map((n) => (
                <NewsCard key={n.id} news={n} layout="vertical" />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
