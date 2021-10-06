import {
  useEffect,
  useState,
} from "react";

interface IQuiz {
  isLoaded: boolean,
  quiz: any[],
  error: boolean
}

export const useQuiz = () => {
  const [setQuiz, setQuizState] = useState<IQuiz>({
    isLoaded: false,
    quiz: [],
    error: false
  })

  useEffect(() => {
    const refreshQuiz = async () => {
      return await fetch("https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean")
        .then(res => {
          return res.json()
        })
        .then(data => {
          setQuizState({
            isLoaded: true,
            quiz: data.results ?? null,
            error: false
          })
        }, (error) => {
          setQuizState({
            isLoaded: false,
            quiz: [],
            error: Boolean(error)
          })
          console.log({ error: error })
        }
        )
    };
    refreshQuiz()
  }, [])

  const { isLoaded, quiz, error } = setQuiz;
  console.log(quiz)

  return {
    isLoaded: isLoaded,
    quiz: quiz,
    error: error
  }
}