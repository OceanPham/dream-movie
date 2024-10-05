import { Avatar } from "antd";
import { Card, CardBody, CardText } from "reactstrap";


const BoxChart = ({ title, icon, count, color, colorIcon }) => {
    return (
        <Card className="mb-2">
            <CardBody>
                <div>
                    <CardText tag="h4">{title}</CardText>
                </div>
                <div
                    className="d-flex align-items-center "
                    style={{ justifyContent: "space-between", marginTop: "10px" }}
                >
                    <h5 style={{ fontSize: "2rem", color: color, marginTop: "15px" }}>
                        {count}
                    </h5>
                    <div
                        className="d-flex align-items-center"
                        style={{ justifyContent: "center" }}
                    >
                        <Avatar
                            icon={icon}
                            className="me-2"
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                width: "50px",
                                height: "50px",
                                backgroundColor: colorIcon,
                                color: color,
                            }}
                        />
                    </div>
                </div>
            </CardBody>
        </Card>
    );
};

export default BoxChart