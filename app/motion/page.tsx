"use client";

import Image from "next/image";
import {
    motion,
    stagger,
    useMotionValueEvent,
    useScroll,
    useTransform,
    Variants,
} from "motion/react";
import motionLogo from "@/assets/logos/motion.svg";
import { ArrowUpRight, RotateCw } from "lucide-react";
import { useState } from "react";

const containerAnimations: Variants = {
    hidden: {
        y: 20,
        opacity: 0,
    },
    show: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.3,
            delay: 0.1,
            type: "spring",
            delayChildren: stagger(0.1),
            when: "beforeChildren",
        },
    },
};

const containerChildrenAnimations: Variants = {
    hidden: {
        y: 10,
        x: -10,
        opacity: 0,
    },
    show: {
        y: 0,
        x: 0,
        opacity: 1,
        transition: {
            duration: 0.3,
            type: "spring",
        },
    },
};

const headerVariants: Variants = {
    hidden: {
        x: -20,
        opacity: 0,
    },
    show: {
        x: 0,
        opacity: 1,
        transition: {
            duration: 0.4,
            delay: 0.2,
            type: "spring",
        },
    },
};

// Box Specific Variants
const boxCContainerVariants: Variants = {
    hidden: {},
    show: {
        transition: {
            delay: 1,
            delayChildren: stagger(0.1),
            when: "beforeChildren",
        },
    },
};

const boxCChildrenVariants: Variants = {
    hidden: {
        x: -20,
        opacity: 0,
        // scale: 0.9,
    },
    show: {
        x: 0,
        opacity: 1,
        // scale: 1,
        transition: {
            duration: 0.2,
            type: "spring",
        },
    },
};

function MotionPage() {
    const { scrollYProgress } = useScroll();
    const percentMV = useTransform(scrollYProgress, (v) => Math.round(v * 100));
    const [percent, setPercent] = useState(0);

    useMotionValueEvent(percentMV, "change", (v) => {
        setPercent(v);
    });

    const [versions, setVersions] = useState<Record<string, number>>({
        a: 0,
        b: 0,
        c: 0,
        d: 0,
        e: 0,
        f: 0,
    });

    const retriggerBox = (id: string) => {
        setVersions((prev) => ({ ...prev, [id]: prev[id] + 1 }));
        console.log("Versions: ", versions);
    };

    return (
        <main className="min-h-screen p-10 bg-zinc-200">
            {/* Header */}
            <div className="flex items-center gap-5 pb-10">
                <Image
                    src={motionLogo}
                    width={100}
                    height={100}
                    alt="Motion Logo"
                />
                <div>
                    <h1 className="text-3xl font-semibold">Motion</h1>
                    <a
                        href="https://motion.dev/docs/react"
                        className="flex items-center gap-1 hover:underline"
                    >
                        Documentation{" "}
                        <ArrowUpRight size={16} className="pt-0.5" />
                    </a>
                </div>
            </div>

            {/* Body */}
            <div className="flex flex-col p-5 gap-5">
                {/* Basics Section */}
                <motion.h2
                    variants={headerVariants}
                    initial="hidden"
                    animate="show"
                    className="text-2xl"
                >
                    Basics Section
                </motion.h2>
                {/* Box Container */}
                <motion.div
                    variants={containerAnimations}
                    initial="hidden"
                    animate="show"
                    className="sector grid grid-cols-3 gap-4"
                >
                    {/* Box A */}
                    <motion.div
                        variants={containerChildrenAnimations}
                        className="aspect-square border border-gray-400 rounded-lg p-4 flex items-center justify-center relative"
                    >
                        <motion.div
                            key={`box-a-${versions["a"]}`}
                            animate={{ rotate: 180 }}
                            className="w-1/4 aspect-square rounded-md bg-rose-600"
                        ></motion.div>

                        <button
                            onClick={() => retriggerBox("a")}
                            className="p-2 aspect-square rounded-md border border-gray-400 absolute top-2 right-2 cursor-pointer hover:bg-white"
                        >
                            <RotateCw size={16} />
                        </button>
                    </motion.div>
                    {/* Box B */}
                    <motion.div
                        variants={containerChildrenAnimations}
                        className="aspect-square border border-gray-400 rounded-lg p-4 flex items-center justify-center gap-6"
                    >
                        <motion.div
                            animate={{
                                y: [0, -20, -20, 0],
                                transition: {
                                    duration: 1.4,
                                    type: "keyframes",
                                    repeat: Infinity,
                                    times: [0.1, 0.5, 0.8, 1],
                                },
                            }}
                            className="w-1/4 aspect-square rounded-full bg-blue-400"
                        ></motion.div>
                        <motion.div
                            animate={{
                                y: [0, -20, -20, 0],
                                rotate: [0, 0, 180, 0],
                                transition: {
                                    duration: 2,
                                    type: "keyframes",
                                    repeat: Infinity,
                                    repeatDelay: 0.5,
                                },
                            }}
                            className="w-1/4 aspect-square rounded-md bg-amber-400"
                        ></motion.div>
                    </motion.div>
                    {/* Box C */}
                    <motion.div
                        variants={containerChildrenAnimations}
                        className="aspect-square border border-gray-400 rounded-lg p-4 relative overflow-hidden"
                    >
                        <button
                            onClick={() => retriggerBox("b")}
                            className="p-2 aspect-square rounded-md border border-gray-400 absolute top-2 right-2 cursor-pointer hover:bg-white"
                        >
                            <RotateCw size={16} />
                        </button>
                        <motion.ul
                            key={`box-b-${versions["b"]}`}
                            className="flex flex-col gap-2"
                            variants={boxCContainerVariants}
                            initial="hidden"
                            animate="show"
                        >
                            <motion.li
                                className="border border-gray-400 px-1 py-0.5 rounded-md w-[200px]"
                                variants={boxCChildrenVariants}
                            >
                                Hi
                            </motion.li>
                            <motion.li
                                className="border border-gray-400 px-1 py-0.5 rounded-md w-[200px]"
                                variants={boxCChildrenVariants}
                            >
                                Hi
                            </motion.li>
                            <motion.li
                                className="border border-gray-400 px-1 py-0.5 rounded-md w-[200px]"
                                variants={boxCChildrenVariants}
                            >
                                Hi
                            </motion.li>
                            <motion.li
                                className="border border-gray-400 px-1 py-0.5 rounded-md w-[200px]"
                                variants={boxCChildrenVariants}
                            >
                                Hi
                            </motion.li>
                        </motion.ul>
                    </motion.div>
                    {/* Box D */}
                    <motion.div
                        variants={containerChildrenAnimations}
                        className="aspect-square border border-gray-400 rounded-lg p-4 flex items-center justify-center relative"
                    >
                        <button
                            onClick={() => retriggerBox("c")}
                            className="p-2 aspect-square rounded-md border border-gray-400 absolute top-2 right-2 cursor-pointer hover:bg-white"
                        >
                            <RotateCw size={16} />
                        </button>
                        <motion.div
                            key={`box-c-${versions["c"]}`}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="bg-purple-500 rounded-full aspect-square w-1/4"
                        ></motion.div>
                    </motion.div>
                    {/* Box E */}
                    <motion.div
                        variants={containerChildrenAnimations}
                        className="aspect-square border border-gray-400 rounded-lg p-4 flex items-center justify-center"
                    >
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9, rotate: "2.5deg" }}
                            className="px-2 py-1 border border-gray-800 rounded-lg hover:bg-black hover:text-white cursor-pointer text-lg"
                        >
                            Click me
                        </motion.button>
                    </motion.div>
                    {/* Box F */}
                    <motion.div
                        variants={containerChildrenAnimations}
                        className="aspect-square border border-gray-400 rounded-lg p-4 flex items-center justify-center"
                    >
                        <div className="w-1/3 aspect-square relative">
                            <motion.div
                                className="w-full h-full bg-teal-400 flex items-center justify-center"
                                style={{
                                    scaleY: scrollYProgress,
                                    transformOrigin: "bottom",
                                }}
                            ></motion.div>
                            <motion.p className="absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                {percent}%
                            </motion.p>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </main>
    );
}

export default MotionPage;
