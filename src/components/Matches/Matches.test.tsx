import * as React from "react";
import {Matches} from "./Matches";
import {getMatches} from "../../../mocks/getMatches";
import {render} from '@testing-library/react'

const defaultProps = {
  items: getMatches(({})),
  onChange: () => {}
};
describe('Matches', function() {
  it('should render all items', function() {
    const {container} = render(<Matches {...defaultProps} />);
    expect(container.querySelector('.matches').children.length).toEqual(defaultProps.items.length)
  });
});
