import userSlice, {
    getUser,
    registerUser,
    loginUser,
    updateUser,
    logoutUser,
    getOrdersAll,
    initialState
} from './userSlice';

describe('Тесты getUser для userSlice', function() {
    const actions = {
        pending: {
            type: getUser.pending.type,
            payload: null
        },
        rejected: {
            type: getUser.rejected.type,
            payload: null
        },
        fulfilled: {
            type: getUser.fulfilled.type,
            payload: { user: {name: 'name', email: 'email'} }
        }
    };

    test('Тeст getUser.pending', function() {
        const state = userSlice(initialState, actions.pending);
        expect(state.loginUserRequest).toBe(true);
        expect(state.isAuthChecked).toBe(true);
        expect(state.isAuthenticated).toBe(false);
        expect(state.error).toBe(null); 
    });

    test('Тeст getUser.rejected', function() {
        const state = userSlice(initialState, actions.rejected);
        expect(state.loginUserRequest).toBe(false);
        expect(state.isAuthenticated).toBe(false);
        expect(state.isAuthChecked).toBe(true);
        expect(state.error).toBe(actions.rejected.payload);
    });

    test('Тeст getUser.fulfilled', function() {
        const state = userSlice(initialState, actions.fulfilled);
        expect(state.loginUserRequest).toBe(false);
        expect(state.userData).toBe(actions.fulfilled.payload.user);
        expect(state.isAuthenticated).toBe(true);
        expect(state.isAuthChecked).toBe(true);
    });
});

describe('Тесты registerUser для userSlice', function() {
    const actions = {
        pending: {
            type: registerUser.pending.type,
            payload: null
        },
        rejected: {
            type: registerUser.rejected.type,
            error: { message: 'error-message' }
        },
        fulfilled: {
            type: registerUser.fulfilled.type,
            payload: { user: {name: 'name', email: 'email'} }
        }
    };

    test('Тeст registerUser.pending', function() {
        const state = userSlice(initialState, actions.pending);
        expect(state.request).toBe(true);
        expect(state.error).toBe(null); 
        expect(state.isAuthenticated).toBe(false);
        expect(state.isAuthChecked).toBe(true);
    });

    test('Тeст registerUser.rejected', function() {
        const state = userSlice(initialState, actions.rejected);
        expect(state.request).toBe(false);
        expect(state.error).toBe(actions.rejected.error.message);
        expect(state.isAuthChecked).toBe(false);
    });

    test('Тeст registerUser.fulfilled', function() {
        const state = userSlice(initialState, actions.fulfilled);
        expect(state.request).toBe(false);
        expect(state.userData).toBe(actions.fulfilled.payload.user);
        expect(state.isAuthenticated).toBe(true);
        expect(state.isAuthChecked).toBe(false);
        expect(state.error).toBe(null);
    });
});

describe('Тесты loginUser для userSlice', function() {
    const actions = {
        pending: {
            type: loginUser.pending.type,
            payload: null
        },
        rejected: {
            type: loginUser.rejected.type,
            error: { message: 'error-message' }
        },
        fulfilled: {
            type: loginUser.fulfilled.type,
            payload: { user: {name: 'name', email: 'email'} }
        }
    };

    test('Тeст loginUser.pending', function() {
        const state = userSlice(initialState, actions.pending);
        expect(state.loginUserRequest).toBe(true);
        expect(state.error).toBe(null); 
    });

    test('Тeст loginUser.rejected', function() {
        const state = userSlice(initialState, actions.rejected);
        expect(state.loginUserRequest).toBe(false);
        expect(state.error).toBe(actions.rejected.error.message);
        expect(state.isAuthChecked).toBe(true);
    });

    test('Тeст loginUser.fulfilled', function() {
        const state = userSlice(initialState, actions.fulfilled);
        expect(state.loginUserRequest).toBe(false);
        expect(state.userData).toBe(actions.fulfilled.payload.user);
        expect(state.isAuthenticated).toBe(true);
        expect(state.isAuthChecked).toBe(true);
        expect(state.error).toBe(null);
    });
});

describe('Тесты updateUser для userSlice', function() {
    const actions = {
        pending: {
            type: updateUser.pending.type,
            payload: null
        },
        rejected: {
            type: updateUser.rejected.type,
            error: { message: 'error-message' }
        },
        fulfilled: {
            type: updateUser.fulfilled.type,
            payload: { user: {name: 'name', email: 'email'} }
        }
    };

    test('Тeст updateUser.pending', function() {
        const state = userSlice(initialState, actions.pending);
        expect(state.request).toBe(true);
        expect(state.error).toBe(null);
        expect(state.isAuthenticated).toBe(true);
        expect(state.isAuthChecked).toBe(true); 
    });

    test('Тeст updateUser.rejected', function() {
        const state = userSlice(initialState, actions.rejected);
        expect(state.request).toBe(false);
        expect(state.error).toBe(actions.rejected.error.message);
    });

    test('Тeст updateUser.fulfilled', function() {
        const state = userSlice(initialState, actions.fulfilled);
        expect(state.request).toBe(false);
        expect(state.response).toBe(actions.fulfilled.payload.user);
        expect(state.isAuthenticated).toBe(true);
        expect(state.isAuthChecked).toBe(true);
        expect(state.error).toBe(null);
    });
});

describe('Тесты logoutUser для userSlice', function() {
    const actions = {
        pending: {
            type: logoutUser.pending.type,
            payload: null
        },
        rejected: {
            type: logoutUser.rejected.type,
            error: { message: 'error-message' }
        },
        fulfilled: {
            type: logoutUser.fulfilled.type,
            payload: null
        }
    };

    test('Тeст logoutUser.pending', function() {
        const state = userSlice(initialState, actions.pending);
        expect(state.request).toBe(true);
        expect(state.error).toBe(null); 
        expect(state.isAuthenticated).toBe(true);
        expect(state.isAuthChecked).toBe(true);
    });

    test('Тeст logoutUser.rejected', function() {
        const state = userSlice(initialState, actions.rejected);
        expect(state.request).toBe(false);
        expect(state.error).toBe(actions.rejected.error.message);
        expect(state.isAuthenticated).toBe(true);
        expect(state.isAuthChecked).toBe(false);
    });

    test('Тeст logoutUser.fulfilled', function() {
        const state = userSlice(initialState, actions.fulfilled);
        expect(state.request).toBe(false);
        expect(state.userData).toBe(actions.fulfilled.payload);
        expect(state.isAuthenticated).toBe(false);
        expect(state.isAuthChecked).toBe(true);
        expect(state.error).toBe(null);
    });
});

describe('Тесты getOrdersAll для userSlice', function() {
    const actions = {
        pending: {
            type: getOrdersAll.pending.type,
            payload: null
        },
        rejected: {
            type: getOrdersAll.rejected.type,
            error: { message: 'error-message' }
        },
        fulfilled: {
            type: getOrdersAll.fulfilled.type,
            payload: ['order_1', 'order_2']
        }
    };

    test('Тeст getOrdersAll.pending', function() {
        const state = userSlice(initialState, actions.pending);
        expect(state.request).toBe(true);
        expect(state.error).toBe(null); 
    });

    test('Тeст getOrdersAll.rejected', function() {
        const state = userSlice(initialState, actions.rejected);
        expect(state.request).toBe(false);
        expect(state.error).toBe(actions.rejected.error.message);
    });

    test('Тeст getOrdersAll.fulfilled', function() {
        const state = userSlice(initialState, actions.fulfilled);
        expect(state.request).toBe(false);
        expect(state.userOrders).toBe(actions.fulfilled.payload);
    });
});
