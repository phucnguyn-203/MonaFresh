import { IconNext, IconPrevious } from "@/components/icons";
export const SlickArrowPrev = ({ currentSlide, slideCount, ...props }) => (
    <button
        {...props}
        id="prev"
        className={"slick-arrow slick-prev" + (currentSlide === 0 ? " slick-disabled" : "")}
        aria-hidden="true"
        aria-disabled={currentSlide === 0 ? true : false}
        type="button"
    >
        <IconPrevious />
    </button>
);

export const SlickArrowNext = ({ currentSlide, slideCount, ...props }) => (
    <button
        {...props}
        className={"slick-arrow slick-next" + (currentSlide === slideCount - 1 ? " slick-disabled" : "")}
        aria-hidden="true"
        aria-disabled={currentSlide === slideCount - 1 ? true : false}
        type="button"
    >
        <IconNext />
    </button>
);
