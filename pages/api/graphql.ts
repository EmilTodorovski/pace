import { createServer } from "@graphql-yoga/node";

const typeDefs = /* GraphQL */ `
  type Event {
    id: ID!
    date: String!
    description: String!
    title: String!
    start: Int!
    end: Int!
  }
  type Query {
    events: [Event!]!
  }
`;

const resolvers = {
  Query: {
    async events() {
      return [
        {
          id: 1,
          date: "2022-01-01",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          title: "Dentist",
          start: 800,
          end: 930,
        },
        {
          id: 2,
          date: "2022-01-01",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          title: "Book flights for next week",
          start: 420,
          end: 440,
        },
        {
          id: 3,
          date: "2022-01-01",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          title: "Monthly team meeting",
          start: 440,
          end: 600,
        },
        {
          id: 4,
          date: "2022-01-01",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          title: "Call Bob",
          start: 420,
          end: 440,
        },
        {
          id: 5,
          date: "2022-01-01",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          title: "Lunch",
          start: 720,
          end: 780,
        },
        {
          id: 6,
          date: "2022-01-02",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          title: "Meeting with Claire",
          start: 780,
          end: 840,
        },
        {
          id: 7,
          date: "2022-01-02",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          title: "Review OKRs",
          start: 870,
          end: 900,
        },
        {
          id: 8,
          date: "2022-01-02",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          title: "Interview Ahmed",
          start: 520,
          end: 600,
        },
        {
          id: 9,
          date: "2022-01-02",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          title: "Yoga class",
          start: 400,
          end: 440,
        },
        {
          id: 10,
          date: "2022-01-02",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          title: "Building work",
          start: 720,
          end: 930,
        },
      ];
    },
  },
};

const server = createServer({
  schema: {
    typeDefs,
    resolvers,
  },
  endpoint: "/api/graphql",
  // graphiql: false // uncomment to disable GraphiQL
});

export default server;
