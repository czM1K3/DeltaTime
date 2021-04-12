import {gql} from "@apollo/client"

export default gql`
type Query {
  hello: String!
  bakalari: [String]
}
`
