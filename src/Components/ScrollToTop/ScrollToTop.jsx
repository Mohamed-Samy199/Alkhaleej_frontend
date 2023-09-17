import { useState, useEffect } from 'react';
import './ScrollToTop.modules.scss';


const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    const handleScroll = () => {
        // Check if the user has scrolled enough to show the button
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const isVisible = scrollTop > 300;
        setIsVisible(isVisible);
    };

    const scrollToTop = () => {
        // Scroll to the top of the page
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    // Attach scroll event listener
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className='position-relative'>
            <button
                className={`scroll-to-top-button ${isVisible ? 'visible' : ''}`}
                onClick={scrollToTop}
            >
                <i className="fa-solid fa-chevron-up"></i>
            </button>
        </div>
    );
};

export default ScrollToTopButton;