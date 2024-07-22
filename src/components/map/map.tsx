import {useRef, useEffect} from 'react';
import {City, Offer} from '../../lib/types/offer';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useMap from '../../hooks/use-map';
import {defaultCustomIcon} from '../../const';

type MapProps = {
  city: City;
  offers: Offer[];
};

function Map({ city, offers }: MapProps) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      offers.forEach((offer) => {
        const marker = new leaflet.Marker(
          [offer.location.latitude, offer.location.longitude],
          {
            icon: defaultCustomIcon
          });
        marker.addTo(map);
      });
    }
  }, [map, offers]);

  return (
    <div
      ref={mapRef}
      style={{ height: '100%', width: '100%' }}
    >
    </div>
  );
}

export default Map;
