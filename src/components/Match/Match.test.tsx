import {render, fireEvent} from "@testing-library/react";
import {Match} from "./Match";
import * as React from "react";
import {getMatches} from "../../../mocks/getMatches";

const defaultProps = {
    ...getMatches(({}))?.[0],
    onChange: () => {}
};
describe('Match', function() {
    it('should not mark drop zone as draggable', function () {
        const {container} = render(<Match {...defaultProps} />);
        expect(container.querySelector('.match').getAttribute('draggable')).toBeFalsy();
    });
    it('should render all participant items', function() {
        const {container} = render(<Match {...defaultProps} />);
        expect(container.querySelector('.participantWrap').children.length).toEqual(defaultProps.participants.length)
    });
    // it('should set the data transfer with the correct type and the items to being dragged', async function() {
    //     const {container} = render(<Match {...defaultProps} />);
    //     const handleDragStart = jest.fn()
    //     const testEvent = {
    //         dataTransfer: new DataTransfer()
    //     };
    //     jest.spyOn(testEvent.dataTransfer, 'getData');
    //
    //     testEvent.dataTransfer.setData('text', '1:1');
    //     fireEvent(
    //         container.querySelector('.participant'),
    //         new DragEvent("dragstart", { testEvent.dataTransfer, clientX: 0, clientY: 0 }),
    //     )
    //
    //     expect(handleDragStart).toHaveBeenCalledTimes(1)
    // });
});
