import { useEffect, useRef, useMemo } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useTranslation } from 'react-i18next';
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

interface Props {
  elements: IchElement[];
  height?: string;
  showReset?: boolean;
}

export default function MapView({ elements, height = '600px', showReset = true }: Props) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as Language;
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.LayerGroup | null>(null);

  const markerData = useMemo(
    () =>
      elements
        .filter((el) => el.status === 'published' && el.latitude && el.longitude)
        .map((el) => {
          const color = DOMAIN_COLORS[el.unesco_domain_id] || '#6b7280';
          const region = REGIONS.find((r) => r.id === el.region_id);
          const domain = UNESCO_DOMAINS.find((d) => d.id === el.unesco_domain_id);
          return { el, color, region, domain };
        }),
    [elements]
  );

  // Initialize map once
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center: KAZAKHSTAN_CENTER,
      zoom: DEFAULT_ZOOM,
      minZoom: 4,
      maxZoom: 18,
      scrollWheelZoom: true,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    markersRef.current = L.layerGroup().addTo(map);
    mapRef.current = map;

    if (showReset) {
      const ResetControl = L.Control.extend({
        onAdd: () => {
          const btn = L.DomUtil.create('button', 'leaflet-bar leaflet-control');
          btn.innerHTML = '⟳';
          btn.style.cssText =
            'width:34px;height:34px;background:#fff;border:none;cursor:pointer;font-size:18px;display:flex;align-items:center;justify-content:center;';
          btn.onclick = (e) => {
            e.stopPropagation();
            map.setView(KAZAKHSTAN_CENTER, DEFAULT_ZOOM);
          };
          return btn;
        },
      });
      new ResetControl({ position: 'topright' }).addTo(map);
    }

    return () => {
      map.remove();
      mapRef.current = null;
      markersRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update markers
  useEffect(() => {
    if (!markersRef.current) return;
    markersRef.current.clearLayers();

    markerData.forEach(({ el, color, region, domain }) => {
      const icon = createCustomIcon(color);
      const elName = getLocalizedField(el, 'name', lang);
      const domainName = domain ? getLocalizedField(domain, 'name', lang) : '';
      const regionName = region ? getLocalizedField(region, 'name', lang) : '';

      const popup = `
        <div style="min-width:180px">
          <h3 style="font-weight:600;font-size:14px;margin:0 0 4px">${elName}</h3>
          ${domain ? `<span style="display:inline-block;border-radius:9999px;padding:2px 8px;font-size:10px;font-weight:500;color:white;background:${color};margin-bottom:4px">${domainName}</span>` : ''}
          ${region ? `<p style="font-size:12px;color:#6b7280;margin:0 0 8px">${regionName}</p>` : ''}
          <a href="/catalog/${el.id}" style="font-size:12px;font-weight:500;color:#2563eb;text-decoration:none">${t('map_page.view_details')} →</a>
        </div>`;

      L.marker([el.latitude, el.longitude], { icon })
        .bindPopup(popup)
        .addTo(markersRef.current!);
    });
  }, [markerData, lang, t]);

  return (
    <div style={{ height }} className="w-full rounded-xl overflow-hidden border">
      <div ref={containerRef} className="h-full w-full z-0" />
    </div>
  );
}
