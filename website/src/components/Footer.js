import React from 'react';
import styled from 'styled-components';

import Container from './Container';

const Root = styled.footer`
    margin: 0 0 6rem;
    text-align: center;
`;

const Link = styled.a`
    color: #aaa;
    font-size: 0.8rem;
    text-decoration: none;
    white-space: nowrap;

    &:hover {
        color: #444;
    }

    & ~ ::before {
        content: '/';
        color: #ddd;
        margin: 0 1rem;
    }

    @media (max-width: 410px) {
        display: block;
        margin-bottom: 1rem;

        & ~ ::before {
            content: '';
            margin: 0;
        }
    }
`;

export default function Footer() {
    const links = [
        { label: 'GitHub', to: 'http://www.github.com/danistefanovic/react-lazy-hero' },
        { label: 'MIT', to: 'https://github.com/danistefanovic/react-lazy-hero/blob/master/LICENSE' },
        { label: 'Photo credit', to: 'https://unsplash.com/@rohittandon?photo=9wg5jCEPBsw' },
        { label: '@danistefanovic', to: 'https://twitter.com/DaniStefanovic' },
    ];

    return (
        <Root>
            <Container>
                {links.map(link => (
                    <Link
                        href={link.to}
                        key={link.label}
                        rel="noopener noreferrer"
                        target="_blank"
                    >
                        {link.label}
                    </Link>
                ))}
            </Container>
        </Root>
    );
}
