import { useState, useEffect } from "react";
import { Image } from "@/types/image";
import { api } from "@/services/imagesApi";

export const useImages = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImagesAndMetadata = async () => {
      try {
        setLoading(true);
        // Fetch both images and metadata in parallel
        const [apiImages, apiMetadata] = await Promise.all([
          api.getImages(),
          api.getImageMetadata(),
        ]);

        // Create a map of metadata by image ID for quick lookup
        const metadataMap = new Map(
          apiMetadata.map((meta) => [String(meta.id), meta])
        );

        // Combine image data with metadata
        const combinedImages = apiImages.map((image) => ({
          ...image,
          likes: metadataMap.get(String(image.id))?.likes || 0,
          dislikes: metadataMap.get(String(image.id))?.dislikes || 0,
        }));

        // Sort images by ID
        const sortedImages = combinedImages.sort((a: Image, b: Image) =>
          String(a.id).localeCompare(String(b.id), undefined, { numeric: true })
        );
        setImages(sortedImages);
        setError(null);
      } catch (err) {
        console.error("Error fetching images:", err);
        setError("Failed to load images. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchImagesAndMetadata();
  }, []);

  return { images, loading, error, setImages };
};
