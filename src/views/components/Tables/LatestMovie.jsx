import React from "react";
import { Clock } from "react-feather";
import { Card, CardBody, CardTitle, Table } from "reactstrap";

const LatestMovies = ({ data }) => {
  return (
    <Card className="p-4">
      <CardTitle tag="h4" className="pt-2 mx-2" >
        Phim sắp chiếu
      </CardTitle>
      <CardBody
        style={{
          paddingTop: "unset",
        }}
        className="dashboard-scoll"
      >
        <Table responsive>
          <thead className="table-light">
            <tr>
              <th>Tên phim</th>
              <th>Khởi chiếu</th>
            </tr>
          </thead>
          <tbody>
            {data?.sort((a, b) => new Date(b.ngaycongchieu) - new Date(a.ngaycongchieu))
              ?.slice(0, 10)?.map((item) => {
                const date = new Date(item?.ngaycongchieu)
                const create_Date = date.toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric"
                })
                return (
                  <tr key={item.id}>
                    <td>
                      <h6
                        style={{
                          width: "180px",
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                          textTransform: "capitalize",
                        }}
                      >
                        {item?.name}
                      </h6>
                    </td>
                    <td>
                      <Clock className='me-50' size={13} />{create_Date}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </CardBody>
    </Card>
  );
};

export default LatestMovies;
