import { getData } from "./fetch";

import { ResolverContext } from './apollo';

const Query = {
  hello(_parent, _args, _context, _info) {
    return "Hello world";
  },
  async bakalari(_parent, _args, _context, _info){
    return await getData();
  }
}



export default { Query }
