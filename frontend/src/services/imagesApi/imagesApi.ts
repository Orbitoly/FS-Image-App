import { ImageAPIService } from "@/types/api";
import { Image, VoteType, ImageMetadata } from "@/types/image";

const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
  throw new Error("API_URL is not defined");
}

// Define the vote response interface
interface VoteResponse {
  message: string;
  image_id: string | number;
  vote_type: VoteType;
  likes: number;
  dislikes: number;
}

class ImagesApi implements ImageAPIService {
  async getImages(): Promise<Image[]> {
    const response = await fetch(`${API_URL}/images`);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || "Failed to fetch images");
    }
    //TODO: validate using zod
    return response.json();
  }

  async getImageMetadata(): Promise<ImageMetadata[]> {
    const response = await fetch(`${API_URL}/images/metadata`);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || "Failed to fetch image metadata");
    }
    //TODO: validate using zod
    return response.json();
  }

  async voteImage(imageId: string, voteType: VoteType): Promise<number> {
    const response = await fetch(`${API_URL}/votes/${imageId}/${voteType}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      // Try to get detailed error message from the response
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || "Failed to vote");
    }

    // Parse the response
    const data = (await response.json()) as VoteResponse;

    // Return the updated likes count
    return voteType === "like" ? data.likes : data.dislikes;
  }

  async exportVotes(): Promise<Blob> {
    const response = await fetch(`${API_URL}/votes/export`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || "Failed to export votes");
    }
    return response.blob();
  }
}

export const imagesApi = new ImagesApi();
