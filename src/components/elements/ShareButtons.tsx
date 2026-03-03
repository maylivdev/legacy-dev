import { useTranslation } from 'react-i18next';
import { Facebook, Twitter, MessageCircle, Link as LinkIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface Props {
  url: string;
  title: string;
}

export default function ShareButtons({ url, title }: Props) {
  const { t } = useTranslation();
  const fullUrl = window.location.origin + url;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(fullUrl);
    toast.success(t('element_detail.link_copied'));
  };

  return (
    <div>
      <h3 className="text-sm font-semibold mb-2">{t('element_detail.share')}</h3>
      <div className="flex gap-2">
        <Button variant="outline" size="icon" asChild>
          <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <Facebook className="h-4 w-4" />
          </a>
        </Button>
        <Button variant="outline" size="icon" asChild>
          <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(fullUrl)}&text=${encodeURIComponent(title)}`} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <Twitter className="h-4 w-4" />
          </a>
        </Button>
        <Button variant="outline" size="icon" asChild>
          <a href={`https://wa.me/?text=${encodeURIComponent(title + ' ' + fullUrl)}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
            <MessageCircle className="h-4 w-4" />
          </a>
        </Button>
        <Button variant="outline" size="icon" onClick={handleCopy} aria-label={t('element_detail.copy_link')}>
          <LinkIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
