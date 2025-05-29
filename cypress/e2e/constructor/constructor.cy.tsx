import Cypress from 'cypress';
import { selectors } from '../../support/selectors';
import '../../support/commands'; 

const bunName = 'Краторная булка N-200i';
const mainName = 'Биокотлета из марсианской Магнолии';
const sauceName = 'Соус Spicy-X';
const orderNumber = '79226';

describe('Тесты конструктора бургера', function () {
  this.beforeEach(function() {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.visit('/');
  });

  it('Добавление булки в бургер', function () {
    cy.addIngredient('bunIngredients', bunName);
    cy.get(selectors.topBun).should('contain', bunName);
    cy.get(selectors.bottomBun).should('contain', bunName);
  });

  it('Добавление начинки в бургер', function () {
    cy.addIngredient('mainIngredients', mainName);
    cy.get(selectors.filling).should('contain', mainName);
  });

  it('Добавление соуса в бургер', function () {
    cy.addIngredient('sauceIngredients', sauceName);
    cy.get(selectors.filling).should('contain', sauceName);
  });
});

describe('Тесты модального окна', function () {
  this.beforeEach(function() {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.visit('/');
    cy.get(selectors.bunIngredients).contains(bunName).click();
    cy.get(selectors.modal).should('exist');
  });

  it('Открытие модального окна ингредиента', function () {
    cy.get(selectors.modal).contains(bunName).should('exist');
  });

  it('Закрытие модального окна по клику на крестик', function () {
    cy.get(selectors.closeButton).click();
    cy.get(selectors.modal).should('not.exist');
  });

  it('Закрытие модального окна по клику на оверлей', function () {
    cy.get(selectors.modalOverlay).click('right', { force: true });
    cy.get(selectors.modal).should('not.exist');
  });
});

describe('Тест создания заказа', function () {
  this.beforeEach(function() {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('GET', 'api/auth/user', { fixture: 'tokens.json' });
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' });
    cy.visit('/');
    window.localStorage.setItem('refreshToken', 'test_refreshToken');
    cy.setCookie('accessToken', 'test_accessToken');
  });

  this.afterEach(function () {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  it('Происходит сборка бургера и успешное оформление заказа', function() {
    //Сборка бургера
    cy.addIngredient('bunIngredients', bunName);
    cy.addIngredient('mainIngredients', mainName);
    cy.addIngredient('sauceIngredients', sauceName);

    //Клик по кнопке "Оформить заказ"
    cy.get(selectors.orderButton).click();

    //Открытие модального окна и проверка номера заказа
    cy.get(selectors.orderNumber).should('contain', orderNumber);

    //Закрытие модального окна
    cy.get(selectors.closeButton).click();
    cy.get(selectors.modal).should('not.exist');

    //Очистка конструктора
    cy.get(selectors.topBun).should('not.exist');
    cy.get(selectors.filling).should('not.contain', mainName);
    cy.get(selectors.filling).should('not.contain', sauceName);
    cy.get(selectors.bottomBun).should('not.exist');
  });
});
