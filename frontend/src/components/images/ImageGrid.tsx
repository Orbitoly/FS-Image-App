import React from "react";
import ImageCard from "./ImageCard";
import { Image } from "@/types/image";

interface ImageGridProps {
  images: Image[];
}

const ImageGrid: React.FC<ImageGridProps> = ({ images }) => {
  if (!images || images.length === 0) {
    return (
      <div
        className="flex-grow p-8 flex items-center justify-center"
        data-testid="empty-image-grid"
      >
        <p className="text-gray-500 text-lg">No images available</p>
      </div>
    );
  }

  return (
    <div className="flex-grow p-8" data-testid="image-grid">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.map((image) => (
          <div key={image.id} data-testid={`image-container-${image.id}`}>
            <ImageCard image={image} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGrid;
