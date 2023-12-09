import { type ValueOf } from 'shared/build';

import { type ValidationName } from '../enums/enums.js';

type Validation = ValueOf<typeof ValidationName>;

export { type Validation };
