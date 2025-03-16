describe("Homepage", () => {
  beforeEach(() => {
    // Visit the homepage before each test
    cy.visit("http://localhost:5175/");
  });

  it("should load the homepage with images", () => {
    // Check if the header is visible
    cy.get("header").should("be.visible");

    // Check if the image grid is visible
    cy.get('[data-testid="image-grid"]').should("be.visible");

    // Check if at least one image card is visible
    cy.get('[data-testid="image-card"]').should("be.visible");

    // Check if multiple image cards are loaded
    cy.get('[data-testid="image-card"]').should("have.length.greaterThan", 0);
  });

  it("should be able to like an image", () => {
    // Get the first image card
    cy.get('[data-testid="image-card"]').first().as("firstCard");

    // Get the like button and its initial count
    cy.get("@firstCard").find('[data-testid="like-button"]').as("likeButton");
    cy.get("@likeButton")
      .invoke("text")
      .then((text) => {
        // Extract the number from the text
        const initialCount = parseInt(text.replace(/\D/g, "") || "0");

        // Click the like button
        cy.get("@likeButton").click();

        // Wait for the count to update
        cy.wait(500);

        // Check if the count increased
        cy.get("@likeButton")
          .invoke("text")
          .then((updatedText) => {
            const updatedCount = parseInt(
              updatedText.replace(/\D/g, "") || "0"
            );
            expect(updatedCount).to.be.greaterThan(initialCount);
          });
      });
  });

  it("should be able to dislike an image", () => {
    // Get the first image card
    cy.get('[data-testid="image-card"]').first().as("firstCard");

    // Get the dislike button and its initial count
    cy.get("@firstCard")
      .find('[data-testid="dislike-button"]')
      .as("dislikeButton");
    cy.get("@dislikeButton")
      .invoke("text")
      .then((text) => {
        // Extract the number from the text
        const initialCount = parseInt(text.replace(/\D/g, "") || "0");

        // Click the dislike button
        cy.get("@dislikeButton").click();

        // Wait for the count to update
        cy.wait(500);

        // Check if the count increased
        cy.get("@dislikeButton")
          .invoke("text")
          .then((updatedText) => {
            const updatedCount = parseInt(
              updatedText.replace(/\D/g, "") || "0"
            );
            expect(updatedCount).to.be.greaterThan(initialCount);
          });
      });
  });

  it("should be able to export votes", () => {
    // Find and click the export button
    cy.get('[data-testid="export-button"]').click();

    // Verify the download - Cypress automatically handles downloads
    // We can check that the download was triggered
    cy.verifyDownload("votes.csv", { timeout: 5000 });
  });
});
