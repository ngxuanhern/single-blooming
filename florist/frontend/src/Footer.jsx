import React from "react";
import { CiFacebook, CiInstagram, CiTwitter, CiYoutube } from "react-icons/ci";
import { IoLogoWechat } from "react-icons/io5";

// Menus data
const CATEGORIES = [
    { name: "Chinese New Year", link: "#" },
    { name: "Valentine's", link: "#" },
    { name: "Birthday", link: "#" },
    { name: "Condolence", link: "#" },
    { name: "Christmas", link: "#" },
];

const CUSTOMERSERVICE = [
    { name: "FAQ", link: "#" },
    { name: "Track Your Order", link: "/order" },
];

const QUICKLINK = [
    { name: "Home", link: "/" },
    { name: "Products", link: "/product" },
    { name: "About", link: "/about" },
    { name: "Cart", link: "/cart" },
];

// Item Component
const Item = ({ Links, title }) => {
    return (
        <ul>
            <h1 className="mb-1 font-bold text-2xl">{title}</h1>
            {Links.map((link) => (
                <li key={link.name}>
                    <a
                        className="text-gray-200 hover:text-gray-400 duration-300 text-sm cursor-pointer leading-6"
                        href={link.link}
                    >
                        {link.name}
                    </a>
                </li>
            ))}
        </ul>
    );
};

// Items Container Component
const ItemsContainer = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-6 sm:px-8 px-5 py-16">
            <div>
                <h1 className="font-bold text-2xl">SINGLE & BLOOMING</h1>
                <p className="text-gray-200 text-sm">
                    Founded in 2013, Single & Blooming is Malaysia’s most stylish online florist and purveyor of gifts. We curate the most luxurious flowers, live plants and unique gifts from around the world, delivering them to your doorstep so you can focus on creating moments of happiness with the people you love.
                </p>
            </div>

            <Item Links={CATEGORIES} title="OUR CATEGORIES" />
            <Item Links={CUSTOMERSERVICE} title="CUSTOMER SERVICE" />
            <Item Links={QUICKLINK} title="QUICK LINKS" />

            <div>
                <h1 className="font-bold text-2xl">CONTACT US</h1>
                <p className="text-gray-200 text-sm">
                    +60 11 6306 5938<br />
                    <br/>
                    info@singleblooming.com
                </p>
                <br/>
                <h6>Corporate</h6>
                <p className="text-gray-200 text-sm">corporate@singleblooming.com</p>
                <br/>
                <h6>Marketing</h6>
                <p className="text-gray-200 text-sm">marketing@singleblooming.com</p>
            </div>
        </div>
    );
};

// Footer Component
const Footer = () => {
    return (
        <footer className="bg-fourth text-white">
            <div className="md:flex md:justify-between md:items-center sm:px-12 px-4 bg-[#ffffff19] py-7">
                <h1 className="text-gray-200 lg:text-3xl text-3xl md:mb-0 mb-6 lg:leading-normal font-semibold md:w-2/5">
                    <span className="text-white">Subscribe</span> to stay updated with us!
                </h1>
                <div>
                    <input
                        type="email"
                        placeholder="johndoe@gmail.com"
                        className="text-gray-800 sm:w-72 w-full sm:mr-5 mr-1 lg:mb-0 mb-4 py-2.5 rounded px-2 focus:outline-none"
                    />
                    <button className="bg-pink-300 hover:bg-pink-400 duration-300 px-5 py-2.5 font-[Poppins] rounded-md text-black md:w-auto w-full font-playfair">
                        Subscribe
                    </button>
                </div>
            </div>
            <ItemsContainer />
            <div className="flex justify-between items-center pt-2 text-gray-200 text-sm pb-8 px-4 sm:px-12">
                <div className="flex-1 text-center">
                    <span>© Made by Single & Blooming</span>
                </div>

                <div className="flex space-x-2 text-black">
          <span
              className="p-2 cursor-pointer inline-flex items-center rounded-full bg-white text-xl hover:text-gray-100 hover:bg-fifth duration-300">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><CiFacebook /></a>


          </span>
                    <span
                        className="p-2 cursor-pointer inline-flex items-center rounded-full bg-white text-xl hover:text-gray-100 hover:bg-fifth duration-300">
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><CiInstagram/></a>
          </span>
                    <span
                        className="p-2 cursor-pointer inline-flex items-center rounded-full bg-white text-xl hover:text-gray-100 hover:bg-fifth duration-300">
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><CiTwitter/></a>
          </span>
                    <span
                        className="p-2 cursor-pointer inline-flex items-center rounded-full bg-white text-xl hover:text-gray-100 hover:bg-fifth duration-300">
                        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"><CiYoutube/></a>
          </span>
                    <span
                        className="p-2 cursor-pointer inline-flex items-center rounded-full bg-white text-xl hover:text-gray-100 hover:bg-fifth duration-300">
                        <a href="https://wechat.com" target="_blank" rel="noopener noreferrer"><IoLogoWechat/></a>
          </span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
