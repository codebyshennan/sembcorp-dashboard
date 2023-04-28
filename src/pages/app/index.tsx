import { NextPageWithLayout } from '../_app';
import { useEffect, useState } from 'react';
import useLocation from '~/hooks/useLocation';
import Avatar from '~/components/nav/Avatar';
import SideNav from '~/components/sidebar/SideNav';
import SideNavToggle from '~/components/nav/SideNavToggle';
import BrandLogo from '~/components/nav/BrandLogo';
import { useUser } from '@clerk/nextjs';
import { trpc } from '~/utils/trpc';
import Map, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import useDebounce from '~/hooks/useDebounce';
import { Alert, Spinner } from 'flowbite-react';
import { HiEye, HiInformationCircle } from 'react-icons/hi';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import 'react-json-pretty/themes/monikai.css';
import TemperatureChartModal from '~/components/modals/TemperatureChartModal';
import MeteoChartModal from '~/components/modals/MeteoChartModal';
import ResponseJSONModal from '~/components/modals/ResponseJSONModal';

const BASE_TEMPLATE =
  'Given the following api response from open-meteo, which provides some information abut meteorological data on a specific area and timezone, provide a succinct response with a table-based statistical analysis and some meteorological insights. This is to assist non-meteorologists to understand, evaluate and recognize patterns in the data:';

const IndexPage: NextPageWithLayout = () => {
  const { isLoaded, isSignedIn } = useUser();

  const [lat, setLat] = useState(1.29);
  const [lng, setLng] = useState(103.85);
  const [zoom, setZoom] = useState(9);
  const [loadingResponse, setLoadingResponse] = useState(false);
  const [messages, setMessages] = useState<string | null>(null);

  const [showTempChart, setShowTempChart] = useState(false);
  const [showMeteoChart, setshowMeteoChart] = useState(false);
  const [showJSON, setShowJSON] = useState(false);

  const now = new Date();
  const [startDate, setStartDate] = useState(
    new Date(now.getFullYear(), now.getMonth(), now.getDate() - 14),
  );
  const [endDate, setEndDate] = useState(
    new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7),
  );

  const sendMessage = trpc.openai.chatCompletion.useMutation({
    onSuccess: (data) => {
      if (data) {
        setMessages(data);
        setLoadingResponse(false);
      }
    },
    onError: (error) => {
      console.log('why?', error);
      setLoadingResponse(false);
    },
  });

  const debouncedLatitude = useDebounce(lat, 1000) as number;
  const debouncedLongitude = useDebounce(lng, 1000) as number;
  const {
    dailyTempData,
    hourlyMeteoData,
    dailyTempRawData,
    hourlyMeteoRawData,
    location,
    rawData,
  } = useLocation(debouncedLatitude, debouncedLongitude, startDate, endDate);

  useEffect(() => {
    setLoadingResponse(true);
    const prompt =
      BASE_TEMPLATE +
      +'starting from ' +
      startDate +
      'to ' +
      endDate +
      'at ' +
      location +
      'with daily temp data of (max,min) and hourly meteo data of (radiation, humidity) as follows:' +
      JSON.stringify(dailyTempRawData) +
      JSON.stringify(hourlyMeteoRawData);

    console.log(prompt);

    sendMessage.mutate({
      prompt,
    });
  }, [debouncedLatitude, debouncedLongitude]);

  if (!isLoaded || !isSignedIn) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <div className="px-3 py-3 lg:px-5 lg:pl-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center justify-start">
                <SideNavToggle />
                <BrandLogo />
              </div>
              <Avatar />
            </div>
          </div>
        </nav>

        <SideNav
          controls={{
            tempChart: { show: showTempChart, setShow: setShowTempChart },
            meteoChart: { show: showMeteoChart, setShow: setshowMeteoChart },
            startDate: { date: startDate, setDate: setStartDate },
            endDate: { date: endDate, setDate: setEndDate },
            showJSON: { show: showJSON, setShow: setShowJSON },
          }}
        />

        <div className="sm:ml-64 h-screen">
          <div>
            <div className="grid grid-cols-3 gap-4 mb-4 absolute top-20 left-64 ml-5 z-10">
              <div className="flex items-center justify-center h-24 rounded-xl bg-gray-50 dark:bg-gray-800 px-4">
                <p className="text-md text-gray-400 dark:text-gray-500 ">
                  Long: {lng.toFixed(2)}
                </p>
              </div>
              <div className="flex items-center justify-center h-24 rounded-xl bg-gray-50 dark:bg-gray-800">
                <p className="text-md text-gray-400 dark:text-gray-500">
                  Lat: {lat.toFixed(2)}
                </p>
              </div>
              <div className="flex items-center justify-center h-24 rounded-xl bg-gray-50 dark:bg-gray-800">
                <p className="text-md text-gray-400 dark:text-gray-500">
                  Zoom: {zoom.toFixed(1)}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center h-12 gap-4 mb-4 absolute top-48 left-64 ml-5 z-10 rounded-xl bg-gray-50 dark:bg-gray-800 px-4">
              <p className="text-md text-gray-400 dark:text-gray-500">
                {location}
              </p>
            </div>

            <div className="w-[calc(100vw-256px)] h-screen z-0">
              <Map
                initialViewState={{
                  longitude: lng,
                  latitude: lat,
                  zoom,
                }}
                // interactive={!!loadingResponse}
                onMove={(evt) => {
                  setLat(evt.viewState.latitude);
                  setLng(evt.viewState.longitude);
                  setZoom(evt.viewState.zoom);
                }}
                mapStyle="mapbox://styles/mapbox/streets-v12"
                mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
              >
                <Marker longitude={lng} latitude={lat} color="red" />
              </Map>
            </div>
          </div>
        </div>

        <Alert
          color="info"
          className="fixed bottom-0 right-0 m-5 max-w-lg"
          additionalContent={
            <>
              <div className="mt-2 mb-4 text-sm text-blue-700 dark:text-blue-800">
                {!loadingResponse ? (
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {messages as string}
                  </ReactMarkdown>
                ) : (
                  <div>
                    <Spinner aria-label="Thinking" />
                    <span className="pl-3">Im thinking...</span>
                  </div>
                )}
              </div>
              <div className="flex">
                <button
                  type="button"
                  onClick={() => setShowJSON(!showJSON)}
                  className="mr-2 inline-flex items-center rounded-lg bg-blue-700 px-3 py-1.5 text-center text-xs font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-800 dark:hover:bg-blue-900"
                >
                  <HiEye className="-ml-0.5 mr-2 h-4 w-4" />
                  View Response
                </button>
              </div>
            </>
          }
          icon={HiInformationCircle}
        >
          <h3 className="text-lg font-medium text-blue-700 dark:text-blue-800">
            Meteorological AI
          </h3>
        </Alert>

        <TemperatureChartModal
          show={showTempChart}
          setShow={setShowTempChart}
          data={dailyTempData}
        />

        <MeteoChartModal
          show={showMeteoChart}
          setShow={setshowMeteoChart}
          data={hourlyMeteoData}
        />

        <ResponseJSONModal
          show={showJSON}
          setShow={setShowJSON}
          data={rawData}
        />
      </>
    );
  }
};

export default IndexPage;
