import Cypress from 'cypress';

const bunName = 'Краторная булка N-200i';
const mainName = 'Биокотлета из марсианской Магнолии';
const sauceName = 'Соус Spicy-X';
const orderNumber = '79226';

describe('Тесты конструктора бургера', function () {
  this.beforeEach(function() {
    cy.intercept('GET', 'api/ingredients', {fixture: 'ingredients.json'});
    cy.visit('http://localhost:4000/');
    cy.viewport(1400, 900);
  });

  it('Добавление булки в бургер', function () {
    cy.get('[data-cy=bun_ingredients]').contains(bunName).parent().contains('Добавить').click();
    cy.get('[data-cy=top_bun]').should('contain', bunName);
    cy.get('[data-cy=bottom_bun]').should('contain', bunName);
  });

  it('Добавление начинки в бургер', function () {
    cy.get('[data-cy=main_ingredients]').contains(mainName).parent().contains('Добавить').click();
    cy.get('[data-cy=filling]').should('contain', mainName);
  });

  it('Добавление соуса в бургер', function () {
    cy.get('[data-cy=sauce_ingredients]').contains(sauceName).parent().contains('Добавить').click();
    cy.get('[data-cy=filling]').should('contain', sauceName);
  });
});

describe('Тесты модального окна', function () {
  this.beforeEach(function() {
    cy.intercept('GET', 'api/ingredients', {fixture: 'ingredients.json'});
    cy.visit('http://localhost:4000/');
    cy.viewport(1400, 900);
    cy.get('[data-cy=bun_ingredients]').contains(bunName).click();
    cy.get('[data-cy=modal]').should('exist');
  });

  it('Открытие модального окна ингредиента', function () {
    cy.get('[data-cy=modal]').contains(bunName).should('exist');
  });

  it('Закрытие модального окна по клику на крестик', function () {
    cy.get('[data-cy=close_button]').click();
    cy.get('[data-cy=modal]').should('not.exist');
  });

  it('Закрытие модального окна по клику на оверлей', function () {
    cy.get('[data-cy=modal_overlay]').click('right', { force: true });
    cy.get('[data-cy=modal]').should('not.exist');
  });
});

describe('Тест создания заказа', function () {
  this.beforeEach(function() {
    cy.intercept('GET', 'api/ingredients', {fixture: 'ingredients.json'});
    cy.intercept('GET', 'api/auth/user', {fixture: 'tokens.json'});
    cy.intercept('POST', 'api/orders', {fixture: 'order.json'});
    cy.visit('http://localhost:4000/');
    cy.viewport(1400, 900);

    window.localStorage.setItem('refreshToken', 'test_refreshToken');
    cy.setCookie('accessToken', 'test_accessToken');
    cy.getAllLocalStorage().should('be.not.empty');
    cy.getCookie('accessToken').should('be.not.empty');
  });

  this.afterEach(function () {
    cy.clearLocalStorage();
    cy.clearCookies();
    cy.getAllLocalStorage().should('be.empty');
    cy.getAllCookies().should('be.empty');
  });

  it('Происходит сборка бургера и успешное оформление заказа', function() {
    //Сборка бургера
    cy.get('[data-cy=bun_ingredients]').contains(bunName).parent().contains('Добавить').click();
    cy.get('[data-cy=main_ingredients]').contains(mainName).parent().contains('Добавить').click();
    cy.get('[data-cy=sauce_ingredients]').contains(sauceName).parent().contains('Добавить').click();

    //Клик по кнопке "Оформить заказ"
    cy.get('[data-cy=order_button]').click();

    //Открытие модального окна и проверка номера заказа
    cy.get('[data-cy=order_number]').should('contain', orderNumber);

    //Закрытие модального окна
    cy.get('[data-cy=close_button]').click();
    cy.get('[data-cy=modal]').should('not.exist');

    //Очистка конструктора
    cy.get('[data-cy=top_bun]').should('not.exist');
    cy.get('[data-cy=filling]').should('not.contain', mainName);
    cy.get('[data-cy=filling]').should('not.contain', sauceName);
    cy.get('[data-cy=bottom_bun]').should('not.exist');
  });
});
