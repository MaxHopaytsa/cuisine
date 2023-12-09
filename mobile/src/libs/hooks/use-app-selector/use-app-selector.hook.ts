import { type TypedUseSelectorHook, useSelector } from 'react-redux';

import { type RootState } from '~/libs/packages/store/store';

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export { useAppSelector };
