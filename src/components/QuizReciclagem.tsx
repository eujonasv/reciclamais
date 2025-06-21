
import React, { useState } from 'react';
import { quizQuestions } from '@/data/quiz';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, RefreshCw, Trophy, Lightbulb, Brain, Target, Award, Sparkles } from 'lucide-react';
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
    if (percentage >= 90) return { 
      message: "Excelente! Você é um expert em reciclagem! 🌟", 
      color: "text-emerald-600 dark:text-emerald-400", 
      icon: <Award className="w-6 h-6 text-yellow-500 dark:text-yellow-400" />,
      bgGradient: "from-emerald-500/20 to-green-500/20 dark:from-emerald-400/10 dark:to-green-400/10"
    };
    if (percentage >= 70) return { 
      message: "Muito bom! Você tem um ótimo conhecimento sobre reciclagem! 👏", 
      color: "text-blue-600 dark:text-blue-400", 
      icon: <Target className="w-6 h-6 text-blue-500 dark:text-blue-400" />,
      bgGradient: "from-blue-500/20 to-indigo-500/20 dark:from-blue-400/10 dark:to-indigo-400/10"
    };
    if (percentage >= 50) return { 
      message: "Bom trabalho! Continue aprendendo para melhorar ainda mais! 📚", 
      color: "text-orange-600 dark:text-orange-400", 
      icon: <Brain className="w-6 h-6 text-orange-500 dark:text-orange-400" />,
      bgGradient: "from-orange-500/20 to-amber-500/20 dark:from-orange-400/10 dark:to-amber-400/10"
    };
    return { 
      message: "Continue estudando! Cada conhecimento faz a diferença para o planeta! 🌱", 
      color: "text-gray-600 dark:text-gray-300", 
      icon: <Lightbulb className="w-6 h-6 text-gray-500 dark:text-gray-400" />,
      bgGradient: "from-gray-500/20 to-slate-500/20 dark:from-gray-400/10 dark:to-slate-400/10"
    };
  };

  if (showResult) {
    const scoreData = getScoreMessage();
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-4xl mx-auto"
      >
        <Card className="border-0 shadow-2xl bg-gradient-to-br from-white via-gray-50/50 to-blue-50/30 dark:from-gray-900 dark:via-gray-800/80 dark:to-gray-700/50 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="absolute -inset-6 bg-gradient-to-r from-green-400 via-blue-500 to-purple-400 rounded-full opacity-20 dark:opacity-30 animate-pulse blur-xl"></div>
                <div className="absolute -inset-4 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full opacity-30 dark:opacity-40 animate-pulse"></div>
                <div className="relative bg-gradient-to-br from-yellow-400 to-orange-500 p-4 rounded-full shadow-2xl">
                  <Trophy className="w-16 h-16 text-white drop-shadow-lg" />
                  <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-yellow-300 animate-bounce" />
                </div>
              </div>
            </div>
            <CardTitle className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 dark:from-green-400 dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-6">
              Quiz Finalizado!
            </CardTitle>
            <div className={`inline-flex items-center justify-center gap-3 mt-4 p-4 rounded-2xl bg-gradient-to-r ${scoreData.bgGradient} border border-white/20 dark:border-gray-600/30 backdrop-blur-sm`}>
              {scoreData.icon}
              <CardDescription className={`text-xl font-semibold ${scoreData.color}`}>
                {scoreData.message}
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="text-center">
              <div className="inline-flex items-center gap-6 bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-2xl px-8 py-4 shadow-xl border border-white/20 dark:border-gray-600/30">
                <div className="text-center">
                  <div className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent">{score}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">Acertos</div>
                </div>
                <div className="w-px h-12 bg-gradient-to-b from-transparent via-gray-300 dark:via-gray-600 to-transparent"></div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-600 dark:text-gray-300">{quizQuestions.length}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">Total</div>
                </div>
                <div className="w-px h-12 bg-gradient-to-b from-transparent via-gray-300 dark:via-gray-600 to-transparent"></div>
                <Badge variant="secondary" className="text-lg px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0 shadow-lg">
                  {Math.round((score / quizQuestions.length) * 100)}%
                </Badge>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl shadow-lg border border-green-200/50 dark:border-green-700/30 backdrop-blur-sm"
              >
                <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-1">{score}</div>
                <div className="text-sm text-green-700 dark:text-green-300 font-medium">Acertos</div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center p-6 bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 rounded-2xl shadow-lg border border-red-200/50 dark:border-red-700/30 backdrop-blur-sm"
              >
                <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                  <XCircle className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-red-600 dark:text-red-400 mb-1">{quizQuestions.length - score}</div>
                <div className="text-sm text-red-700 dark:text-red-300 font-medium">Erros</div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl shadow-lg border border-blue-200/50 dark:border-blue-700/30 backdrop-blur-sm"
              >
                <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center shadow-lg">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">{Math.round((score / quizQuestions.length) * 100)}%</div>
                <div className="text-sm text-blue-700 dark:text-blue-300 font-medium">Aproveitamento</div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Button 
                onClick={restartQuiz}
                size="lg"
                className="w-full bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 hover:from-green-600 hover:via-emerald-600 hover:to-teal-600 dark:from-green-400 dark:via-emerald-400 dark:to-teal-400 dark:hover:from-green-500 dark:hover:via-emerald-500 dark:hover:to-teal-500 text-white font-semibold py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] border-0"
              >
                <RefreshCw className="mr-3 w-5 h-5" />
                Tentar Novamente
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  const question = quizQuestions[currentQuestionIndex];
  const selectedAnswer = getSelectedAnswerForCurrentQuestion();

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700/50';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-700/50';
      case 'hard': return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-700/50';
      default: return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/30 dark:text-gray-300 dark:border-gray-700/50';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Progress Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/20 dark:border-gray-600/30"
      >
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">
              Progresso do Quiz
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0 shadow-md">
              {currentQuestionIndex + 1}/{quizQuestions.length}
            </Badge>
          </div>
        </div>
        <Progress value={progress} className="h-3 bg-gray-200 dark:bg-gray-700" />
        <div className="mt-2 text-right">
          <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
            {Math.round(progress)}% concluído
          </span>
        </div>
      </motion.div>

      {/* Question Card */}
      <motion.div
        key={currentQuestionIndex}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="border-0 shadow-2xl bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/20 dark:from-gray-900 dark:via-gray-800/80 dark:to-gray-700/60 backdrop-blur-sm">
          <CardHeader className="pb-6">
            <div className="flex items-center justify-between mb-6">
              <Badge variant="outline" className="text-sm font-medium bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-gray-200 dark:border-gray-600">
                Questão {currentQuestionIndex + 1}
              </Badge>
              <div className="flex items-center gap-3">
                <Badge className={`${getDifficultyColor(question.difficulty)} font-medium shadow-sm border`}>
                  {question.difficulty === 'easy' ? 'Fácil' : 
                   question.difficulty === 'medium' ? 'Médio' : 'Difícil'}
                </Badge>
                <Badge variant="secondary" className="bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-700/50">
                  {question.category}
                </Badge>
              </div>
            </div>
            <CardTitle className="text-xl md:text-2xl lg:text-3xl font-bold leading-tight text-gray-800 dark:text-gray-100">
              {question.question}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer && selectedAnswer.answerIndex === index;
              const isCorrect = question.correctAnswerIndex === index;
              
              let buttonClass = "border-2 border-gray-200 hover:border-blue-400 hover:bg-blue-50/50 dark:border-gray-600 dark:hover:border-blue-500 dark:hover:bg-blue-900/20 transition-all duration-300 backdrop-blur-sm";
              let icon = null;

              if (selectedAnswer) {
                if (isCorrect) {
                  buttonClass = "border-2 border-green-500 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 text-green-800 dark:text-green-300 shadow-lg transform scale-[1.02]";
                  icon = <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />;
                } else if (isSelected) {
                  buttonClass = "border-2 border-red-500 bg-gradient-to-r from-red-100 to-pink-100 dark:from-red-900/30 dark:to-pink-900/30 text-red-800 dark:text-red-300 shadow-lg";
                  icon = <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />;
                }
              }
              
              return (
                <motion.div
                  key={index}
                  whileHover={{ scale: selectedAnswer ? 1 : 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Button
                    onClick={() => handleAnswerClick(index)}
                    disabled={!!selectedAnswer}
                    variant="outline"
                    className={`w-full justify-start text-left h-auto py-5 px-6 rounded-2xl ${buttonClass} shadow-md hover:shadow-lg`}
                  >
                    <div className="flex items-center gap-4 w-full">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center text-sm font-bold shadow-sm border border-gray-300 dark:border-gray-500">
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span className="flex-1 whitespace-normal text-base leading-relaxed font-medium">{option}</span>
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
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="mt-8 p-6 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-900/20 dark:via-indigo-900/20 dark:to-purple-900/20 rounded-2xl border-l-4 border-blue-500 dark:border-blue-400 shadow-lg backdrop-blur-sm"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 p-3 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/50 dark:to-indigo-900/50 rounded-xl shadow-sm border border-blue-200 dark:border-blue-700/50">
                      <Lightbulb className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-blue-900 dark:text-blue-100 mb-3 text-lg">
                        {selectedAnswer.isCorrect ? '✅ Correto!' : '❌ Ops, não é essa a resposta!'}
                      </h4>
                      <p className="text-blue-800 dark:text-blue-200 leading-relaxed font-medium">
                        {question.explanation}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default QuizReciclagem;
