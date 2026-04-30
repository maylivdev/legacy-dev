import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';

interface ContactFormValues {
  name: string;
  email: string;
  message: string;
}

interface Props {
  bearerName: string;
}

export default function ContactBearerForm({ bearerName }: Props) {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    defaultValues: { name: '', email: '', message: '' },
  });

  const onSubmit = async (_values: ContactFormValues) => {
    // Simulated send — UI only
    await new Promise((r) => setTimeout(r, 400));
    toast.success(t('bearer_detail.contact_success'));
    reset();
  };

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">{t('bearer_detail.contact_title')}</h2>
      <Card>
        <CardContent className="p-5">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="contact-name">{t('bearer_detail.contact_name')}</Label>
              <Input
                id="contact-name"
                aria-label={t('bearer_detail.contact_name')}
                placeholder={bearerName}
                {...register('name', { required: true, maxLength: 100 })}
              />
              {errors.name && (
                <p className="text-xs text-destructive">{t('bearer_detail.contact_required')}</p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="contact-email">{t('bearer_detail.contact_email')}</Label>
              <Input
                id="contact-email"
                type="email"
                aria-label={t('bearer_detail.contact_email')}
                {...register('email', {
                  required: true,
                  maxLength: 255,
                  pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                })}
              />
              {errors.email && (
                <p className="text-xs text-destructive">{t('bearer_detail.contact_invalid_email')}</p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="contact-message">{t('bearer_detail.contact_message')}</Label>
              <Textarea
                id="contact-message"
                rows={4}
                aria-label={t('bearer_detail.contact_message')}
                {...register('message', { required: true, maxLength: 1000, minLength: 4 })}
              />
              {errors.message && (
                <p className="text-xs text-destructive">{t('bearer_detail.contact_required')}</p>
              )}
            </div>
            <Button type="submit" disabled={isSubmitting}>
              {t('bearer_detail.contact_submit')}
            </Button>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}