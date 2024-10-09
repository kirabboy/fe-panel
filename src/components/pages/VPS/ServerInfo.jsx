import { Col, Progress, Row, Spin } from "antd";
import { useFetchServerInfo } from "../../../api/swr/useFetchServerInfo";

const convertToGB = (valueStr) => {
  if (valueStr.endsWith("Gi")) {
    return parseFloat(valueStr) * 1.07374;
  } else if (valueStr.endsWith("Mi")) {
    return parseFloat(valueStr) / 1024;
  } else if (valueStr.endsWith("G")) {
    return parseFloat(valueStr);
  } else if (valueStr.endsWith("M")) {
    return parseFloat(valueStr) / 1024;
  } else {
    return parseFloat(valueStr);
  }
};

const CircleChart = ({
  total,
  available,
  label,
  isCpu = false,
  cpuCores = null,
}) => {
  const percentage = isCpu
    ? ((total - available) / total) * 100
    : total
    ? ((total - available) / total) * 100
    : 0;

  const percentValue = isNaN(percentage) ? 0 : percentage;

  return (
    <div style={{ textAlign: "center", margin: "20px" }}>
      <Progress
        type="circle"
        percent={Number(percentValue).toFixed(2)}
        strokeColor={
          percentValue < 50 ? "green" : percentValue < 80 ? "yellow" : "red"
        }
        format={(percent) => `${Number(percent).toFixed(2)}%`}
      />
      <div>{label}</div>
      {!isCpu && (
        <>
          <div>Total: {total.toFixed(2)} GB</div>
          <div>Available: {available.toFixed(2)} GB</div>
        </>
      )}
      {isCpu && (
        <>
          <div>Total: {total}</div>
          <div>Sleeping: {available}</div>
          <div>Cores: {cpuCores}</div>
        </>
      )}
    </div>
  );
};

const ServerInfoComponent = (props) => {
  const { vpsIpAddress } = props;
  const { data, isLoading, isValidating } = useFetchServerInfo({
    ipAddress: vpsIpAddress,
  });

  console.log("useFetchServerInfo", data);

  if (isLoading || isValidating)
    return (
      <div className="w-full h-[35rem] flex justify-center items-center">
        <Spin />
      </div>
    );

  if (!data || !data.ram || !data.diskSpace || !data.cpuUsega) {
    return (
      <div className="w-full h-[35rem] flex justify-center items-center">
        <p>Lỗi: Không thể tải dữ liệu của máy chủ</p>
      </div>
    );
  }

  const ramTotal = convertToGB(data.ram.mem.total);
  const ramAvailable = convertToGB(data.ram.mem.available);
  const diskTotal = convertToGB(`${data.diskSpace.total.size}G`);
  const diskAvailable = convertToGB(`${data.diskSpace.total.available}G`);

  const totalCpuTasks = parseFloat(data.cpuUsega.tasks.total);
  const sleepingCpuTasks = parseFloat(data.cpuUsega.tasks.sleeping);

  const cpuCores = Object.keys(data.cpuUsega.cpus).length;

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <CircleChart
            total={totalCpuTasks}
            available={sleepingCpuTasks}
            label="CPU"
            isCpu={true}
            cpuCores={cpuCores}
          />
        </Col>
        <Col span={8}>
          <CircleChart total={ramTotal} available={ramAvailable} label="RAM" />
        </Col>
        <Col span={8}>
          <CircleChart
            total={diskTotal}
            available={diskAvailable}
            label="Disk Space"
          />
        </Col>
      </Row>
    </div>
  );
};

export default ServerInfoComponent;
