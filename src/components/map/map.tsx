import {useRef, useEffect} from 'react';
import {City} from '../../lib/types/offer';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useMap from '../../hooks/use-map';
import {OFFERS} from '../../mocks/offers';
import {URL_MARKER_DEFAULT} from '../../const';
import {filterOffersByCity} from './utils';

type MapProps = {
  city: City;
};

function Map({ city }: MapProps) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const map = useMap(mapRef, city);

  const defaultCustomIcon = leaflet.icon({
    iconUrl: URL_MARKER_DEFAULT,
    iconSize: [30, 40],
    iconAnchor: [15, 40],
  });

  useEffect(() => {
    if (map) {
      const cityOffers = filterOffersByCity(OFFERS, city.name);

      cityOffers.forEach((offer) => {
        const marker = new leaflet.Marker([offer.location.latitude, offer.location.longitude], {
          icon: defaultCustomIcon
        });
        marker.addTo(map);
      });
    }
  }, [map, city, defaultCustomIcon]);

  return (
    <div
      ref={mapRef}
      style={{ height: '100%', width: '100%' }}
    >
    </div>
  );
}

export default Map;
