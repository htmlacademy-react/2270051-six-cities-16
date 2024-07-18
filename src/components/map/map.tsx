import {useRef} from 'react';
import {City} from '../../lib/types/offer';
import 'leaflet/dist/leaflet.css';
import useMap from '../../hooks/use-map';

type MapProps = {
  city: City;
};

function Map({ city }: MapProps) {
  const mapRef = useRef<HTMLElement | null>(null);
  useMap(mapRef, city);

  return (
    <section
      className="cities__map map"
      ref={mapRef}
      style={{ height: '100%', width: '100%' }}
    >
    </section>
  );
}

export default Map;
