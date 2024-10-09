import { Button, Row, Col, message } from "antd";
import axios from "axios";

const ResetServerComponent = ({ vpsIpAddress }) => {
  // Hàm reset server
  const handleResetServer = async () => {
    try {
      const response = await axios.post(
        "https://your-api-url/vps/restartVPS",
        {},
        {
          headers: {
            "Content-Type": "application/json",
            "vps-ip-address": vpsIpAddress, // Truyền IP vào header
          },
        }
      );
      message.success("Server đã được khởi động lại thành công!");
    } catch (error) {
      console.error("Error restarting server:", error);
      message.error("Lỗi khi khởi động lại server!");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <Row gutter={[16, 16]} justify="center">
        <Col>
          <Button onClick={handleResetServer} type="primary">
            Có
          </Button>
        </Col>
        <Col>
          <Button onClick={() => message.info("Hủy hành động")}>Không</Button>
        </Col>
      </Row>
    </div>
  );
};

export default ResetServerComponent;
