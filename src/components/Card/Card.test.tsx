import * as React from "react";
import {getMatches} from "../../../mocks/getMatches";
import {render} from '@testing-library/react'
import {Card} from "./Card";

const defaultProps = {
    participant: getMatches(({}))?.[0]?.participants?.[0],
    onDragStart: () => {}
};

describe('Card', function() {
    it('should mark items as draggable', function () {
        const {container} = render(<Card {...defaultProps} />);
        expect(container.querySelector('.participant').getAttribute('draggable')).toBeTruthy();
    });
});
