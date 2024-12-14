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

  // Determine the leading and other options using memoization
  const [leadingOption, otherOption] = useMemo(() => {
    return poll.options[0].votes > poll.options[1].votes
      ? [poll.options[0], poll.options[1]]
      : [poll.options[1], poll.options[0]];
  }, [poll.options]);

  // Memoize leadingText to calculate only when options change
  const calculatedLeadingText = useMemo(() => {
    if (poll.options[0].votes === 0 && poll.options[1].votes === 0) {
      return "";
    } else if (poll.options[0].votes === poll.options[1].votes) {
      return "It's a tie";
    } else {
      return `${leadingOption.text} is leading by ${Math.abs(
        leadingOption.votes - otherOption.votes
      )} votes`;
    }
  }, [poll.options, leadingOption, otherOption]);

  // Handle "View Winner" button click
  const handleViewWinnerHOC = () => {
    if (poll.options[0].votes === 0 && poll.options[1].votes === 0) {
      setLeadingText("No Vote Cast");
    } else if (poll.options[0].votes === poll.options[1].votes) {
      setLeadingText("It's a tie");
    } else {
      setLeadingText(`${leadingOption.text} is the winner`);
    }
    setViewWinner(true);
  };

  // Update leading text whenever calculatedLeadingText changes
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
          disabled={viewWinner}
        >
          View Winner
        </button>
      </section>
    </>
  );
};

export default Results;