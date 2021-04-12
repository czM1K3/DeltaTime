import { ResolverContext } from './apollo'

const Query = {
  hello(_parent, _args, _context, _info) {
    return "Hello world";
  },
}



export default { Query }
