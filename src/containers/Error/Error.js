import React, { useState, useEffect } from "react";
import { Tabs, Tab } from "react-bootstrap";
import MaterialTable from "material-table";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import { DSE_URL } from "../../utils/Constants";
import moment from "moment";
import Checkbox from "@material-ui/core/Checkbox";
import { forwardRef } from "react";
import History from "../../routes/History";
import Pagination from "react-js-pagination";
import axios from "axios";
import _ from "lodash";
import "./index.scss";
import { Link } from "react-router-dom";
import Auth from "../../utils/Auth";
import { toast } from "react-toastify";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};
export default function Error() {
  var tableData = [
    { name: "Mehmet", surname: "Baran", birthYear: 1987, birthCity: 63 },
    { name: "Zerya Betül", surname: "Baran", birthYear: 2017, birthCity: 34 },
  ];
  const [purchaseOrder, setPO] = useState([]);

  const [activePage, setActivePage] = useState(1);
  const [totalCount, setTotalCount] = useState(10);
  // console.log(biddingList)
  useEffect(() => {
    getData(activePage);
  }, []);

  function getData(page) {
    var token = localStorage.getItem("token");
    var VendorID = localStorage.getItem("VendorID");
    var url = window.location.href;
    var token = localStorage.getItem("token");
    var sortParam = "ds_diamond_sku";
    // console.log("token 68", token);
    // var api = `/latestPurchaseOrder?vendor_id=${VendorID}`;
    var [hashs, params] = url.split("#")[1].split("?");

    var o = new URLSearchParams(params);
    var paramsObj = {};
    for (var [key, value] of o.entries()) {
      paramsObj[key] = value;
    }
    if (paramsObj.type == "individual") {
      sortParam = "ds_diamond_sku";
    } else {
      sortParam = "ds_parcel_sku";
    }
    // console.log("sortParam ", sortParam);
    if (paramsObj.type && paramsObj.vendor_id && paramsObj.file_id) {
      axios
        .get(
          DSE_URL +
            `/errorDiamonds?page=${page}&limit=5&vendor_id= ${VendorID}&sort=${sortParam};asc&type=${paramsObj.type}&file_id=${paramsObj.file_id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then(function (response) {
          var data = response.data.data.rows;
          // console.log("respone", data);
          let nObj = data.map((ele) => {
            // ele.po_date = moment(ele.po_date).format('YYYY-MM-DD');
            // ele.delivery_date = moment(ele.delivery_date).format('YYYY-MM-DD');
            return ele;
          });

          // console.log("nObj", nObj);
          setPO(nObj);
          setTotalCount(response.data.data.totalCount);
        })
        .catch(function (error) {
          // console.log(error);
          setPO([]);
          if (error.response.status == 401) {
            toast.error("You Have Been Logged Out !", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            Auth.signOut();
            History.push("/login");
          }
        });
    }
  }
  function handlePageChange(page) {
    getData(page);
    setActivePage(page);
  }
  //   var totalOffer = purchaseOrder.reduce((sum, record) => {
  //     return sum + parseFloat(record.Dse_Bid_Price)
  //   }, 0);
  function zeroPad(num, numZeros) {
    var n = Math.abs(num);
    var zeros = Math.max(0, numZeros - Math.floor(n).toString().length);
    var zeroString = Math.pow(10, zeros).toString().substr(1);
    if (num < 0) {
      zeroString = "-" + zeroString;
    }

    return zeroString + n;
  }

  // console.log("data ", purchaseOrder);

  return (
    <div className="purchase-order-lists">
      <div style={{ maxWidth: "100%", height: "auto", paddingBottom: "70px" }}>
        <MaterialTable
          title="Errors"
          icons={tableIcons}
          columns={[
            {
              title: "SKU",
              render: (rowData) => {
                if (rowData.ds_parcel_sku) {
                  return rowData.ds_parcel_sku;
                } else if (rowData.ds_diamond_sku) {
                  return rowData.ds_diamond_sku;
                }
                return;
              },
              cellStyle: {
                width: "5%",
                border: "1px solid #e0e0e0",
              },
            },
            {
              title: "Missing Field Errors",
              field: "",
              cellStyle: { width: "15%", border: "1px solid #e0e0e0" },
              render: (rowData) => {
                let str = rowData.message;
                var validation = str.substring(
                  str.indexOf("Required Field Error : "),
                  str.indexOf("Required type Error : ")
                );
                let validationStr = validation.replace(
                  "Required Field Error : ",
                  ""
                );
                let propArr = validationStr.split("|");
                var validationArr = [];
                validationArr = propArr.map((el) => {
                  var key = el.split(":")[0];
                  var val = el.split(":")[1];
                  return { [key && key.trim()]: val && val.trim() };
                });
                validationArr = validationArr.filter(
                  (value) =>
                    Object.keys(value)[0] !== "" &&
                    Object.keys(value)[0] !== "None"
                );
                return validationArr.map((el, i) => {
                  return (
                    <div key={i}>
                      {Object.keys(el)[0].replace(" is compulsory", "")}
                    </div>
                  );
                });
              },
            },
            {
              title: "Data Type Errors",
              field: "",
              cellStyle: { width: "20%", border: "1px solid #e0e0e0" },
              render: (rowData) => {
                let str = rowData.message;
                var validation = str.substring(
                  str.indexOf("Required type Error : "),
                  str.indexOf("Required validation Error : ")
                );
                let validationStr = validation.replace(
                  "Required type Error : ",
                  ""
                );
                let propArr = validationStr.split("|");
                var validationArr = [];
                validationArr = propArr.map((el) => {
                  var key = el.split(":")[0];
                  var val = el.split(":")[1];
                  return { [key && key.trim()]: val && val.trim() };
                });
                validationArr = validationArr.filter(
                  (value) =>
                    Object.keys(value)[0] !== "" &&
                    Object.keys(value)[0] !== "None"
                );
                return validationArr.map((el, i) => {
                  return (
                    <div key={i}>
                      {`${Object.keys(el)[0]} : ${el[Object.keys(el)[0]]}`}
                    </div>
                  );
                });
              },
            },
            {
              title: "Allowed Value Errors",
              cellStyle: { width: "40%", border: "1px solid #e0e0e0" },
              render: (rowData) => {
                let str = rowData.message;
                var validation = str.substring(
                  str.indexOf("Required validation Error : "),
                  str.indexOf("Other Errors: ")
                );
                let validationStr = validation.replace(
                  "Required validation Error : ",
                  ""
                );
                let propArr = validationStr.split("|");
                var validationArr = [];
                validationArr = propArr.map((el) => {
                  var key = el.split(":")[0];
                  var val = el.split(":")[1];
                  return { [key && key.trim()]: val && val.trim() };
                });
                validationArr = validationArr.filter(
                  (value) =>
                    Object.keys(value)[0] !== "" &&
                    Object.keys(value)[0] !== "None"
                );
                return validationArr.map((el, i) => {
                  return (
                    <div key={i}>
                      {`${Object.keys(el)[0]} : ${el[Object.keys(el)[0]]}`}
                    </div>
                  );
                });
              },
            },
            {
              title: "Other Errors",
              field: "message",
              cellStyle: { width: "20%", border: "1px solid #e0e0e0" },
              render: (rowData) => {
                let str = rowData.message;
                var validation = str.substring(str.indexOf("Other Errors:"));
                let validationStr = validation.replace("Other Errors: ", "");
                let propArr = validationStr.split("|");
                var validationArr = [];
                validationArr = propArr.map((el) => {
                  var key = el.split(":")[0];
                  var val = el.split(":")[1];
                  return { [key && key.trim()]: val && val.trim() };
                });
                validationArr = validationArr.filter(
                  (value) =>
                    Object.keys(value)[0] !== "" &&
                    Object.keys(value)[0] !== "None"
                );
                return validationArr.map((el, i) => {
                  return (
                    <div key={i}>
                      {`${Object.keys(el)[0]} : ${el[Object.keys(el)[0]]}`}
                    </div>
                  );
                });
              },
            },
            // { title: 'Due Date', field: 'delivery_date', cellStyle: { width: '20%' } },
            // { title: 'Vendor List', field: 'vendor_list', cellStyle: { width: '20%' } },
            // { title: 'Amount', field: 'amount', cellStyle: { width: '10%' } },
            // { title: 'Status', field: 'status', cellStyle: { width: '10%' } },
          ]}
          data={purchaseOrder}
          // showSelectAllCheckbox={true}
          options={{
            actionsColumnIndex: -1,
            paging: false,
            pageSize: 10,
            search: false,
            headerStyle: {
              backgroundColor: "#f3f2f2",
              color: "#000",
              fontSize: "12px",
              fontWeight: "600",
              border: "1px solid #e0e0e0",
            },
            cellStyle: {
              border: "1px solid #e0e0e0",
            },
            rowStyle: {
              fontSize: "12px",
              border: "1px solid #e0e0e0",
            },
          }}
          localization={{
            header: {
              actions: "Accept",
              // showSelectAllCheckbox: false
            },
            body: {
              emptyDataSourceMessage: "No Data",
              filterRow: {
                filterTooltip: "Filter",
              },
            },
          }}
        />

        <div className="pagination-wrapper">
          <Pagination
            activePage={activePage}
            itemsCountPerPage={5}
            totalItemsCount={totalCount}
            pageRangeDisplayed={5}
            onChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}
