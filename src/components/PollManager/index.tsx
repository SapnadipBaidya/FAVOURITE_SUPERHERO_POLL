import React, { useState } from 'react';
import Vote from '../Vote';
import Results from '../Results';
import { pollData } from '../../types/Poll';

const PollManager: React.FC = () => {
  const [modifiedPollData, setModifiedPollData] = useState(pollData);
  const [viewWinner, setViewWinner] = useState(false);

  const handleOnVote = (id: number) => {
    setModifiedPollData((prev) => {
      const updatedOptions = [...prev.options];
      updatedOptions[id - 1] = {
        ...updatedOptions[id - 1],
        votes: updatedOptions[id - 1].votes + 1,
      };
      return {
        ...prev,
        options: updatedOptions,
      };
    });
  };

  const handleSetViewWinner = () => {
    setViewWinner(true);
  };

  return (
    <div
      className="layout-column align-items-center justify-content-start poll-manager"
      data-testid="poll-manager"
    >
      <h2>{modifiedPollData?.question}</h2>
      <Vote
        options={modifiedPollData.options}
        onVote={handleOnVote}
        viewWinner={viewWinner}
      />
      <Results
        poll={modifiedPollData}
        viewWinner={viewWinner}
        setViewWinner={handleSetViewWinner}
        totalVotes={modifiedPollData.options.reduce(
          (sum, option) => sum + option.votes,
          0
        )}
      />
    </div>
  );
};

export default PollManager;