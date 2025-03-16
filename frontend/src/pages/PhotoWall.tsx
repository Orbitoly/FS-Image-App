import React from "react";
import { ImagesController } from "../components/images";
import { ExportButton } from "@/components/ExportButton";

const PhotoWall: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <header
        className="flex justify-between items-center mb-6"
        data-testid="header"
      >
        <h1 className="text-3xl font-bold">Image Gallery</h1>
        <ExportButton />
      </header>
      <ImagesController />
    </div>
  );
};

export default PhotoWall;
