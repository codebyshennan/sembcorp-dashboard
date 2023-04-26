// import { trpc } from '../utils/trpc';
import { NextPageWithLayout } from './_app';
import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import useLocation from '~/hooks/useLocation';
import TemperatureChart from '~/components/charts/TemperatureChart';
import MeteoHumidityChart from '~/components/charts/MeteoHumidityChart';
import MeteoRadiationChart from '~/components/charts/MeteoRadiationChart';
import Avatar from '~/components/nav/Avatar';
import SideNav from '~/components/sidebar/SideNav';
import SideNavToggle from '~/components/nav/SideNavToggle';
import BrandLogo from '~/components/nav/BrandLogo';
import { useAuth, useUser } from '@clerk/nextjs';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

const IndexPage: NextPageWithLayout = () => {
  const { isLoaded, isSignedIn, user } = useUser();

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(103.85);
  const [lat, setLat] = useState(1.29);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current =
      mapContainer.current &&
      new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [lng, lat],
        zoom: zoom,
      });
  });

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on('moveend', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  const { dailyTempData, hourlyMeteoData, error, isLoading } = useLocation(
    lat,
    lng,
  );

  if (!isLoaded || !isSignedIn) {
    return <div>sad</div>;
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
              <Avatar
                user={{
                  name: user.fullName as unknown as string,
                  email: user.primaryEmailAddress as unknown as string,
                  image:
                    user.profileImageUrl ??
                    'https://flowbite.com/docs/images/people/profile-picture-5.jpg',
                }}
              />
            </div>
          </div>
        </nav>

        <SideNav />

        <div className="p-4 sm:ml-64">
          <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
                <p className="text-2xl text-gray-400 dark:text-gray-500">
                  Longitude: {lng}
                </p>
              </div>
              <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
                <p className="text-2xl text-gray-400 dark:text-gray-500">
                  Latitude: {lat}
                </p>
              </div>
              <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
                <p className="text-2xl text-gray-400 dark:text-gray-500">
                  Zoom: {zoom}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center h-min mb-4 rounded bg-gray-50 dark:bg-gray-800">
              <div ref={mapContainer} className="map-container" />
            </div>
            <div className="flex items-center justify-center h-min mb-4 rounded bg-gray-50 dark:bg-gray-800">
              {dailyTempData && (
                <TemperatureChart data={dailyTempData} xKey="time" />
              )}
            </div>
            <div className="flex items-center justify-center h-min mb-4 rounded bg-gray-50 dark:bg-gray-800">
              {hourlyMeteoData && (
                <MeteoRadiationChart data={hourlyMeteoData} xKey="time" />
              )}
            </div>
            <div className="flex items-center justify-center h-min mb-4 rounded bg-gray-50 dark:bg-gray-800">
              {hourlyMeteoData && (
                <MeteoHumidityChart data={hourlyMeteoData} xKey="time" />
              )}
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
              </div>
              <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
              </div>
              <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
              </div>
              <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
              </div>
            </div>
            <div className="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
              <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
              </div>
              <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
              </div>
              <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
              </div>
              <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default IndexPage;
