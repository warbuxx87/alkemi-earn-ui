import React from "react";
import onboard from "./onboard"

const withOnboard = () => (Component) => {
  return (props) => (<Component onboard={onboard} {...props} />)
}

export default withOnboard