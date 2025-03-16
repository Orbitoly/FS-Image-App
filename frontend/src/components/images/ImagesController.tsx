import React, { useEffect } from "react";
import ImageGrid from "./ImageGrid";
import { useImages } from "@/hooks/useImages";
import { useSnackbar } from "@/hooks/useSnackbar";

const ImagesController: React.FC = () => {
  const { images, loading, error } = useImages();
  const { showSnackbar } = useSnackbar();

  // Use useEffect to show the snackbar when there's an error
  useEffect(() => {
    if (error) {
      showSnackbar(error, "error");
    }
  }, [error, showSnackbar]);

  if (loading) {
    return (
      <div
        className="flex justify-center items-center h-40"
        data-testid="loading-state"
      >
        <p>Loading images...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
        data-testid="error-state"
      >
        {error}
      </div>
    );
  }

  return <ImageGrid images={images} />;
};

export default ImagesController;
