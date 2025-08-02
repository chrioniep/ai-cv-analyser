interface ScoreBadgeProps {
  score: number;
}

const ScoreBadge: React.FC<ScoreBadgeProps> = ({ score }) => {
  const getBadgeStyles = () => {
    if (score > 69) {
      return {
        container:
          "bg-green-100 border border-green-200 rounded-full px-3 py-1",
        text: "text-green-700 font-medium text-sm",
      };
    } else if (score > 49) {
      return {
        container:
          "bg-yellow-100 border border-yellow-200 rounded-full px-3 py-1",
        text: "text-yellow-700 font-medium text-sm",
      };
    } else {
      return {
        container: "bg-red-100 border border-red-200 rounded-full px-3 py-1",
        text: "text-red-700 font-medium text-sm",
      };
    }
  };

  const getLabel = () => {
    if (score > 69) {
      return "Strong";
    } else if (score > 49) {
      return "Good Start";
    } else {
      return "Needs Work";
    }
  };

  const styles = getBadgeStyles();

  return (
    <div className={styles.container}>
      <p className={styles.text}>{getLabel()}</p>
    </div>
  );
};

export default ScoreBadge;
