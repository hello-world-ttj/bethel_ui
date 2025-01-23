import { Link } from "react-router-dom";
import ChurchTable from "../../components/Tables/ChurchTable";

const ChurchList = () => {
  return (
    <>
      <div className="mb-7.5 flex flex-wrap gap-5 xl:gap-7.5 justify-between">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-start">
          <h2 className="text-title-md2 font-semibold text-black dark:text-white ">
            Church List
          </h2>
        </div>
        <Link
          to="/add-church"
          className="inline-flex items-center justify-center gap-2.5 bg-[#f09443] py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          <span>
            <svg
              className="fill-current"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 0C9.44772 0 9 0.44772 9 1V9H1C0.44772 9 0 9.44772 0 10C0 10.5523 0.44772 11 1 11H9V19C9 19.5523 9.44772 20 10 20C10.5523 20 11 19.5523 11 19V11H19C19.5523 11 20 10.5523 20 10C20 9.44772 19.5523 9 19 9H11V1C11 0.44772 10.5523 0 10 0Z"
                fill=""
              />
            </svg>
          </span>
          Add Church
        </Link>
      </div>

      <ChurchTable />
    </>
  );
};

export default ChurchList;
