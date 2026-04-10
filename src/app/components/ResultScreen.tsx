import { motion } from "motion/react";
import { Sparkles, Droplet, Sun, Wind, Star, Heart, Zap, Award } from "lucide-react";

interface ResultScreenProps {
  answers: Record<string, string[]>;
  onRestart: () => void;
}

interface SkinAnalysis {
  type: string;
  icon: React.ReactNode;
  description: string;
  recommendations: string[];
  tips: string[];
}

function analyzeSkin(answers: Record<string, string[]>): SkinAnalysis {
  const concerns = answers["skin-type"] || [];
  const skinType = answers["skin-condition"]?.[0] || "普通肌";

  // シンプルな分析ロジック
  if (skinType === "乾燥肌" || concerns.includes("乾燥が気になる")) {
    return {
      type: "乾燥肌タイプ",
      icon: <Droplet className="w-8 h-8" />,
      description: "肌が乾燥しやすく、保湿が重要です。水分と油分のバランスを整えることで、健やかな肌を保つことができます。",
      recommendations: [
        "高保湿タイプの化粧水",
        "セラミド配合の美容液",
        "リッチなクリーム",
        "保湿マスク（週1-2回）"
      ],
      tips: [
        "洗顔後は素早く保湿する",
        "加湿器を使用して室内の湿度を保つ",
        "刺激の少ない洗顔料を選ぶ"
      ]
    };
  } else if (skinType === "脂性肌" || concerns.includes("ニキビができる")) {
    return {
      type: "脂性肌タイプ",
      icon: <Sun className="w-8 h-8" />,
      description: "皮脂の分泌が活発で、毛穴やニキビが気になりやすいタイプです。さっぱりとしたケアで肌を整えましょう。",
      recommendations: [
        "さっぱりタイプの化粧水",
        "ビタミンC配合の美容液",
        "軽めの乳液・ジェル",
        "毛穴ケア用のクレイマスク"
      ],
      tips: [
        "朝晩の洗顔を丁寧に行う",
        "油分の多い化粧品は避ける",
        "定期的に角質ケアを行う"
      ]
    };
  } else if (skinType === "敏感肌" || concerns.includes("敏感肌")) {
    return {
      type: "敏感肌タイプ",
      icon: <Wind className="w-8 h-8" />,
      description: "刺激に弱く、赤みやかゆみが出やすいタイプです。優しいケアで肌のバリア機能を守りましょう。",
      recommendations: [
        "低刺激性の化粧水",
        "鎮静効果のある美容液",
        "バリア機能をサポートするクリーム",
        "敏感肌用の日焼け止め"
      ],
      tips: [
        "新しい化粧品はパッチテストを行う",
        "香料・着色料フリーの製品を選ぶ",
        "強い摩擦を避ける"
      ]
    };
  } else {
    return {
      type: "バランス肌タイプ",
      icon: <Star className="w-8 h-8" />,
      description: "比較的バランスの取れた肌質です。現在の良い状態を維持するためのケアを続けましょう。",
      recommendations: [
        "バランスの良い化粧水",
        "マルチ機能美容液",
        "適度な保湿のクリーム",
        "週1回のスペシャルケア"
      ],
      tips: [
        "季節に応じてケアを調整する",
        "規則正しい生活を心がける",
        "紫外線対策を欠かさない"
      ]
    };
  }
}

export function ResultScreen({ answers, onRestart }: ResultScreenProps) {
  const analysis = analyzeSkin(answers);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-blue-50 px-6 py-12 relative overflow-hidden">
      {/* Animated Background Shapes */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`bg-${i}`}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0.1, 0.3, 0.1],
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 10 + i * 2,
            repeat: Infinity,
            delay: i * 0.5
          }}
          className="absolute rounded-full"
          style={{
            width: `${150 + i * 50}px`,
            height: `${150 + i * 50}px`,
            left: `${i * 20}%`,
            top: `${i * 15}%`,
            background: `linear-gradient(135deg, ${
              i % 3 === 0 ? '#ec4899' : i % 3 === 1 ? '#a855f7' : '#3b82f6'
            }20, transparent)`
          }}
        />
      ))}

      {/* Celebration Sparkles - More Dynamic */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
            y: [0, -150 - i * 10],
            x: [(i % 2 ? 1 : -1) * (30 + i * 8)],
            rotate: [0, 360]
          }}
          transition={{
            duration: 2.5,
            delay: i * 0.15,
            repeat: Infinity,
            repeatDelay: 1.5
          }}
          className="absolute text-4xl pointer-events-none"
          style={{
            left: `${5 + i * 4.5}%`,
            bottom: "5%"
          }}
        >
          {["✨", "💖", "⭐", "🌟", "💫", "🎀", "🌸", "💝"][i % 8]}
        </motion.div>
      ))}

      {/* Floating Hearts */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`heart-${i}`}
          initial={{ opacity: 0, y: 100 }}
          animate={{
            opacity: [0, 0.6, 0],
            y: [100, -100],
            x: [0, (i % 2 ? 1 : -1) * 50]
          }}
          transition={{
            duration: 4,
            delay: i * 0.5,
            repeat: Infinity,
            repeatDelay: 2
          }}
          className="absolute text-pink-300 text-2xl pointer-events-none"
          style={{
            left: `${15 + i * 11}%`,
            bottom: 0
          }}
        >
          💕
        </motion.div>
      ))}
      <div className="max-w-3xl mx-auto relative z-10">
        {/* Confetti Effect */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`confetti-${i}`}
            initial={{ opacity: 0, y: -50, rotate: 0 }}
            animate={{
              opacity: [0, 1, 1, 0],
              y: [0, 200],
              rotate: [0, 360 * (i % 2 ? 1 : -1)],
              x: [(i % 2 ? 1 : -1) * (20 + i * 5)]
            }}
            transition={{
              duration: 2,
              delay: i * 0.05,
              ease: "easeOut"
            }}
            className="absolute text-3xl pointer-events-none"
            style={{
              left: `${30 + i * 3}%`,
              top: "-50px"
            }}
          >
            {["🎊", "🎉", "✨", "💝", "🌸"][i % 5]}
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          {/* Celebration Badge */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="relative w-40 h-40 mx-auto mb-8"
          >
            {/* Rotating Glow */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 bg-gradient-to-br from-pink-300 via-purple-300 to-blue-300 rounded-full opacity-40 blur-2xl scale-150"
            />

            {/* Pulsing Ring */}
            <motion.div
              animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 border-4 border-pink-300 rounded-full"
            />

            {/* Main Badge */}
            <div className="relative w-40 h-40 bg-gradient-to-br from-pink-400 via-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white shadow-2xl shadow-pink-400">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {analysis.icon}
              </motion.div>

              {/* Sparkle Decorations */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0"
              >
                {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                  <motion.div
                    key={i}
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                    className="absolute"
                    style={{
                      left: `${50 + 55 * Math.cos((angle * Math.PI) / 180)}%`,
                      top: `${50 + 55 * Math.sin((angle * Math.PI) / 180)}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                  >
                    <Star className="w-4 h-4 text-yellow-300 fill-yellow-300" />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="mb-6"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="w-6 h-6 text-pink-500" />
              <h1 className="text-4xl bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                診断完了！
              </h1>
              <Sparkles className="w-6 h-6 text-pink-500" />
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-2xl text-pink-600 mb-2 flex items-center justify-center gap-2"
            >
              <Heart className="w-6 h-6 fill-pink-500 text-pink-500" />
              {analysis.type}
              <Heart className="w-6 h-6 fill-pink-500 text-pink-500" />
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex items-center justify-center gap-2 text-sm text-purple-600"
            >
              <Award className="w-4 h-4" />
              <span>あなたにぴったりのケアプランをご提案します</span>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Description Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="relative bg-gradient-to-br from-white via-pink-50 to-purple-50 rounded-3xl p-8 mb-6 shadow-xl shadow-pink-200/50 border border-pink-100 overflow-hidden"
        >
          {/* Decorative Corner Elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-pink-200 to-transparent rounded-full blur-3xl opacity-50" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-purple-200 to-transparent rounded-full blur-3xl opacity-50" />

          <div className="relative flex items-start gap-4 mb-6">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Sparkles className="w-8 h-8 text-pink-500 flex-shrink-0 mt-1" />
            </motion.div>
            <p className="text-gray-700 leading-relaxed text-lg">{analysis.description}</p>
          </div>

          {/* Recommendations Section */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-500 rounded-xl flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                おすすめのスキンケア
              </h3>
            </div>
            <div className="grid gap-3">
              {analysis.recommendations.map((rec, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="relative bg-gradient-to-r from-pink-100 via-pink-50 to-purple-50 rounded-2xl p-5 border border-pink-200 shadow-md hover:shadow-lg transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-4">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                      className="w-8 h-8 bg-gradient-to-br from-pink-500 to-pink-600 rounded-full flex items-center justify-center text-white flex-shrink-0 shadow-lg"
                    >
                      {index + 1}
                    </motion.div>
                    <span className="text-gray-700 group-hover:text-gray-900 transition-colors">{rec}</span>
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Tips Section */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                スキンケアのコツ
              </h3>
            </div>
            <div className="grid gap-3">
              {analysis.tips.map((tip, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.1 + index * 0.1 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="relative bg-gradient-to-r from-purple-100 via-purple-50 to-blue-50 rounded-2xl p-5 border border-purple-200 shadow-md hover:shadow-lg transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-3 h-3 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex-shrink-0 group-hover:scale-125 transition-transform" />
                    <span className="text-gray-700 group-hover:text-gray-900 transition-colors">{tip}</span>
                    <Heart className="w-4 h-4 text-pink-500 fill-pink-500 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
          whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(236, 72, 153, 0.3)" }}
          whileTap={{ scale: 0.95 }}
          onClick={onRestart}
          className="w-full relative bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 bg-[length:200%_100%] text-white py-5 px-8 rounded-full shadow-xl shadow-pink-300 overflow-hidden group"
        >
          <motion.div
            animate={{ x: ["0%", "100%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          />
          <span className="relative flex items-center justify-center gap-2 text-lg">
            <Sparkles className="w-5 h-5" />
            もう一度診断する
            <Sparkles className="w-5 h-5" />
          </span>
        </motion.button>
      </div>
    </div>
  );
}
