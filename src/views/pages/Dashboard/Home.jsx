import { Avatar } from "antd";
import { Calendar, Clipboard, Download, Film, Globe, User } from "react-feather";
import { Helmet } from "react-helmet";
import { Card, CardBody, CardText, Col, Row } from "reactstrap";
import BoxChart from "../../components/BoxChart";
import { LuTicket } from "react-icons/lu";
import { BiCameraMovie } from "react-icons/bi";
import { FaRegBuilding } from "react-icons/fa";
import { MdOutlineMeetingRoom } from "react-icons/md";
import { useGetALLCinema, useGetALLMovie, useGetALLRoom, useGetALLShowTime, useGetALLUser, useGetALLVoucher } from "../Managers/Showtime/hook";
import UserReport from "../../components/UserReport";
import LatestMovies from "../../components/Tables/LatestMovie";
import LatestVoucher from "../../components/Tables/LatestVoucher";

function Home() {
    const { status, data: dataListShowTime } = useGetALLShowTime()
    const { statusUser, data: dataListUser } = useGetALLUser()
    const { statusCinema, data: dataListCinema } = useGetALLCinema()
    const { statusRoom, data: dataListRoom } = useGetALLRoom()
    const { statusMovie, data: dataListMovie } = useGetALLMovie()
    const { statusVoucher, data: dataListVoucher } = useGetALLVoucher()

    return (
        <>
            <Helmet>
                <title>Dream Movie</title>
            </Helmet>
            <Row className="match-height">
                {/* <Col xl="12" sm="12">
                    <InforSuggestions
                        title={specificSection.title}
                        description={specificSection.description} />
                </Col> */}
                <Col xl="4" sm="4">
                    <BoxChart
                        title="Tổng số phim"
                        icon={<Film size={30} />}
                        count={(dataListMovie?.length)?.toLocaleString('en-US') || 0}
                        colorIcon='rgb(150 244 255 / 40%)'
                        color="#01CFE8"
                    />
                </Col>
                <Col xl="4" sm="4">
                    <BoxChart
                        title="Tổng khách hàng"
                        icon={<User size={30} />}
                        count={(dataListUser?.length)?.toLocaleString('en-US') || 0}
                        colorIcon="rgb(255 186 186 / 40%)"
                        color="#ea5455"
                    />
                </Col>
                <Col xl="4" sm="4">
                    <BoxChart
                        title="Tổng lượt xem"
                        icon={<LuTicket size={30} />}
                        count={(366)?.toLocaleString('en-US') || 0}
                        colorIcon="rgb(179 173 244 / 41%)"
                        color="#7468F0"
                    />
                </Col>

            </Row>
            <Row className="match-height mt-2">
                {/* <Col xl="12" sm="12">
                    <InforSuggestions
                        title={specificSection.title}
                        description={specificSection.description} />
                </Col> */}
                <Col xl="4" sm="4">
                    <BoxChart
                        title="Phim hiện chiếu"
                        icon={<BiCameraMovie size={30} />}
                        count={(dataListUser?.length)?.toLocaleString('en-US') || 0}
                        colorIcon='rgba(50, 119, 238, 0.2)'
                        color="#3277EE"
                    />
                </Col>
                <Col xl="4" sm="4">
                    <BoxChart
                        title="Tổng số rạp chiếu"
                        icon={<FaRegBuilding size={30} />}
                        count={(dataListCinema?.length)?.toLocaleString('en-US') || 0}
                        colorIcon="rgba(255, 159, 68, 0.2)"
                        color="rgba(255, 159, 68, 1)"
                    />
                </Col>
                <Col xl="4" sm="4">
                    <BoxChart
                        title="Tổng số phòng chiếu"
                        icon={<MdOutlineMeetingRoom size={30} />}
                        count={(dataListRoom?.length)?.toLocaleString('en-US') || 0}
                        colorIcon="rgba(78, 208, 135, 0.2)"
                        color="rgba(78, 208, 135, 1)"
                    />
                </Col>
            </Row>

            <Row className="mt-5">
                <Col xl="12" sm="12">
                    {dataListUser && <UserReport dataLasterUser={dataListUser} />}
                </Col>
            </Row>

            <Row className="mt-5 mb-5">
                <Col xl="6" sm="12">
                    {dataListUser && <LatestMovies data={dataListMovie} />}
                </Col>

                <Col xl="6" sm="12">
                    {dataListUser && <LatestVoucher data={dataListVoucher} />}
                </Col>
            </Row>
        </>
    );
}

export default Home;
