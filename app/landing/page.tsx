"use client";

import React from "react";
import "/Users/nikhilmukherjee/Group_07_Project_CS320/style.css";

import { Image, Button } from "@nextui-org/react";
import { UserIcon } from "/Users/nikhilmukherjee/Group_07_Project_CS320/app/landing/UserIcon.jsx";

import smallLogo from "/Users/nikhilmukherjee/Group_07_Project_CS320/landing_page_images/logo-transparent.png";

export default function Page() {
  return <Frame />;
}

export const Frame = () => {
  return (
    <div className="frame">
      <div className="macbook-air-wrapper">
        <div className="macbook-air">
          <div className="overlap">
            <Image
              className="logo-transparent-png"
              src="landing_page_images/logo-transparent-png.png"
              width={420}
              height={180}
              alt="Default Image"
            />
            <p className="text-wrapper">
              YOUR CULINARY COMPANION FOR EFFORTLESS MEALS!
            </p>
            <p className="welcome-to-prep-pal">
              Welcome to Prep Pal, where inspiration meets convenience in the
              kitchen! Tired of staring at your fridge wondering what to cook?
              Say goodbye to food waste and hello to a creative kitchen with
              Prep Pal, your go-to recipe generator.
              <br />
              <br />
              Simply input the ingredients you have in your fridge, and let Prep
              Pal work its magic. Instantly receive curated recipe suggestions
              tailored to your available ingredients.
              <br />
              <br />
              Discover new favorites and save them in your virtual cookbook.
              Keep track of ingredients you love, and let PrepPal be your
              personalized kitchen assistant for future meals.
            </p>
          </div>
          <div className="overlap-group">
            <div className="rectangle" />
            <Button className="icon" color="primary" endContent={<UserIcon />}>
              LOG IN
            </Button>
            <Button
              className="element"
              color="primary"
              variant="bordered"
              startContent={<UserIcon />}
            >
              SIGN UP
            </Button>

            <Image
              className="logo-transparent-svg"
              alt="Default Image"
              src="landing_page_images/logo-transparent.png"
              width={320}
              height={180}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
