import { UserModule } from "./generated/module-types.js"

const middleware: UserModule.MiddlewareMap = ({ root, args, context, info }, next) {
  // code

  return next()
}
