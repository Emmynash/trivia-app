import React from "react";
import {
  Card,
  CardContent,
  makeStyles,
  createStyles,
  Typography
} from "@material-ui/core";


const useStyles = makeStyles((theme) =>
  createStyles({
    card: {
      maxWidth: 300,
      margin: "auto",
      transition: "0.3s",
      boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
      "&:hover": {
        boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
      }
    },
  })
)
interface Props {
  quiz: []
}
export const QuizCard: React.FC<Props> = ({ quiz }) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography
          variant="h2"
          gutterBottom
        >
          {/* {quiz.category} */}
        </Typography>
        <Typography variant={"caption"}>
          {/* {quiz.question} */}
        </Typography>
      </CardContent>
    </Card>
  )
}