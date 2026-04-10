import { useState } from "react";
import { WelcomeScreen } from "./components/WelcomeScreen";
import { DiagnosisScreen } from "./components/DiagnosisScreen";
import { ResultScreen } from "./components/ResultScreen";

type Screen = "welcome" | "diagnosis" | "result";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("welcome");
  const [answers, setAnswers] = useState<Record<string, string[]>>({});

  return (
    <div className="size-full">
      {currentScreen === "welcome" && (
        <WelcomeScreen onStart={() => setCurrentScreen("diagnosis")} />
      )}

      {currentScreen === "diagnosis" && (
        <DiagnosisScreen
          onComplete={(ans) => {
            setAnswers(ans);
            setCurrentScreen("result");
          }}
          onBack={() => setCurrentScreen("welcome")}
        />
      )}

      {currentScreen === "result" && (
        <ResultScreen
          answers={answers}
          onRestart={() => {
            setAnswers({});
            setCurrentScreen("welcome");
          }}
        />
      )}
    </div>
  );
}