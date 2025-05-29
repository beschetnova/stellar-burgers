import { selectors } from './selectors';

type SelectorKey = keyof typeof selectors;

declare global {
  namespace Cypress {
    interface Chainable {
      addIngredient(type: SelectorKey, name: string): Chainable<JQuery<HTMLElement>>;
    }
  }
}

Cypress.Commands.add('addIngredient', (type: SelectorKey, name: string) => {
  cy.get(selectors[type]).contains(name).parent().contains('Добавить').click();
});

export {}; 
