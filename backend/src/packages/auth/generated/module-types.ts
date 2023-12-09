import * as Types from "../../../generated/schema-types";
import * as gm from "graphql-modules";
export namespace AuthModule {
  interface DefinedEnumValues {
    Validation: 'USER_SIGN_UP_VALIDATION' | 'USER_SIGN_IN_VALIDATION';
  };
  
  export type Validation = DefinedEnumValues['Validation'];
  
  export interface MiddlewareMap {
    '*'?: {
      '*'?: gm.Middleware[];
    };
  };
}