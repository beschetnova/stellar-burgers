import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  nanoid
} from '@reduxjs/toolkit';
import { orderBurgerApi } from '@api';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';

type TBurgerConsturctorState = {
  constructorItems: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  orderRequest: boolean;
  orderModalData: TOrder | null;
  loading: boolean;
  error: string | null;
};

const initialState: TBurgerConsturctorState = {
  constructorItems: {
    bun: null,
    ingredients: []
  },
  orderRequest: false,
  orderModalData: null,
  loading: false,
  error: null
};

export const createOrder = createAsyncThunk(
  'user/createOrder',
  async (data: string[]) => orderBurgerApi(data)
);

export const burgerConstructorSlice = createSlice({
  name: 'constructorBurger',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.constructorItems.bun = action.payload;
        } else {
          state.constructorItems.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => {
        const id = nanoid();
        return { payload: { ...ingredient, id } };
      }
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (i) => i.id !== action.payload
        );
    },
    moveIngredientUp: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      const ingredients = state.constructorItems.ingredients;

      if (index > 0) {
        [ingredients[index], ingredients[index - 1]] = [
          ingredients[index - 1],
          ingredients[index]
        ];
      }
    },
    moveIngredientDown: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      const ingredients = state.constructorItems.ingredients;

      if (index < ingredients.length - 1) {
        [ingredients[index], ingredients[index + 1]] = [
          ingredients[index + 1],
          ingredients[index]
        ];
      }
    },
    clearOrder: (state) => initialState,
    setRequest: (state, action) => {
      state.orderRequest = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state, action) => {
        state.orderRequest = true;
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.orderRequest = false;
        state.loading = false;
        state.error = action.error.message as string;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload.order;
        state.constructorItems = {
          bun: null,
          ingredients: []
        };
        state.loading = false;
        state.error = null;
      });
  },
  selectors: {
    getBurgerConstructorState: (state) => state
  }
});

export default burgerConstructorSlice.reducer;
export const {
  addIngredient,
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown,
  clearOrder,
  setRequest
} = burgerConstructorSlice.actions;
export const { getBurgerConstructorState } = burgerConstructorSlice.selectors;
