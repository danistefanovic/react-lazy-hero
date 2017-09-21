import React from 'react';
import styled from 'styled-components';

// eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved
import gettingStarted from '!markdown-with-front-matter-loader!../GettingStarted.md';
import Container from './Container';

// eslint-disable-next-line no-underscore-dangle
const gettingStartedContent = gettingStarted.__content;

const Root = styled.div`
    padding: 6rem 1rem;

    h2 {
        margin: 3rem 0 1rem;
    }

    pre {
        padding: 1rem;
        margin: 1rem 0;
        background-color: #444;
        border-radius: 3px;
        overflow: scroll;
    }

    code {
        color: #fff;
        font-size: 0.8rem;
    }

    *:not(pre) > code {
        background-color: #444;
        border-radius: 3px;
        padding: 0.2em 0.5em;
    }
`;

const Content = styled(Container)`
    & > :first-child {
        margin-top: 0;
    }

    & > :last-child {
        margin-bottom: 0;
    }
`;

export default function MainContent() {
    return (
        <Root>
            <Content dangerouslySetInnerHTML={{ __html: gettingStartedContent }} />
        </Root>
    );
}
