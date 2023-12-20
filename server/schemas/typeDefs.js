const typeDefs = `
 type User {
    _id: ID!
    username: String!
    email: String!
    SavedBooks: [Book!]!
    bookCount: Int
 }

 type Book {
  authors: [String]
  description: String!
  bookId: String!
  image: String
  link: String
  title: String!
 }

 input BookInput {
  authors: [String]
  description: String!
  bookId: String!
  image: String
  link: String
  title: String!
 }

 type Query {
  me: User
 }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): User
    login(email: String!, password: String!): Auth
    saveBook(bookInput: BookInput!): User
    removeBook(bookId: String!): User
  }

  type Auth {
   token: ID!
   user: User
 }
`;
module.exports = typeDefs;