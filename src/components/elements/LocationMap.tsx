import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface Props {
  latitude: number;
  longitude: number;
  name: string;
  color?: string;
}

export default function LocationMap({ latitude, longitude, name, color = '#2563eb' }: Props) {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center: [latitude, longitude],
      zoom: 8,
      zoomControl: false,
      scrollWheelZoom: false,
      dragging: false,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OSM',
    }).addTo(map);

    const icon = L.divIcon({
      className: 'custom-marker',
      html: `<div style="background-color: ${color}; width: 24px; height: 24px; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); border: 2px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.3);"></div>`,
      iconSize: [24, 24],
      iconAnchor: [12, 24],
    });

    L.marker([latitude, longitude], { icon }).addTo(map);
    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [latitude, longitude, color]);

  return (
    <div>
      <h3 className="text-sm font-semibold mb-2">{t('element_detail.location')}</h3>
      <div ref={containerRef} className="h-[200px] w-full rounded-lg overflow-hidden border z-0" />
      <Link to="/map" className="mt-2 inline-block text-sm text-primary hover:underline">
        {t('element_detail.view_on_map')} →
      </Link>
    </div>
  );
}
