import React from 'react';
import {
  createStyles,
  makeStyles
} from "@material-ui/core";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      flexShrink: 1,
      flexBasis: "100%",
      zIndex: 0,
      position: "relative",
      overflowY: "auto",
      padding: theme.spacing(4),
      [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(2),
      }
    }
  })
)

interface props extends Partial<JSX.IntrinsicElements['div']> {
  className?: string
}
export const MainPanel = React.forwardRef<HTMLDivElement, props>(
  ({ className, children, ...rest }, ref) => {
    const classes = useStyles();
    return (
      <div className={classes.root} ref={ref} {...rest}>
        {children}
      </div>
    )
  }
)
