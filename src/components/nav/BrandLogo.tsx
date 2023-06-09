const BrandLogo = () => {
  return (
    <a href="https://flowbite.com" className="flex ml-2 md:mr-24">
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhnlg4_T3qowHYxaZkRgAv80zigg6JZkC90XWIxDsu1g&s"
        className="h-8 mr-3"
        alt="FlowBite Logo"
      />
      <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
        Meteorological Services
      </span>
    </a>
  );
};

export default BrandLogo;
