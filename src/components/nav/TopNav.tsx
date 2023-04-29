import { Navbar } from 'flowbite-react';

import BrandLogo from './BrandLogo';
import { Controls } from '../sidebar/SideNav';
import Avatar from './Avatar';

const TopNav = ({
  controls,
}: {
  controls: Omit<Controls, 'startDate' | 'endDate'>;
}) => {
  return (
    <Navbar className="absolute w-screen z-[100]" fluid={true} rounded={true}>
      <Navbar.Brand to="/app">
        <BrandLogo />
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="flex content-center mt-3">
        <Navbar.Link
          className="lg:hidden content-center"
          onClick={() => controls.tempChart.setShow(!controls.tempChart.show)}
        >
          Temperature Chart
        </Navbar.Link>
        <Navbar.Link
          className="lg:hidden"
          onClick={() => controls.meteoChart.setShow(!controls.meteoChart.show)}
        >
          Meteorological Chart
        </Navbar.Link>

        <Navbar.Link
          className="lg:hidden"
          onClick={() => controls.showJSON.setShow(!controls.showJSON.show)}
        >
          API Response
        </Navbar.Link>

        <Avatar />
      </Navbar.Collapse>
    </Navbar>
  );
};

export default TopNav;
