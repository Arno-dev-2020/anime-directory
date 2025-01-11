import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorMessageProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ 
  title = 'Error',
  message, 
  onRetry 
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-6 text-center">
      <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
      <h3 className="text-xl font-bold text-red-500 mb-2">{title}</h3>
      <p className="text-gray-400 mb-4 max-w-md">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center gap-2 px-6 py-2 bg-red-600 text-white rounded-lg 
            hover:bg-red-700 transition-colors"
        >
          <RefreshCw size={20} />
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorMessage; 