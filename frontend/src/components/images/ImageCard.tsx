import React, { useState, memo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ImageOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThumbsUp, ThumbsDown, Loader2 } from "lucide-react";
import { formatCount } from "../../utils/format-count";
import { cn } from "@/lib/utils";
import { Image } from "@/types/image";
import { useImageVoting } from "@/hooks/useImageVoting";

interface ImageCardProps {
  image: Image;
}

const ImageCard: React.FC<ImageCardProps> = ({ image }) => {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { likes, dislikes, isVoting, handleVote } = useImageVoting(
    image.id,
    image.likes,
    image.dislikes
  );

  const handleImageError = () => {
    setImageError(true);
    setIsLoading(false);
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <Card
      className="overflow-hidden h-full flex flex-col"
      data-testid="image-card"
    >
      <div className="relative pt-[75%] bg-gray-100 dark:bg-gray-800">
        {isLoading && (
          <div
            className="absolute inset-0 flex items-center justify-center"
            data-testid="image-loading"
          >
            <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
          </div>
        )}

        {imageError ? (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center p-4 text-gray-400"
            data-testid="image-error"
          >
            <ImageOff className="h-12 w-12 mb-2" />
            <p className="text-sm text-center">Failed to load image</p>
          </div>
        ) : (
          <img
            src={image.url}
            alt={`Image ${image.id}`}
            className={cn(
              "absolute inset-0 w-full h-full object-cover transition-opacity duration-300",
              isLoading ? "opacity-0" : "opacity-100"
            )}
            onError={handleImageError}
            onLoad={handleImageLoad}
            data-testid="image"
          />
        )}
      </div>

      <CardContent className="p-4 flex-grow flex flex-col justify-between">
        <div className="flex justify-between items-center mt-2">
          <Button
            variant="outline"
            size="sm"
            className={cn(
              "flex items-center gap-1",
              isVoting === "like" && "opacity-50 cursor-not-allowed"
            )}
            onClick={() => handleVote("like")}
            disabled={isVoting !== null}
            data-testid="like-button"
          >
            <ThumbsUp className="h-4 w-4" />
            <span>{formatCount(likes)}</span>
            {isVoting === "like" && (
              <Loader2 className="h-3 w-3 animate-spin ml-1" />
            )}
          </Button>

          <Button
            variant="outline"
            size="sm"
            className={cn(
              "flex items-center gap-1",
              isVoting === "dislike" && "opacity-50 cursor-not-allowed"
            )}
            onClick={() => handleVote("dislike")}
            disabled={isVoting !== null}
            data-testid="dislike-button"
          >
            <ThumbsDown className="h-4 w-4" />
            <span>{formatCount(dislikes)}</span>
            {isVoting === "dislike" && (
              <Loader2 className="h-3 w-3 animate-spin ml-1" />
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

// Use memo to prevent unnecessary re-renders
export default memo(ImageCard);
