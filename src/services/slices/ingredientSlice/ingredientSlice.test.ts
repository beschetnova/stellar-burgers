import ingredientSlice, {
  getIngredient,
  initialState
} from './ingredientSlice';

describe('Тесты getIngredient для ingredientSlice', function() {
    const actions = {
        pending: {
            type: getIngredient.pending.type,
            payload: null
        },
        rejected: {
            type: getIngredient.rejected.type,
            error: { message: 'error-message' }
        },
        fulfilled: {
            type: getIngredient.fulfilled.type,
            payload: ['ingredient_1', 'ingredient_2']
        }
    };

    test('Тeст getIngredient.pending', function() {
        const state = ingredientSlice(initialState, actions.pending);
        expect(state.loading).toBe(true);
        expect(state.error).toBe(null); 
    });

    test('Тeст getIngredient.rejected', function() {
        const state = ingredientSlice(initialState, actions.rejected);
        expect(state.loading).toBe(false);
        expect(state.error).toBe(actions.rejected.error.message);
    });

    test('Тeст getIngredient.fulfilled', function() {
        const state = ingredientSlice(initialState, actions.fulfilled);
        expect(state.loading).toBe(false);
        expect(state.ingredients).toEqual(actions.fulfilled.payload);
        expect(state.error).toBe(null);
    });
});
