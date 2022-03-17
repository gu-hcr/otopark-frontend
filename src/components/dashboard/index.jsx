import React, { FC, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Row,
  Col,
  Modal,
  Table,
  Button,
  Tabs,
  Radio,
  Input, 
  InputNumber,
  Form,
  Select,
} from "antd";
import remoting from '../../services/remoting';
import moment from "moment";
import "../../CustomParkingLot.css";
import { DATE_PICKER_DATE_TIME_FORMAT } from "../../services/app-consts";
import {
  fetchParkingLot,
  vehicleCheckOut,
  vehicleCheckIn,
  fetchEmployee,
} from "../../services";
import ParkingLot from './parking-lot';
//import { PlusSquareOutlined } from "@ant-design/icons";

const Dashboard = (props) => {
  const parkingLotSelector = useSelector((state) => state.parkingLot);
  const employeeSelector = useSelector((state) => state.employee);
  const dispatch = useDispatch();

  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [rowId, setRowId] = useState(0);
  const [rowDescription, setRowDescription] = useState("");
  const [searchText, setSearchText] = useState("");
  const [basePrice, setBasePrice] = useState(0.0);
  const [tabKey, setTabKey] = useState("vehicles");

  const { TabPane } = Tabs;
  const { Option } = Select;

  //Firstly run once
  useEffect(() => {
    dispatch(fetchParkingLot());
    dispatch(fetchEmployee());

    remoting.get("/vehicle-catogories/base-price").then((response) => {
      if (response && Object.keys(response).length !== 0) {
        setBasePrice(response.data); //todo data.data data.message
      }
    });

  }, []);

  //Table columns for vehicles
  const columns = [
    {
      title: "Type",
      dataIndex: "typeName",
      key: "typeName",
    },
    {
      title: "Cat.",
      dataIndex: "categoryName",
      key: "categoryName",
      // render: (data) => {
      //   switch (data) {
      //     case "CATEGORYA":
      //       return "A"
      //     case "CATEGORYB":
      //       return "A";
      //     case "CATEGORYC":
      //       return "C";
      //     default:
      //       return "";
      //   }
      // },
    },
    { title: "Line", dataIndex: "lineOrder", key: "lineOrder" },
    { title: "Pos.", dataIndex: "positionStart", key: "positionStart" },
    { title: "Plate", dataIndex: "licensePlate", key: "licensePlate" },
    {
      title: "Time",
      dataIndex: "startTime",
      key: "startTime",
      render: (text, record, index) => {
        return (
          <div>
            {record.startTime
              ? moment(record.startTime).format(DATE_PICKER_DATE_TIME_FORMAT)
              : ""}
          </div>
        );
      },
    },
    { title: "Member", dataIndex: "memberName", key: "memberName" },
    {
      title: "",
      key: "operation",
      render: (text, record, index) => {
        return (
          <Button
            type="primary"
            className="table-row-btn btn-check-out"
            onClick={() => vehicleCheckOutRequest(record)}
          >
            Check Out
          </Button>
        );
      },
    },
  ];

  //get price from the server and show it to user in Modal
  function vehicleCheckOutRequest(record) {
    remoting
      .get("/parking-lot/vehicles/" + record.id + "/price")
      .then((response) => {
        setRowId(record.id);
        setRowDescription({
          licensePlate: record.licensePlate,
          price: response.data,
        });
        setConfirmModalVisible(true);
      })
      .catch((error) => {});
  }

  //send check-out request to server (with vehicle id and price)
  function doExitOperation() {
    dispatch(
      vehicleCheckOut(rowId, rowDescription ? rowDescription.price : 0.0)
    );
    setRowId(null);
    setRowDescription(null);
    setConfirmModalVisible(false);
  }

  function hideExitModal() {
    setConfirmModalVisible(false);
  }

  //send check-in request to server (with vehicle-type, license-plate and employee)
  const submitNewVehicle = (values) => {
    dispatch(vehicleCheckIn(values));
    onKeyChange('vehicles');
  };  

  const submitBasePrice = (values) => {
    remoting.post("/vehicle-catogories/base-price",{price:values.newBasePrice}, true).then((response) => {
      if (response && Object.keys(response).length !== 0) {
        setBasePrice(response.data); //todo data.data data.message
      }
    });
    onKeyChange('vehicles');
  };  


  const onKeyChange = (key) => setTabKey(key);

  //get (filtered)vehicles for table
  function getVehicles() {
    let vehicles = parkingLotSelector.lines
      ? [].concat.apply(
          [],
          parkingLotSelector.lines
            .map((line) => line.vehicles)
            .filter(function (vlist) {
              return vlist.length > 0;
            })
        )
      : [];

    if (searchText.length > 0) {
      const reg = new RegExp(searchText, "gi");
      //const res = vehicles.filter(({licensePlate}) => licensePlate.startsWith(searchText)) ;
      vehicles = vehicles.filter(
        ({ licensePlate }) => !!licensePlate.match(reg)
      );
    }

    return vehicles;
  }

  const onSearch = (e) => {
    setSearchText(e.target.value != null ? e.target.value.trim() : "");
  };

  return (
    <div key="parkingLotInfo">
      <Row gutter={24}>
        <Col className="gutter-row" span={14}>
          <ParkingLot></ParkingLot>
        </Col>

        {/* var result = parkingLotSelector.lines.map(line => ({ value: line.vehicles })); */}
        <Col className="gutter-row" span={10}>
          <div className="car-operation">
            <Tabs activeKey={tabKey} onChange={onKeyChange}>
              <TabPane tab="Vehicles" key="vehicles">
                <div className="table-container">
                  <div style={{ overflow: "auto" }}>
                    <Row justify="end">
                      <Input
                        style={{ width: 100, borderColor: "#ee5920" }}
                        placeholder="license plate"
                        onChange={onSearch}
                        onPressEnter={onSearch}
                      ></Input>
                    </Row>

                    <Table
                      className="parked-vehicles-table"
                      rowKey="id"
                      //rowSelection={rowSelection}
                      // onChange={this.handleTableChange}
                      columns={columns}
                      dataSource={
                        parkingLotSelector.status === "FETCHED"
                          ? getVehicles()
                          : []
                      }
                    />
                  </div>
                </div>
              </TabPane>

              <TabPane tab="Check In" key="new">
                <Form onFinish={submitNewVehicle}>
                  <Row>
                    <Col>
                      <Form.Item
                        name="typeName"
                        label="Type"
                        rules={[
                          {
                            required: true,
                            message: "Please choose type",
                          },
                        ]}
                      >
                        <Radio.Group className="vehicle-type-radio-group">
                          <Radio value={"MOTORCYCLE"}>Motorcycle(A)</Radio>
                          <br />
                          <Radio value={"SEDAN"}>Sedan(A)</Radio>
                          <br />
                          <Radio value={"HATCHBACK"}>Hatchback(A)</Radio>
                          <br />
                          <Radio value={"JEEP"}>Jeep(B)</Radio>
                          <br />
                          <Radio value={"SUV"}>Suv(B)</Radio>
                          <br />
                          <Radio value={"MINIBUS"}>Minibus(C)</Radio>
                          <br />
                          <Radio value={"VAN"}>Van(C)</Radio>
                          <br />
                        </Radio.Group>
                      </Form.Item>
                    </Col>
                    <Col offset={2}>
                      <Form.Item
                        className="form-group"
                        name="licensePlate"
                        label="License plate"
                        rules={[
                          {
                            required: true,
                            message: "Please enter license",
                          },
                        ]}
                      >
                        <Input placeholder="" style={{ width: 150 }} />
                      </Form.Item>
                      <Form.Item
                        name="employeeId"
                        label="Responsible"
                        rules={[
                          {
                            required: true,
                            message: "Please choose",
                          },
                        ]}
                      >
                        <Select
                          showSearch
                          placeholder="Select a person"
                          //optionFilterProp="children"
                          //onChange={onChange}
                          //onSearch={onSearch}
                          // filterOption={(input, option) =>
                          //   option.children
                          //     .toLowerCase()
                          //     .indexOf(input.toLowerCase()) >= 0
                          // }
                        >
                          {employeeSelector && employeeSelector.data
                            ? employeeSelector.data.map((e) => (
                                <Option value={e.id}>
                                  {e.firstName + " " + e.lastName}
                                </Option>
                              ))
                            : ""}
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row justify="end">
                    <Button
                      onClick={() => onKeyChange('vehicles')}
                      type="primary"
                      style={{ margin: 5 }}
                    >
                      Cancel
                    </Button>
                    <Button
                      htmlType="submit"
                      type="primary"
                      style={{ margin: 5 }}
                    >
                      Save
                    </Button>
                  </Row>
                </Form>
              </TabPane>


              <TabPane tab="Base price" key="base">
                <Form onFinish={submitBasePrice}>
                  <Row>
                    <Col offset={2}>
                      <Form.Item
                        className="form-group"
                        name="newBasePrice"
                        label="Base Price"
                        initialValue={basePrice}
                        rules={[
                          {
                            required: true,
                            message: "Please enter base price",
                          },
                        ]}
                      >
                        {/* <Input placeholder="" style={{ width: 150 }} /> */}
                        <InputNumber style={{ width: 150 }}></InputNumber>
                        {/* <InputNumber
                          defaultValue={1000}
                          formatter={value => `L ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                          parser={value => value.replace(/\$\s?|(,*)/g, '')}
                        /> */}
                      </Form.Item>
                      
                    </Col>
                  </Row>
                  <Row justify="end">
                    <Button
                      onClick={() => onKeyChange('vehicles')}
                      type="primary"
                      style={{ margin: 5 }}
                    >
                      Cancel
                    </Button>
                    <Button
                      htmlType="submit"
                      type="primary"
                      style={{ margin: 5 }}
                    >
                      Save
                    </Button>
                  </Row>
                </Form>
              </TabPane>

              
            </Tabs>
          </div>
        </Col>
      </Row>
      <Modal
        title={"Check out"}
        okText={"Check out"}
        cancelText={"Cancel"}
        visible={confirmModalVisible}
        onOk={() => doExitOperation()}
        onCancel={() => hideExitModal()}
      >
        {/* {`This vehicle will be remove from the parking-lot (${rowDescription}) `}
        {licensePlate: record.licensePlate, price: response.data} */}
        <div>{`This vehicle will be remove from the parking-lot `}</div>
        <div>{`Please collect the fee.. `}</div>
        <div>
          License Plate: {rowDescription ? rowDescription.licensePlate : ""}
        </div>
        <div>Price: {rowDescription ? rowDescription.price : ""}</div>

        <div></div>
      </Modal>
    </div>
  );
};

// function mapStateToProps(state) {
//     return {
//         parkingLot: state.parkingLot,
//     }
// }
// function mapDispatchToProps(dispatch) {
//     return {
//     //   saveVehicle: (vehicle) => dispatch(saveVehicle(vehicle)),
//       fetchParkingLot: () => dispatch(fetchParkingLot()),
//     };
//   };
// const mapStateToProps = (state) => {
//     return {
//       parkingLot: state.parkingLot,
//     };
//   };

export default Dashboard;
// export default connect(mapStateToProps)(Dashboard);
