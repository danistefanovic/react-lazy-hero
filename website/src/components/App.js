import React from 'react';
import LazyHero from 'react-lazy-hero';
import PropTypes from 'prop-types';
import {
    compose, pure, withHandlers, withState,
} from 'recompose';

import heroImage from '../mountains.jpg';
import Footer from './Footer';
import Logo from './Logo';
import MainContent from './MainContent';
import MenuBar from './MenuBar';

function App(props) {
    return (
        <div className="App">
            <LazyHero
                backgroundPositionY={props.knobs.backgroundPositionY.current}
                className={props.knobs.className.current}
                color={props.knobs.color.current}
                imageSrc={props.knobs.imageSrc.current}
                isCentered={props.knobs.isCentered.current}
                isFixed={props.knobs.isFixed.current}
                key={props.id}
                minHeight={props.knobs.minHeight.current}
                opacity={props.knobs.opacity.current}
                parallaxOffset={parseInt(props.knobs.parallaxOffset.current, 10)}
                style={{ overflow: 'hidden' }}
                transitionDuration={parseInt(props.knobs.transitionDuration.current, 10)}
                transitionTimingFunction={props.knobs.transitionTimingFunction.current}
            >
                <Logo />
            </LazyHero>

            <MenuBar
                knobs={props.knobs}
                onKnobChange={props.onKnobChange}
                onReload={props.onReload}
            />

            <MainContent />
            <Footer />
        </div>
    );
}

App.propTypes = {
    id: PropTypes.number.isRequired,
    knobs: PropTypes.shape().isRequired,
    onKnobChange: PropTypes.func.isRequired,
    onReload: PropTypes.func.isRequired,
};

const enhance = compose(
    pure,
    withState('id', 'setId', 0),
    withState('knobs', 'setKnobs', {
        backgroundPositionY: {
            description: 'backgroundPositionY property on the image. Will override parallax effect.',
            type: 'string',
        },
        children: {
            current: '<Logo />',
            description: 'Child components',
            type: 'Object',
        },
        className: {
            description: 'CSS classes',
            type: 'string',
        },
        color: {
            current: '#ffff33',
            default: '#fff',
            description: 'Overlay color (all CSS color formats are supported)',
            type: 'string',
        },
        imageSrc: {
            current: heroImage,
            description: 'Image URL',
            type: 'string',
        },
        isCentered: {
            current: true,
            default: true,
            description: 'Should child components be vertically and horizontally centered?',
            type: 'bool',
        },
        isFixed: {
            current: false,
            default: false,
            description: 'Should the background image have a fixed position? Only applicable when the parallax effect is deactivated.',
            type: 'bool',
        },
        minHeight: {
            current: '75vh',
            default: '50vh',
            description: 'Minimum height with a valid CSS measurment unit (px, em, vh, %, ...)',
            type: 'string',
        },
        opacity: {
            current: 0.7,
            default: 0.8,
            description: 'Opacity for the color overlay (value between 0 and 1)',
            max: 1,
            min: 0,
            step: 0.1,
            type: 'number',
        },
        parallaxOffset: {
            current: 100,
            default: 0,
            description: 'Offset that is added to the hero height so that a parallax effect is generated. 0 means that the effect is inactive.',
            min: 0,
            step: 50,
            type: 'number',
        },
        style: {
            current: '{ overflow: "hidden" }',
            description: 'Additional inline styles',
            type: 'Object',
        },
        transitionDuration: {
            current: 600,
            default: 600,
            description: 'Number of milliseconds the fade-in animation should take to complete',
            min: 0,
            step: 100,
            type: 'number',
        },
        transitionTimingFunction: {
            current: 'ease-in-out',
            default: 'ease-in-out',
            description: 'CSS timing function for the fade-in animation',
            type: 'string',
        },
    }),
    withHandlers({
        onReload: ({ setId }) => () => setId(Date.now()),
        onKnobChange:
            ({ knobs, setId, setKnobs }) => (name, current) => {
                setKnobs({
                    ...knobs,
                    [name]: { ...knobs[name], current },
                });
                setId(Date.now());
            },
    }),
);

export default enhance(App);
