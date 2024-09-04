declare module 'react-star-ratings-component' {
    import * as React from 'react';

    interface StarRatingsProps {
        colorFilledStar?: string;
        colorEmptyStar?: string;
        starSize?: string;
        spaceBetweenStar?: string;
        numberOfStar?: number;
        numberOfSelectedStar: number;
        disableOnSelect:boolean;
    }

    const StarRatings: React.FC<StarRatingsProps>;

    export default StarRatings;
}
