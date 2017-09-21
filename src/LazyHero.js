import Color from 'color';
import inViewport from 'in-viewport';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styled from 'styled-components';

const Cover = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
`;

const Root = styled.div`
    position: relative;
    min-height: ${props => props.minHeight};
`;

const Img = styled(Cover)`
    background-attachment: ${props => (props.isFixed ? 'fixed' : 'scroll')};
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    background-image: url(${(props => props.src)});
    opacity: ${props => (props.isVisible ? 1 : 0)};
    transition-duration: ${props => `${props.transitionDuration}ms`};
    transition-property: opacity;
    transition-timing-function: ${props => props.transitionTimingFunction};
`;

const Overlay = styled(Cover)`
    display: flex;
    justify-content: ${props => (props.isCentered ? 'center' : 'flex-start')};
    align-items: ${props => (props.isCentered ? 'center' : 'stretch')};
    text-align: ${props => (props.isCentered ? 'center' : 'left')};
    background-color: ${props => Color(props.color).alpha(props.opacity).rgb().string()};
`;

class LazyHero extends Component {
    constructor() {
        super();
        this.state = {
            image: null,
            isInViewport: false,
            position: 'center',
        };
        this.handlePositionChange = this.handlePositionChange.bind(this);
    }

    componentDidMount() {
        inViewport(this.ref, () => this.setState({ isInViewport: true }));

        const image = new Image();
        image.src = this.props.imageSrc;
        image.onload = () => {
            this.setState({ image });
            this.handlePositionChange();
        };

        if (this.props.parallaxSpeed > 0) {
            window.addEventListener('scroll', this.handlePositionChange);
            window.addEventListener('resize', this.handlePositionChange);
        }
    }

    componentWillUnmount() {
        if (this.props.parallaxSpeed > 0) {
            window.removeEventListener('scroll', this.handlePositionChange);
            window.removeEventListener('resize', this.handlePositionChange);
        }
    }

    handlePositionChange() {
        if (!this.state.image || !(this.props.parallaxSpeed > 0)) return;

        window.requestAnimationFrame(() => {
            const { image } = this.state;
            const scrolled = window.pageYOffset;
            const heroWidth = this.ref.offsetWidth;
            const heroHeight = this.ref.offsetHeight;
            const parallaxOffset = scrolled * this.props.parallaxSpeed;
            // Image height when it's scaled up/down to have the same width as the hero component
            const scaledHeight = image.height / image.width * heroWidth;
            // Get the current image height based on the proportion
            const actualImageHeight = scaledHeight > heroHeight ? scaledHeight : heroHeight;
            // Calculate the BG position so that it's slightly under the center line
            const position = (heroHeight / 3) - (actualImageHeight / 2) + parallaxOffset;
            // Do not scroll above the image border
            const finalPosition = position < 0 ? position : 0;
            this.setState({ position: `${Math.round(finalPosition)}px` });
        });
    }

    render() {
        const imageStyle = {
            backgroundPosition: `center ${this.state.position}`,
        };

        return (
            <Root
                className={this.props.className}
                innerRef={(r) => { this.ref = r; }}
                minHeight={this.props.minHeight}
                style={this.props.style}
            >
                <Img
                    isVisible={this.state.image && this.state.isInViewport}
                    isFixed={this.props.isFixed || this.props.parallaxSpeed > 0}
                    src={this.props.imageSrc}
                    style={imageStyle}
                    transitionDuration={this.props.transitionDuration}
                    transitionTimingFunction={this.props.transitionTimingFunction}
                />
                <Overlay
                    color={this.props.color}
                    isCentered={this.props.isCentered}
                    opacity={this.props.opacity}
                >

                    {this.props.children && <div>{this.props.children}</div>}
                </Overlay>
            </Root>
        );
    }
}

LazyHero.defaultProps = {
    children: undefined,
    className: undefined,
    color: '#fff',
    imageSrc: undefined,
    isCentered: true,
    isFixed: false,
    minHeight: '50vh',
    opacity: 0.8,
    parallaxSpeed: 0,
    scrollIconColor: 'rgba(0, 0, 0, 0.4)',
    style: undefined,
    transitionDuration: 600,
    transitionTimingFunction: 'ease-in-out',
};

LazyHero.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    color: PropTypes.string,
    imageSrc: PropTypes.string,
    isCentered: PropTypes.bool,
    isFixed: PropTypes.bool,
    minHeight: PropTypes.string,
    opacity: PropTypes.number,
    parallaxSpeed: PropTypes.number,
    style: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    transitionDuration: PropTypes.number,
    transitionTimingFunction: PropTypes.string,
};

export default LazyHero;
