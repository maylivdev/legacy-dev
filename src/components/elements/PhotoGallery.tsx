import { useState, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface Props {
  photos: string[];
}

export default function PhotoGallery({ photos }: Props) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const prev = useCallback(() => setIndex((i) => (i > 0 ? i - 1 : photos.length - 1)), [photos.length]);
  const next = useCallback(() => setIndex((i) => (i < photos.length - 1 ? i + 1 : 0)), [photos.length]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, prev, next]);

  if (photos.length === 0) return null;

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">{t('element_detail.photo_gallery')}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {photos.map((photo, i) => (
          <button
            key={i}
            onClick={() => { setIndex(i); setOpen(true); }}
            className="relative aspect-[4/3] overflow-hidden rounded-lg bg-muted group cursor-pointer"
          >
            <img
              src={photo}
              alt={`${t('element_detail.photo_gallery')} ${i + 1}`}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          </button>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl w-full p-0 bg-black/95 border-none [&>button]:hidden">
          <div className="relative flex items-center justify-center min-h-[60vh]">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 text-white hover:bg-white/20 z-10"
              onClick={() => setOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
            {photos.length > 1 && (
              <>
                <Button variant="ghost" size="icon" className="absolute left-2 text-white hover:bg-white/20 z-10" onClick={prev}>
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button variant="ghost" size="icon" className="absolute right-2 text-white hover:bg-white/20 z-10" onClick={next}>
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </>
            )}
            <img
              src={photos[index]}
              alt={`${t('element_detail.photo_gallery')} ${index + 1}`}
              className="max-h-[80vh] max-w-full object-contain"
            />
            <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/80 text-sm">
              {index + 1} / {photos.length}
            </span>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
