import React from "react";

const OnBoardContext = React.createContext();

export const OnBoardProvider = OnBoardContext.Provider

export default function withOnboard(Component) {
  return (props) => (
    <OnBoardContext.Consumer>
      {onboard => <Component onboard={onboard} {...props} />}
    </OnBoardContext.Consumer>
  )
}