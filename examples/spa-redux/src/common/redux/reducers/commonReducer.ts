import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IProduct } from '../../types/IProduct';
import { Feature } from 'common/enums/Feature';

type IState = {
  products: IProduct[];
}

const commonSlice = createSlice({
  name: Feature.COMMON,
  initialState: {
    products: [
      {id: '123', price: 100, name: 'pro'}
    ],
  } as IState,
  reducers: {
    addProduct: (state, { payload }: PayloadAction<IProduct[]>) => {
      state.products.push(...payload);
    }
  }
})

export const commonReducer = commonSlice.reducer;
