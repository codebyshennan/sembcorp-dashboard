import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export interface OpenMeteoData {
  daily: {
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    time: string[];
  };
  hourly: {
    direct_radiation: number[];
    relativehumidity_2m: number[];
    time: string[];
  };
  daily_units: {
    temperature_2m_max: string;
    temperature_2m_min: string;
    time: string;
  };
  hourly_units: {
    direct_radiation: string;
    relativehumidity_2m: string;
    time: string;
  };
  timezone: string;
  timezone_abbreviation: string;
  utc_offset_seconds: number;
  latitude: number;
  longitude: number;
  elevation: number;
  generationtime_ms: number;
}

const constructOpenMeteoUrl = (
  lat: number,
  lon: number,
  start_date: string,
  end_date: string,
  hourly = 'relativehumidity_2m,direct_radiation',
  daily = 'temperature_2m_max,temperature_2m_min',
  timezone = 'Asia/Singapore',
) => {
  const url = 'https://api.open-meteo.com/v1/forecast';
  const query = `?latitude=${lat}&longitude=${lon}&hourly=${hourly}&daily=${daily}&timezone=${timezone}&start_date=${start_date}&end_date=${end_date}`;
  return url + query;
};

const constructPositionStackUrl = (lat: number, lon: number) => {
  const url = 'http://api.positionstack.com/v1/reverse?';
  const query = `access_key=${process.env.NEXT_PUBLIC_POSITION_STACK_TOKEN}&query=${lat},${lon}`;
  return url + query;
};

const useLocation = (lat: number, lng: number) => {
  const openMeteoUrl = constructOpenMeteoUrl(
    lat,
    lng,
    '2023-01-01',
    '2023-01-10',
  );
  const positionStackUrl = constructPositionStackUrl(lat, lng);

  const {
    data: openMeteoData,
    error: openMeteoError,
    isLoading,
  } = useSWR<OpenMeteoData, string>(openMeteoUrl, fetcher);

  console.log(positionStackUrl);

  const { data: position } = useSWR(positionStackUrl, fetcher);

  if (position?.data) {
    console.log(
      `[CONFIDENCE: ${
        position?.data[0].confidence * 100
      }%] You are located near ${position?.data[0]?.label}, in ${
        position?.data[0]?.region
      }. `,
    );
  }

  const { daily, hourly } = openMeteoData || {};

  const dailyTempData = [];
  const hourlyMeteoData = [];

  for (let i = 0; i < daily?.time?.length; i++) {
    const intervalObj = {
      time: daily?.time[i],
      max: daily?.temperature_2m_max[i],
      min: daily?.temperature_2m_min[i],
    };
    dailyTempData.push(intervalObj);
  }

  for (let i = 0; i < hourly?.time?.length; i++) {
    const intervalObj = {
      time: hourly.time[i],
      direct_radiation: hourly?.direct_radiation[i],
      relativehumidity_2m: hourly?.relativehumidity_2m[i],
    };
    hourlyMeteoData.push(intervalObj);
  }

  return {
    dailyTempData,
    hourlyMeteoData,
    openMeteoError,
    isLoading,
  };
};

export default useLocation;
