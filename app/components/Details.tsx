import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionContent,
} from "./Accordion";
import { cn } from "../lib/utils";

// Types
interface Tip {
  type: "good" | "improve";
  tip: string;
  explanation: string;
}

interface Category {
  title: string;
  score: number;
  tips: Tip[];
}

interface Feedback {
  toneAndStyle: Category;
  content: Category;
  structure: Category;
  skills: Category;
}

// Helper Components
const ScoreBadge: React.FC<{ score: number }> = ({ score }) => {
  const getBadgeStyle = () => {
    if (score > 69) {
      return "bg-green-100 text-green-800 border-green-200";
    } else if (score > 39) {
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    } else {
      return "bg-red-100 text-red-800 border-red-200";
    }
  };

  const getIcon = () => {
    if (score > 69) {
      return (
        <svg
          className="w-4 h-4"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      );
    }
    return null;
  };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 px-2 py-1 rounded-full text-sm font-medium border",
        getBadgeStyle()
      )}
    >
      {getIcon()}
      <span>{score}/100</span>
    </div>
  );
};

const CategoryHeader: React.FC<{ title: string; categoryScore: number }> = ({
  title,
  categoryScore,
}) => {
  return (
    <div className="flex items-center justify-between w-full gap-2">
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      <ScoreBadge score={categoryScore} />
    </div>
  );
};

const CategoryContent: React.FC<{ tips: Tip[] }> = ({ tips }) => {
  const goodTips = tips.filter((tip) => tip.type === "good");
  const improveTips = tips.filter((tip) => tip.type === "improve");

  return (
    <div className="space-y-6">
      {/* Tips Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tips.map((tip, index) => (
          <div
            key={index}
            className={cn(
              "flex items-start gap-3 p-3 rounded-lg",
              tip.type === "good"
                ? "bg-gray-50 border border-green-200"
                : "bg-gray-50 border border-yellow-200"
            )}
          >
            <div
              className={cn(
                "flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center",
                tip.type === "good"
                  ? "bg-green-100 text-green-600"
                  : "bg-yellow-100 text-yellow-600"
              )}
            >
              {tip.type === "good" ? (
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">{tip.tip}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Explanations */}
      <div className="space-y-4">
        {goodTips.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-green-700 mb-2">
              What you're doing well:
            </h4>
            <div className="space-y-2">
              {goodTips.map((tip, index) => (
                <div
                  key={index}
                  className="bg-green-50 border border-green-200 rounded-lg p-3"
                >
                  <p className="text-sm text-green-800">{tip.explanation}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {improveTips.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-yellow-700 mb-2">
              Areas for improvement:
            </h4>
            <div className="space-y-2">
              {improveTips.map((tip, index) => (
                <div
                  key={index}
                  className="bg-yellow-50 border border-yellow-200 rounded-lg p-3"
                >
                  <p className="text-sm text-yellow-800">{tip.explanation}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Main Component
interface DetailsProps {
  feedback: Feedback;
}

const Details: React.FC<DetailsProps> = ({ feedback }) => {
  const categories = [
    { key: "toneAndStyle", title: "Tone & Style", data: feedback.toneAndStyle },
    { key: "content", title: "Content", data: feedback.content },
    { key: "structure", title: "Structure", data: feedback.structure },
    { key: "skills", title: "Skills", data: feedback.skills },
  ];

  return (
    <div className="w-full">
      <Accordion className="w-full">
        {categories.map((category) => (
          <AccordionItem
            key={category.key}
            id={category.key}
          >
            <AccordionHeader itemId={category.key}>
              <CategoryHeader
                title={category.title}
                categoryScore={category.data.score}
              />
            </AccordionHeader>
            <AccordionContent itemId={category.key}>
              <CategoryContent tips={category.data.tips} />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default Details;
