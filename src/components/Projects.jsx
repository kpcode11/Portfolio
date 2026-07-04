import React from 'react';
import { TbExternalLink } from "react-icons/tb";
import { motion } from 'framer-motion';

const projects = [
  {
    id: 1,
    title: "Farmer Sahayak — Gov Scheme Discovery",
    description: "A comprehensive MERN stack application designed to help farmers access government schemes, get instant support through an AI-powered chatbot, and manage their profiles efficiently.",
    image: "/assets/FarmerSahayak.png",
    link: "https://farm-scheme-delta.vercel.app/"
  },
  {
    id: 2,
    title: "LeapQuest — 2D Unity Game",
    description: "2D platformer built in Unity (C#) with modular systems, A* enemy pathfinding and Android optimizations for smooth 60 FPS gameplay.",
    image: "/assets/LeapQuest3.png",
    link: "https://play.google.com/store/apps/details?id=com.Teknack.LeapQuest&pcampaignid=web_share"
  },
  {
    id: 3,
    title: "GoCart",
    description: "A full-stack multi-vendor e-commerce marketplace built with Next.js 15, featuring seller storefronts, Stripe payments, admin controls, real-time order tracking, and role-based access.",
    image: "/assets/gocart.png",
    link: "https://gocart-pi-seven.vercel.app/"
  },
  {
    id: 4,
    title: "CureOS — Hospital Information System",
    description: "A modular, production-ready clinical operations platform built with Next.js + TypeScript, featuring role-based dashboards, RBAC, and real-time updates.",
    image: "/assets/cureos.png",
    link: "https://cure-os-lac.vercel.app/"
  }
];

export default function Projects() {
  return (
    <div className="bg-black px-5 lg:px-28 py-8 my-8 lg:py-16 lg:my-16" id="projects">
      <h2 className="text-2xl lg:text-4xl text-center text-white">
        My <span className="font-extrabold">Projects</span>
      </h2>

      <div className="lg:mt-16 mt-8 lg:space-y-16 space-y-8 lg:pb-6 pb-3">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            className={`flex justify-between items-center flex-col ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"}`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 80, damping: 10, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <div className="lg:w-[500px] w-full rounded-2xl overflow-hidden">
              <img
                className="w-full h-full hover:scale-105 transition-all duration-500 cursor-pointer object-cover"
                src={project.image}
                alt={project.title}
              />
            </div>

            <div className="lg:w-1/2 lg:space-y-6 space-y-4">
              <h2 className="font-extrabold text-white mt-5 lg:mt-0 text-3xl lg:text-5xl">
                {String(project.id).padStart(2, "0")}
              </h2>
              <p className="font-bold text-white text-xl lg:text-3xl">{project.title}</p>

              <p className="font-light text-sm/6 lg:text-base text-[#71717A]">
                {project.description}
              </p>
              <a href={project.link} className="text-white mt-3 block" target="_blank" rel="noopener noreferrer">
                <TbExternalLink size={23} />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
