import React, { FC, useState, useEffect } from "react";
import remoting from "../../../services/remoting";
import { Table } from "antd";
import moment from "moment";
import { DATE_PICKER_DATE_TIME_FORMAT } from "../../../services/app-consts";

const Page = (props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    remoting.get("/transactions").then((response) => {
      if (response && Object.keys(response).length !== 0) {
        setData(response.data); //todo data.data data.message
      }
    });
  }, []);

  const columns = [
    {
      title: "Vehicle Type",
      dataIndex: "vehicleType",
      key: "vehicleType",
    },
    { title: "Category", dataIndex: "vehicleCategory", key: "vehicleCategory" },
    { title: "License Plate", dataIndex: "licensePlate", key: "licensePlate" },
    { title: "Line", dataIndex: "lineOrder", key: "lineOrder" },
    { title: "Position", dataIndex: "positionStart", key: "positionStart" },
    {
      title: "Check in",
      dataIndex: "enterTime",
      key: "enterTime",
      render: (text, record, index) => {
        return <div>{record.enterTime ? moment(record.enterTime).format(DATE_PICKER_DATE_TIME_FORMAT) : ''}</div>;
      },
    },
    {
      title: "Check out",
      dataIndex: "exitTime",
      key: "exitTime",
      render: (text, record, index) => {
        return <div>{record.exitTime ? moment(record.exitTime).format(DATE_PICKER_DATE_TIME_FORMAT) : ''}</div>;
      },
    },
    { title: "Member", dataIndex: "memberName", key: "memberName" },
    {
      title: "Responsible",
      dataIndex: "responsibleName",
      key: "responsibleName",
    },
    { title: "Price", dataIndex: "price", key: "price" },
  ];

  return (
    <div className="table-container">
      <div>
        <h1>Transactions</h1>
      </div>
      <Table
        rowKey="id"
        //rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
      />
      {/* <Table
            rowKey="_id"
            //rowSelection={rowSelection}
            columns={columns}
            dataSource={this.props.data}
            pagination={this.props.pagination}
            onChange={this.props.onChange}
          /> */}
    </div>
  );
};
export default Page;
