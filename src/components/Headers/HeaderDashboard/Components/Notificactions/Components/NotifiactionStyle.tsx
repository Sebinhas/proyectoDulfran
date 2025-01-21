
const NotifiactionStyle = ({ type }: { type: string }) => {
  const baseIconClasses = 'flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full';

  switch (type) {
    case 'info':
      return (
        <div className={`${baseIconClasses} bg-blue-50`}>
          <svg
            className="w-5 h-5 text-blue-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      );
    case 'warning':
      return (
        <div className={`${baseIconClasses} bg-yellow-50`}>
          <svg
            className="w-5 h-5 text-yellow-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
      );
    case 'success':
      return (
        <div className={`${baseIconClasses} bg-green-50`}>
          <svg
            className="w-5 h-5 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      );
    case 'error':
      return (
        <div className={`${baseIconClasses} bg-red-50`}>
          <svg
            className="w-5 h-5 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      );
    default:
      return null;
  }
};

export default NotifiactionStyle;
