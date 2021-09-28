import React from "react";
import {
  makeStyles,
  createStyles,
  Paper,
  Typography,
  Divider,
  IconButton,
  MenuList,
  MenuItem,
  ListItemText
} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/HomeOutlined";
import { useSideBarContext } from "hooks";
import { SidemenuHeader } from "components";
import { useSwipeable } from "react-swipeable";

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      overflow: "auto",
      flex: "0 0 auto",
      zIndex: 1000,
      height: "100%",
      [theme.breakpoints.down('sm')]: {
        position: "absolute",
        height: "100%",
        maxWidth: expanded => expanded ? "350px" : "auto",
        transition: "left 0.5s",
        left: expanded => expanded ? "0px" : "-350px",
      },
    },
    swipe: {
      position: "absolute",
      height: "100%",
      width: 40,
      zIndex: 20
    }
  })
)

export const Sidemenu: React.FC = () => {
  const { expanded, setExpanded } = useSideBarContext();
  const classes = useStyles(expanded);

  const swipeHandler = useSwipeable({
    onSwipedRight: () => setExpanded(true)
  })

  const menuHandler = useSwipeable({
    onSwipedLeft: () => setExpanded(false),
    onSwipedRight: () => setExpanded(true),
  })

  return (
    <>
      {expanded && (<div {...swipeHandler} className={classes.swipe} />)}
      <Paper className={classes.container} {...menuHandler}>
        <SidemenuHeader
          expanded={expanded}
          onClose={() => setExpanded(false)}
          onOpen={() => setExpanded(true)}
        />
        <>
          <Divider />

          <MenuList dense>
            {expanded ? (
              <MenuItem>
                <ListItemText>Start Quiz</ListItemText>
              </MenuItem>
            ) : (
              <MenuItem>
                <IconButton>
                  <HomeIcon titleAccess="Home" />
                </IconButton>
              </MenuItem>
            )}
          </MenuList>
        </>

      </Paper>
    </>
  )
}