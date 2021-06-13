/// <reference types="cypress" />

context("Automation", () => {
  // beforeEach(() => {
  //   cy.visit("https://www.google.com/");
  // });

  const collection = [];

  specify.only("Google Search", () => {
    cy.visit("https://www.google.com/");
    cy.get(
      "body > div.L3eUgb > div.o3j99.ikrT4e.om7nvf > form > div:nth-child(1) > div.A8SBwf > div.RNNXgb > div > div.a4bIc > input"
    ).type("site:linkedin.com/in javascript developer react 3+");

    cy.get(".FPdoLc > center > .gNO89b").click();

    cy.wait(2000);

    if (cy.get("#pnnext > span:nth-child(2)").should("have.text", "Next")) {
      cy.get(".yuRUbf").each((titleData) => {
        cy.wrap(titleData).within(() => {
          const childrens = [...titleData[0].children];

          childrens.forEach(({ children, localName, href }) => {
            let localObj = {};
            if (localName === "a") {
              localObj.socialLink = href;
              [...children].forEach(({ localName, innerText }) => {
                if (localName === "h3") {
                  console.log({ innerText });
                  localObj.fullName = innerText.split("-")[0].trim();
                }
              });
            }

            if (Object.keys(localObj).length) collection.push(localObj);
          });

          cy.readFile("./collection.json").then((data) => {
            const allCollections =
              Cypress._.uniqWith([...data, ...collection], Cypress._.isEqual) ||
              [];
            console.log({ allCollections });
            cy.writeFile("./collection.json", JSON.stringify(allCollections));
          });
        });
      });
      cy.get("#pnnext > span:nth-child(2)")
        .should("have.text", "Next")
        .click()
        .as("nextPage");
      cy.waitFor("@nextPage");
    }
  });
});
