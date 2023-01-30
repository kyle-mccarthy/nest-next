import { Feature } from '../enums/Feature';

export type IState = Record<Feature, Record<string, unknown>>;
