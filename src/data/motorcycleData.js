export const PAINTS = [
  { name: 'Midnight Charcoal', hex: '#24272c' }, // Enhanced contrast shade for dark theme
  { name: 'Racing Red', hex: '#E10600' },
  { name: 'Metallic Silver', hex: '#e2e8f0' },
  { name: 'Electric Blue', hex: '#1d4ed8' },
]

export const WHEELS = [
  { name: 'Stealth Black', hex: '#18181b' },
  { name: 'Chrome', hex: '#e2e8f0' },
]

export const SEATS = [
  { name: 'Black', hex: '#18181b' },
  { name: 'Racing Red', hex: '#b30500' },
]

export const ACCENTS = [
  { name: 'Red', hex: '#E10600' },
  { name: 'Silver', hex: '#cbd5e1' },
]

export const BASE_PRICE = 4850000

export const STATS = [
  { value: 998, suffix: ' CC', label: 'ENGINE' },
  { value: 200, suffix: ' HP', label: 'POWER' },
  { value: 299, suffix: ' KM/H', label: 'TOP SPEED' },
  { value: 193, suffix: ' KG', label: 'WEIGHT' },
]

export const PERFORMANCE = [
  { value: 998, unit: 'CC', label: 'ENGINE' },
  { value: 200, unit: 'HP', label: 'POWER' },
  { value: 112, unit: 'NM', label: 'TORQUE' },
  { value: 299, unit: 'KM/H', label: 'TOP SPEED' },
  { value: 2.9, unit: 'SEC', label: '0–100 KM/H', decimals: 1 },
]

export const PRESETS = [
  {
    id: 'stealth',
    name: 'Stealth Edition',
    paint: PAINTS[0],
    wheels: WHEELS[0],
    seat: SEATS[0],
    accent: ACCENTS[0],
  },
  {
    id: 'racing-red',
    name: 'Racing Edition',
    paint: PAINTS[1],
    wheels: WHEELS[1],
    seat: SEATS[1],
    accent: ACCENTS[0],
  },
  {
    id: 'silver-bullet',
    name: 'Silver Edition',
    paint: PAINTS[2],
    wheels: WHEELS[0],
    seat: SEATS[0],
    accent: ACCENTS[1],
  },
  {
    id: 'electric-blue',
    name: 'Cyber Blue',
    paint: PAINTS[3],
    wheels: WHEELS[1],
    seat: SEATS[0],
    accent: ACCENTS[1],
  },
]

export const MOTORCYCLE_SPECS = {
  engine: [
    { label: 'Type', value: 'Liquid-cooled 4-stroke 16-valve DOHC Inline-4' },
    { label: 'Displacement', value: '998 cc' },
    { label: 'Bore x Stroke', value: '76.0 mm x 55.0 mm' },
    { label: 'Compression Ratio', value: '13.0:1' },
    { label: 'Maximum Power', value: '200 HP @ 13,500 RPM' },
    { label: 'Maximum Torque', value: '112 Nm @ 11,500 RPM' },
    { label: 'Fuel System', value: 'Electronic Fuel Injection (EFI)' },
  ],
  chassis: [
    { label: 'Frame', value: 'Aluminum Twin-Spar Frame' },
    { label: 'Front Suspension', value: 'Öhlins NPX 43mm Fully Adjustable Inverted Fork' },
    { label: 'Rear Suspension', value: 'Öhlins TTX36 Pro Fully Adjustable Monoshock' },
    { label: 'Front Brakes', value: 'Dual 330mm Discs with Brembo Stylema Monobloc Calipers' },
    { label: 'Rear Brakes', value: 'Single 220mm Disc with Nissin Single-Piston Caliper' },
    { label: 'Front Tire', value: '120/70 ZR17' },
    { label: 'Rear Tire', value: '200/55 ZR17' },
  ],
  dimensions: [
    { label: 'Overall Length', value: '2,100 mm' },
    { label: 'Overall Width', value: '745 mm' },
    { label: 'Overall Height', value: '1,140 mm' },
    { label: 'Seat Height', value: '830 mm' },
    { label: 'Wheelbase', value: '1,455 mm' },
    { label: 'Curb Weight', value: '193 kg' },
    { label: 'Fuel Capacity', value: '16.1 Liters' },
  ],
  electronics: [
    { label: 'Display', value: '5-inch Full-Color TFT Dash' },
    { label: 'Riding Modes', value: 'Sport, Road, Rain, Custom' },
    { label: 'Traction Control', value: '9-Level Adjustable IMU-assisted HSTC' },
    { label: 'Quickshifter', value: 'Bi-directional (Up & Down)' },
    { label: 'ABS', value: 'Cornering ABS with Rear-Lift Control' },
  ]
}