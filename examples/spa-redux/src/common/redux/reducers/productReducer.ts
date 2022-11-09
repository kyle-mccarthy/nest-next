import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProduct } from '../../types/IProduct';
import { Feature } from '../../enums/Feature';

type IState = {
  product: IProduct;
}

const productSlice = createSlice({
  name: Feature.PRODUCT,
  initialState: {
    product: {},
  } as IState,
  reducers: {
    setProduct: (state, { payload }: PayloadAction<IProduct>) => {
      state.product = payload
    }
  }
})

export const productReducer = productSlice.reducer;
