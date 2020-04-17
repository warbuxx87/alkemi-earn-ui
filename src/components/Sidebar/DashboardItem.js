import React from "react";
import PropTypes from "prop-types";
import SvgIcon from "@material-ui/core/SvgIcon";
import ListItem1 from "../UI/ListItem/1";

function DashboardIcon(props) {
  return (
    <SvgIcon {...props}>
      <path
        className="a"
        d="M9.27,352H.82a.82.82,0,0,0-.82.82v4.922a.82.82,0,0,0,.82.82H9.27a.82.82,0,0,0,.82-.82V352.82A.82.82,0,0,0,9.27,352Zm-.82,4.922H1.641v-3.281H8.449Z"
        transform="translate(0 -337.562)"
      />
      <path
        className="a"
        d="M9.27,0H.82A.82.82,0,0,0,0,.82V12.8a.82.82,0,0,0,.82.82H9.27a.82.82,0,0,0,.82-.82V.82A.82.82,0,0,0,9.27,0Zm-.82,11.977H1.641V1.641H8.449Z"
      />
      <path
        className="a"
        d="M275.27,0H266.82a.82.82,0,0,0-.82.82V5.742a.82.82,0,0,0,.82.82h8.449a.82.82,0,0,0,.82-.82V.82A.82.82,0,0,0,275.27,0Zm-.82,4.922h-6.809V1.641h6.809Z"
        transform="translate(-255.09)"
      />
      <path
        className="a"
        d="M275.27,180H266.82a.82.82,0,0,0-.82.82V192.8a.82.82,0,0,0,.82.82h8.449a.82.82,0,0,0,.82-.82V180.82A.82.82,0,0,0,275.27,180Zm-.82,11.977h-6.809V181.641h6.809Z"
        transform="translate(-255.09 -172.617)"
      />
    </SvgIcon>
  );
}

const SidebarDashboardItem = ({ onClick, selected }) => (
  <ListItem1
    icon={<DashboardIcon />}
    text="Dashboard"
    onClick={onClick}
    selected={selected}
  />
);

SidebarDashboardItem.propTypes = {
  selected: PropTypes.bool,
  onClick: PropTypes.func.isRequired
};

export default SidebarDashboardItem;
