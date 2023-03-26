// const sayHelloManyTimes = (times) =>
//   new Array(times).fill(1).map((_, i) => `Hello ${i + 1}`);


// const div = document.createElement("div");


// div.innerHTML =sayHelloManyTimes(10).join("<br/>");
// document.body.append(div);

import React from "react";
import { createRoot } from "react-dom/client";
import BasicLayout from "./containers/BasicLayout";

const container = document.getElementById("root");
const root = createRoot(container);
//const HelloNode = <Hello />;
root.render(<BasicLayout />);