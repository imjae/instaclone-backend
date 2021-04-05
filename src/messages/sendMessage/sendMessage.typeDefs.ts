import { gql } from "apollo-server-express";

export default gql`
  type Mutationa {
    sendMessage(payload: String!, roomId: Int, userId: Int): MutationResponse!
  }
`;
