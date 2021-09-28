import React from "react";
import {
  createStyles,
  makeStyles,
  Paper,
  Typography,
  Button
} from "@material-ui/core";
import { MainPanel } from "components";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: 'flex',
      height: '100%',
      flexDirection: 'column',
      width: "100%",
      alignItems: "center",
    },
    beginBtn: {
      backgroundColor: theme.palette.grey.A400,
      color: theme.palette.primary.main,
      alignItems: "center",
      fontSize: "20px",
      width: 200,
      height: 50
    },
    content: {
      padding: theme.spacing(2),
      marginTop: theme.spacing(4),
      paddingTop: 0,
      fontFamily: theme.typography.fontFamily,
      alignItems: "center",
      justifyContent: "center"
    },
    title: {
      marginBottom: theme.spacing(10),
      fontWeight: "bold"
    },
    body: {
      marginBottom: theme.spacing(12),
    }
  })
)

export const Home: React.FC = () => {
  const classes = useStyles();

  return (
    <MainPanel>
      <Paper className={classes.root}>
        <div className={classes.content}>
          <Typography variant="h3" className={classes.title}>
            Welcome to the <br />
            Trivia Challenge
          </Typography>
          <Typography variant="h5" className={classes.body}>
            You will be presented  <br /> with 10 questions True or False
          </Typography>
          <Typography variant="h5" className={classes.body}>
            Can you score 100%?
          </Typography>
          <Button
            variant="outlined"
            fullWidth={false}
            size='small'
            classes={{ root: classes.beginBtn }}
          >
            BEGIN
          </Button>
        </div>
      </Paper>
    </MainPanel>
  )
}