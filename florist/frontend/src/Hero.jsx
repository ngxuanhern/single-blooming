import React from 'react'
import { motion } from "framer-motion";

import { MdOutlineShoppingBag } from "react-icons/md";
import HeroImg from "./assets/flower-plate.png";
import Flowerfly from "./assets/flower-fly.png"
import {Link} from "react-router-dom";
const Hero = () => {
    return (
        <section>
            <div className="container grid grid-cols-1 md:grid-cols-2 min-h-[650px] relative">
                {/* Flower Shop Info */}
                <div className="flex flex-col justify-center py-14 md:py-0 relative z-10">
                    <div className="md:text-left space-y-6 lg:max-w-[400px]">

                        <h1 className="text-4xl lg:text-6xl font-playfair leading-relaxed xl:leading-loose whitespace-nowrap">
                            For Mother's Day!
                        </h1>
                        <p>Exclusive Offer -10% Off This Week</p>
                        {/*button section */}
                        <a href="/product" onClick={() => window.scrollTo(0, 0)}>
                        <div className='flex justify-center md:justify-start'>
                            <button
                                className='bg-pink-500 hover:bg-pink-400 text-white py-2 px-4 rounded flex items-center gap-2'>
                <span>
                    <MdOutlineShoppingBag/>
                </span>
                                Shop Now
                            </button>
                        </div>
                        </a>
                    </div>
                </div>
                {/* Hero Images */}
                <div className='flex justify-center items-center'>
                    <motion.img
                        initial={{opacity: 0, x: 200, rotate: 75}}
                        animate={{opacity: 1, x: 0, rotate: 0}}
                        transition={{duration: 1, delay: 0.5}}
                        src={HeroImg} alt="Hero Image" className='w-[300px]
            md:w-[550px] drop-shadow'/>
                </div>
                {/* Flower Fly image */}
                <div className='absolute top-14 md:top-0 right-1/2 blur-sm opacity-80rotate-[40deg]'>
                    <motion.img
                        initial={{opacity: 0, y: -200, rotate: 75}}
                        animate={{opacity: 1, y: 0, rotate: 0}}
                        transition={{duration: 1, delay: 1.5}}
                        src={Flowerfly} alt="Flower Animation" className='w-full md:max-w-[300px]'/>
                </div>
            </div>
        </section>
    )
}

export default Hero;
