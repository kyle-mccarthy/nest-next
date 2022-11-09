import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Feature } from '../../enums/Feature';
import { IProduct } from '../../types/IProduct';

type IState = {
  products: IProduct[];
  product: IProduct;
}

const commonSlice = createSlice({
  name: Feature.COMMON,
  initialState: {
    products: [
      {id: '123', price: 100, name: 'pro'}
    ],
    product: {},
  } as IState,
  reducers: {
    addProduct: (state, { payload }: PayloadAction<IProduct[]>) => {
      state.products.push(...payload);
    }
  }
})

export const commonReducer = commonSlice.reducer;
