const LandingPagePurpose = () => {
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="max-w-screen-lg text-gray-500 sm:text-lg dark:text-gray-400">
          <h2 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
            Transforming weather monitoring at{' '}
            <span className="font-extrabold">200,000+</span> companies worldwide
          </h2>
          <p className="mb-4 font-light">
            Our mission is simple: we want to help businesses and organizations
            across the Asia-Pacific region unlock the full potential of weather
            data.
          </p>
          <p className="mb-4 font-medium">
            By providing real-time data and insights, we&apos;re helping our
            clients make better-informed decisions, optimize their operations,
            and stay one step ahead of the competition.
          </p>
          <a
            href="#"
            className="inline-flex items-center font-medium text-green-600 hover:text-green-800 dark:text-green-500 dark:hover:text-green-700"
          >
            Learn more
            <svg
              className="ml-1 w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default LandingPagePurpose;
