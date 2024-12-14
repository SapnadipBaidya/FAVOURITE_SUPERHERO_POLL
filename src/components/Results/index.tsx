import React, { useState, useEffect, useMemo } from 'react';
import { Poll } from '../../types/Poll';

interface ResultsProps {
  poll: Poll;
  viewWinner: boolean;
  setViewWinner: (viewWinner: boolean) => void;
  totalVotes: number;
}

const Results: React.FC<ResultsProps> = ({ poll, viewWinner, setViewWinner, totalVotes }) => {
  const [leadingText, setLeadingText] = useState("");

  const [leadingOption, otherOption] = useMemo(() => {
    return poll.options[0].votes > poll.options[1].votes
      ? [poll.options[0], poll.options[1]]
      : [poll.options[1], poll.options[0]];
  }, [poll.options]);

  const calculatedLeadingText = useMemo(() => {
    if (poll.options[0].votes === 0 && poll.options[1].votes === 0) {
      return "";
    } else if (poll.options[0].votes === poll.options[1].votes) {
      return "It's a tie";
    } else {
      const difference = Math.abs(leadingOption.votes - otherOption.votes);
      return `${leadingOption.text} is leading by ${difference} vote${difference > 1 ? "s" : ""}`;
    }
  }, [poll.options, leadingOption, otherOption]);

  const handleViewWinnerHOC = () => {
    if (poll.options[0].votes === 0 && poll.options[1].votes === 0) {
      setLeadingText("No Vote Cast");
    } else if (poll.options[0].votes === poll.options[1].votes) {
      setLeadingText("It's a tie");
    } else {
      const difference = Math.abs(leadingOption.votes - otherOption.votes);
      setLeadingText(`${leadingOption.text} won by ${difference} vote${difference > 1 ? "s" : ""}`);
    }
    setViewWinner(true);
  };

  useEffect(() => {
    setLeadingText(calculatedLeadingText);
  }, [calculatedLeadingText]);

  return (
    <>
      <p data-testid="result">{leadingText}</p>
      <section className="layout-row align-items-center justify-content-center mr-10 ml-10 pr-10 pl-10">
        <button
          data-testid="winner-button"
          onClick={handleViewWinnerHOC}
          disabled={viewWinner || totalVotes === 0}
        >
          View Winner
        </button>
      </section>
    </>
  );
};

export default Results;