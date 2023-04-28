import { Navbar, Button } from 'flowbite-react';

const LandingPageHeader = () => {
  return (
    <Navbar fluid={true} rounded={true}>
      <Navbar.Brand href="#">
        <img
          src="https://semb-corp.s3.ap-southeast-1.amazonaws.com/wp-content/uploads/2019/02/14135716/logo-2.png"
          // width={40}
          className="mr-3 h-6 sm:h-9"
          alt="Sembcorp Logo"
        />
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Button className="bg-green-700" href="/app">
          Get started
        </Button>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link className="text-green-700">Home</Navbar.Link>
        <Navbar.Link className="text-green-400">About</Navbar.Link>
        <Navbar.Link className="text-green-400">Services</Navbar.Link>
        <Navbar.Link className="text-green-400">Pricing</Navbar.Link>
        <Navbar.Link className="text-green-400">Contact</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default LandingPageHeader;
