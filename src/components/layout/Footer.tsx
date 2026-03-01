import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="border-t bg-foreground text-background">
      <div className="container py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* About */}
          <div>
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm">
                М
              </div>
              <span className="font-semibold text-lg">МЕММ</span>
            </div>
            <p className="text-sm leading-relaxed opacity-80">
              {t('footer.description')}
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="mb-3 font-semibold">{t('footer.links')}</h3>
            <ul className="space-y-2 text-sm opacity-80">
              <li>
                <a href="https://www.unesco.org" target="_blank" rel="noopener noreferrer" className="hover:underline">
                  {t('footer.unesco')}
                </a>
              </li>
              <li>
                <a href="https://ich.unesco.org" target="_blank" rel="noopener noreferrer" className="hover:underline">
                  {t('footer.ich_convention')}
                </a>
              </li>
              <li>
                <Link to="/catalog" className="hover:underline">{t('nav.catalog')}</Link>
              </li>
              <li>
                <Link to="/bearers" className="hover:underline">{t('nav.bearers')}</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-3 font-semibold">{t('footer.contact')}</h3>
            <ul className="space-y-2 text-sm opacity-80">
              <li>info@memm.kz</li>
              <li>+7 (7172) 000-000</li>
              <li>Астана, Қазақстан</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-background/20 pt-6 text-center text-xs opacity-60">
          {t('footer.copyright')}
        </div>
      </div>
    </footer>
  );
}
