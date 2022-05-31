import * as React from "react";
import '../../App.css';
import {MatchUi} from '../../types';
import {Match} from "../Match/Match";


export function Matches({items, onChange}: {items: MatchUi [], onChange: ({}) => void}) {
    return (
            <div className={"matches"}>
                {items?.map((m: MatchUi) => (
                    <Match {...m} key={m.matchGroupId} onChange={onChange} />
                ))}
            </div>
    );
}
