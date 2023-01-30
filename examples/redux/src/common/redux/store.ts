import { Feature } from '../enums/Feature';
import { commonReducer } from './reducers/commonReducer';
import { configureHydrateStore } from 'nest-next-redux';
import { StateFromReducersMapObject } from 'redux';

export const reducer = {
  [Feature.COMMON]: commonReducer
}

export const store = configureHydrateStore({
  reducer,
})

export type IRootState = StateFromReducersMapObject<typeof reducer>;
