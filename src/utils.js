/*
 * Clamp a value between two other values
 * @param {number} number
 * @param {number} min
 * @param {number} max
 * @return {number}
 */
export function clamp(number, min = 0, max = 1) {
    return Math.min(Math.max(number, min), max);
}

/*
 * Get the percentage scrolled over an element
 * @param {HTMLElement} element
 * @return {number} value between 0 and 1
 */
export function scrolledOverPercent(element) {
    const scrolled = window.pageYOffset;
    const height = element.offsetHeight;
    const top = element.offsetTop;
    const percent = scrolled / (top + height);

    return clamp(percent);
}

/*
 * Resize to original aspect ratio
 * @param {Object} dimensions The original dimensions
 * @param {number} dimensions.height
 * @param {number} dimensions.width
 * @param {string} prop Property name
 * @param {number} value Current property value
 * @param {Object} new height and width
 */
export function resizeToRatio(dimensions, prop, value) {
    const otherProp = prop === 'width' ? 'height' : 'width';
    const otherPropValue = Math.round(value * dimensions[otherProp] / dimensions[prop]);

    return {
        [otherProp]: otherPropValue,
        [prop]: value,
    };
}

/*
 * Simulate "background-position: contain"
 * @param {Object} dimensions The original dimensions
 * @param {number} dimensions.height
 * @param {number} dimensions.width
 * @param {Object} maxDimensions The available space
 * @param {number} maxDimensions.height
 * @param {number} maxDimensions.width
 * @return {Object} new height and width
 */
export function resizeToContain(dimensions, maxDimensions) {
    return Object.keys(dimensions).reduce((prevDimensions, prop) => (
        prevDimensions[prop] > maxDimensions[prop]
            ? resizeToRatio(prevDimensions, prop, maxDimensions[prop])
            : prevDimensions
    ), dimensions);
}

/*
 * Simulate "background-position: cover"
 * @param {Object} dimensions The original dimensions
 * @param {number} dimensions.height
 * @param {number} dimensions.width
 * @param {Object} maxDimensions The available space
 * @param {number} maxDimensions.height
 * @param {number} maxDimensions.width
 * @return {Object} new height and width
 */
export function resizeToCover(dimensions, maxDimensions) {
    const dimensionsAfterContain = resizeToContain(dimensions, maxDimensions);

    return Object.keys(dimensions).reduce((prevDimensions, prop) => (
        prevDimensions[prop] < maxDimensions[prop]
            ? resizeToRatio(prevDimensions, prop, maxDimensions[prop])
            : prevDimensions
    ), dimensionsAfterContain);
}
