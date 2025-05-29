import feedSlice, {
  getFeeds,
  initialState
} from './feedSlice';

describe('Тесты getFeeds для feedSlice', function() {
    const actions = {
        pending: {
            type: getFeeds.pending.type,
            payload: null
        },
        rejected: {
            type: getFeeds.rejected.type,
            error: { message: 'error-message' }
        },
        fulfilled: {
            type: getFeeds.fulfilled.type,
            payload: {
                orders: ['order_1', 'order_2'],
                total: 10,
                totalToday: 5
            }

        }
    };

    test('Тeст getFeeds.pending', function() {
        const state = feedSlice(initialState, actions.pending);
        expect(state.loading).toBe(true);
        expect(state.error).toBe(null); 
    });

    test('Тeст getFeeds.rejected', function() {
        const state = feedSlice(initialState, actions.rejected);
        expect(state.loading).toBe(false);
        expect(state.error).toBe(actions.rejected.error.message);
    });

    test('Тeст getFeeds.fulfilled', function() {
        const state = feedSlice(initialState, actions.fulfilled);
        expect(state.loading).toBe(false);
        expect(state.orders).toEqual(actions.fulfilled.payload.orders);
        expect(state.total).toBe(actions.fulfilled.payload.total);
        expect(state.totalToday).toBe(actions.fulfilled.payload.totalToday);
        expect(state.error).toBe(null);
    });
});
