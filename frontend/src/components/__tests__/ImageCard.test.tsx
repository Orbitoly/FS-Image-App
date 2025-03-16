import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect, vi, beforeEach } from "vitest";
import ImageCard from "../images/ImageCard";

// Mock the API service
vi.mock("@/services/imagesApi", () => ({
  api: {
    voteImage: vi.fn().mockResolvedValue(10),
  },
}));

// Mock the Snackbar hook
vi.mock("@/hooks/useSnackbar", () => ({
  useSnackbar: () => ({
    showSnackbar: vi.fn(),
  }),
}));

describe("ImageCard", () => {
  const mockProps = {
    image: {
      id: "1",
      url: "https://example.com/image.jpg",
      likes: 10,
      dislikes: 5,
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the image with correct attributes", () => {
    render(<ImageCard {...mockProps} />);

    const image = screen.getByTestId("image");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "https://example.com/image.jpg");
  });

  it("displays like and dislike counts", () => {
    render(<ImageCard {...mockProps} />);

    expect(screen.getByText("10")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("has functional like and dislike buttons", () => {
    render(<ImageCard {...mockProps} />);

    const likeButton = screen.getByTestId("like-button");
    const dislikeButton = screen.getByTestId("dislike-button");

    expect(likeButton).toBeInTheDocument();
    expect(dislikeButton).toBeInTheDocument();
  });
});
