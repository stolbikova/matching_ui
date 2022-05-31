import * as React from "react";
import './Card.css';
import {Paper, Typography} from "@mui/material";
import {Participant} from '../../types';

export function Card({ participant, onDragStart }: {participant: Participant, onDragStart: (e: React.DragEvent) => void}) {
    return (
        <Paper variant="outlined" className={"participant"} onDragStart={onDragStart} draggable="true">
            <Typography className={"name"}>{participant.forename} {participant.surname}</Typography>
        </Paper>
    );
}

