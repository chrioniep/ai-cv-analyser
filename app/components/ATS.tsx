interface ATSProps {
  score: number;
  suggestions: {
    type: "good" | "improve";
    tip: string;
  }[];
}

function ATS({ score, suggestions }: ATSProps) {
  // Determine background gradient and icon based on score
  const getBackgroundClass = () => {
    if (score > 69) return "from-green-100";
    if (score > 49) return "from-yellow-100";
    return "from-red-100";
  };

  const getIcon = () => {
    if (score > 69) return "/icons/ats-good.svg";
    if (score > 49) return "/icons/ats-warning.svg";
    return "/icons/ats-bad.svg";
  };

  const getSubtitle = () => {
    if (score > 69) return "Excellent ATS Compatibility";
    if (score > 49) return "Good ATS Compatibility";
    return "Needs ATS Improvement";
  };

  const getExplanation = () => {
    if (score > 69) {
      return "Your resume is well-optimized for Applicant Tracking Systems. It follows best practices and should pass through most ATS filters successfully.";
    }
    if (score > 49) {
      return "Your resume has decent ATS compatibility but could benefit from some improvements to increase your chances of getting through automated screening.";
    }
    return "Your resume needs significant improvements to pass through Applicant Tracking Systems. Consider implementing the suggestions below to enhance your ATS compatibility.";
  };

  return (
    <div
      className={`bg-gradient-to-br ${getBackgroundClass()} to-white rounded-lg p-6 shadow-lg`}
    >
      {/* Top section with icon */}
      <div className="flex items-center mb-4">
        <img
          src={getIcon()}
          alt="ATS Score Icon"
          className="w-8 h-8 mr-3"
        />
        <h2 className="text-xl font-semibold text-gray-800">
          ATS Score: {score}/100
        </h2>
      </div>

      {/* Description section */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-800 mb-2">
          {getSubtitle()}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          {getExplanation()}
        </p>
      </div>

      {/* Suggestions list */}
      {suggestions.length > 0 && (
        <div className="mb-6">
          <h4 className="text-md font-medium text-gray-800 mb-3">
            Suggestions:
          </h4>
          <ul className="space-y-2">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                className="flex items-start"
              >
                <img
                  src={
                    suggestion.type === "good"
                      ? "/icons/check.svg"
                      : "/icons/warning.svg"
                  }
                  alt={suggestion.type === "good" ? "Good" : "Warning"}
                  className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0"
                />
                <span className="text-sm text-gray-700">{suggestion.tip}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Closing encouragement */}
      <div className="text-center pt-4 border-t border-gray-200">
        <p className="text-sm text-gray-600">
          {score < 100
            ? "Keep improving your resume to increase your chances of getting noticed by employers!"
            : "Excellent work! Your resume is well-optimized for ATS systems."}
        </p>
      </div>
    </div>
  );
}

export default ATS;
