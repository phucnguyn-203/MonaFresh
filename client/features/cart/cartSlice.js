import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cartAPI from "@/api/cartAPI";

export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
  const response = await cartAPI.getItemsInCart();
  return response.data;
});

export const addAnItemToCart = createAsyncThunk(
  "cart/addAnItemToCart",
  async (data) => {
    const { productId, quantity } = data;
    const response = await cartAPI.addAnItemToCart({ productId, quantity });
    return response.data;
  },
);

export const updateQuantityOfAnItem = createAsyncThunk(
  "/cart/updateQuantityOfAnItem",
  async ({ itemId, quantity }) => {
    const response = await cartAPI.updateQuantityOfAnItem(itemId, { quantity });
    return response.data;
  },
);

export const deleteAnItemInCart = createAsyncThunk(
  "cart/deleteAnItemInCart",
  async (itemId) => {
    const response = await cartAPI.deleteAnItemInCart(itemId);
    return response.data;
  },
);

export const deleteManyItemInCart = createAsyncThunk(
  "cart/deleteManyItemInCart",
  async (itemIds) => {
    const response = await cartAPI.deleteManyItemInCart({ itemIds });
    return response.data;
  },
);

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setEmptyCart: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addAnItemToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addAnItemToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(addAnItemToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateQuantityOfAnItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateQuantityOfAnItem.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(updateQuantityOfAnItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteAnItemInCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAnItemInCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(deleteAnItemInCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteManyItemInCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteManyItemInCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(deleteManyItemInCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default cartSlice.reducer;
export const { setEmptyCart } = cartSlice.actions;
