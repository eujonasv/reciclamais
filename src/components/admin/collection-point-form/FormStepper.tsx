
import React from 'react';
import { cn } from "@/lib/utils";
import { Check } from 'lucide-react';

interface FormStepperProps {
  currentStep: number;
  steps: string[];
}

const FormStepper: React.FC<FormStepperProps> = ({ currentStep, steps }) => {
  return (
    <div className="flex justify-between items-center">
      {steps.map((step, index) => {
        const stepIndex = index + 1;
        const isCompleted = currentStep > stepIndex;
        const isActive = currentStep === stepIndex;

        return (
          <React.Fragment key={step}>
            <div className="flex flex-col items-center text-center w-20">
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 border-2",
                  isCompleted ? "bg-primary border-primary text-primary-foreground" : "bg-transparent border-border",
                  isActive && "border-primary"
                )}
              >
                {isCompleted ? <Check size={20} /> : <span className={cn(isActive && "text-primary font-bold")}>{stepIndex}</span>}
              </div>
              <p className={cn(
                "text-xs mt-2 transition-colors", 
                isActive ? "font-semibold text-primary" : "text-muted-foreground"
              )}>
                {step}
              </p>
            </div>
            {index < steps.length - 1 && (
              <div className={cn(
                "flex-1 h-1 transition-all duration-300 -mx-2",
                isCompleted ? "bg-primary" : "bg-border"
              )} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default FormStepper;

