import {useRef, useEffect} from 'react';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useMap from '../../hooks/use-map';
import {City, Location} from '../../lib/types/offer';
import {defaultCustomIcon} from '../../const';

type MapProps = {
  city: City;
  locations: Location[];
};

function Map({ city, locations }: MapProps) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      map.eachLayer((layer) => {
        if (layer instanceof leaflet.Marker) {
          map.removeLayer(layer);
        }
      });

      locations.forEach((location) => {
        const marker = new leaflet.Marker(
          [location.latitude, location.longitude],
          {
            icon: defaultCustomIcon
          });
        marker.addTo(map);
      });

      map.setView([city.location.latitude, city.location.longitude], city.location.zoom);
    }
  }, [map, locations, city]);

  return (
    <div
      ref={mapRef}
      style={{ height: '100%', width: '100%' }}
    >
    </div>
  );
}

export default Map;
