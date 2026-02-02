const CardSkeleton = () => {
  return (
    <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4 mb-4 animate-pulse">
        <div className="h-6 w-6 bg-gray-300 dark:bg-gray-600 rounded"></div>
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-16 mb-2"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-20"></div>
        </div>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-12"></div>
        </div>
      </div>
    </div>
  );
};

export default CardSkeleton;