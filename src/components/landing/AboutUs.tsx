const LandingPageAboutUs = () => {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
        <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
          <h2 className="mb-4 text-4xl font-extrabold text-gray-900 dark:text-white">
            We didn&apos;t reinvent the wheel
          </h2>
          <p className="mb-4">
            At SembCorp, our mission is to help businesses and organizations
            across the Asia-Pacific region make better-informed decisions by
            providing them with real-time weather data and insights. Since our
            founding, we&apos;ve been dedicated to revolutionizing the way
            weather data is managed and used. Our clients come from a wide range
            of industries, and we&apos;re proud to have helped them optimize
            their operations, reduce costs, and increase efficiency.
          </p>
          <p>
            Our mission is to help businesses and organizations across the
            Asia-Pacific region make better-informed decisions by providing them
            with real-time weather data and insights.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-8">
          <img
            className="w-full rounded-lg"
            src="https://stevenswater.com/wp-content/uploads/meteorology_bkgrd.jpg"
            alt="SC 1"
          />
          <img
            className="mt-4 w-full rounded-lg lg:mt-10"
            src="https://www.usnews.com/dims4/USNEWS/236620a/2147483647/crop/2121x1415+0+0/resize/970x647/quality/85/?url=https%3A%2F%2Fwww.usnews.com%2Fcmsmedia%2F4f%2Ffd%2F54fe82284258a88f7afa1c0e93fb%2F210715-meteorologist-stock.jpg"
            alt="SC 2"
          />
        </div>
      </div>
    </section>
  );
};

export default LandingPageAboutUs;
