import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import "./sidebar.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import Chart from "chart.js/auto";
import { Doughnut, Line } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsAdmin } from "../../actions/productAction";
import { getAllOrders } from "../../actions/orderAction";
import { getAllUsers } from "../../actions/userAction";
const Dashboard = () => {

  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const {orders}=useSelector((state)=>state.allOrders)
  const {user}=useSelector((state)=>state.user)
  const {users}=useSelector(state=>state.allUsers);

  console.log(products);

  let outOfStock = 0;
  products &&
    products.forEach((item) => {
      if (item.Stock === 0) {
        outOfStock += 1;
      }
    });
  useEffect(() => {
    dispatch(getAllProductsAdmin());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);

  const lineStae = {
    labels: ["initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgba(197,72,49)"],
        data: [0, 4000],
      },
    ],
  };
  const doughState = {
    labels: ["Out of Stock", "In Stock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock ],
      },
    ],
  };
  return (
    <div className="dashboard ">
      <Sidebar />
      <div className="dashboardContainer">
        <Typography component={"h1"}>Dashboard</Typography>
        <div className="dashboardSummary">
          <div>
            <p>
              Total Summary
              <br /> 2000
            </p>
          </div>
          <div className="dashboardSummBox2">
            <Link to="/admin/products">
              <p>Products</p>
              <p>{}</p>
            </Link>
            <Link to="/admin/orders">
              <p>Orders</p>
              <p>{orders && orders.length}</p>
            </Link>
            <Link to="/admin/users">
              <p>Users</p>
              <p>{users && users.length}</p>
            </Link>
          </div>
        </div>
        <div className="linechart">
          <Line data={lineStae} />
        </div>
        <div className="doughChart">
          <Doughnut data={doughState} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
