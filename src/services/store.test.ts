import  { rootReducer } from './store';
import store from './store' 

test('Тест инициализации rootReducer', function() {
    const initialState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(initialState).toEqual(store.getState());
})
