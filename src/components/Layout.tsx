import React from "react";
import {
  createStyles,
  makeStyles,
  CssBaseline
} from "@material-ui/core";
import { Sidemenu } from "components";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: "100%",
      height: "100vh",
      display: "flex",
      overflowX: "hidden"
    }
  })
)

export const Layout: React.FC = ({ children }) => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <CssBaseline />
        <Sidemenu />
        {children}
      </div>
    </>
  )

}