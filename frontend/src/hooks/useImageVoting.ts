import { useState } from "react";
import { api } from "@/services/imagesApi";
import { useSnackbar } from "@/hooks/useSnackbar";

export type VoteType = "like" | "dislike";

export const useImageVoting = (
  imageId: string,
  initialLikes: number,
  initialDislikes: number
) => {
  const [likes, setLikes] = useState(initialLikes);
  const [dislikes, setDislikes] = useState(initialDislikes);
  const [isVoting, setIsVoting] = useState<VoteType | null>(null);
  const { showSnackbar } = useSnackbar();

  const handleVote = async (voteType: VoteType) => {
    // Don't allow voting if already in progress
    if (isVoting) return;

    // Set loading state
    setIsVoting(voteType);

    // Optimistically update the UI
    if (voteType === "like") {
      setLikes((prev) => prev + 1);
    } else {
      setDislikes((prev) => prev + 1);
    }

    try {
      // Make the API call
      const updatedCount = await api.voteImage(imageId, voteType);

      // Update with the actual count from the server
      if (voteType === "like") {
        setLikes(updatedCount);
      } else {
        setDislikes(updatedCount);
      }

      showSnackbar(`You ${voteType}d this image!`, "success");
    } catch (e) {
      console.error(`Error voting for image ${imageId} (${voteType}):`, e);

      // Revert the optimistic update
      if (voteType === "like") {
        setLikes((prev) => prev - 1);
      } else {
        setDislikes((prev) => prev - 1);
      }

      showSnackbar(`Failed to ${voteType} image. Please try again.`, "error");
    } finally {
      setIsVoting(null);
    }
  };

  return {
    likes,
    dislikes,
    isVoting,
    handleVote,
  };
};
