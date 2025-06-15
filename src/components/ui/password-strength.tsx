
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Check, X } from 'lucide-react';

interface PasswordStrengthProps {
  password: string;
  className?: string;
}

const PasswordStrength: React.FC<PasswordStrengthProps> = ({ password, className }) => {
  const checks = [
    { label: "Pelo menos 8 caracteres", test: (p: string) => p.length >= 8 },
    { label: "Uma letra maiúscula", test: (p: string) => /[A-Z]/.test(p) },
    { label: "Uma letra minúscula", test: (p: string) => /[a-z]/.test(p) },
    { label: "Um número", test: (p: string) => /\d/.test(p) }
  ];

  const passedChecks = checks.filter(check => check.test(password)).length;
  const strength = (passedChecks / checks.length) * 100;

  const getStrengthLabel = () => {
    if (passedChecks === 0) return { label: "", color: "" };
    if (passedChecks <= 1) return { label: "Muito fraca", color: "text-red-500" };
    if (passedChecks <= 2) return { label: "Fraca", color: "text-orange-500" };
    if (passedChecks <= 3) return { label: "Boa", color: "text-yellow-500" };
    return { label: "Forte", color: "text-green-500" };
  };

  const strengthInfo = getStrengthLabel();

  if (!password) return null;

  return (
    <div className={className}>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Força da senha:</span>
          <span className={`text-sm font-medium ${strengthInfo.color}`}>
            {strengthInfo.label}
          </span>
        </div>
        <Progress value={strength} className="h-2" />
        <ul className="space-y-1">
          {checks.map((check, index) => (
            <li key={index} className="flex items-center text-xs">
              {check.test(password) ? (
                <Check size={12} className="text-green-500 mr-2" />
              ) : (
                <X size={12} className="text-gray-400 mr-2" />
              )}
              <span className={check.test(password) ? "text-green-700" : "text-gray-500"}>
                {check.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PasswordStrength;
