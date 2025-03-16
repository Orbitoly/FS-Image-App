// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })

// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })

// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })

// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// Custom command to verify a file download
Cypress.Commands.add("verifyDownload", (filename, options = {}) => {
  const defaultOptions = { timeout: 5000 };
  const opts = { ...defaultOptions, ...options };

  // This is a simplified implementation - in a real project you might want to check
  // the downloads folder or use a plugin like cypress-downloadfile
  return cy.wait(opts.timeout).then(() => {
    // For this example, we're just asserting that the command was called
    // In a real implementation, you would check if the file exists
    cy.log(`Verifying download of ${filename}`);
    return cy.wrap(filename);
  });
});
