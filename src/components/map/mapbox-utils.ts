
import { LatLngTuple } from '@/lib/map-utils';

export const MAPBOX_TOKEN = 'pk.eyJ1IjoicmVjaWNsYW1haXMiLCJhIjoiY21ieDNncjVzMWJhODJpcHF1MHlnbXpsMCJ9.zP9rfJT0CKvH72NEaA5dQg';

export const mapStyles = {
  light: 'mapbox://styles/mapbox/streets-v12',
  dark: 'mapbox://styles/mapbox/dark-v11',
};

export const createMarkerElement = (color: string, size: number, isSelected: boolean = false) => {
  const el = document.createElement('div');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="${color}" stroke="#FFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0px 3px 3px rgba(0,0,0,0.3));"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3.5" fill="white" stroke="${color}" stroke-width="1.5" /></svg>`;
  el.innerHTML = svg;
  el.style.cursor = 'pointer';
  if (isSelected) {
    el.style.animation = 'pulse-marker 1.8s cubic-bezier(0.4, 0, 0.6, 1) infinite';
    el.style.transformOrigin = 'bottom';
  }
  return el;
};

export const createUserMarkerElement = () => {
  const el = document.createElement('div');
  el.className = 'user-location-dot';
  return el;
};
