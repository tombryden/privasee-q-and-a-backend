import "reflect-metadata";
import "dotenv/config";

import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSchema } from "type-graphql";
import { RecordResolver } from "./resolvers/record-resolver";
import axios from "axios";
import { AIRTABLE_TOKEN } from "./vars";

const init = async () => {
  axios.defaults.baseURL = "https://api.airtable.com/v0";
  axios.defaults.headers.common["Authorization"] = `Bearer ${AIRTABLE_TOKEN}`;

  const schema = await buildSchema({ resolvers: [RecordResolver] });

  const server = new ApolloServer({
    schema,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`Server ready at: ${url}`);
};

init();
