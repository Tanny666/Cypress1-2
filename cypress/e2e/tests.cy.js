const admin = require("../fixtures/admin.json");
const adminUrl = admin.url;
const adminValid = admin.adminValid;
const adminInvalid = admin.adminInvalid;

const client = require("../fixtures/client.json");
const clientUrl = client.url;

const selector = require("../fixtures/selectors.json");
const adminTitleSelector = selector.adminTitleSelector;
const adminAuthButtonSelector = selector.adminAuthButtonSelector;
const navigationByDays = selector.navigationByDays;
const poster = selector.poster;
const cinemaHall = selector.cinemaHall;
const buttonOk = selector.buttonOk;

const data = require("../fixtures/data.json");
const day = data.day;
const time = data.time;
const seats = data.seats;


describe("LOG IN", () => {
  beforeEach(() => {
    cy.visit(adminUrl);
    cy.get(adminTitleSelector).should("contain", "Авторизация");
  });

  
  it("SUCCESSFULL", () => {
    cy.authAdmin(adminValid.login, adminValid.pass);
    cy.contains("Управление залами").should("be.visible");
  });


  it("should not log in with an empty login", () => {
    cy.authAdmin(adminInvalid[0].login, adminInvalid[0].pass);
    cy.get(adminAuthButtonSelector).should("be.visible");
  });

  
  it("should not log in with a blank password", () => {
    cy.authAdmin(adminInvalid[1].login, adminInvalid[1].pass);
    cy.get(adminAuthButtonSelector).should("be.visible");
  });
});
      
  describe("application functionality", () => {
  beforeEach(() => {
    cy.visit(clientUrl);
  });

  
it("Home Page Display", () => {
    cy.get(navigationByDays).should("have.length", 7);
  });


    it("Possibility of booking", () => {
    cy.get(navigationByDays + `:nth-of-type(${day})`).click();
    cy.get(poster).contains(time).click();
    seats.forEach(({ row, seat }) => {
    cy.get(cinemaHall + `:nth-child(${row}) > :nth-child(${seat})`).click();
    });
    cy.timeout(2000);
    cy.get(buttonOk).should("be.visible").and("not.be.disabled").click();
    cy.wait(2000);
    cy.get('div:nth-child(9) span:nth-child(1)').should('exist');  
    cy.get("div:nth-child(9) span:nth-child(1)").should(($list) => {
      
      seats.forEach(({ row, seat }) => {
        expect($list).to.contain(`${row}/${seat}`);
      });

    });
  });
});