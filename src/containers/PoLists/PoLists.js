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
export default function PoLists() {
  var tableData = [
    { name: "Mehmet", surname: "Baran", birthYear: 1987, birthCity: 63 },
    { name: "Zerya Betül", surname: "Baran", birthYear: 2017, birthCity: 34 },
  ];
  const [purchaseOrder, setPO] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [totalCount, setTotalCount] = useState(10);
  // console.log(biddingList)
  useEffect(() => {
    var VendorID = localStorage.getItem("VendorID");
    var token = localStorage.getItem("token");

    // toast.dismiss();
    axios
      .get(
        DSE_URL +
          `/admin/vendorPurchaseOrders?page=${activePage}&limit=50&vendor_id= ${VendorID}&sort=po_id;desc`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(function (response) {
        var data = response.data.data.rows;
        // console.log("respone", data);
        var draftStatusFlag = false;
        draftStatusFlag = data.some((o) => o.status === "Draft");
        let nObj = data.map((ele) => {
          ele.po_date = moment(ele.po_date).format("YYYY-MM-DD");
          ele.delivery_date = moment(ele.delivery_date).format("YYYY-MM-DD");
          return ele;
        });
        // console.log("nObj", nObj);
        // if (draftStatusFlag) {
        //   toast(
        //     "Please confirm Draft Orders within 24 hours of our buying window.",
        //     {
        //       position: "top-center",
        //       autoClose: false,
        //       hideProgressBar: true,
        //       closeOnClick: true,
        //       pauseOnHover: false,
        //       draggable: true,
        //       progress: undefined,
        //     }
        //   );
        // }
        setPO(nObj);
        setTotalCount(response.data.data.totalCount);
      })
      .catch(function (error) {
        console.log(error);
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
  }, []);

  function handlePageChange(page) {
    var VendorID = localStorage.getItem("VendorID");
    var token = localStorage.getItem("token");
    axios
      .get(
        DSE_URL +
          `/admin/vendorPurchaseOrders?page=${page}&limit=50&vendor_id= ${VendorID}&sort=po_id;desc`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(function (response) {
        var data = response.data.data.rows;
        console.log("respone", data);
        let nObj = data.map((ele) => {
          ele.po_date = moment(ele.po_date).format("YYYY-MM-DD");
          ele.delivery_date = moment(ele.delivery_date).format("YYYY-MM-DD");
          return ele;
        });
        console.log("nObj", nObj);
        setPO(nObj);
        setTotalCount(response.data.data.totalCount);
        setActivePage(page);
      })
      .catch(function (error) {
        console.log(error);
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

  return (
    <div className="purchase-order-lists">
      <div style={{ maxWidth: "100%", height: "1200px" }}>
        <MaterialTable
          title="Purchase Orders"
          icons={tableIcons}
          columns={[
            {
              title: "PO #",
              field: "po_id",
              render: (rowData) => (
                <Link
                  to={`/fileUploads/purchase-order?vendor_id=${rowData.vendor_id}&po_id=${rowData.po_id}`}
                >{`P${zeroPad(rowData.po_id, 4)}`}</Link>
              ),
              cellStyle: {
                width: "10%",
              },
            },
            {
              title: "Company",
              field: 'company',
              cellStyle: {
                width: "10%",
              },
            },
            {
              title: "Order Date",
              field: "po_date",
              cellStyle: { width: "10%" },
            },
            {
              title: "Location",
              field: "IGI_location",
              cellStyle: { width: "10%" },
            },
            { title: "Type", field: "type", cellStyle: { width: "10%" } },
            {
              title: "Amount $",
              // field: "amount",
              render: (rowData) => {
                // return rowData.ask_per_carat
                var amount = parseFloat(rowData.amount);
                // console.log("ask", amount);
                amount = amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
                return amount; // 12,345.67
              },

              cellStyle: { width: "10%" },
            },
            { title: "Status", field: "status", cellStyle: { width: "10%" } },
          ]}
          data={purchaseOrder}
          // showSelectAllCheckbox={true}
          options={{
            actionsColumnIndex: -1,
            paging: false,
            pageSize: 10,
            search: false,
            maxBodyHeight:'90vh',
            headerStyle: {
              backgroundColor: "#f3f2f2",
              color: "#000",
              fontSize: "12px",
              fontWeight: "600",
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
            itemsCountPerPage={50}
            totalItemsCount={totalCount}
            pageRangeDisplayed={5}
            onChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}
