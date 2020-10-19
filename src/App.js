import React from "react";
import { TreeView, TreeItem } from "@material-ui/lab";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import AssignmentSharpIcon from "@material-ui/icons/AssignmentSharp";
import BatteryAlertSharpIcon from "@material-ui/icons/BatteryAlertSharp";
import Tooltip from "@material-ui/core/Tooltip";
import Content from "./components/Content";
import {
  categoryDefinition,
  weaknessDefinition,
  normalizedCategories,
  normalizedWeaknesses,
} from "./util";

const iconForType = (id) => {
  if (normalizedCategories[id]) {
    return (
      <Tooltip title={categoryDefinition}>
        <AssignmentSharpIcon />
      </Tooltip>
    );
  } else if (normalizedWeaknesses[id]) {
    return (
      <Tooltip title={weaknessDefinition}>
        <BatteryAlertSharpIcon />
      </Tooltip>
    );
  }
};

const App = ({ data }) => {
  const lookup = new Map(data.map((i) => [i.id, i]));
  const [expanded, setExpanded] = React.useState([]);
  const [content, setContent] = React.useState();

  const handleToggle = (event, nodeIds) => {
    setExpanded(nodeIds);
  };

  const onLabelClick = async (event, item) => {
    const isAlreadyExpanded = expanded.some((expItem) =>
      expItem.includes(item.id)
    );
    if (item.children.size && isAlreadyExpanded) {
      event.preventDefault();
    }
    setContent(item.content);
  };

  const getChildrenMarkup = (item, idString, isLeafParam) => {
    const childrenMarkup = [];
    const childrenValues = item.children?.entries();
    if (childrenValues) {
      for (const [, value] of childrenValues) {
        const nodeId = idString.concat(`::${value.id}`);
        const isLeafNode = !value.fetchChildren;
        const childJsx = getChildrenMarkup(value, nodeId, isLeafNode).length ? (
          getChildrenMarkup(value, nodeId, isLeafNode)
        ) : (
          <TreeItem nodeId="no-data-found" label={null} />
        );
        childrenMarkup.push(
          <TreeItem
            onLabelClick={(event) => onLabelClick(event, value)}
            key={value.id}
            nodeId={nodeId}
            label={
              <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  {iconForType(value.id)}
                </div>
                <h4 style={{ margin: "0px 0px 0px 10px" }}>{value.label}</h4>
              </div>
            }
            collapseIcon={<ExpandMoreIcon />}
            expandIcon={<ChevronRightIcon />}
          >
            {!isLeafParam ? childJsx : null}
          </TreeItem>
        );
      }
    }
    return childrenMarkup;
  };

  const recursiveRender = (lookup) => {
    const treeMarkup = [];
    lookup.forEach((item) => {
      treeMarkup.push(
        <TreeItem
          onLabelClick={(event) => onLabelClick(event, item)}
          collapseIcon={<ExpandMoreIcon />}
          expandIcon={<ChevronRightIcon />}
          key={item.id}
          nodeId={item.id}
          label={item.label}
        >
          {!!item.children && <>{getChildrenMarkup(item, item.id)}</>}
        </TreeItem>
      );
    });
    return treeMarkup;
  };

  return (
    <div
      style={{ display: "flex", justifyContent: "space-between", margin: 20 }}
    >
      <TreeView
        style={{ width: "700px" }}
        expanded={expanded}
        onNodeToggle={handleToggle}
      >
        {recursiveRender(lookup)}
      </TreeView>
      <div style={{ flex: 1, margin: "0px 20px" }}>
        <Content data={content} />
      </div>
    </div>
  );
};

export default App;
