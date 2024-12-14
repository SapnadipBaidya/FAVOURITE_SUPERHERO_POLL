import React from 'react';
import { PollOption } from '../../types/Poll';

interface VoteProps {
  options: PollOption[];
  onVote: (optionId: number) => void;
  viewWinner: boolean;
}

const Vote: React.FC<VoteProps> = ({ options, onVote ,viewWinner}) => {
  return (
    <div className="vote-container w-40 h-50">
      {options.map((option, index) => (
        <div key={option.id} data-testid={`option-${option.id}`} className="card mr-10 ml-10 w-100">
          <section className="layout-row align-items-center justify-content-center mr-10 ml-10 pr-10 pl-10">
            <h3 data-testid={`choice-${option.id}`}>{option.text}</h3>
          </section>
          <section className="layout-row align-items-center justify-content-center mr-10 ml-10 mb-10 pr-10 pl-10">
            <button
              onClick={() => onVote(option.id)}
              disabled={viewWinner}
              data-testid={`vote-button-${option.id}`}
            >
              Vote
            </button>
          </section>
        </div>
      ))}
    </div>
  );
};

export default Vote;