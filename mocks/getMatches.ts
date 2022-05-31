import { matches } from './matches';
import {participants} from './participants';
import {MatchUi, Match} from "../src/types";

// Mapping data, which must be done in server
export function getMatches({ page: PAGE = 0, pageSize:  PAGE_SIZE = 15 }): MatchUi [] {
   const uniqueMatches = Array.from(new Set(matches.map(m => m.matchGroupId)))
        .map(id => {
            return matches.find(m => m.matchGroupId === id)
        })

    return uniqueMatches.slice(PAGE*PAGE_SIZE, PAGE*PAGE_SIZE + PAGE_SIZE).map((m: Match) => ({
        matchGroupId: m.matchGroupId,
        score: String(m.score),
        participants: [participants.find(p => p.id === m.participantAId), participants.find(p => p.id === m.participantBId)],
    }))
}
