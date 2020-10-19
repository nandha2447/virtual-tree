import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {
  viewId,
  viewName,
  viewCategories,
  getTreeChildren,
  viewSubmissionDetails,
  viewObjective,
} from "./util";

ReactDOM.render(
  <React.StrictMode>
    <App
      data={[
        {
          id: viewId,
          label: viewName,
          children: getTreeChildren(viewCategories),
          content: {
            objective: viewObjective,
            submissionDetails: viewSubmissionDetails,
          },
        },
      ]}
    />
  </React.StrictMode>,
  document.getElementById("root")
);
