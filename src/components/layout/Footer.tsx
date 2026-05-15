import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import logo from '@/assets/logo.png';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="border-t bg-foreground text-background">
      <div className="container py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* About МЕММ */}
          <div>
            <div className="mb-3">
              <img src={logo} alt="memm.kz" className="h-40 w-auto object-contain" />
            </div>
            <p className="text-sm leading-relaxed opacity-80">
              {t('footer.description')}
            </p>
          </div>

          {/* About МЕММ section with internal links */}
          <div>
            <h3 className="mb-3 font-semibold">{t('footer.about_memm_title')}</h3>
            <p className="text-sm opacity-80 mb-3 leading-relaxed">
              {t('footer.about_memm_text')}
            </p>
            <ul className="space-y-2 text-sm opacity-80">
              <li>
                <Link to="/commission" className="hover:underline">{t('nav.commission')}</Link>
              </li>
              <li>
                <Link to="/catalog" className="hover:underline">{t('footer.catalog_link')}</Link>
              </li>
              <li>
                <Link to="/bearers" className="hover:underline">{t('footer.bearers_link')}</Link>
              </li>
            </ul>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className="mb-3 font-semibold">{t('footer.links')}</h3>
            <ul className="space-y-2 text-sm opacity-80">
              <li>
                <a href="https://www.unesco.org" target="_blank" rel="noopener noreferrer" className="hover:underline">
                  {t('footer.unesco')}
                </a>
              </li>
              <li>
                <a href="https://ich.unesco.org/en/convention" target="_blank" rel="noopener noreferrer" className="hover:underline">
                  {t('footer.ich_convention')}
                </a>
              </li>
              <li>
                <a href="https://ich.unesco.org/en/lists" target="_blank" rel="noopener noreferrer" className="hover:underline">
                  {t('footer.ich_registry')}
                </a>
              </li>
              <li>
                <a href="https://natcom.unesco.kz" target="_blank" rel="noopener noreferrer" className="hover:underline">
                  {t('footer.national_commission')}
                </a>
              </li>
              <li>
                <a href="https://www.icesco.org" target="_blank" rel="noopener noreferrer" className="hover:underline">
                  {t('footer.icesco')}
                </a>
              </li>
              <li>
                <Link to="/commission" className="hover:underline">{t('nav.commission')}</Link>
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
