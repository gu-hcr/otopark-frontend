import React, { FC, useState, useEffect } from "react";
import remoting from "../../../services/remoting";
import { Table } from "antd";
import moment from "moment";
import { DATE_PICKER_DATE_TIME_FORMAT } from "../../../services/app-consts";

const Page = (props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    remoting.get("/employees").then((response) => {
      if (response && Object.keys(response).length !== 0) {
        setData(response.data); //todo data.data data.message
      }
    });
  }, []);


   const columns = [
     {
       title: "First name",
       dataIndex: "firstName",
       key: "firstName",
      },
      { title: "Last name", dataIndex: "lastName", key: "lastName" },
      { title: "Identity Number", dataIndex: "identityNumber", key: "identityNumber" },
    { title: "Phone", dataIndex: "phone", key: "phone" },
    {
      title: "Start",
      dataIndex: "startDate",
      key: "startDate",
      render: (text, record, index) => {
        return <div>{record.startDate ? moment(record.startDate).format(DATE_PICKER_DATE_TIME_FORMAT) : ''}</div>;
      },
    },
    {
      title: "End",
      dataIndex: "endDate",
      key: "endDate",
      render: (text, record, index) => {
        return <div>{record.endDate ? moment(record.endDate).format(DATE_PICKER_DATE_TIME_FORMAT) : ''}</div>;
      },
    },
   
  ];

  return (
    <div className="table-container">
      <div>
        <h1>Employees</h1>
      </div>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={data}
      />
    </div>
  );
};
export default Page;
