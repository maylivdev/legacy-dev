import { useTranslation } from 'react-i18next';

interface Props {
  videos: string[];
  title?: string;
}

export default function VideoGallery({ videos, title }: Props) {
  const { t } = useTranslation();

  if (videos.length === 0) return null;

  const heading = title || t('element_detail.video_gallery');

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">{heading}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {videos.map((video, i) => (
          <div key={i} className="aspect-video rounded-lg overflow-hidden bg-muted">
            {video.includes('youtube.com') || video.includes('youtu.be') || video.includes('vimeo.com') ? (
              <iframe
                src={video}
                title={`Video ${i + 1}`}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <video controls className="w-full h-full object-cover">
                <source src={video} />
              </video>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
