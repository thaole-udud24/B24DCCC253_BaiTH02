import type { City } from '../types/weather';

export const CITIES: City[] = [
  { id: 'hanoi', name: 'Hà Nội', latitude: 21.0285, longitude: 105.8542, region: 'north', regionName: 'Miền Bắc' },
  { id: 'haiphong', name: 'Hải Phòng', latitude: 20.8449, longitude: 106.6881, region: 'north', regionName: 'Miền Bắc' },
  { id: 'hue', name: 'Huế', latitude: 16.4637, longitude: 107.5909, region: 'central', regionName: 'Miền Trung' },
  { id: 'danang', name: 'Đà Nẵng', latitude: 16.0544, longitude: 108.2022, region: 'central', regionName: 'Miền Trung' },
  { id: 'nhatrang', name: 'Nha Trang', latitude: 12.2388, longitude: 109.1967, region: 'central', regionName: 'Miền Trung' },
  { id: 'dalat', name: 'Đà Lạt', latitude: 11.9404, longitude: 108.4583, region: 'central', regionName: 'Tây Nguyên' },
  { id: 'hcm', name: 'TP. Hồ Chí Minh', latitude: 10.8231, longitude: 106.6297, region: 'south', regionName: 'Miền Nam' },
  { id: 'cantho', name: 'Cần Thơ', latitude: 10.0452, longitude: 105.7469, region: 'south', regionName: 'Miền Nam' },
];

export const DEFAULT_CITY_ID = 'hanoi';
