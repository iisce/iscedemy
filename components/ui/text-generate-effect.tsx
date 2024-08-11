import { useEffect, useState } from "react";
import { motion, stagger, useAnimate} from "framer-motion";
import { cn } from "@/lib/utils";
import { useInView } from "react-intersection-observer";




export const TextGenerateEffect = ({
	words,
	className,
	filter = true,
	duration = 0.5,
	}: {
		words: string;
		className?: string;
		filter?: boolean;
		duration?: number;
	}) => {
		const [scope, animate] = useAnimate();
    const [isVisible, setIsVisible] = useState(false);
    const [ref, inView] = useInView({
      triggerOnce: true, 
      threshold: 0.1, 
    });

		let wordsArray = words.split(" ");

		useEffect(() => {
      if(inView && !isVisible)
		{
      setIsVisible(true);
			animate(
				"span",
				{
					opacity: 1,
					filter: filter ? "blur(0px)" : "none",
				},
				{
					duration: duration ? duration : 1,
					delay: stagger(0.2),
				}
			);
			}
			}, [inView, isVisible, animate ]);

			const renderWords = () => {
				return (
					<motion.div ref={scope}>
						{wordsArray.map((word, idx) => {
							return (
								<motion.span
									key={word + idx}
									className="dark:text-white text-black opacity-0"
									style={{
										filter: filter ? "blur(10px)" : "none",
									}}
								>
									{word}{" "}
								</motion.span>
							);
						})}
					</motion.div>
				);
				};

				return (
					<div className={cn("font-bold", className)} ref={ref}>
						<div className="mt-4">
							<div className=" dark:text-white text-primary w-full xl:mx-8 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed text-lg leading-snug tracking-wide">
								{renderWords()}
							</div>
						</div>
					</div>
				); 
				};

