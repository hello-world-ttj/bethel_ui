const TableLoader = () => {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="flex flex-col items-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent mb-4"></div>
        <p className="text-gray-500 dark:text-gray-400">Loading data...</p>
      </div>
    </div>
  );
};

export default TableLoader;