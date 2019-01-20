import React, { Fragment } from "react";

const rrd = require("react-router-dom");

rrd.BrowserRouter = ({ children }) => <Fragment>{children}</Fragment>;

module.exports = rrd;
