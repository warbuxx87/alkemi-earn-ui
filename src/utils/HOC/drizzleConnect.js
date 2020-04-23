import React from "react";
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

export default function drizzleConnect(Component, ...args) {
  var ConnectedWrappedComponent = connect(...args)(Component)

  const DrizzledComponent = (props, context) => {
    const drizzle = context.drizzle
    return (
      <ConnectedWrappedComponent {...props} store={context.drizzleStore} drizzle={drizzle} />
    )  
  }
 
  DrizzledComponent.contextTypes = {
    drizzleStore: PropTypes.object,
    drizzle: PropTypes.object,
  }

  return DrizzledComponent
}