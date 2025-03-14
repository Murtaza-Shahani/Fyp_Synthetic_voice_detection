import React from "react";
import Hero from "../components/Hero";
import Contact from "./Contact";
import Features from "./Features";
import Detection from "./Detection";

const Home = () => {
  return (
    <div>
      <Hero />
      <Features isHome={true} />
      <Detection isHome={true} />
      <Contact isHome={true} />
    </div>
  );
};

export default Home;
