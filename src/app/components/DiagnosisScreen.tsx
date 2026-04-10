import { motion } from "motion/react";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Question {
  id: string;
  question: string;
  options: string[];
}

const questions: Question[] = [
  {
    id: "skin-type",
    question: "肌に関する悩みを教えてください",
    options: [
      "ニキビができる",
      "乾燥が気になる",
      "毛穴が目立つ",
      "シミ・そばかす",
      "肌のくすみ",
      "赤みが出やすい",
      "混合肌",
      "肌荒れしやすい",
      "目元の小じわ",
      "たるみが気になる",
      "敏感肌",
      "特になし"
    ]
  },
  {
    id: "skin-condition",
    question: "肌の状態を選んでください",
    options: [
      "脂性肌",
      "普通肌",
      "乾燥肌",
      "混合肌",
      "敏感肌"
    ]
  },
  {
    id: "concerns",
    question: "特に気になる部分はどこですか？",
    options: [
      "Tゾーン（額・鼻）",
      "Uゾーン（頬・顎）",
      "目元",
      "口元",
      "顔全体",
      "特になし"
    ]
  }
];

interface DiagnosisScreenProps {
  onComplete: (answers: Record<string, string[]>) => void;
  onBack: () => void;
}

export function DiagnosisScreen({ onComplete, onBack }: DiagnosisScreenProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});

  const currentQuestion = questions[currentStep];
  const currentAnswers = answers[currentQuestion.id] || [];

  const toggleAnswer = (option: string) => {
    const newAnswers = currentAnswers.includes(option)
      ? currentAnswers.filter(a => a !== option)
      : [...currentAnswers, option];

    setAnswers({ ...answers, [currentQuestion.id]: newAnswers });
  };

  const goNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(answers);
    }
  };

  const goBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      onBack();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-blue-50 px-6 py-12 relative overflow-hidden">
      {/* Floating Sparkles */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0.3, 0.6, 0.3],
            y: [0, -20, 0],
            x: [0, 10, 0]
          }}
          transition={{
            duration: 3 + i,
            repeat: Infinity,
            delay: i * 0.5
          }}
          className="absolute text-3xl pointer-events-none"
          style={{
            left: `${15 + i * 18}%`,
            top: `${10 + i * 15}%`
          }}
        >
          {i % 2 === 0 ? "✨" : "💖"}
        </motion.div>
      ))}
      <div className="max-w-2xl mx-auto">
        {/* Progress */}
        <div className="mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            {questions.map((_, index) => (
              <div key={index} className="flex items-center">
                <motion.div
                  initial={false}
                  animate={{
                    scale: currentStep === index ? 1.2 : 1,
                    backgroundColor: index <= currentStep ? "#EC4899" : "#E5E7EB"
                  }}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white relative"
                >
                  {index + 1}
                  {index < currentStep && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute inset-0 bg-pink-500 rounded-full flex items-center justify-center"
                    >
                      ✓
                    </motion.div>
                  )}
                </motion.div>
                {index < questions.length - 1 && (
                  <motion.div
                    initial={false}
                    animate={{
                      backgroundColor: index < currentStep ? "#EC4899" : "#E5E7EB"
                    }}
                    className="w-16 h-1 mx-2"
                  />
                )}
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-gray-500">
            ステップ {currentStep + 1} / {questions.length}
          </p>
        </div>

        {/* Question */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-2xl text-center mb-8 text-gray-900">
            {currentQuestion.question}
          </h2>

          <div className="grid grid-cols-2 gap-3 mb-12">
            {currentQuestion.options.map((option) => {
              const isSelected = currentAnswers.includes(option);
              return (
                <motion.button
                  key={option}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => toggleAnswer(option)}
                  className={`py-4 px-6 rounded-2xl border-2 transition-all ${
                    isSelected
                      ? "bg-gradient-to-br from-pink-500 to-purple-500 border-pink-500 text-white shadow-xl shadow-pink-300"
                      : "bg-white border-gray-200 text-gray-700 hover:border-pink-300 hover:shadow-md"
                  }`}
                >
                  {option}
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Navigation */}
        <div className="flex gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={goBack}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-white border-2 border-gray-200 text-gray-700 hover:border-gray-300"
          >
            <ChevronLeft className="w-5 h-5" />
            戻る
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={goNext}
            disabled={currentAnswers.length === 0}
            className="flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-full bg-gradient-to-r from-pink-500 to-pink-600 text-white shadow-lg shadow-pink-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {currentStep === questions.length - 1 ? "診断結果を見る" : "次へ"}
            {currentStep < questions.length - 1 && <ChevronRight className="w-5 h-5" />}
          </motion.button>
        </div>
      </div>
    </div>
  );
}
