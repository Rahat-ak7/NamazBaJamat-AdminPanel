import L from 'leaflet';

export const createCustomIcon = (color: string = '#107598', emoji: string = '🕌') => {
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        background-color: ${color};
        width: 32px;
        height: 32px;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
        font-size: 16px;
        transition: all 0.2s ease;
      ">${emoji}</div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });
};

export const getMosqueIcon = (maslik: string) => {
  const maslikColors: { [key: string]: string } = {
    'Deobandi': '#107598',
    'Barelvi': '#10b981',
    'AhleHadees': '#f59e0b',
    'default': '#6b7280'
  };

  return createCustomIcon(
    maslikColors[maslik] || maslikColors.default,
    '🕌'
  );
};