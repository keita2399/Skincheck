import { motion } from "motion/react";
import { Sparkles, Droplet, Sun, Wind, Star } from "lucide-react";

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
      {/* Celebration Sparkles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            y: [0, -100],
            x: [(i % 2 ? 1 : -1) * (20 + i * 5)]
          }}
          transition={{
            duration: 2,
            delay: i * 0.1,
            repeat: Infinity,
            repeatDelay: 2
          }}
          className="absolute text-3xl pointer-events-none"
          style={{
            left: `${10 + i * 7}%`,
            bottom: "10%"
          }}
        >
          {["✨", "💫", "⭐", "🌟"][i % 4]}
        </motion.div>
      ))}
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="relative w-24 h-24 mx-auto mb-6"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 bg-gradient-to-br from-pink-300 via-purple-300 to-blue-300 rounded-full opacity-50 blur-xl"
            />
            <div className="relative w-24 h-24 bg-gradient-to-br from-pink-400 via-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white shadow-2xl shadow-pink-300">
              {analysis.icon}
            </div>
          </motion.div>

          <h1 className="text-3xl mb-3 text-gray-900">診断結果</h1>
          <p className="text-xl text-pink-600">{analysis.type}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-3xl p-8 mb-6 shadow-sm"
        >
          <div className="flex items-start gap-3 mb-6">
            <Sparkles className="w-6 h-6 text-pink-500 flex-shrink-0 mt-1" />
            <p className="text-gray-700 leading-relaxed">{analysis.description}</p>
          </div>

          <div className="mb-8">
            <h3 className="text-lg mb-4 text-gray-900 flex items-center gap-2">
              <span className="w-1 h-6 bg-pink-500 rounded-full"></span>
              おすすめのスキンケア
            </h3>
            <div className="grid gap-3">
              {analysis.recommendations.map((rec, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="flex items-center gap-3 bg-pink-50 rounded-xl p-4"
                >
                  <div className="w-2 h-2 bg-pink-500 rounded-full flex-shrink-0"></div>
                  <span className="text-gray-700">{rec}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg mb-4 text-gray-900 flex items-center gap-2">
              <span className="w-1 h-6 bg-pink-500 rounded-full"></span>
              スキンケアのコツ
            </h3>
            <div className="grid gap-3">
              {analysis.tips.map((tip, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="flex items-center gap-3 bg-purple-50 rounded-xl p-4"
                >
                  <div className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0"></div>
                  <span className="text-gray-700">{tip}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onRestart}
          className="w-full bg-white border-2 border-pink-500 text-pink-600 py-4 px-8 rounded-full hover:bg-pink-50 transition-colors"
        >
          もう一度診断する
        </motion.button>
      </div>
    </div>
  );
}
