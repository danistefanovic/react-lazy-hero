import Color from 'color';
import inViewport from 'in-viewport';
import PropTypes from 'prop-types';
// React is a peer dependency
// eslint-disable-next-line import/no-unresolved, import/extensions
import React, { Component } from 'react';
// styled-components is a peer dependency
// eslint-disable-next-line import/no-unresolved, import/extensions
import styled from 'styled-components';
import { resizeToCover, scrolledOverPercent } from './utils';

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
    background-image: url(${(props => props.imageSrc)});
    background-position: center;
    background-repeat: no-repeat;
    background-size: ${props => (props.imageWidth ? `${props.imageWidth}px ${props.imageHeight}px` : 'cover')};
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
            backgroundPositionY: 'center',
            backgroundDimensions: null,
            heroDimensions: null,
            image: null,
            isInViewport: false,
        };
        this.handleResize = this.handleResize.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        this.updatePosition = this.updatePosition.bind(this);
        this.updateSize = this.updateSize.bind(this);
    }

    componentDidMount() {
        inViewport(this.ref, () => this.setState({ isInViewport: true }));
        this.loadImage();

        if (this.props.parallaxOffset > 0) {
            window.addEventListener('scroll', this.handleScroll);
            window.addEventListener('resize', this.handleResize);
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.imageSrc !== this.props.imageSrc) {
            this.loadImage();
        }
    }

    componentWillUnmount() {
        if (this.props.parallaxOffset > 0) {
            window.removeEventListener('scroll', this.handleScroll);
            window.removeEventListener('resize', this.handleResize);
        }
    }

    handleScroll() {
        this.updatePosition();
    }

    handleResize() {
        this.updateSize();
        this.updatePosition();
    }

    loadImage() {
        const image = new Image();
        image.src = this.props.imageSrc;
        image.onload = () => {
            this.setState({ image });

            if (this.props.parallaxOffset > 0) {
                this.updateSize();
                this.updatePosition();
            }
        };
    }

    updateSize() {
        if (!this.state.image) return;

        const heroDimensions = {
            height: this.ref.offsetHeight,
            width: this.ref.offsetWidth,
        };

        const imageDimensions = {
            height: this.state.image.height,
            width: this.state.image.width,
        };

        const resizedImage = resizeToCover(imageDimensions, heroDimensions);
        const initialVisibleImageHeight = resizedImage.height - this.props.parallaxOffset;

        const minHeight = initialVisibleImageHeight < heroDimensions.height
            ? resizedImage.height + heroDimensions.height - initialVisibleImageHeight
            : resizedImage.height;

        const finalHeight = minHeight + (this.ref.offsetTop * 2);

        const backgroundDimensions = resizeToCover(imageDimensions, { height: finalHeight });
        this.setState({ backgroundDimensions, heroDimensions });
    }

    updatePosition() {
        if (!this.state.backgroundDimensions) return;
        const position = 0
            + this.ref.offsetTop
            // Center image vertically
            - (this.state.backgroundDimensions.height / 2)
            + (this.state.heroDimensions.height / 2)
            - (this.props.parallaxOffset / 2)
            // Apply scroll position
            + (this.props.parallaxOffset * scrolledOverPercent(this.ref));

        this.setState({ backgroundPositionY: `${Math.round(position)}px` });
    }

    render() {
        const { backgroundDimensions, backgroundPositionY } = this.state;

        return (
            <Root
                className={this.props.className}
                ref={(r) => { this.ref = r; }}
                minHeight={this.props.minHeight}
                style={this.props.style}
            >
                <Img
                    isVisible={this.state.image && this.state.isInViewport}
                    isFixed={this.props.isFixed || this.props.parallaxOffset > 0}
                    imageHeight={backgroundDimensions && backgroundDimensions.height}
                    imageSrc={this.props.imageSrc}
                    imageWidth={backgroundDimensions && backgroundDimensions.width}
                    style={{
                        backgroundPositionY: (
                            this.props.backgroundPositionY
                                ? this.props.backgroundPositionY
                                : backgroundPositionY
                        ),
                    }}
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
    backgroundPositionY: undefined,
    children: undefined,
    className: undefined,
    color: '#fff',
    imageSrc: undefined,
    isCentered: true,
    isFixed: false,
    minHeight: '50vh',
    opacity: 0.8,
    parallaxOffset: 0,
    style: undefined,
    transitionDuration: 600,
    transitionTimingFunction: 'ease-in-out',
};

LazyHero.propTypes = {
    backgroundPositionY: PropTypes.string,
    children: PropTypes.node,
    className: PropTypes.string,
    color: PropTypes.string,
    imageSrc: PropTypes.string,
    isCentered: PropTypes.bool,
    isFixed: PropTypes.bool,
    minHeight: PropTypes.string,
    opacity: PropTypes.number,
    parallaxOffset: PropTypes.number,
    style: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    transitionDuration: PropTypes.number,
    transitionTimingFunction: PropTypes.string,
};

export default LazyHero;
