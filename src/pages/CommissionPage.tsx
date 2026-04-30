import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ExternalLink, BookOpen, FlaskConical, Palette, Radio, Mail, Phone } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const LINKS = [
  { key: 'unesco', url: 'https://www.unesco.org' },
  { key: 'ich_convention', url: 'https://ich.unesco.org/en/convention' },
  { key: 'ich_registry', url: 'https://ich.unesco.org/en/lists' },
  { key: 'national_commission', url: 'https://natcom.unesco.kz' },
  { key: 'icesco', url: 'https://www.icesco.org' },
] as const;

export default function CommissionPage() {
  const { t } = useTranslation();

  const areas = [
    { icon: BookOpen, label: t('commission.area_education') },
    { icon: FlaskConical, label: t('commission.area_science') },
    { icon: Palette, label: t('commission.area_culture') },
    { icon: Radio, label: t('commission.area_communication') },
  ];

  return (
    <div className="container py-8">
      <nav className="mb-6 text-sm text-muted-foreground">
        <Link to="/" className="hover:text-primary">{t('nav.home')}</Link>
        <span className="mx-2">/</span>
        <span className="text-foreground font-medium">{t('nav.commission')}</span>
      </nav>

      {/* Hero */}
      <header className="mb-10 rounded-xl bg-primary/5 p-6 sm:p-10">
        <h1 className="text-2xl font-bold lg:text-4xl mb-3">{t('commission.title')}</h1>
        <p className="text-base text-muted-foreground lg:text-lg">{t('commission.subtitle')}</p>
      </header>

      <div className="space-y-12">
        <section>
          <p className="leading-relaxed text-base">{t('commission.intro')}</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">{t('commission.mission_title')}</h2>
          <p className="leading-relaxed">{t('commission.mission_text')}</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">{t('commission.areas_title')}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {areas.map(({ icon: Icon, label }) => (
              <Card key={label}>
                <CardContent className="p-5 flex flex-col items-center text-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="font-medium">{label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">{t('commission.links_title')}</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {LINKS.map((l) => (
              <a
                key={l.key}
                href={l.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-lg border bg-card p-4 transition-shadow hover:shadow-md"
              >
                <ExternalLink className="h-5 w-5 text-primary shrink-0" />
                <span className="font-medium">{t(`footer.${l.key}`)}</span>
              </a>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">{t('commission.contact_title')}</h2>
          <Card>
            <CardContent className="p-5 space-y-2 text-sm">
              <p className="flex items-center gap-2"><Mail className="h-4 w-4 text-muted-foreground" /> info@natcom.unesco.kz</p>
              <p className="flex items-center gap-2"><Phone className="h-4 w-4 text-muted-foreground" /> +7 (7172) 000-000</p>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}