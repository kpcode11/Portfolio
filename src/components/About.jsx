import React from "react";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section
      className="px-5 lg:px-28 flex flex-col lg:flex-row justify-between items-center gap-10"
      id="about"
    >
      <motion.div
        className="lg:w-1/2"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ type: "spring", stiffness: 80, damping: 10 }}
        viewport={{ once: true }}
      >
        <img
          src="/assets/about-me.svg"
          alt="About Me Illustration"
          className="w-full max-w-md mx-auto lg:mx-0"
        />
      </motion.div>

      <motion.div
        className="lg:w-1/2"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ type: "spring", stiffness: 80, damping: 10, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <h2 className="lg:text-4xl text-2xl mt-4 lg:mt-0">
          About <span className="font-extrabold">Me</span>
        </h2>

        <p className="text-[#71717A] text-sm/6 lg:text-base mt-5 lg:mt-10">
          I'm a passionate full-stack developer specializing in **React.js & Node.js**. I thrive on blending technical
          expertise with sleek UI/UX design to build high-performing, user-friendly applications.
        </p>

        <p className="text-[#71717A] text-sm/6 lg:text-base mt-3 lg:mt-5">
          My web development journey started in **2023**, and since then, I've continuously evolved, taking on new
          challenges and keeping up with the latest technologies. Today, I build **cutting-edge web applications** using
          **Next.js, TypeScript, NestJS, TailwindCSS, Supabase, and more**.
        </p>

        {/* <p className="text-[#71717A] text-sm/6 lg:text-base mt-3 lg:mt-5">
          Beyond coding, I enjoy sharing insights on **Twitter**, engaging with **Indie Hackers**, and following the journey of **early-stage startups**. Feel free to follow me on **Twitter** or check out my projects on **GitHub**.
        </p> */}
      </motion.div>
    </section>
  );
}
