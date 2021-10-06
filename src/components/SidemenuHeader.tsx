import React from "react";
import { useThemeContext } from 'hooks';
import {
  createStyles,
  makeStyles,
  IconButton,
  Typography,
} from "@material-ui/core";
import OpenIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import LightModeIcon from "@material-ui/icons/Brightness7";
import DarkModeIcon from "@material-ui/icons/Brightness5";


const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
      padding: theme.spacing(2),
      flexDirection: expanded => expanded ? "row" : "column-reverse"
    },
    header: {
      marginRight: 'auto',
      "& h6": {
        fontFamily: "'proxima-nova', Segoe UI;"
      },
      "& h5": {
        fontFamily: "'proxima-nova', Segoe UI;"
      }
    }

  })
)

interface props {
  onClose(): void,
  onOpen(): void,
  expanded: boolean
}

export const SidemenuHeader: React.FC<props> = ({ onClose, onOpen, expanded }) => {
  const classes = useStyles(expanded);
  const { palletteType, togglePallette } = useThemeContext();

  return (
    <div className={classes.root}>
      {expanded && (
        <div className={classes.header}>
          <Typography variant="h5">
            Trivia App
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            Test Your Knowledge
          </Typography>
        </div>
      )}

      <IconButton onClick={() => togglePallette()}>
        {palletteType === "dark" ? (
          <DarkModeIcon />
        ) : (
          <LightModeIcon />
        )}
      </IconButton>
      {expanded ? (
        <IconButton onClick={() => onClose()}>
          <CloseIcon titleAccess="Close Menu" />
        </IconButton>
      ) : (
        <IconButton onClick={() => onOpen()}>
          <OpenIcon titleAccess="Open Menu" />
        </IconButton>

      )}

    </div>
  )
}