
import { useSelector } from "react-redux";
import "../../CustomParkingLot.css";

//import { PlusSquareOutlined } from "@ant-design/icons";
const ParkingLot = (props) =>{
  const parkingLotSelector = useSelector((state) => state.parkingLot);

  //Parking lines
  function renderLines() {
    let resultsRender = [];
    let lines = parkingLotSelector.lines;

    for (var i = 0; i < lines.length; ) {
      resultsRender.push(
        <>
          <td className="path" key={"path" + i}>
            <div className="path-div"></div>
          </td>
          <td className="section" key={"section" + i}>
            <table className="lineContainer">
              <tbody>
                <tr key="lineContainer">
                  <td className="line" key={"line" + i}>
                    <div className="line-label">
                      <p>{"LINE-" + (i + 1)}</p>
                    </div>
                    <div
                      className={"line-part vehicle-unit-" + lines[i].length}
                    >
                      {lines[i].vehicles ? (
                        renderVehicles(lines[i].vehicles)
                      ) : (
                        <></>
                      )}
                    </div>
                  </td>

                  {++i < lines.length - 1 ? (
                    <td className="line second-line" key={"line" + i}>
                      <div className="line-label">
                        <p>{"LINE-" + (i + 1)}</p>
                      </div>
                      <div
                        className={"line-part vehicle-unit-" + lines[i].length}
                      >
                        {lines[i].vehicles ? (
                          renderVehicles(lines[i].vehicles)
                        ) : (
                          <></>
                        )}
                      </div>
                    </td>
                  ) : (
                    <></>
                  )}
                </tr>
              </tbody>
            </table>
          </td>
        </>
      );
      i++;
    }
    resultsRender.push(
      <td className="path" key={"path-lat"}>
        <div className="path-div"></div>
      </td>
    );
    return resultsRender;
  }

  //Vehicles in the line
  function renderVehicles(vehList) {
    let row = [];
    let lastPosition = 0;
    let unit = 50;

    for (var i = 0; i < vehList.length; i++) {
      if (vehList[i].positionStart === lastPosition)
        row.push(
          <div
            className={"CATEGORY" + vehList[i].categoryName}
            key={"vehicle" + lastPosition}
          >
            <p className="license-plate">{vehList[i].licensePlate}</p>
          </div>
        );
      else {
        row.push(
          <>
            <div
              className="typeEmptySpace"
              key={"vehicle" + lastPosition}
              style={{
                height: (vehList[i].positionStart - lastPosition) * unit,
              }}
            ></div>
            <div
              className={"CATEGORY" + vehList[i].categoryName}
              key={"vehicle" + vehList[i].positionStart}
            >
              <p className="license-plate">{vehList[i].licensePlate}</p>
            </div>
          </>
        );
      }
      lastPosition = vehList[i].positionEnd;
    }
    return row;
  }

  return (
      <>
    <h4>Parking Lot</h4>
    <div className="car-park">
      <div className="exit exit--front fuselage"> </div>
      <table className="sectionContainer">
        <tbody>
          <tr>
            {parkingLotSelector.status === "FETCHED" ? renderLines() : ""}
          </tr>
        </tbody>
      </table>
      {/* <div className="exit exit--front fuselage"> </div> */}
    </div>
    </>
  );
}

export default ParkingLot;