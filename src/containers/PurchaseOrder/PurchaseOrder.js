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
import ReactHtmlParser from "react-html-parser";
import { forwardRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Checkbox from "@material-ui/core/Checkbox";
// import moment from "moment";
import History from "../../routes/History";
import Pagination from "react-js-pagination";
import { Link } from "react-router-dom";
import axios from "axios";
import _ from "lodash";
import "./index.scss";
import Auth from "../../utils/Auth";
import { toast } from "react-toastify";
// import TermsAndCondModal from "../RequestAccess/TermsAndCondModal";
// import ExpiryCountdown from "../ListBidding/ExpiryCountdown";
// import Countdown, { calcTimeDelta, formatTimeDelta } from "react-countdown";

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
export default function PurchaseOrder() {
  var tableData = [
    { name: "Mehmet", surname: "Baran", birthYear: 1987, birthCity: 63 },
    { name: "Zerya Betül", surname: "Baran", birthYear: 2017, birthCity: 34 },
  ];
  const [purchaseOrder, setPO] = useState([]);
  const [allData, setAllData] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [totalCount, setTotalCount] = useState(10);
  const [showBankDetails, showBankFlag] = useState(true);
  const [agreement_accepted, setAgreement] = useState(false);
  const [delivery_terms_accepted, setDeliveryTerms] = useState(false);
  const [aggModal, toggleAggModal] = useState(false);
  // const user = useSelector((state) => state.User.user);
  const [timer, setTimer] = useState("");
  const [text, setText] = useState("");
  const [complete, setComplete] = useState(false);
  // console.log("user po", user);
  useEffect(() => {
    var url = window.location.href;
    var VendorID = localStorage.getItem("VendorID");
    var token = localStorage.getItem("token");
    console.log("token 68", token);
    var api = `/latestPurchaseOrder?vendor_id=${VendorID}`;
    var [hashs, params] = url.split("#")[1].split("?");
    toast.dismiss();
    var o = new URLSearchParams(params);
    var paramsObj = {};
    for (var [key, value] of o.entries()) {
      paramsObj[key] = value;
    }
    console.log("params obj", paramsObj);
    if (paramsObj.po_id && paramsObj.vendor_id) {
      console.log("in params");
      api = `/admin/getPurchaseOrder?vendor_id=${paramsObj.vendor_id}&po_id=${paramsObj.po_id}`;
    }
    axios
      .get(DSE_URL + api, { headers: { Authorization: `Bearer ${token}` } })
      .then(function (response) {
        var data = response.data.data;
        console.log("respone", data.bid_accepted_at, data.expiry_window);
        // if (data.bid_accepted_at && !_.isEmpty(data.bid_accepted_at)) {

        // console.log("time", time, d);
        // }

        if (data.bid_accepted_at && !_.isEmpty(data.bid_accepted_at)) {
          var d = new Date(data.bid_accepted_at);
          var time = d.setMinutes(d.getMinutes() + data.expiry_window);
          // var time = d.setMinutes(d.getMinutes() + 8000);

          setTimer(new Date(time));
        }
        var dt = !_.isEmpty(data.individual_items) ? data.individual_items : [];
        if (!_.isEmpty(data.parcel_items)) {
          dt = data.parcel_items;
        }
        console.log("items", dt);
        dt &&
          dt.map((x, id) => {
            console.log("id", id);
            x.desc = "Diamond";
            x.ds_sku = x.ds_diamond_sku ? x.ds_diamond_sku : x.ds_parcel_sku;
            x.quantity = 1;
            x.item = id + 1;
          });
        setPO(dt);
        setTotalCount(response.data.totalCount);
        setAllData(data);

        var agg = false,
          del = false;
        console.log(_.isEmpty(data.agreement_accepted), "aggrr");
        if (
          data.agreement_accepted != null ||
          data.agreement_accepted != undefined
        ) {
          console.log("in if");
          agg = data.agreement_accepted == 1 ? true : false;
        }
        console.log(agg, "agg");
        if (
          data.delivery_terms_accepted != null ||
          data.delivery_terms_accepted != undefined
        ) {
          del = data.delivery_terms_accepted == 1 ? true : false;
        }
        setAgreement(
          agg
          // !_.isEmpty(data.agreement_accepted) ? data.agreement_accepted : false
        );
        setDeliveryTerms(
          del
          // !_.isEmpty(data.delivery_terms_accepted)
          //   ? data.delivery_terms_accepted
          //   : false
        );

        showBankFlag(data.bank_details_flag);
      })
      .catch(function (error) {
        console.log(error);
        setAllData([]);
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

  function handleAggremntCheckbox(e) {
    // console.log('e', e.target.name)
    if (e.target.name == "delivery_terms_accepted") {
      setDeliveryTerms(e.target.checked);
    } else if (e.target.name == "agreement_accepted") {
      setAgreement(e.target.checked);
    }
  }
  function hideAggModal() {
    toggleAggModal(false);
  }

  // function createPurchaseOrder() {
  //   var token = localStorage.getItem("token");

  
  //   axios
  //     .get(
  //       DSE_URL +
  //         `/latestPurchaseOrder?vendor_id=${allData.vendor_id}&po_id=${allData.po_id}&type=po_confirm`,
  //       { headers: { Authorization: `Bearer ${token}` } }
  //     )
  //     .then(function (response) {
  //       console.log("response", response);
  //       History.push("/fileUploads/purchase-order-list");
  //     })
  //     .catch(function (error) {});
  // }
  function zeroPad(num, numZeros) {
    var n = Math.abs(num);
    var zeros = Math.max(0, numZeros - Math.floor(n).toString().length);
    var zeroString = Math.pow(10, zeros).toString().substr(1);
    if (num < 0) {
      zeroString = "-" + zeroString;
    }

    return zeroString + n;
  }

  // function getTimer(val) {
  //   setComplete(val);
  // }
  // function handleAggrementModal() {
  //   var statusNode = document.querySelector("#successText");
  //   statusNode.innerHTML = "";
  //   toggleAggModal(true);
  // }
  var totalOffer =
    purchaseOrder &&
    purchaseOrder.reduce((sum, record) => {
      return sum + parseFloat(record && record.total_price);
    }, 0);

  totalOffer = totalOffer.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
  

  return (
    <div className="purchase-order">
      {/* {!showBankDetails ? (
        <div className="bank-link">
          <p className="">
            <strong>Please Fill Bank Details</strong>
            <Link to="/fileUploads/edit-banking-details"> Click Here</Link>
          </p>{" "}
        </div>
      ) : (
        ""
      )} */}
      {!_.isEmpty(allData.IGI_location) ? (
        <div className="first-row">
          <div>
            <strong>GIA Client Number: </strong>
            {allData.GIA_client_number}
          </div>
          <div className="col2">
            {!_.isEmpty(allData.email) ? (
              <div>
                <div>
                  <strong>Email:</strong> {allData.email}
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="first-row">
        <div>
          {/* <strong>GIA Client Number: </strong>
          {allData.GIA_client_number} */}
        </div>
        <div className="col2">
          {!_.isEmpty(allData.email) ? (
            <div>
              <div>
                <strong>Mobile No.:</strong> {allData.contact_number}
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <br />
      <div className="po-address">
        <div className="po-address-to">
          <div>
            <strong>Bill To:</strong>
          </div>
          <address className="to">
            <div className="address-col">
              {/* {ReactHtmlParser(allData.to_address)} */}
              Diamond Standard Ltd.
              <br />
              Bermuda
              <br />
              {/* New York, NY 10036 */}
            </div>
          </address>
        </div>
        {!_.isEmpty(allData.IGI_location) ? (
          <div className="po-address-to">
            <div>
              <strong>Ship To: </strong>
            </div>
            <address className="to">
              <div className="address-col">
                {allData.IGI_address} <br />
                {allData.IGI_location} <br />
                {allData.IGI_email} <br />
                {allData.IGI_fax}
              </div>
            </address>
          </div>
        ) : (
          ""
        )}

        <div className="po-address-from">
          {!_.isEmpty(allData.delivery_address) ? (
            <>
              <div>
                <strong>Vendor:</strong>
              </div>
              <address className="from">
                <div>
                  {allData.first_name + " " + allData.last_name} <br />
                  {ReactHtmlParser(
                    allData.delivery_address.split("|").join("<br/>")
                  )}
                </div>
                {/* <div>Email:{allData.email}</div> */}
              </address>
            </>
          ) : (
            ""
          )}
        </div>
      </div>

      <div
        style={{
          maxWidth: "100%",
          height: "1000px",
          // overflow: "auto",
          paddingBottom: "60px",
        }}
      >
        {/* <div className="time-expire-row">
          {timer !== "" && (
            <>
              <ExpiryCountdown expiryTime={timer} setComplete={getTimer} />
            </>
          )}
        </div> */}
        {/* <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <strong>{text}</strong>&nbsp;
          {timer !== "" && (
            <>
              <ExpiryCountdown expiryTime={timer} setComplete={getTimer} />
              {/* <Countdown
                date={timer}
                onStart={(val) => setText("Expires In:")}
                onMount={(val) => {
                  if (val.completed == true) {
                    setComplete(!_.isEmpty(val) ? val.completed : true);
                    setTimer("");
                    setText("Offer Expired");
                  }
                }}
                onComplete={(val) => {
                  console.log("val", val);
                  setComplete(!_.isEmpty(val) ? val.completed : true);
                  setTimer("");
                  setText("Offer Expired");
                  return true;
                }}
              /> */}
        {/* </>
          )}
        </div> */}
        <MaterialTable
          title="Purchase Order"
          icons={tableIcons}
          columns={[
            {
              title: "Item #",
              field: "item",
              cellStyle: {
                width: "10%",
              },
            },
            {
              title: "DSE SKU #",
              field: "ds_sku",
              cellStyle: { width: "15%" },
              headerStyle: { width: "15%" },
            },

            {
              title: "Vendor SKU #",
              field: "vendor_sku",
              cellStyle: { width: "15%" },
            },
            {
              title: "Description",
              field: "desc",
              cellStyle: { width: "5%" },
            },
            {
              title: "Cert",
              field: "cert_number",
              // cellStyle: { width: "5%" }
            },

            {
              title: "Unit",
              field: "unit",
              cellStyle: { width: "10%" },
            },
            {
              title: "Quantity",
              field: "quantity",
              cellStyle: { width: "10%" },
            },

            {
              title: "Price/Carat $",
              // field: "ask_per_carat",
              render: (rowData) => {
                // return rowData.ask_per_carat
                var ask_per_carat = parseFloat(rowData.ask_per_carat);
                // console.log("ask", ask_per_carat);
                ask_per_carat = ask_per_carat
                  .toFixed(2)
                  .replace(/\d(?=(\d{3})+\.)/g, "$&,");
                return ask_per_carat; // 12,345.67
              },
              cellStyle: { width: "15%" },
            },
            {
              title: "Total Price $",
              // field: "total_price",
              render: (rowData) => {
                // return rowData.ask_per_carat
                var total_price = parseFloat(rowData.total_price);
                // console.log("ask", total_price);
                total_price = total_price
                  .toFixed(2)
                  .replace(/\d(?=(\d{3})+\.)/g, "$&,");
                return total_price; // 12,345.67
              },
              cellStyle: { width: "15%" },
            },
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

        {/* <br/> */}

        <div className="view-po-btn-container">
          <div className="btn-container purchaseOrder">
            <div
              className="note"
              style={{ marginTop: "10px", fontSize: "14px" }}
            >
              {/* <strong>* </strong>This is proforma PO. We will send you final PO
              shortly. */}
            </div>
            <div className="text-center">
              <div>
                <strong> Total Purchase Order</strong>
              </div>
              <div>${totalOffer}</div>
            </div>
          </div>
        </div>
        <div className="confirm-po" >
          {/* <div>aggreement</div> */}
          <div className="form-group agreement__form__element">
            {/* <div>
         
            </div> */}
            {/* <div>
             
            </div> */}
          </div>

          <div>
            
            {agreement_accepted && delivery_terms_accepted && (
              <div
                className="text-center"
                style={{ fontSize: "16px", marginTop: "10px" }}
              >
                <div>{`${allData.first_name} ${allData.last_name} `}</div>
                <div>
                  <strong>Vendor Signature</strong>
                </div>
              </div>
            )}
          </div>
        </div>
    
      </div>
      <div id="successText"></div>
    </div>
  );
}
