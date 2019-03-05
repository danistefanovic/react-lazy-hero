**React-lazy-hero** is a flexible hero component for React with image preloading, a fade-in effect, a semi-transparent color overlay and an optional parallax effect.


## Installation

```sh
yarn add react-lazy-hero styled-components
```

Or alternatively via npm:
```sh
npm i --save react-lazy-hero styled-components
```


## Basic Usage

```js
import React from 'react';
import LazyHero from 'react-lazy-hero';

export default MyLandingPage() {
    return (
        <div>
            <LazyHero imageSrc="https://unsplash.it/2000/1000">
                <h1>Generic Startup Hype Headline</h1>
            </LazyHero>

            {/* ... */}
        </div>
    );
}
```

Click above in the menu bar on **Properties** to list all available options.
