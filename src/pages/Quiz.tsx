import React, { useState } from "react";
import { MainPanel } from "components";
import { useQuiz } from "hooks";
import { Link } from "react-router-dom";
import {
  makeStyles,
  createStyles,
  Card,
  CardContent,
  Typography,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  Box,
  ListItem,
  ListItemText,
  Button,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: 'flex',
      height: '100%',
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
      overflowY: 'auto',
    },
    card: {
      width: "50%",
      [theme.breakpoints.down('sm')]: {
        width: "100%",
      },
      margin: "auto",
      height: "700px",
      transition: "0.3s",
      boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
      "&:hover": {
        boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
      },
    },
    cardContent: {
      display: 'flex',
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: theme.spacing(4),
      [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(1),
      },
      textAlign: "center",
      overflowY: 'auto',
      overflowX: 'hidden'
    },
    header: {
      marginBottom: theme.spacing(8),
      fontWeight: "bold"
    },
    form: {
      marginTop: theme.spacing(8),
      marginBottom: theme.spacing(2)
    },
    count: {
      fontSize: "18px",
      fontWeight: "bold",
      marginTop: theme.spacing(2),
    },
    btn: {
      backgroundColor: theme.palette.grey.A400,
      color: theme.palette.primary.main,
      alignItems: "center",
      fontSize: "20px",
      width: 200,
      height: 50,
      marginTop: theme.spacing(4)
    },
    scores: {
      height: 'calc(100vh - 160px)',
      [theme.breakpoints.up('lg')]: {
        height: 'calc(100vh - 150px)',
      },
      display: "block"
    },
    listItemText: {
      paddingLeft: theme.spacing(2)
    },
    body: {
      display: 'flex',
      flexDirection: "column",
      fontSize: "18px",
      padding: theme.spacing(5),
      fontFamily: theme.typography.fontFamily,
      textAlign: "center",
      alignItems: "center",
      justifyContent: "center",

    }
  })
)

export const Quiz: React.FC = () => {
  const { isLoaded, quiz, error } = useQuiz();
  const classes = useStyles();
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [storedAnswers, setStoredAnswers] = useState<string[]>([]);
  const [showScore, setShowScore] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');


  const handleQuestionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const answer = (event.target as HTMLInputElement).value;
    const correctAnswer = quiz[currentQuestion].correct_answer;
    const nextQuestion = currentQuestion + 1;

    setValue(answer)
    setStoredAnswers((prev) => [...prev, answer])

    if (answer === correctAnswer) {
      setScore(score + 1);
    }
    if (nextQuestion < quiz.length) {
      setCurrentQuestion(nextQuestion)
      setTimeout(() => { setValue('') }, 1000);
    } else {
      setShowScore(true)
    }
  }



  return (
    <MainPanel>
      <div className={classes.root}>
        <Card className={classes.card}>
          <CardContent className={classes.cardContent}>
            {showScore ? (
              <div className={classes.scores}>
                <Typography
                  variant="h4"
                  gutterBottom
                  className={classes.header}>
                  You score <br />
                  {score} / {quiz.length}
                </Typography>
                {quiz.filter(Boolean).map(
                  (quiz, index) => (
                    <ListItem key={index}>
                      {storedAnswers[index] === quiz.correct_answer ? (
                        <AddIcon />
                      ) : (
                        <RemoveIcon />
                      )}
                      <ListItemText
                        className={classes.listItemText}
                        primary={quiz.question}
                        primaryTypographyProps={{
                          noWrap: false
                        }}
                      />
                    </ListItem>
                  )
                )}
                <Button
                  variant="outlined"
                  component={Link}
                  to={"/"}
                  fullWidth={false}
                  size='small'
                  classes={{ root: classes.btn }}
                >
                  PLAY AGAIN?
                </Button>
              </div>
            ) : quiz ? (
              <>
                <Typography
                  variant="h4"
                  gutterBottom
                  className={classes.header}
                >
                  {quiz[currentQuestion] ? quiz[currentQuestion].category : ''}
                </Typography>
                <Box
                  justifyContent="center"
                  alignItems="center"
                  bgcolor='background.paper'
                  border={1}
                  height={270}
                  width={300}
                  p={2}
                  borderColor='text.primary'
                >
                  <div className={classes.body} >
                    {quiz[currentQuestion] ? quiz[currentQuestion].question : 'Quiz unavailable'}
                  </div>
                </Box>
                <div className={classes.count}>{currentQuestion + 1} of {quiz.length}</div>
                <FormControl component="fieldset" className={classes.form}>
                  <RadioGroup
                    aria-label="answer"
                    name="answer"
                    onChange={handleQuestionChange}
                    value={value}
                  >
                    <FormControlLabel value="True" control={<Radio />} label="True" />
                    <FormControlLabel value="False" control={<Radio />} label="False" />
                  </RadioGroup>
                </FormControl>
              </>
            ) : !isLoaded ? (
              <Typography variant="h4" color="textSecondary">
                Loading Quiz!
              </Typography>
            ) : error ? (
              <Typography variant="h4" color="textSecondary">
                Something went wrong!
              </Typography>
            ) : (
              ""
            )
            }
          </CardContent>
        </Card>
      </div>
    </MainPanel>
  )

}