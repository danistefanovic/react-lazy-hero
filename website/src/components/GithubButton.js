import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Root = styled.div`
    position: relative;
    top: 3px;
    height: 35px;

    > a {
        opacity: 0;
    }
`;

export default function GithubButton(props) {
    return (
        <Root style={props.style}>
            <a
                className="github-button"
                href="https://github.com/danistefanovic/react-lazy-hero"
                data-icon="octicon-star"
                data-size="large"
                data-show-count="true"
                aria-label="Star danistefanovic/react-lazy-hero on GitHub"
            >
                Star
            </a>
        </Root>
    );
}

GithubButton.defaultProps = {
    style: undefined,
};

GithubButton.propTypes = {
    style: PropTypes.shape(),
};
