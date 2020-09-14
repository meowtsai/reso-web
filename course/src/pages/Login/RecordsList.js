import React, { useEffect, useState } from "react";
import { useTable } from "react-table";
import axios from "axios";
import Spinner from "./Spinner";

const RecordsList = () => {
  let [loading, setLoading] = useState(true);
  let [data, setData] = useState([]);

  useEffect(() => {
    //get data
    axios
      .get("/api/course/allRegisterData")
      .then((records) => {
        console.log(records.data);
        setData(records.data);
        setLoading(false);
      })
      .catch((err) => console.log("error fetch", err.message));
  }, []);

  return <>{loading ? <Spinner /> : <Table records={data} />}</>;
};

export default RecordsList;

const Table = ({ records }) => {
  //console.log("table data", data);
  //return <div> hi </div>;
  const data = React.useMemo(() => records, []);

  const columns = React.useMemo(
    () => [
      {
        Header: "Status",
        accessor: "status", // accessor is the "key" in the data
      },
      {
        Header: "Id",
        accessor: "id",
      },
      {
        Header: "Course Id",
        accessor: "courseId", // accessor is the "key" in the data
      },
      {
        Header: "Register Date",
        accessor: "registerDate",
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
  return (
    <table {...getTableProps()} style={{ border: "solid 1px blue" }}>
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
                      padding: "10px",
                      border: "solid 1px gray",
                      background: "papayawhip",
                    }}
                  >
                    {cell.render("Cell")}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
