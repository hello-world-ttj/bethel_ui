import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

export default function MonthlySalesChart({ data, isLoading = false }: any) {
  const options: ApexOptions = {
    colors: ["#f09443"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "bar",
      height: 180,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "39%",
        borderRadius: 5,
        borderRadiusApplication: "end",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 4,
      colors: ["transparent"],
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "left",
      fontFamily: "Outfit",
    },
    yaxis: {
      title: {
        text: undefined,
      },
    },
    grid: {
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    fill: {
      opacity: 1,
    },

    tooltip: {
      x: {
        show: false,
      },
      y: {
        formatter: (val: number) => `${val}`,
      },
    },
  };
  const series = [
    {
      name: "Subscription",
      data: data || Array(12).fill(0)
    },
  ];

  if (isLoading) {
    return (
      <div className="overflow-hidden rounded-sm border border-stroke bg-white px-5 pt-5 dark:border-strokedark dark:bg-white/[0.03] sm:px-6 sm:pt-6 animate-pulse">
        <div className="flex items-center justify-between mb-6">
          <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-32"></div>
        </div>

        <div className="max-w-full overflow-x-auto">
          <div className="-ml-5 min-w-[650px] xl:min-w-full pl-2">
            <div className="h-[180px] bg-gray-200 dark:bg-gray-700 rounded flex items-end justify-around px-4 pb-4">
              {Array.from({ length: 12 }).map((_, index) => (
                <div
                  key={index}
                  className="bg-gray-300 dark:bg-gray-600 rounded-t w-8"
                  style={{
                    height: `${Math.random() * 80 + 20}%`,
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-sm border border-stroke bg-white px-5 pt-5 dark:border-strokedark dark:bg-white/[0.03] sm:px-6 sm:pt-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Monthly Report
        </h3>
      </div>

      <div className="max-w-full overflow-x-auto custom-scrollbar">
        <div className="-ml-5 min-w-[650px] xl:min-w-full pl-2">
          <Chart options={options} series={series} type="bar" height={180} />
        </div>
      </div>
    </div>
  );
}
