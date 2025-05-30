import orderSlice, {
  getOrderByNumber,
  initialState
} from './orderSlice';

describe('Тесты getOrderByNumber для orderSlice', function() {
    const actions = {
        pending: {
            type: getOrderByNumber.pending.type,
            payload: null
        },
        rejected: {
            type: getOrderByNumber.rejected.type,
            error: { message: 'error-message' }
        },
        fulfilled: {
            type: getOrderByNumber.fulfilled.type,
            payload: { orders: ['order_1', 'order_2'] }
        }
    };

    test('Тeст etOrderByNumber.pending', function() {
        const state = orderSlice(initialState, actions.pending);
        expect(state.request).toBe(true);
        expect(state.error).toBe(null); 
    });

    test('Тeст getOrderByNumber.rejected', function() {
        const state = orderSlice(initialState, actions.rejected);
        expect(state.request).toBe(false);
        expect(state.error).toBe(actions.rejected.error.message);
    });

    test('Тeст getOrderByNumber.fulfilled', function() {
        const state = orderSlice(initialState, actions.fulfilled);
        expect(state.request).toBe(false);
        expect(state.orderByNumberResponse).toBe(actions.fulfilled.payload.orders[0]);
        expect(state.error).toBe(null);
    });
});
