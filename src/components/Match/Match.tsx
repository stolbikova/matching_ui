import {Participant} from "../../types";
import * as React from "react";
import {Container, Typography} from '@mui/material'
import {Card} from "../Card/Card";

export function Match({participants, score, matchGroupId, onChange}:
                   {
                       participants: Participant [],
                       score: string,
                       matchGroupId: string,
                       onChange: ({}) => void }) {
    const handleDragStart = (
        event: React.DragEvent,
        data: Participant
    ) => {
        event.dataTransfer.setData("text", `${matchGroupId};${data.id}`);
    };
    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const data = event.dataTransfer.getData("text");
        onChange({ toMatchId: matchGroupId, fromMatchId: data.split(';')[0], movedParticipantId: data.split(';')[1] });
    };

    const allowDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };
    return (
        <Container className={"match"} onDragOver={allowDrop} onDrop={handleDrop}>
            <div className={"scoreWrap"}><Typography className={"score"}>Score: {score}</Typography></div>
            <div className={"participantWrap"}>
                {participants?.map(p => (
                    <Card
                        key={p.id}
                        participant={p}
                        onDragStart={(event) => handleDragStart(event, p)}/>))}
            </div>
        </Container>)
}
