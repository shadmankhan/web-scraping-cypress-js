describe("Send Messages to Candidates", () => {
  it("Start", () => {
    const LIMIT = Cypress.env("limit");
    cy.readFile("./linkedIn-indianOrigin-LeadData.json").then((data) => {
      const leadData = data;

      const fIndex = leadData.findIndex((item) =>
        Cypress._.get(item, "sent-till-here", false)
      );
      if (fIndex !== -1) {
        const filteredData = leadData.slice(fIndex);
        const limitedData = filteredData.slice(0, LIMIT);

        /****** LOOP OVER EACH CANDIDATE */

        Cypress._.forEach(leadData, (item) => delete item["sent-till-here"]);
        leadData[leadData.indexOf(limitedData[LIMIT - 1])][
          "sent-till-here"
        ] = true;
        console.log(fIndex, filteredData);
      } else {
        const limitedData = leadData.slice(0, LIMIT);

        /****** LOOP OVER EACH CANDIDATE */
        Cypress._.forEach(limitedData, (item) => {
          console.log(item["LinkedIn URL"]);
          cy.visit(`${item["LinkedIn URL"]}`, {
            failOnStatusCode: false,
            timeout: 10000,
          });
        });

        leadData[leadData.indexOf(limitedData[LIMIT - 1])][
          "sent-till-here"
        ] = true;
        console.log({ limitedData, leadData });
      }
    });
  });
});
