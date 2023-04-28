import { useClerk } from '@clerk/clerk-react';
import { Badge, Sidebar, Timeline } from 'flowbite-react';
import DatePicker from 'react-datepicker';
import { HiCalendar } from 'react-icons/hi';
import { FaTemperatureHigh } from 'react-icons/fa';
import { TiWeatherPartlySunny } from 'react-icons/ti';
import { AiOutlineCode } from 'react-icons/ai';
import { VscSignOut } from 'react-icons/vsc';
import { BsCalendar2Check } from 'react-icons/bs';
import { MdOutlineDashboard } from 'react-icons/md';

import 'react-datepicker/dist/react-datepicker.css';

interface Controls {
  tempChart: {
    show: boolean;
    setShow: (show: boolean) => void;
  };
  meteoChart: {
    show: boolean;
    setShow: (show: boolean) => void;
  };
  startDate: {
    date: Date;
    setDate: (date: Date) => void;
  };
  endDate: {
    date: Date;
    setDate: (date: Date) => void;
  };
  showJSON: {
    show: boolean;
    setShow: (show: boolean) => void;
  };
}

const SideNav = ({ controls }: { controls: Controls }) => {
  const { signOut } = useClerk();

  return (
    <aside
      id="logo-sidebar"
      className="fixed top-0 left-0 z-0 w-auto h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
      aria-label="Sidebar"
    >
      <Sidebar aria-label="Sidebar">
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item href="#" icon={MdOutlineDashboard} label="Pro">
              Dashboard
            </Sidebar.Item>
            <Sidebar.Item
              href="#"
              icon={FaTemperatureHigh}
              labelColor="alternative"
              onClick={() => controls.tempChart.setShow(true)}
            >
              Temperature Chart
            </Sidebar.Item>
            <Sidebar.Item
              href="#"
              icon={TiWeatherPartlySunny}
              onClick={() => controls.meteoChart.setShow(true)}
            >
              Meteorological Chart
            </Sidebar.Item>
            <Sidebar.Item>
              <Timeline>
                <Timeline.Item>
                  <Timeline.Point icon={HiCalendar} />
                  <Timeline.Content>
                    <Timeline.Time> Start </Timeline.Time>
                    <Timeline.Body>
                      <DatePicker
                        className="w-full z-50"
                        selected={controls.startDate.date}
                        onChange={(date: Date) =>
                          controls.startDate.setDate(date)
                        }
                      />
                    </Timeline.Body>
                  </Timeline.Content>
                </Timeline.Item>
                <Timeline.Item>
                  <Timeline.Point icon={BsCalendar2Check} />
                  <Timeline.Content>
                    <Timeline.Time> End </Timeline.Time>
                    <Timeline.Body>
                      <DatePicker
                        className="w-full z-50"
                        selected={controls.endDate.date}
                        onChange={(date: Date) =>
                          controls.endDate.setDate(date)
                        }
                      />
                    </Timeline.Body>
                  </Timeline.Content>
                </Timeline.Item>
              </Timeline>
            </Sidebar.Item>
            <Sidebar.Item
              href="#"
              icon={AiOutlineCode}
              label="</>"
              onClick={() => controls.showJSON.setShow(true)}
            >
              API Response
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item onClick={() => signOut()} icon={VscSignOut}>
            Sign Out
          </Sidebar.Item>
          <Sidebar.CTA>
            <div className="mb-3 flex items-center">
              <Badge color="warning">DEMO</Badge>
            </div>
            <p className="mb-3 text-sm text-blue-900 dark:text-blue-400">
              This preview is part of the assessment for the position of
              software engineer at{' '}
              <a
                className="text-sm text-blue-900 underline hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                href="https://www.sembcorp.com/en"
              >
                SembCorp Industries
              </a>
              . The data is fetched from the API provided by the company.
            </p>

            <p className="mb-3 text-sm text-blue-900 dark:text-blue-400">
              The source code for this project can be found
              <a
                className="text-sm text-blue-900 underline hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                href="https://github.com/codebyshennan/sembcorp-dashboard.git"
              >
                {' '}
                here
              </a>
              .
            </p>

            <p className="mb-3 text-sm text-blue-900 dark:text-blue-400">
              All Rights Reserved © 2023 | Shen Nan, Wong
            </p>
          </Sidebar.CTA>
        </Sidebar.ItemGroup>
      </Sidebar>
    </aside>
  );
};

export default SideNav;
