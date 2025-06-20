
import React, { useState } from 'react';
import { quizQuestions } from '@/data/quiz';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, RefreshCw, Trophy, Lightbulb, Brain, Target, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

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
    }, 1500);
  };

  const getSelectedAnswerForCurrentQuestion = () => {
    return selectedAnswers.find(a => a.questionIndex === currentQuestionIndex);
  };

  const score = selectedAnswers.filter(a => a.isCorrect).length;
  const progress = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers([]);
    setShowResult(false);
  };

  const getScoreMessage = () => {
    const percentage = (score / quizQuestions.length) * 100;
    if (percentage >= 90) return { message: "Excelente! Você é um expert em reciclagem! 🌟", color: "text-green-600", icon: <Award className="w-6 h-6 text-yellow-500" /> };
    if (percentage >= 70) return { message: "Muito bom! Você tem um ótimo conhecimento sobre reciclagem! 👏", color: "text-blue-600", icon: <Target className="w-6 h-6 text-blue-500" /> };
    if (percentage >= 50) return { message: "Bom trabalho! Continue aprendendo para melhorar ainda mais! 📚", color: "text-orange-600", icon: <Brain className="w-6 h-6 text-orange-500" /> };
    return { message: "Continue estudando! Cada conhecimento faz a diferença para o planeta! 🌱", color: "text-gray-600", icon: <Lightbulb className="w-6 h-6 text-gray-500" /> };
  };

  if (showResult) {
    const scoreData = getScoreMessage();
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-3xl mx-auto"
      >
        <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-green-50 dark:from-gray-900 dark:to-gray-800">
          <CardHeader className="text-center pb-4">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-green-400 to-blue-400 rounded-full opacity-20 animate-pulse"></div>
                <Trophy className="w-20 h-20 text-yellow-500 relative z-10" />
              </div>
            </div>
            <CardTitle className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Quiz Finalizado!
            </CardTitle>
            <div className="flex items-center justify-center gap-2 mt-4">
              {scoreData.icon}
              <CardDescription className={`text-xl font-medium ${scoreData.color}`}>
                {scoreData.message}
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="inline-flex items-center gap-4 bg-white dark:bg-gray-800 rounded-full px-6 py-3 shadow-lg">
                <span className="text-3xl font-bold text-green-600">{score}</span>
                <span className="text-gray-500">/</span>
                <span className="text-2xl text-gray-600">{quizQuestions.length}</span>
                <Badge variant="secondary" className="ml-2">
                  {Math.round((score / quizQuestions.length) * 100)}%
                </Badge>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-green-600">{score}</div>
                <div className="text-sm text-gray-500">Acertos</div>
              </div>
              <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-red-500">{quizQuestions.length - score}</div>
                <div className="text-sm text-gray-500">Erros</div>
              </div>
              <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-blue-600">{Math.round((score / quizQuestions.length) * 100)}%</div>
                <div className="text-sm text-gray-500">Aproveitamento</div>
              </div>
            </div>

            <Button 
              onClick={restartQuiz}
              size="lg"
              className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-medium py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <RefreshCw className="mr-2 w-5 h-5" />
              Tentar Novamente
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  const question = quizQuestions[currentQuestionIndex];
  const selectedAnswer = getSelectedAnswerForCurrentQuestion();

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'hard': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Progress Bar */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Progresso do Quiz
          </span>
          <span className="text-sm font-bold text-green-600">
            {currentQuestionIndex + 1}/{quizQuestions.length}
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Question Card */}
      <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between mb-4">
            <Badge variant="outline" className="text-xs">
              Questão {currentQuestionIndex + 1}
            </Badge>
            <div className="flex items-center gap-2">
              <Badge className={getDifficultyColor(question.difficulty)}>
                {question.difficulty === 'easy' ? 'Fácil' : 
                 question.difficulty === 'medium' ? 'Médio' : 'Difícil'}
              </Badge>
              <Badge variant="secondary" className="text-xs">
                {question.category}
              </Badge>
            </div>
          </div>
          <CardTitle className="text-xl md:text-2xl font-bold leading-tight">
            {question.question}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer && selectedAnswer.answerIndex === index;
            const isCorrect = question.correctAnswerIndex === index;
            
            let buttonClass = "border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 dark:border-gray-700 dark:hover:border-blue-600 dark:hover:bg-blue-900/20 transition-all duration-300";
            let icon = null;

            if (selectedAnswer) {
              if (isCorrect) {
                buttonClass = "border-2 border-green-500 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 shadow-lg";
                icon = <CheckCircle className="w-5 h-5" />;
              } else if (isSelected) {
                buttonClass = "border-2 border-red-500 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 shadow-lg";
                icon = <XCircle className="w-5 h-5" />;
              }
            }
            
            return (
              <motion.div
                key={index}
                whileHover={{ scale: selectedAnswer ? 1 : 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  onClick={() => handleAnswerClick(index)}
                  disabled={!!selectedAnswer}
                  variant="outline"
                  className={`w-full justify-start text-left h-auto py-4 px-6 rounded-xl ${buttonClass}`}
                >
                  <div className="flex items-center gap-4 w-full">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-sm font-medium">
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span className="flex-1 whitespace-normal text-base">{option}</span>
                    {icon && <span className="flex-shrink-0">{icon}</span>}
                  </div>
                </Button>
              </motion.div>
            )
          })}

          <AnimatePresence>
            {selectedAnswer && (
              <motion.div 
                initial={{ opacity: 0, y: 20, scale: 0.95 }} 
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="mt-6 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border-l-4 border-blue-500"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
                    <Lightbulb className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                      {selectedAnswer.isCorrect ? '✅ Correto!' : '❌ Ops, não é essa a resposta!'}
                    </h4>
                    <p className="text-blue-800 dark:text-blue-200 leading-relaxed">
                      {question.explanation}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizReciclagem;
