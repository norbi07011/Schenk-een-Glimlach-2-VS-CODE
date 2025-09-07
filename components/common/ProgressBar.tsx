import React from 'react';

interface ProgressBarProps {
  totalSteps: number;
  currentStep: number;
  stepLabels: string[];
}

const ProgressBar: React.FC<ProgressBarProps> = ({ totalSteps, currentStep, stepLabels }) => {
  return (
    <div className="w-full px-4 sm:px-8">
      <div className="flex items-center">
        {Array.from({ length: totalSteps }, (_, i) => {
          const step = i + 1;
          const isCompleted = step < currentStep;
          const isActive = step === currentStep;

          return (
            <React.Fragment key={step}>
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm sm:text-base font-bold transition-all duration-300 ${
                    isCompleted ? 'bg-green-500 text-white' : isActive ? 'bg-primary text-white' : 'bg-gray-200 dark:bg-zinc-700 text-gray-500 dark:text-gray-400'
                  }`}
                >
                  {isCompleted ? '✔' : step}
                </div>
                 <p className={`mt-2 text-xs text-center transition-colors duration-300 ${isActive ? 'text-primary font-semibold' : 'text-gray-500 dark:text-gray-400'}`}>
                    {stepLabels[i]}
                </p>
              </div>
              {step < totalSteps && (
                <div className={`flex-auto border-t-2 transition-colors duration-300 mx-2 ${isCompleted ? 'border-green-500' : 'border-gray-200 dark:border-zinc-700'}`}></div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressBar;
