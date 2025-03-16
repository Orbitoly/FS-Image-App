import { ImageAPIService } from "@/types/api";
import { Image, VoteType, ImageMetadata } from "@/types/image";

class MockImagesApi implements ImageAPIService {
  private images: Image[] = [];

  constructor() {
    // Initialize with some mock data
    for (let i = 0; i < 100; i++) {
      // Use a specific image ID instead of random to ensure consistency
      // Picsum Photos has images with IDs from 1 to 1000
      const imageId = (i % 1000) + 1; // Ensure we stay within valid range
      this.images.push({
        id: String(i + 1),
        url: `https://picsum.photos/id/${imageId}/200/300`,
        likes: Math.floor(Math.random() * 1000000),
        dislikes: Math.floor(Math.random() * 1000),
      });
    }
  }

  async getImages(): Promise<Image[]> {
    // Simulate network latency
    await new Promise((resolve) => setTimeout(resolve, 200));
    return [...this.images];
  }

  async getImageMetadata(): Promise<ImageMetadata[]> {
    // Simulate network latency
    await new Promise((resolve) => setTimeout(resolve, 150));
    return this.images.map((img) => ({
      id: img.id,
      likes: img.likes,
      dislikes: img.dislikes,
    }));
  }

  async voteImage(imageId: string, voteType: VoteType): Promise<number> {
    // Simulate network latency
    await new Promise((resolve) => setTimeout(resolve, 300));

    const image = this.images.find((img) => img.id === imageId);
    if (!image) {
      throw new Error("Image not found");
    }

    if (voteType === "like") {
      image.likes += 1;
    } else {
      image.dislikes += 1;
    }
    return image.likes;
  }

  async exportVotes(): Promise<Blob> {
    await new Promise((resolve) => setTimeout(resolve, 200));
    const headers = ["Image ID", "URL", "Likes", "Dislikes"];
    const rows = this.images.map((img) => [
      img.id,
      img.url,
      img.likes,
      img.dislikes,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    return new Blob([csvContent], { type: "text/csv" });
  }
}

export const mockImagesApi = new MockImagesApi();
