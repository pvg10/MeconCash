import React, { useState, useEffect } from "react";
import { DropzoneDialog } from "material-ui-dropzone";
import axios from "axios";
import moment from "moment";
// import { DataGrid } from "@material-ui/data-grid";
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
import RefreshIcon from "@material-ui/icons/Refresh";
import { DSE_URL } from "../../utils/Constants";
import { forwardRef } from "react";
import "./index.scss";
// import { render } from "@testing-library/react";
import Pagination from "react-js-pagination";
import { toast } from "react-toastify";
// import ReactTooltip from "react-tooltip";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Auth from "../../utils/Auth";
import History from "../../routes/History";

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
  // Refresh: forwardRef((props, ref) => <RefreshIcon {...props} ref={ref} />)
};
export default function UploadList() {
  // getModalStyle is not a pure function, we roll the style only on the first render
  // const apiRef = useApiRef();
  const user = useSelector((state) => state.User.user);
  // console.log("user company", user.company);

  const [tableData, setData] = React.useState([]);
  const [open, setOpen] = useState(false);
  const [isIndividual, setIndividual] = useState(true);
  const [activePage, setActivePage] = useState(1);
  const [totalCount, setTotalCount] = useState(10);
  // const tableRef = React.createRef();
  const [title, setTitle] = useState("Individual Diamonds");

  // const handleOpen = (e, val) => {
  //   // console.log("val", val);
  //   setTitle(e.target.name);
  //   setIndividual(val);
  //   setOpen(true);
  // };

  useEffect(() => {
    var token = localStorage.getItem("token");
    // console.log(token, "token>>>>>>>>>>>>>>100");
    axios
      .get(DSE_URL + `/admin/vendorUploads?limit=50`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(function (response) {
        // console.log(response, "resss");
        // console.log("list", response.data.data.rows);
        var data = response.data.data.rows;
        let res = data.map(({ FileId, ...rest }) => ({ id: FileId, ...rest }));
        // console.log(res, "vpo");
        res.forEach((o) => {
          o.Time = moment(o.date_uploaded).format("YYYY-MM-DD");
          o.uploadTime = moment(o.date_uploaded).format("HH:mm A");
        });
        setTotalCount(response.data.data.totalCount);
        setData(res);
      })
      .catch(function (error) {
        // console.log(error.response.status);
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
    // var VendorID = localStorage.getItem("VendorID");
    var token = localStorage.getItem("token");
    // console.log(token, "token>>>>>>>>>>>>>>123");
    // console.log(VendorID);
    axios
      .get(DSE_URL + `/admin/vendorUploads?page=${page}&limit=50`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(function (response) {
        // console.log("list", response.data.data.rows);
        var data = response.data.data.rows;
        let res = data.map(({ FileId, ...rest }) => ({ id: FileId, ...rest }));
        // console.log(res, "vpo");
        res.forEach((o) => {
          o.Time = moment(o.date_uploaded).format("YYYY-MM-DD");
          o.uploadTime = moment(o.date_uploaded).format("HH:mm A");
        });
        setTotalCount(response.data.data.totalCount);
        setData(res);
        setActivePage(page);
      })
      .catch(function (error) {
        console.log(error.response.status);
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
  function getData() {
    // var VendorID = localStorage.getItem("VendorID");
    var token = localStorage.getItem("token");
    // console.log(token, "token>>>>>>>>>>>>>>148");
    axios
      .get(DSE_URL + "/admin/vendorUploads?page=1&limit=50", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(function (response) {
        // console.log("list", response.data.data.rows);
        var data = response.data.data.rows;
        let res = data.map(({ FileId, ...rest }) => ({ id: FileId, ...rest }));
        // console.log(res, "getData");
        res.forEach((o) => {
          o.Time = moment(o.date_uploaded).format("YYYY-MM-DD");
          o.uploadTime = moment(o.date_uploaded).format("HH:mm A");
        });
        setData(res);
      })
      .catch(function (error) {
        // console.log(error.response.status);
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
  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = (files) => {
    // console.log(files[0]);
    var file = files[0];
    var fileN = files[0].name.split(".");
    var vendorID = localStorage.getItem("VendorID");
    var token = localStorage.getItem("token");
    // console.log("fileN", fileN);
    var fN = moment().format("YYYY-MM-DD-HH-mm-ss");
    if (isIndividual) {
      fN = vendorID + "_" + fN + "_Individual." + fileN[1].toString();
    } else {
      fN = vendorID + "_" + fN + "_Parcel." + fileN[1].toString();
    }

    // console.log("fileNs", fN);
    axios
      .post(
        DSE_URL + "/createPreAssignUrl",
        {
          file_name: fN,
          file_original_name: file.name,
          company: user.company,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(function (response) {
        // console.log(response.data);

        if (response.data.urls) {
          // console.log("succesfully logged in test");
          axios
            .put(response.data.urls, files[0])
            .then(function (response) {
              // alert('File Uploaded');
              toast("File Uploaded !", {
                position: "top-right",
                autoClose: false,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
              var token = localStorage.getItem("token");
              console.log(token, "token>>>>>>>>>>>>>>206");
              axios
                .get(
                  DSE_URL + `/admin/vendorUploads?page=${activePage}&limit=50`,
                  { headers: { Authorization: `Bearer ${token}` } }
                )
                .then(function (response) {
                  // console.log("list");
                  let res = response.data.data.rows.map(
                    ({ FileId, ...rest }) => ({ id: FileId, ...rest })
                  );
                  res.forEach((o) => {
                    o.Time = moment(o.date_uploaded).format("YYYY-MM-DD");
                  });
                  // console.log(res);
                  setData(res);
                  setTotalCount(response.data.data.totalCount);
                });
              setOpen(false);
            })
            .catch(function (error) {
              // console.log(error.response.status);
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

          // localStorage.setItem('token', response.data.token);
          // History.push("/fileUploads/upload-lists");
        }
      })
      .catch(function (error) {
        console.log(error.response.status);
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

    // setOpen(
    //   // ...state,
    //   false
    // );
  };
  // console.log(tableData);
  return (
    <>
      <div className="ul_section">
        {/* <div className="upload-list-title text-center">
          <h4>Upload And Manage Diamond Lists For Sale or offers</h4>
        </div> */}
        <div className="row">
          <div className="col-sm-4 ">
            {/* <strong>Diamond List Management</strong> */}
          </div>
          <div className="col-sm-8 upload__button__wrapper">
            <a
              className="download__template--btn btn"
              href="https://dse-sample-file.s3.ap-south-1.amazonaws.com/Templates.zip"
            >
              Download Template
            </a>
          </div>
          <DropzoneDialog
            open={open}
            onSave={handleSave}
            acceptedFiles={[
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
              ".csv, text/csv, application/csv, text/x-csv, application/x-csv, text/comma-separated-values, text/x-comma-separated-values",
            ]}
            showPreviews={true}
            maxFileSize={5000000}
            onClose={handleClose}
            cancelButtonText={"Cancel"}
            submitButtonText={"Submit"}
            showFileNamesInPreview={true}
            dialogTitle={`Upload ${title}`}
            dropzoneText={"Upload (.csv Or .xlsx files)"}
            filesLimit={1}
          />
        </div>
      </div>

      {/* <div style={{ height: 400, width: '100%' }}>
        <DataGrid rows={tableData} columns={columns} pageSize={1}   showColumnRightBorder={false}/>
      </div> */}

      <div style={{ maxWidth: "100%", height: "auto", paddingBottom: "100px" }}>
        <MaterialTable
          className="upload-table"
          icons={tableIcons}
          title="Files Uploaded"
          columns={[
            {
              title: "Date",
              field: "Time",
              cellStyle: {
                width: "10%",
              },
            },
            {
              title: "Time",
              field: "uploadTime",
              cellStyle: {
                width: "10%",
              },
            },
            { title: "Company", field: "company",
            cellStyle: {
              width: "15%",
            },
          
             },
            {
              title: "File",
              cellStyle: {
                width: "30%",
                color: "#337ab7",
              },
              render: (rowData) => {
                return (
                  <span
                    className="file__link"
                    onClick={() => {
                      axios
                        .get(`${DSE_URL}/getPreAssignUrl?url=${rowData.url}`)
                        .then(function (response) {
                          // console.log('response', response.data.urls);
                          window.location.href = response.data.urls;
                        })
                        .catch(function (error) {
                          toast.error("Something Went Wrong !", {
                            position: "top-right",
                            autoClose: 3000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                          });
                        });
                    }}
                  >
                    {rowData.file_original_name}
                  </span>
                );
              },
            },

            { title: "Type", field: "type" },
            { title: "Status", field: "status" },
            { title: "Total", field: "total_records" },
            {
              title: "Processed",
              field: "inserted_records",
            },
            {
              title: "Error",
              field: "error_records",
              render: (rowData) => {
                var file;
                if (rowData.file_name.includes("Individual")) {
                  file = "individual";
                } else if (rowData.file_name.includes("Parcel")) {
                  file = "parcel";
                }
                if (rowData.error_records != 0) {
                  return (
                    <Link
                      to={`/fileUploads/errors?vendor_id=${rowData.vendor_id}&file_id=${rowData.file_Id}&type=${file}`}
                    >
                      {rowData.error_records}
                    </Link>
                  );
                } else {
                  return rowData.error_records;
                }
              },
            },
          ]}
          data={tableData}
          options={{
            paging: false,
            search: false,
            headerStyle: {
              backgroundColor: "rgb(243, 242, 242)",
              // color: "#fff",
              fontWeight: 600,
            },
            rowStyle: {
              fontSize: 14,
            },
          }}
          actions={[
            {
              icon: () => <RefreshIcon />,
              tooltip: "Refresh Upload List",
              isFreeAction: true,
              onClick: () => getData(),
            },
          ]}
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
    </>
  );
}
