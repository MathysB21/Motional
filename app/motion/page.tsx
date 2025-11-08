"use client";

import Image from "next/image";
import {
    AnimatePresence,
    motion,
    stagger,
    useMotionValueEvent,
    useScroll,
    useTransform,
    Variants,
} from "motion/react";
import motionLogo from "@/assets/logos/motion.svg";
import { ArrowUpRight, ChevronDown, Loader2, RotateCw } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { messages } from "@/lib/loading_messages";

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

const notificationsContainerVariants: Variants = {
    uncollapsed: {
        transition: { type: "spring", duration: 0.5, staggerChildren: 0.05 },
    },
    collapsed: {
        transition: {
            type: "spring",
            duration: 0.3,
            staggerChildren: 0.03,
            staggerDirection: -1,
        },
    },
};

const notificationVariants: Variants = {
    uncollapsed: (i: number) => ({
        scale: 1,
        opacity: 1,
        y: 0,
        transition: { type: "spring", duration: 0.4, delay: i * 0.04 },
    }),
    collapsed: (i: number) => ({
        scale: 0.95 - i * 0.05, // top slightly bigger, bottom slightly smaller
        opacity: 1 - i * 0.1,
        y: `-${110 * i}%`,
        transition: { type: "spring", duration: 0.3, delay: i * 0.02 },
    }),
};

const notificationHeaderVariants: Variants = {
    uncollapsed: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
    },
    collapsed: {
        y: 10,
        opacity: 0,
        filter: "blur(10px)",
    },
};

const initialOrder = ["#C1121F", "#FDF0D5", "#003049", "#669BBC"];

function shuffle([...array]: string[]) {
    return array.sort(() => Math.random() - 0.5);
}

function getRandomLoadingMessage() {
    const randomId = Math.floor(Math.random() * messages.length);
    return messages[randomId];
}

function MotionPage() {
    const { scrollYProgress } = useScroll();
    const percentMV = useTransform(scrollYProgress, (v) => Math.round(v * 100));
    const [percent, setPercent] = useState(0);
    const [layoutButton, setLayoutButton] = useState(false);
    const [selectedTab, setSelectedTab] = useState(1);
    const [notificationsCollapsed, setNotificationsCollapsed] = useState(true);
    const [backgroundColors, setBackgroundColors] = useState(initialOrder);
    const [accordionOpen, setAccordionOpen] = useState(false);
    const [currentLoadingMessage, setCurrentLoadingMessage] = useState(
        messages[0]
    );

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

    useEffect(() => {
        const timeoutId = setTimeout(
            () => setBackgroundColors(shuffle(backgroundColors)),
            1000
        );
        return () => clearTimeout(timeoutId);
    }, [backgroundColors]);

    useEffect(() => {
        const timeoutId = setTimeout(
            () => setCurrentLoadingMessage(getRandomLoadingMessage()),
            5000
        );
        return () => clearTimeout(timeoutId);
    }, [currentLoadingMessage]);

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
                        target="_blank"
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
                    {/* Box G */}
                    <motion.div
                        variants={containerChildrenAnimations}
                        className="aspect-square border border-gray-400 rounded-lg p-4 flex items-center justify-center"
                    >
                        <button
                            onClick={() => setLayoutButton(!layoutButton)}
                            className="border-2 border-blue-400 rounded-full px-1 py-1 flex items-center w-16 cursor-pointer focus:ring-2 focus:ring-blue-300"
                            style={{
                                justifyContent:
                                    "flex-" + (layoutButton ? "end" : "start"),
                            }}
                        >
                            <motion.div
                                layout
                                className="size-6 rounded-full bg-blue-400"
                                transition={{
                                    type: "spring",
                                    duration: 0.25,
                                }}
                            ></motion.div>
                        </button>
                    </motion.div>
                    {/* Box H */}
                    <motion.div
                        variants={containerChildrenAnimations}
                        className="aspect-square border border-gray-400 rounded-lg p-4 flex items-center justify-center"
                    >
                        <div className="flex items-center gap-4 border border-black rounded-full w-fit px-2 h-[50px] justify-center">
                            <button
                                className={cn([
                                    "relative px-2 py-2 cursor-pointer",
                                ])}
                                onClick={() => setSelectedTab(1)}
                            >
                                Mathys{" "}
                                {selectedTab === 1 && (
                                    <motion.div
                                        layoutId="movingborder"
                                        className="absolute top-0 left-0 h-full w-full border border-black rounded-full"
                                    ></motion.div>
                                )}
                            </button>
                            <button
                                className="relative px-2 py-2 cursor-pointer"
                                onClick={() => setSelectedTab(2)}
                            >
                                Wilhelm{" "}
                                {selectedTab === 2 && (
                                    <motion.div
                                        layoutId="movingborder"
                                        className="absolute top-0 left-0 h-full w-full border border-black rounded-full"
                                    ></motion.div>
                                )}
                            </button>
                            <button
                                className="relative px-2 py-2 cursor-pointer"
                                onClick={() => setSelectedTab(3)}
                            >
                                Shae{" "}
                                {selectedTab === 3 && (
                                    <motion.div
                                        layoutId="movingborder"
                                        className="absolute top-0 left-0 h-full w-full border border-black rounded-full"
                                    ></motion.div>
                                )}
                            </button>
                            <button
                                className="relative px-2 py-2 cursor-pointer"
                                onClick={() => setSelectedTab(4)}
                            >
                                Euan{" "}
                                {selectedTab === 4 && (
                                    <motion.div
                                        layoutId="movingborder"
                                        className="absolute top-0 left-0 h-full w-full border border-black rounded-full"
                                    ></motion.div>
                                )}
                            </button>
                        </div>
                    </motion.div>
                    {/* Box I */}
                    <motion.div
                        variants={containerChildrenAnimations}
                        className="aspect-square border border-gray-400 rounded-lg p-4 flex items-center justify-center"
                    >
                        <motion.div
                            variants={notificationsContainerVariants}
                            initial={"uncollapsed"}
                            animate={
                                notificationsCollapsed
                                    ? "collapsed"
                                    : "uncollapsed"
                            }
                            onClick={() =>
                                setNotificationsCollapsed(
                                    !notificationsCollapsed
                                )
                            }
                            className="w-full h-full flex flex-col items-center relative gap-4 cursor-pointer"
                        >
                            <div className="w-full text-left pl-[10%]">
                                <motion.h2
                                    variants={notificationHeaderVariants}
                                    className="text-xl text-black font-medium "
                                >
                                    Notifications
                                </motion.h2>
                            </div>
                            {[0, 1, 2].map((i) => (
                                <motion.div
                                    key={i}
                                    custom={i}
                                    variants={notificationVariants}
                                    className="bg-gray-700 rounded-lg h-[60px] w-4/5"
                                />
                            ))}
                        </motion.div>
                    </motion.div>
                    {/* Box J */}
                    <motion.div
                        variants={containerChildrenAnimations}
                        className="aspect-square border border-gray-400 rounded-lg p-4 flex items-center justify-center"
                    >
                        <ul className="w-fit h-fit grid grid-cols-2 gap-4 place-items-center">
                            {backgroundColors.map((item) => (
                                <motion.li
                                    layout
                                    transition={{
                                        type: "spring",
                                        damping: 20,
                                        stiffness: 300,
                                    }}
                                    key={item}
                                    className="w-[100px] rounded-2xl h-auto aspect-square"
                                    style={{ backgroundColor: item }}
                                ></motion.li>
                            ))}
                        </ul>
                    </motion.div>
                    {/* Box K */}
                    <motion.div
                        variants={containerChildrenAnimations}
                        className="aspect-square border border-gray-400 rounded-lg p-4 flex items-center justify-center"
                    >
                        <motion.div
                            transition={{
                                type: "spring",
                            }}
                            onClick={() => setAccordionOpen(!accordionOpen)}
                            className="w-full border rounded-2xl border-gray-400 cursor-pointer"
                        >
                            <header className="flex cursor-pointer list-none items-center justify-between gap-4 p-5relative p-5">
                                <h3>Click here to open the accordion</h3>
                                <motion.div
                                    animate={{
                                        rotate: accordionOpen ? 180 : 0,
                                    }}
                                    transition={{
                                        duration: 0.2,
                                        ease: "easeOut",
                                    }}
                                >
                                    <ChevronDown className="size-6 shrink-0" />
                                </motion.div>
                            </header>
                            <AnimatePresence initial={false}>
                                {accordionOpen && (
                                    <motion.section
                                        initial={{
                                            height: 0,
                                            opacity: 0,
                                            y: 10,
                                            filter: "blur(10px)",
                                        }}
                                        animate={{
                                            height: "auto",
                                            opacity: 1,
                                            y: 0,
                                            filter: "blur(0px)",
                                            transition: {
                                                height: {
                                                    duration: 0.2,
                                                    ease: "easeOut",
                                                },
                                                opacity: {
                                                    duration: 0.25,
                                                    delay: 0.15,
                                                },
                                                filter: {
                                                    duration: 0.25,
                                                    delay: 0.15,
                                                },
                                            },
                                        }}
                                        exit={{
                                            height: 0,
                                            opacity: 0,
                                            y: -10,
                                            filter: "blur(10px)",
                                            transition: {
                                                height: {
                                                    duration: 0.2,
                                                    ease: "easeOut",
                                                },
                                                opacity: { duration: 0.25 },
                                                filter: {
                                                    duration: 0.25,
                                                },
                                            },
                                        }}
                                        style={{ overflow: "hidden" }}
                                    >
                                        <div className="px-5 pb-5 pt-1">
                                            This is just a test of how the
                                            accordion works. And this is to make
                                            the message a bit longer so we can
                                            see what happens when you add a
                                            longer piece of content.
                                        </div>
                                    </motion.section>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </motion.div>
                    {/* Box L */}
                    <motion.div
                        variants={containerChildrenAnimations}
                        className="aspect-square border border-gray-400 rounded-lg p-10 flex flex-col gap-3 items-center pt-[42%]"
                    >
                        <Loader2
                            size={36}
                            className="animate-spin text-gray-600"
                        />
                        <AnimatePresence mode="wait">
                            <motion.p
                                key={currentLoadingMessage.replaceAll(" ", "-")}
                                initial={{
                                    opacity: 0,
                                    y: 14,
                                    filter: "blur(8px)",
                                    scale: 0.95,
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                    filter: "blur(0px)",
                                    scale: 1,
                                }}
                                exit={{
                                    opacity: 0,
                                    y: -14,
                                    filter: "blur(8px)",
                                    scale: 1.2,
                                }}
                                className="text-center"
                            >
                                {currentLoadingMessage}
                            </motion.p>
                        </AnimatePresence>
                    </motion.div>
                </motion.div>
            </div>
        </main>
    );
}

export default MotionPage;
