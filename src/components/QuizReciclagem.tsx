
import React, { useState } from 'react';
import { quizQuestions } from '@/data/quiz';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, RefreshCw, Trophy, Lightbulb } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type SelectedAnswer = {
  questionIndex: number;
  answerIndex: number;
  isCorrect: boolean;
};

const QuizReciclagem = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<SelectedAnswer[]>([]);
  const [showResult, setShowResult] = useState(false);

  const handleAnswerClick = (answerIndex: number) => {
    const isCorrect = quizQuestions[currentQuestionIndex].correctAnswerIndex === answerIndex;
    setSelectedAnswers([
      ...selectedAnswers,
      { questionIndex: currentQuestionIndex, answerIndex, isCorrect },
    ]);

    setTimeout(() => {
      if (currentQuestionIndex < quizQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setShowResult(true);
      }
    }, 1200);
  };

  const getSelectedAnswerForCurrentQuestion = () => {
    return selectedAnswers.find(a => a.questionIndex === currentQuestionIndex);
  };

  const score = selectedAnswers.filter(a => a.isCorrect).length;

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers([]);
    setShowResult(false);
  };

  if (showResult) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
        <Card className="max-w-2xl mx-auto text-center border-gray-200 dark:border-gray-800">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <Trophy className="w-16 h-16 text-yellow-500" />
            </div>
            <CardTitle className="text-2xl md:text-3xl">Quiz Finalizado!</CardTitle>
            <CardDescription className="text-lg">
              Você acertou {score} de {quizQuestions.length} perguntas.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-base">
              {score >= quizQuestions.length / 2 
                ? "Ótimo trabalho! Você sabe muito sobre reciclagem." 
                : "Continue aprendendo! Cada conhecimento faz a diferença."}
            </p>
            <Button onClick={restartQuiz}>
              <RefreshCw className="mr-2" />
              Tentar Novamente
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  const question = quizQuestions[currentQuestionIndex];
  const selectedAnswer = getSelectedAnswerForCurrentQuestion();

  return (
    <Card className="max-w-2xl mx-auto border-gray-200 dark:border-gray-800">
      <CardHeader>
        <CardDescription>
          Pergunta {currentQuestionIndex + 1} de {quizQuestions.length}
        </CardDescription>
        <CardTitle className="text-xl md:text-2xl">{question.question}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer && selectedAnswer.answerIndex === index;
          const isCorrect = question.correctAnswerIndex === index;
          
          let buttonClass = "border-input hover:bg-accent hover:text-accent-foreground";
          let icon = null;

          if (selectedAnswer) {
            if (isCorrect) {
              buttonClass = "bg-green-100 dark:bg-green-900/50 border-green-500 text-green-800 dark:text-green-300";
              icon = <CheckCircle />;
            } else if (isSelected) {
              buttonClass = "bg-red-100 dark:bg-red-900/50 border-red-500 text-red-800 dark:text-red-300";
              icon = <XCircle />;
            }
          }
          
          return (
            <Button
              key={index}
              onClick={() => handleAnswerClick(index)}
              disabled={!!selectedAnswer}
              variant="outline"
              className={`w-full justify-start text-left h-auto py-3 px-4 transition-colors duration-300 ${buttonClass}`}
            >
              {icon && <span className="mr-3 flex-shrink-0">{icon}</span>}
              <span className="flex-1 whitespace-normal">{option}</span>
            </Button>
          )
        })}
        <AnimatePresence>
          {selectedAnswer && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="p-4 mt-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800"
            >
              <div className="flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                <p className="text-sm text-blue-800 dark:text-blue-300">
                  <strong className="font-semibold">Explicação:</strong> {question.explanation}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
};

export default QuizReciclagem;
