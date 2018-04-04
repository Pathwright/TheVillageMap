import React from "react"
import PropTypes from "prop-types"
import Dock from "react-dock"

const Drawer = ({ children, history, open }) => {
  return (
    <Dock
      isVisible={open}
      onVisibleChange={isVisible => !isVisible && history.push("/")}
      position="right">
      {children}
    </Dock>
  )
}

export default Drawer
