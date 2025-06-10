import React from 'react'
import { assets } from '../../assets/assets.js';
import './Hero.css';

const Hero = () => {
    return (
        <div>
            <img
                src={assets.hero_img}
                alt="Hero"
                className="full-width"
            />
        </div>
    )
}
export default Hero
