import React from "react"
import MotionDrawer from "react-motion-drawer"

const Drawer = props => {
  return (
    <div>
      <MotionDrawer
        {...props}
        drawerStyle={{ backgroundColor: "white" }}
        right
      />
    </div>
  )
}

export default Drawer
