import {useRef, useEffect} from 'react';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useMap from '../../hooks/use-map';
import {BaseOffer, City} from '../../lib/types/offer';
import {activeCustomIcon, defaultCustomIcon} from '../../const';

type MapProps = {
  city: City;
  offers: BaseOffer[];
  activeOfferId: string | null;
};

function Map({city, offers, activeOfferId}: MapProps) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      map.scrollWheelZoom.disable();

      map.eachLayer((layer) => {
        if (layer instanceof leaflet.Marker) {
          map.removeLayer(layer);
        }
      });

      offers.forEach((offer) => {
        const isActive = activeOfferId === offer.id;
        const marker = new leaflet.Marker(
          [offer.location.latitude, offer.location.longitude],
          {
            icon: isActive ? activeCustomIcon : defaultCustomIcon
          });
        marker.addTo(map);
      });

      map.setView([city.location.latitude, city.location.longitude], city.location.zoom);
    }
  }, [map, offers, city, activeOfferId]);

  return (
    <div
      ref={mapRef}
      style={{ height: '100%', width: '100%' }}
    >
    </div>
  );
}

export default Map;
