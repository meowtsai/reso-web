import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { useTable } from "react-table";
import axios from "axios";
import Spinner from "./Spinner";
import moment from "moment";
import queryString from "query-string";
import { useLocation } from "react-router-dom";
const RecordsList = () => {
  const location = useLocation();
  let [loading, setLoading] = useState(true);
  let [wireReports, setWireReports] = useState(true);

  let [data, setData] = useState([]);

  useEffect(() => {
    const search_values = queryString.parse(location.search);

    //get data
    axios
      .get(`/api/course/allRegisterData?token=${search_values.token}`)
      .then((records) => {
        //console.log(records.data);
        //res.json({ registers, wires });
        const { registers, wires } = records.data;
        setWireReports(wires);
        setData(registers);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log("error fetch", err.message);
      });
  }, [location.search]);

  const updateStatus = (dataId) => {
    const confirmUpdate = window.confirm("確定要將這筆紀錄變更為已確認嗎?");
    if (confirmUpdate) {
      axios
        .post("/api/course/updateRegister", { id: dataId, status: 4 })
        .then((res) => {
          setData(
            data.map((d) => {
              if (d._id === res.data._id) {
                return res.data;
              } else {
                return d;
              }
            })
          );
        });
    }
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <DataTable
          records={data}
          onChangeStatus={updateStatus}
          wireReports={wireReports}
        />
      )}
    </>
  );
};

export default RecordsList;

const DataTable = ({ records, onChangeStatus, wireReports }) => {
  //console.log("table records", records);
  //return <div> hi </div>;
  const statusConfig = { 1: "初始", 2: "已回報", 4: "已確認", 9: "已取消" };
  const data = React.useMemo(
    () =>
      records.map((record) => ({
        ...record,
        registerDate: moment(record.registerDate).format("YYYY-MM-DD"),
        date: moment(record.date).format("YYYY-MM-DD HH:mm:ss"),
        statusText: statusConfig[record.status],
      })),
    [records, statusConfig]
  );

  const columns = React.useMemo(
    () => [
      {
        Header: "Register Date",
        accessor: "registerDate",
      },
      {
        Header: "時段",
        accessor: "timeSlot",
      },
      {
        Header: "報名者",
        accessor: "name",
      },
      {
        Header: "Discord 帳號",
        accessor: "discordAccount",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "手機",
        accessor: "phone",
      },
      {
        Header: "狀態",
        accessor: "statusText", // accessor is the "key" in the data
      },
      {
        Header: "預約代碼",
        accessor: "checkId",
      },
      {
        Header: "課程類別",
        accessor: "courseId",
      },

      {
        Header: "建立時間",
        accessor: "date",
      },
    ],
    []
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  const renderReportData = (rowId) => {
    const report = wireReports.filter((rw) => rw.registerId === rowId);
    if (report.length > 0) {
      return (
        <div>
          <b>帳戶名稱</b>:{report[0].wireName} <br />
          <b>銀行名稱</b>:{report[0].bankName} <br />
          <b>後五碼</b>:{report[0].bankCode} <br />
          <b>回報時間</b>:{moment(report[0].date).format("YYYY-MM-DD HH:mm:ss")}{" "}
          <br />
        </div>
      );
    } else {
      return null;
    }
  };
  return (
    <Table responsive {...getTableProps()} style={{ border: "solid 1px blue" }}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps()}
                style={{
                  borderBottom: "solid 3px red",
                  background: "aliceblue",
                  color: "black",
                  fontWeight: "bold",
                }}
              >
                {column.render("Header")}
              </th>
            ))}
            <th
              style={{
                borderBottom: "solid 3px red",
                background: "aliceblue",
                color: "black",
                fontWeight: "bold",
              }}
            >
              回報資料
            </th>
            <th
              style={{
                borderBottom: "solid 3px red",
                background: "aliceblue",
                color: "black",
                fontWeight: "bold",
              }}
            >
              Action
            </th>
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  <td
                    {...cell.getCellProps()}
                    style={{
                      padding: "9px",
                      border: "solid 1px gray",
                      background: "papayawhip",
                    }}
                  >
                    {cell.render("Cell")}
                  </td>
                );
              })}
              <td
                style={{
                  padding: "9px",
                  border: "solid 1px gray",
                  background: "papayawhip",
                }}
              >
                <span>
                  {renderReportData(row.original._id)} {}
                </span>
              </td>
              <td>
                {row.original.status === 2 && (
                  <Button
                    variant="info"
                    onClick={() => {
                      //console.log(row);
                      onChangeStatus(row.original._id);
                    }}
                  >
                    確認
                  </Button>
                )}{" "}
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};
