import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Layers, Users, Newspaper, Clock, Plus } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { canCreate } from '@/lib/permissions';
import StatsCard from '@/components/admin/StatsCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SAMPLE_ELEMENTS, SAMPLE_BEARERS, SAMPLE_NEWS } from '@/data/seed';

export default function Dashboard() {
  const { t } = useTranslation();
  const { user } = useAuth();

  const draftCount = SAMPLE_ELEMENTS.filter(e => e.status === 'draft').length;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">
        {t('admin.welcome')}, {user?.full_name}
      </h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard title={t('admin.stats.total_elements')} value={SAMPLE_ELEMENTS.length} icon={Layers} />
        <StatsCard title={t('admin.stats.total_bearers')} value={SAMPLE_BEARERS.length} icon={Users} />
        <StatsCard title={t('admin.stats.total_news')} value={SAMPLE_NEWS.length} icon={Newspaper} />
        <StatsCard title={t('admin.stats.pending_approvals')} value={draftCount} icon={Clock} />
      </div>

      {user && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            {canCreate(user.role, 'element') && (
              <Button asChild>
                <Link to="/admin/elements/new"><Plus className="h-4 w-4 mr-1" />{t('admin.elements.add_new')}</Link>
              </Button>
            )}
            {canCreate(user.role, 'bearer') && (
              <Button asChild variant="outline">
                <Link to="/admin/bearers/new"><Plus className="h-4 w-4 mr-1" />{t('admin.bearers.add_new')}</Link>
              </Button>
            )}
            {canCreate(user.role, 'news') && (
              <Button asChild variant="outline">
                <Link to="/admin/news/new"><Plus className="h-4 w-4 mr-1" />{t('admin.news.add_new')}</Link>
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
