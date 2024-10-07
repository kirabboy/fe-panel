import { Spin } from "antd";
import { useFetchServerInfo } from "../../api/swr/useFetchServerInfo";
import { convertToPercent } from "../../utils/converToPercent";
import { convertToBytes } from "../../utils/convertToBytes";
import RadialBarChart from "../Charts/RadialChart";

const ServerInfoComponent = (props) => {
  const { vpsIpAddress } = props;
  const { data, isLoading, isValidating } = useFetchServerInfo({
    ipAddress: vpsIpAddress,
  });

  const dataChart = {
    ram: {
      total: convertToBytes(data?.ram?.mem?.total || 0),
      used: convertToBytes(data?.ram?.mem?.used || 0),
      free: convertToBytes(data?.ram?.mem?.free || 0),
      shared: convertToBytes(data?.ram?.mem?.shared || 0),
      buffCache: convertToBytes(data?.ram?.mem?.buffCache || 0),
      available: convertToBytes(data?.ram?.mem?.available || 0),
    },
  };
  console.log("useFetchServerInfo", [
    convertToPercent(dataChart.ram.used, dataChart.ram.total),
  ]);

  if (isLoading)
    return (
      <div className="w-full h-[35rem] flex justify-center items-center">
        <Spin />
      </div>
    );
  return (
    <div>
      <RadialBarChart
        series={[
          convertToPercent(dataChart.ram.available, dataChart.ram.total),
        ]}
        labels={["Available"]}
        colors={["#20a53a"]}
        total={dataChart.ram.total}
      />
    </div>
  );
};

export default ServerInfoComponent;
