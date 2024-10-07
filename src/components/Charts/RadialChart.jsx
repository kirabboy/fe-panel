import Chart from "react-apexcharts";
import { convertFromBytes } from "../../utils/convertFormBytes";

const optionsConfig = {
  chart: {
    height: 350,
    type: "radialBar",
  },
  plotOptions: {
    radialBar: {
      hollow: {
        size: "70%",
      },
    },
  },
};
const RadialBarChart = (props) => {
  const { title, series, labels, colors, total } = props;

  const options = {
    ...optionsConfig,
    plotOptions: {
      radialBar: {
        ...optionsConfig.plotOptions.radialBar,
        dataLabels: {
          name: {
            show: true,
          },
          value: {
            show: true,
            fontSize: "14px",
            formatter: function (val) {
              return convertFromBytes((val / 100) * total);
            },
          },
        },
      },
    },
    labels: labels,
    colors: colors,
  };
  return (
    <div>
      {title && <h2>{title}</h2>}
      <Chart options={options} series={series} type="radialBar" height={350} />
    </div>
  );
};

export default RadialBarChart;
