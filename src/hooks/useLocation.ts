import useSWR from 'swr';

export async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit,
): Promise<JSON> {
  const res = await fetch(input, init);
  return res.json();
}

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

export interface PositionStack {
  data: {
    latitude: number;
    longitude: number;
    label: string;
    name: string;
    country: string;
    region: string;
    region_code: string;
    type: string;
    distance: number;
    street: string;
    number: string;
    postal_code: string;
    confidence: number;
    administrative_area: string;
    neighbourhood: string;
    country_code: string;
    map_url: string;
  }[];
}

export type DailyTempData = {
  time: string;
  max: number;
  min: number;
};

export type HourlyMeteoData = {
  time: string;
  direct_radiation: number;
  relativehumidity_2m: number;
};

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

const convertDateYYYYMMDD = (date: Date) => {
  const offset = date.getTimezoneOffset();
  const newDate = new Date(date.getTime() - offset * 60 * 1000);
  return newDate.toISOString().split('T')[0];
};

const checkInvalidDate = (date: Date) => {
  return date instanceof Date && !isNaN(date.getTime());
};

const useLocation = (
  lat: number,
  lng: number,
  startDate: Date,
  endDate: Date,
) => {
  const now = new Date();
  const start = checkInvalidDate(startDate)
    ? startDate
    : new Date(now.getFullYear(), now.getMonth(), now.getDate() - 14);
  const end = checkInvalidDate(endDate)
    ? endDate
    : new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
  const openMeteoUrl =
    lat && lng
      ? constructOpenMeteoUrl(
          lat,
          lng,
          convertDateYYYYMMDD(start) as string,
          convertDateYYYYMMDD(end) as string,
        )
      : null;

  const {
    data: openMeteoData,
    error: openMeteoError,
    isLoading,
  } = useSWR<OpenMeteoData, Error>(openMeteoUrl, fetcher);

  const { daily, hourly } = openMeteoData || {};

  const dailyTempData: DailyTempData[] = [];
  const hourlyMeteoData: HourlyMeteoData[] = [];

  const dailyTempRaw = [];
  const hourlyMeteoRaw = [];

  if (daily?.time && daily?.time?.length > 0) {
    for (let i = 0; i < daily?.time?.length; i++) {
      const intervalObj = {
        time: daily.time[i] as string,
        max: daily.temperature_2m_max[i] as number,
        min: daily.temperature_2m_min[i] as number,
      };
      dailyTempData.push(intervalObj);
      dailyTempRaw.push([
        daily?.temperature_2m_max[i],
        daily?.temperature_2m_min[i],
      ]);
    }
  }

  if (hourly && hourly?.time?.length > 0) {
    for (let i = 0; i < hourly?.time?.length; i++) {
      const intervalObj = {
        time: hourly.time[i] as string,
        direct_radiation: hourly?.direct_radiation[i] as number,
        relativehumidity_2m: hourly?.relativehumidity_2m[i] as number,
      };
      hourlyMeteoData.push(intervalObj);
      hourlyMeteoRaw.push([
        hourly?.direct_radiation[i],
        hourly?.relativehumidity_2m[i],
      ]);
    }
  }

  const { data: position } = useSWR<PositionStack, Error>(
    () => openMeteoData && constructPositionStackUrl(lat, lng),
    fetcher,
  );

  let location = 'Finding this place on Earth...';
  if (
    position &&
    position.data &&
    position.data.length > 0 &&
    position.data[0]
  ) {
    location = `[CONFIDENCE: ${
      (position.data[0].confidence as number) * 100
    }%] You are located near ${position?.data[0]?.label}, in ${
      position?.data[0]?.region
    }. `;
    console.log(location);
  }

  return {
    dailyTempData,
    hourlyMeteoData,
    dailyTempRawData: dailyTempRaw,
    hourlyMeteoRawData: hourlyMeteoRaw,
    rawData: openMeteoData,
    openMeteoError,
    isLoading,
    location,
  };
};

export default useLocation;
