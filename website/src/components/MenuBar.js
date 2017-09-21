import React from 'react';
import PropTypes from 'prop-types';
import { compose, withHandlers, withState } from 'recompose';
import styled from 'styled-components';

import Container from './Container';
import GithubButton from './GithubButton';
import Knobs from './Knobs';

const githubButtonHeight = '35px';

const Root = styled.div`
    background-color: #fff;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.12);
    padding: 10px;

    height: 50px;
`;

const Link = styled.span`
    color: #999;
    cursor: pointer;
    display: inline-block;
    font-size: 0.8rem;
    letter-spacing: 1px;
    line-height: ${githubButtonHeight};
    margin-right: 20px;
    user-select: none;
`;

function MenuBar(props) {
    return (
        <Root>
            <Container>
                <GithubButton style={{ float: 'right' }} />

                <Link onClick={props.onKnobsMenuClick}>
                    ▾ Properties
                </Link>

                <Link onClick={props.onReload}>
                    ↻ Reload
                </Link>
            </Container>

            {props.areKnobsVisible &&
                <Knobs knobs={props.knobs} onChange={props.onKnobChange} />
            }
        </Root>
    );
}

MenuBar.propTypes = {
    areKnobsVisible: PropTypes.bool.isRequired,
    knobs: PropTypes.shape().isRequired,
    onKnobChange: PropTypes.func.isRequired,
    onKnobsMenuClick: PropTypes.func.isRequired,
    onReload: PropTypes.func.isRequired,
};

const enhance = compose(
    withState('areKnobsVisible', 'setAreKnobsVisible', false),
    withHandlers({
        onKnobsMenuClick: ({ areKnobsVisible, setAreKnobsVisible }) =>
            () => setAreKnobsVisible(!areKnobsVisible),
    }),
);

export default enhance(MenuBar);
