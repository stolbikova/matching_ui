import {getMatches} from "../mocks/getMatches";
import {PAGE, PAGE_SIZE} from "./constants";

export interface Match {
    matchGroupId: string;
    participantAId: string;
    participantBId: string;
    score: number;
}
export interface Participant {
    id: string;
    surname: string;
    forename: string;
}

export interface MatchUi {
    matchGroupId: string;
    participants: Participant[];
    score: string;
}

export interface MatchResponse {
    data: {
        matches: MatchUi[]
    }
}

const graphql = require('graphql');
const participantType = new graphql.GraphQLObjectType({
    name: 'Participant',
    fields: {
        id: { type: graphql.GraphQLString },
        surname: { type: graphql.GraphQLString },
        forename: { type: graphql.GraphQLString },
    }
});
export const matchType = new graphql.GraphQLObjectType({
    name: 'Match',
    fields: {
        matchGroupId: { type: graphql.GraphQLString },
        participants: { type: new graphql.GraphQLList(participantType) },
        score: { type: graphql.GraphQLString }
    }
});
const participantInputType = new graphql.GraphQLInputObjectType({
    name: 'ParticipantInput',
    fields: {
        id: { type: graphql.GraphQLString },
        surname: { type: graphql.GraphQLString },
        forename: { type: graphql.GraphQLString },
    }
});
export const matchInputType = new graphql.GraphQLInputObjectType({
    name: 'MatchInput',
    fields: {
        matchGroupId: { type: graphql.GraphQLString },
        participants: { type: new graphql.GraphQLList(participantInputType) },
        score: { type: graphql.GraphQLString }
    }
});
export const queryType = new graphql.GraphQLObjectType({
    name: 'Query',
    fields: {
        matches: {
            type: new graphql.GraphQLList(matchType),
            resolve() {
                return getMatches({pageSize: PAGE_SIZE, page: PAGE});
            }
        }
    }
});
export const mutationType = new graphql.GraphQLObjectType({
    name: 'Mutation',
    fields: {
        save: {
            type: graphql.GraphQLString,
            args: {
                matches: { type: new graphql.GraphQLList(matchInputType) }
            },
        },
    }
});
