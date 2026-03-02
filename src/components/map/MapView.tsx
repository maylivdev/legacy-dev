import { useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { getLocalizedField } from '@/types';
import type { IchElement, Language } from '@/types';
import { REGIONS, UNESCO_DOMAINS } from '@/data/seed';
import { DOMAIN_COLORS, KAZAKHSTAN_CENTER, DEFAULT_ZOOM } from '@/lib/constants';

// Fix Leaflet default icons
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// @ts-ignore
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

function createCustomIcon(color: string) {
  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="background-color: ${color}; width: 28px; height: 28px; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); border: 2px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.3);"></div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 28],
    popupAnchor: [0, -28],
  });
}

function ResetViewButton() {
  const map = useMap();
  const { t } = useTranslation();

  return (
    <div className="leaflet-top leaflet-right" style={{ marginTop: 10, marginRight: 10 }}>
      <div className="leaflet-control">
        <Button
          size="sm"
          variant="secondary"
          className="shadow-md"
          onClick={() => map.setView(KAZAKHSTAN_CENTER, DEFAULT_ZOOM)}
        >
          {t('map_page.reset_view')}
        </Button>
      </div>
    </div>
  );
}

interface Props {
  elements: IchElement[];
  height?: string;
  showReset?: boolean;
}

export default function MapView({ elements, height = '600px', showReset = true }: Props) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as Language;

  const markers = useMemo(
    () =>
      elements
        .filter((el) => el.status === 'published' && el.latitude && el.longitude)
        .map((el) => {
          const color = DOMAIN_COLORS[el.unesco_domain_id] || '#6b7280';
          const icon = createCustomIcon(color);
          const region = REGIONS.find((r) => r.id === el.region_id);
          const domain = UNESCO_DOMAINS.find((d) => d.id === el.unesco_domain_id);
          return { el, icon, region, domain };
        }),
    [elements]
  );

  return (
    <div style={{ height }} className="w-full rounded-xl overflow-hidden border">
      <MapContainer
        center={KAZAKHSTAN_CENTER}
        zoom={DEFAULT_ZOOM}
        minZoom={4}
        maxZoom={18}
        className="h-full w-full z-0"
        scrollWheelZoom
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {showReset && <ResetViewButton />}
        <MarkerClusterGroup chunkedLoading>
          {markers.map(({ el, icon, region, domain }) => (
            <Marker key={el.id} position={[el.latitude, el.longitude]} icon={icon}>
              <Popup>
                <div className="min-w-[180px]">
                  <h3 className="font-semibold text-sm mb-1">{getLocalizedField(el, 'name', lang)}</h3>
                  {domain && (
                    <span
                      className="inline-block rounded-full px-2 py-0.5 text-[10px] font-medium text-white mb-1"
                      style={{ backgroundColor: DOMAIN_COLORS[el.unesco_domain_id] }}
                    >
                      {getLocalizedField(domain, 'name', lang)}
                    </span>
                  )}
                  {region && (
                    <p className="text-xs text-gray-500 mb-2">
                      {getLocalizedField(region, 'name', lang)}
                    </p>
                  )}
                  <Link to={`/catalog/${el.id}`} className="text-xs font-medium text-blue-600 hover:underline">
                    {t('map_page.view_details')} →
                  </Link>
                </div>
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
}
