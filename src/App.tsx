import * as React from "react";
import './App.css';
import {queryType, MatchUi, MatchResponse, Participant, mutationType} from './types';
import {Matches} from "./components/Matches/Matches";
import {Button, Typography, Alert} from "@mui/material";
import {useState} from "react";

const graphql = require('graphql');

const schema = new graphql.GraphQLSchema({
    query: queryType,
});

export function App() {
    const [matches, setMatches] = React.useState<MatchUi []>([]);
    const [error, setError] = useState<{
        message: string
    } | null>(null);
    const handleChange = ({ toMatchId, fromMatchId, movedParticipantId }:
                              {movedParticipantId: string, toMatchId: string, fromMatchId: string}) => {
        if (toMatchId === fromMatchId) {
            return;
        }

        // copy value not ref
        const newMatches = matches.slice();
        const toMatch = newMatches.find((m: MatchUi) => m.matchGroupId === toMatchId);

        // if participant already in match -> do not add it
        if (toMatch?.participants.find((p: Participant) => p.id === movedParticipantId)) {
            return;
        }
        const fromMatch = newMatches.find((m: MatchUi) => m.matchGroupId === fromMatchId);
        const participant = fromMatch.participants.find((p: Participant) => p.id === movedParticipantId);
        toMatch.participants.push(participant);
        fromMatch.participants = fromMatch.participants.filter((p: Participant) => p.id !== movedParticipantId);
        setMatches(newMatches);
    }
    const handleSubmit = async () => {
        graphql.graphql({
            schema: new graphql.GraphQLSchema({
                query: queryType,
                mutation: mutationType,
            }),
            source: `{ save(matches: ${matches}) { id } }`
        }).then((response: any) => {
            if (response.errors.length) {
                setError({
                    message: response.errors[0].message
                });
            }
        });
    };

    React.useEffect(() => {
        graphql.graphql({
            schema,
            source: '{ matches { matchGroupId participants { id surname forename } score } }'
        })
            .then((response: MatchResponse) => {
                if (response?.data.matches) {
                    setMatches(response?.data.matches);
                }
            });
    }, []);

    // TODO: create some skeleton
    // if (loading) return 'Loading...';
    if (error) {
        return (
            <Alert color={"error"}>
                <Typography>Something went wrong. Try later</Typography>
                <Typography>Details: Error! {error.message}</Typography>
            </Alert>);
    }
    if (!matches.length) {
        return (
            <Alert>
                <Typography>There is no data. Please try later</Typography>
            </Alert>)
    }

    return (
        <div className="app">
            <div className={"matches"}>
            <Matches items={matches} onChange={handleChange} />
            </div>
            <Button onClick={handleSubmit} variant="contained" size={"large"} className={"Button"}>
                <Typography>Submit</Typography>
            </Button>
        </div>
    );
}
