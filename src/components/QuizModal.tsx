import React, { useState } from 'react';

const QuizModal = ({ onClose, onPass, onFail }) => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleSubmit = () => {
    const correctAnswer = "React";
    if (selectedOption === correctAnswer) {
      onPass();
    } else {
      onFail();
    }
  };

  const options = ["Vue", "Angular", "React", "Svelte"];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md text-black">
        <h2 className="text-xl font-bold mb-4">Quick Quiz</h2>
        <p className="mb-4">What JavaScript library is used to build this game’s UI?</p>
        
        <div className="space-y-2 mb-4">
          {options.map((option) => (
            <label key={option} className="block cursor-pointer">
              <input
                type="radio"
                name="quiz"
                value={option}
                checked={selectedOption === option}
                onChange={() => setSelectedOption(option)}
                className="mr-2"
              />
              {option}
            </label>
          ))}
        </div>

        <div className="flex justify-between">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
            onClick={handleSubmit}
            disabled={!selectedOption}
          >
            Submit
          </button>
          <button
            className="text-red-500 px-4 py-2"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizModal;
