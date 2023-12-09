import { useDispatch } from 'react-redux';

import { type AppDispatch } from '~/libs/packages/store/store';

const useAppDispatch = useDispatch<AppDispatch>;

export { useAppDispatch };
