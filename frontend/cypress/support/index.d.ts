/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to verify a file download
     * @example cy.verifyDownload('filename.ext')
     */
    verifyDownload(
      filename: string,
      options?: { timeout?: number }
    ): Chainable<string>;
  }
}
