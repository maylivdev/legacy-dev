import { useTranslation } from 'react-i18next';

interface Props {
  audioFiles: string[];
}

export default function AudioPlayer({ audioFiles }: Props) {
  const { t } = useTranslation();

  if (audioFiles.length === 0) return null;

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">{t('element_detail.audio_files')}</h2>
      <div className="space-y-3">
        {audioFiles.map((file, i) => (
          <div key={i} className="rounded-lg border bg-card p-3">
            <p className="text-sm font-medium mb-2 text-muted-foreground">
              {t('element_detail.audio_files')} {i + 1}
            </p>
            <audio controls className="w-full">
              <source src={file} />
            </audio>
          </div>
        ))}
      </div>
    </section>
  );
}
