import {useEffect, useState, MutableRefObject, useRef} from 'react';
import L from 'leaflet';
import {City} from '../lib/types/offer';

function useMap(
  mapRef: MutableRefObject<HTMLElement | null>,
  city: City
): L.Map | null {
  const [map, setMap] = useState<L.Map | null>(null);
  const isRenderedRef = useRef<boolean>(false);

  useEffect(() => {
    if (mapRef.current !== null && !isRenderedRef.current) {
      const instance = new L.Map(mapRef.current, {
        center: [city.location.latitude, city.location.longitude],
        zoom: city.location.zoom
      });

      const layer = new L.TileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        },
      );

      instance.addLayer(layer);

      setMap(instance);
      isRenderedRef.current = true;
    }
  }, [mapRef, city]);

  return map;
}

export default useMap;
