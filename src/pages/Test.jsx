import React, { useState } from "react";
import { Header } from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import EmployerApi from "../api/employer";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/reducers/userSlice";

const Test = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const disptach = useDispatch();
  const questions = [
    {
      id: 1,
      question: "What is a key benefit of hiring autistic employees?",
      options: [
        "Increased workplace conflict",
        "Enhanced attention to detail and innovation",
        "Higher employee turnover",
        "Reduced team collaboration",
      ],
      correct: "Enhanced attention to detail and innovation",
    },
    {
      id: 2,
      question:
        "Which accommodation helps autistic employees manage sensory sensitivities?",
      options: [
        "Loud open-plan offices",
        "Bright fluorescent lighting",
        "Quiet workspaces or noise-canceling headphones",
        "Frequent unscheduled meetings",
      ],
      correct: "Quiet workspaces or noise-canceling headphones",
    },
    {
      id: 3,
      question:
        "What is an effective training strategy for autistic employees?",
      options: [
        "Providing vague instructions",
        "Breaking tasks into manageable steps with visual aids",
        "Avoiding feedback to prevent discomfort",
        "Rushing through onboarding processes",
      ],
      correct: "Breaking tasks into manageable steps with visual aids",
    },
    {
      id: 4,
      question:
        "What does clear communication involve when supporting autistic employees?",
      options: [
        "Using jargon and metaphors",
        "Providing direct, concise instructions",
        "Relying only on verbal instructions",
        "Avoiding written guidelines",
      ],
      correct: "Providing direct, concise instructions",
    },
    {
      id: 5,
      question: "Which company is known for its Autism at Work program?",
      options: ["Google", "SAP", "Amazon", "Tesla"],
      correct: "SAP",
    },
    {
      id: 6,
      question:
        "What is a recommended approach for onboarding autistic employees?",
      options: [
        "Unstructured orientation with minimal guidance",
        "Providing a mentor or job coach for support",
        "Requiring immediate independent work",
        "Avoiding written schedules or plans",
      ],
      correct: "Providing a mentor or job coach for support",
    },
    {
      id: 7,
      question: "How can employers foster a neurodiverse workplace?",
      options: [
        "Ignoring individual needs to promote uniformity",
        "Training staff on neurodiversity and inclusion",
        "Limiting flexible work options",
        "Discouraging open communication",
      ],
      correct: "Training staff on neurodiversity and inclusion",
    },
    {
      id: 8,
      question: "What benefit does neurodiversity bring to organizations?",
      options: [
        "Decreased creativity",
        "Improved problem-solving through diverse perspectives",
        "Higher recruitment costs",
        "Reduced employee engagement",
      ],
      correct: "Improved problem-solving through diverse perspectives",
    },
    {
      id: 9,
      question:
        "Which of the following supports autistic employees during meetings?",
      options: [
        "Providing agendas in advance",
        "Using only spontaneous discussions",
        "Requiring verbal participation",
        "Avoiding visual aids",
      ],
      correct: "Providing agendas in advance",
    },
    {
      id: 10,
      question: "What has Microsoft’s neurodiversity program demonstrated?",
      options: [
        "Increased employee turnover",
        "No impact on workplace culture",
        "Higher productivity and retention",
        "Reduced innovation",
      ],
      correct: "Higher productivity and retention",
    },
  ];

  const handleAnswerChange = (questionId, option) => {
    setAnswers((prev) => ({ ...prev, [questionId]: option }));
  };

  const handleSubmit = async () => {
    let correctCount = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.correct) {
        correctCount++;
      }
    });
    if (score > 5) {
      const user = await EmployerApi.updateUserObj("passedTest", true);
      navigate("/me");
      disptach(setUser(user));
    }
    setScore(correctCount);
  };

  return (
    <div className="relative min-h-screen w-full">
      {/* Header */}
      <Header />

      {/* Content */}
      <div className="max-w-[1200px] mx-auto bg-white rounded-lg mt-24 p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Autism in the Workplace: Knowledge Test
        </h1>
        <p className="text-gray-600 mb-8">
          Test your understanding of how to support autistic employees with this
          multiple-choice quiz. Select the best answer for each question and
          submit to see your score.
        </p>

        {questions.map((q) => (
          <div key={q.id} className="mb-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-3">
              {q.id}. {q.question}
            </h3>
            <div className="space-y-2">
              {q.options.map((option, index) => (
                <label key={index} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name={`question-${q.id}`}
                    value={option}
                    checked={answers[q.id] === option}
                    onChange={() => handleAnswerChange(q.id, option)}
                    className="h-4 w-4 text-blue-600"
                  />
                  <span className="text-gray-600">{option}</span>
                </label>
              ))}
            </div>
          </div>
        ))}

        <button
          onClick={handleSubmit}
          className="mt-6 !bg-black text-white px-6 py-2 rounded-md hover:bg-blue-700 transition">
          Submit Answers
        </button>

        {score !== null && (
          <div className="mt-6 p-4 bg-gray-100 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800">
              Your Score: {score} out of {questions.length}
            </h3>
            <p className="text-gray-600">
              {score === questions.length
                ? "Excellent! You have a strong understanding of supporting autistic employees."
                : score >= questions.length / 2
                ? "Good job! Review the resources to strengthen your knowledge."
                : "Keep learning! Check the resources below for more insights and try again."}
            </p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Test;
