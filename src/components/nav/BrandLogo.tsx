const BrandLogo = () => {
  return (
    <a href="https://flowbite.com" className="flex ml-2 md:mr-24">
      <img
        src="https://flowbite.com/docs/images/logo.svg"
        className="h-8 mr-3"
        alt="FlowBite Logo"
      />
      <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
        Flowbite
      </span>
    </a>
  );
};

export default BrandLogo;
