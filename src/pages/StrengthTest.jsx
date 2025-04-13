import React, { useState } from "react";
import { Header } from "../components/Header";
import Footer from "../components/Footer";
import { Progress } from "reactstrap"; // For displaying progress bars
import UserApi from "../api/user";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/reducers/userSlice";
import { useNavigate } from "react-router-dom";

// Question and answers data
const questions = [
  {
    question:
      "I often find it challenging to start a conversation with new people",
    category: "socialInteraction",
  },
  {
    question:
      "I sometimes struggle to understand social cues, such as body language or facial expressions",
    category: "socialInteraction",
  },
  {
    question:
      "I prefer spending time alone rather than engaging in social gatherings",
    category: "socialInteraction",
  },
  {
    question: "It’s difficult for me to make small talk with others",
    category: "socialInteraction",
  },
  {
    question: "I feel anxious or uncomfortable in group settings",
    category: "socialInteraction",
  },
  {
    question: "I have difficulty maintaining eye contact during conversations",
    category: "communication",
  },
  {
    question:
      "I often take things literally and find it hard to understand jokes or sarcasm",
    category: "communication",
  },
  {
    question: "I find it hard to express my emotions or thoughts verbally",
    category: "communication",
  },
  {
    question:
      "I feel more comfortable when people explain things directly, without relying on hints or subtlety",
    category: "communication",
  },
  {
    question:
      "I sometimes miss or misunderstand subtle changes in tone of voice or facial expressions",
    category: "communication",
  },
  {
    question: "I have specific routines that I like to follow every day",
    category: "behavioralPatterns",
  },
  {
    question: "I get frustrated or anxious when my routine is disrupted",
    category: "behavioralPatterns",
  },
  {
    question:
      "I enjoy engaging in repetitive movements, such as tapping or hand flapping, especially when I’m nervous or excited",
    category: "behavioralPatterns",
  },
  {
    question:
      "I often focus intensely on one or two specific interests and spend a lot of time on them",
    category: "behavioralPatterns",
  },
  {
    question:
      "I tend to collect items related to my interests and become deeply knowledgeable about them",
    category: "behavioralPatterns",
  },
  {
    question: "I am easily overwhelmed by loud noises or bright lights",
    category: "sensoryProcessing",
  },
  {
    question:
      "I tend to notice small sounds or visual details that others may not be aware of",
    category: "sensoryProcessing",
  },
  {
    question:
      "I feel uncomfortable or anxious in crowded places due to sensory overload",
    category: "sensoryProcessing",
  },
  {
    question:
      "I am particularly sensitive to certain smells and find it hard to be in environments where they are present",
    category: "sensoryProcessing",
  },
  {
    question:
      "I find it soothing to engage in sensory activities, such as touching soft fabrics or listening to calming sounds",
    category: "sensoryProcessing",
  },
];

const scoreMapping = {
  "Strongly Disagree": 0,
  Disagree: 2,
  Neutral: 5,
  Agree: 8,
  "Strongly Agree": 10,
};

const StrengthTest = () => {
  const disptach = useDispatch();
  const navigate = useNavigate();
  const [responses, setResponses] = useState(
    questions.reduce((acc, question, index) => {
      acc[`${question.category}-${index}`] = null; // Initialize all questions with a null response
      return acc;
    }, {})
  );

  const [strengths, setStrengths] = useState("");
  const [weaknesses, setWeaknesses] = useState("");

  const handleAnswerChange = (category, index, score) => {
    setResponses((prevState) => ({
      ...prevState,
      [`${category}-${index}`]: score, // Update the score for the specific question
    }));
  };

  const handleStrengthChange = (e) => setStrengths(e.target.value);
  const handleWeaknessChange = (e) => setWeaknesses(e.target.value);

  const calculateCategoryAverage = (responses, category) => {
    // Filter the responses based on the category
    const categoryResponses = Object.keys(responses)
      .filter((key) => key.startsWith(category))
      .map((key) => responses[key]);

    // Sum the scores of the category responses
    const sum = categoryResponses.reduce((acc, score) => acc + score, 0);

    // Calculate the average
    const average = sum / categoryResponses.length;

    return average;
  };

  const submitTest = async (e) => {
    const categories = [
      "socialInteraction",
      "communication",
      "behavioralPatterns",
      "sensoryProcessing",
    ];

    // Calculate the average for each category
    const categoryAverages = categories.reduce((acc, category) => {
      acc[category] = calculateCategoryAverage(responses, category);
      return acc;
    }, {});

    const userData = await UserApi.updateUserObj("strength_Weakness", {
      categoryAverages,
      weaknesses,
      strengths,
    });
    disptach(setUser(userData));
    navigate("/me");
  };
  return (
    <div className="relative min-h-screen w-full">
      {/* Header */}
      <Header />

      <div className="max-w-[1200px] mx-auto bg-white rounded-lg mt-24 p-6">
        <h2 className="text-2xl font-semibold mb-6">
          Autism Strengths and Weaknesses Test
        </h2>

        {/* Table for Question and Answers */}
        <table className="w-full table-auto border-collapse mb-6">
          <thead>
            <tr>
              <th className="border px-4 py-2 text-left">Question</th>
              <th className="border px-4 py-2 text-center">
                Strongly Disagree
              </th>
              <th className="border px-4 py-2 text-center">Disagree</th>
              <th className="border px-4 py-2 text-center">Neutral</th>
              <th className="border px-4 py-2 text-center">Agree</th>
              <th className="border px-4 py-2 text-center">Strongly Agree</th>
            </tr>
          </thead>
          <tbody>
            {questions.map((question, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{question.question}</td>
                {Object.keys(scoreMapping).map((option, i) => {
                  const score = scoreMapping[option];
                  return (
                    <td key={i} className="border px-4 py-2 text-center">
                      <input
                        type="checkbox"
                        id={`${question.category}-${index}-${score}`}
                        name={`${question.category}-${index}`}
                        checked={
                          responses[`${question.category}-${index}`] === score
                        }
                        onChange={() =>
                          handleAnswerChange(question.category, index, score)
                        }
                        className="mr-2"
                      />
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Input for Strengths and Weaknesses */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold">Your Strengths</h3>
          <textarea
            value={strengths}
            onChange={handleStrengthChange}
            placeholder="Write your strengths here..."
            className="w-full !border !border-gray-400  px-4 py-2 rounded-md"
            rows="4"></textarea>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold">Your Weaknesses</h3>
          <textarea
            value={weaknesses}
            onChange={handleWeaknessChange}
            placeholder="Write your weaknesses here..."
            className="w-full !border !border-gray-400 px-4 py-2 rounded-md"
            rows="4"></textarea>
        </div>
        <button
          onClick={submitTest}
          className="!border !border-gray-600 !bg-black w-full text-white px-6 py-1 rounded-md">
          Finish
        </button>
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default StrengthTest;
