import React, { createContext, useState, useEffect, ReactNode } from "react";
import { createPortal } from "react-dom";

type SnackbarType = "success" | "error" | "info";

interface SnackbarMessage {
  message: string;
  type: SnackbarType;
}

interface SnackbarContextType {
  showSnackbar: (message: string, type?: SnackbarType) => void;
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined
);

// Export the context for use in the hook file
export { SnackbarContext };

interface SnackbarProps {
  message: string;
  type: SnackbarType;
  onClose: () => void;
}

const Snackbar: React.FC<SnackbarProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 2500);
    return () => clearTimeout(timer);
  }, [onClose]);

  return createPortal(
    <div
      className={`fixed bottom-4 right-4 px-4 py-2 rounded-md text-white shadow-lg transition-opacity duration-300 flex items-center justify-between z-50 ${
        type === "success"
          ? "bg-green-500"
          : type === "error"
          ? "bg-red-500"
          : "bg-blue-500"
      }`}
      role="alert"
    >
      <span>{message}</span>
      <button
        onClick={onClose}
        className="ml-4 text-white hover:text-gray-200 focus:outline-none"
        aria-label="Close"
      >
        ×
      </button>
    </div>,
    document.body // this component is rendered in the body
  );
};

interface SnackbarProviderProps {
  children: ReactNode;
}

export const SnackbarProvider: React.FC<SnackbarProviderProps> = ({
  children,
}) => {
  const [snackbar, setSnackbar] = useState<SnackbarMessage | null>(null);
  let snackbarTimeout: NodeJS.Timeout | null = null;

  const showSnackbar = (message: string, type: SnackbarType = "info") => {
    setSnackbar((prev) => {
      if (prev?.message === message && prev?.type === type) return prev; // Prevent unnecessary re-renders
      return { message, type };
    });

    if (snackbarTimeout) clearTimeout(snackbarTimeout);
    snackbarTimeout = setTimeout(() => setSnackbar(null), 2500);
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      {snackbar && (
        <Snackbar
          message={snackbar.message}
          type={snackbar.type}
          onClose={() => setSnackbar(null)}
        />
      )}
    </SnackbarContext.Provider>
  );
};
