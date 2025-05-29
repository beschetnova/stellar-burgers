import burgerConstructorSlice, {
  createOrder,
  addIngredient,
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown,
  clearOrder,
  initialState
} from './burgerConstructorSlice';

describe('Тесты createOrder для burgerConstructorSlice', () => {
  const actions = {
    pending: { 
        type: createOrder.pending.type 
    },
    rejected: { 
        type: createOrder.rejected.type, 
        error: { message: 'error-message' } 
    },
    fulfilled: { 
        type: createOrder.fulfilled.type, 
        payload: { order: { _id: 'order_1' } } 
    }
  };

  test('Тест createOrder.pending', () => {
    const state = burgerConstructorSlice(initialState, actions.pending);
    expect(state.loading).toBe(true);
    expect(state.error).toBe(null);
  });

  test('Тест createOrder.rejected', () => {
    const state = burgerConstructorSlice(initialState, actions.rejected);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(actions.rejected.error.message);
  });

  test('Тест createOrder.fulfilled', () => {
    const state = burgerConstructorSlice(initialState, actions.fulfilled);
    expect(state.orderModalData).toEqual(actions.fulfilled.payload.order);
    expect(state.constructorItems.bun).toBe(null);
    expect(state.constructorItems.ingredients).toEqual([]);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(null);
  });
});

describe('Тесты экшенов для burgerConstructorSlice', () => {
  const baseIngredient = {
    _id: '643d69a5c3f7b9001cfa0941',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
    __v: 0
  };
  const ingredients = [
    { ...baseIngredient, id: '1' },
    { ...baseIngredient, id: '2' }
  ];

  test('Тест addIngredient добавляет ингредиент', () => {
    const state = burgerConstructorSlice(initialState, addIngredient(baseIngredient));
    expect(state.constructorItems.ingredients).toHaveLength(1);
    expect(state.constructorItems.ingredients[0]).toMatchObject(baseIngredient);
  });

  test('Тест removeIngredient удаляет ингредиент по id', () => {
    const newState = {
      ...initialState,
      constructorItems: {
        bun: null,
        ingredients: [ingredients[0]]
      }
    };
    const state = burgerConstructorSlice(newState, removeIngredient('1'));
    expect(state.constructorItems.ingredients.length).toBe(0);
  });

  test('Тест moveIngredientUp перемещает ингредиент вверх', () => {
    const newState = {
      ...initialState,
      constructorItems: {
        bun: null,
        ingredients
      }
    };
    const state = burgerConstructorSlice(newState, moveIngredientUp(1));
    expect(state.constructorItems.ingredients[0].id).toBe('2');
    expect(state.constructorItems.ingredients[1].id).toBe('1');
  });

  test('Тест moveIngredientDown перемещает ингредиент вниз', () => {
    const newState = {
      ...initialState,
      constructorItems: {
        bun: null,
        ingredients
      }
    };
    const state = burgerConstructorSlice(newState, moveIngredientDown(0));
    expect(state.constructorItems.ingredients[0].id).toBe('2');
    expect(state.constructorItems.ingredients[1].id).toBe('1');
  });

  test('Тест clearOrder очищает состояние', () => {
    const oldState = {
      ...initialState,
      constructorItems: {
        bun: { ...baseIngredient, type: 'bun', id: '1' },
        ingredients: [ { ...baseIngredient, id: '2' } ]
      }
    };
    const state = burgerConstructorSlice(oldState, clearOrder());
    expect(state).toEqual(initialState);
  });
});
