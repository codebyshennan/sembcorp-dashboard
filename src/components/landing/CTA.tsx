const LandingPageCTA = () => {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <h2 className="mb-4 text-4xl font-extrabold leading-tight text-gray-900 dark:text-white">
            Ready to transform the way you manage weather data?
          </h2>
          <p className="mb-6 font-light text-gray-500 dark:text-gray-400 md:text-lg">
            Don&apos;t let weather data management slow you down any longer.
            With real-time data and insights at your fingertips, you&apos;ll be
            able to make better-informed decisions, optimize your operations,
            and stay ahead of the competition. Contact us today to learn more
            and get started.
          </p>
          <a
            href="/app"
            className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-primary-800"
          >
            Join Us
          </a>
        </div>
      </div>
    </section>
  );
};

export default LandingPageCTA;
