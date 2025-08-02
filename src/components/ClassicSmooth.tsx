import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import { useRef } from "react";

gsap.registerPlugin(SplitText, ScrollTrigger);

interface Props {
  text: string;
  pin?: boolean;
}

const ClassicSmooth = ({ text, pin }: Props) => {
  const textRef = useRef(null);
  const mainRef = useRef(null);
  const textConRef = useRef(null);

  useGSAP(() => {
    if (!textRef.current || !mainRef.current || !textConRef.current) return;
    const text = textRef.current as HTMLElement;
    const textCon = textConRef.current as HTMLElement;
    const main = mainRef.current as HTMLElement;

    let split: SplitText;
    let scrollTween: GSAPTween;

    const initAnimation = () => {
      split = SplitText.create(text, { type: "chars/lines" });
      const characters = gsap.utils.toArray(split.chars) as HTMLElement[];
      const scrub = 1;

      gsap.set(textCon, { x: window.innerWidth, willChange: "transform" })

      // horizontal scroll trigger set up
      scrollTween = gsap.to(textCon, {
        xPercent: -100,
        x: () => window.innerWidth * 1.7,
        ease: "none", // remove this, see what happen :)
        scrollTrigger: {
          trigger: main,
          pin: pin ? main : false,
          start: `left ${pin ? "15%" : "50%"}`,
          end: () => `+=${window.innerHeight}`,
          scrub,
          onRefresh: (self) => {
            self.refresh()
          }
        }
      })

      characters.forEach((char) => {
        gsap.set(char, { rotate: 45, willChange: "transform" });

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: char,
            start: "left 98%",
            end: "left 60%",
            containerAnimation: scrollTween,
            scrub: scrub - 0.4,
            onRefresh: (self) => {
              self.refresh();
            }
          }
        })

        tl.to(char, {
          rotate: 0,
          yPercent: 150
        })
          .to(char, {
            y: -100
          })
      })
    }

    initAnimation();


  }, { dependencies: [] });


  return (
    <div ref={mainRef} className={`relative w-full h-[25vh] md:h-[50vh] lg:h-[60vh] 2xl:h-[85vh]`}>
      <div ref={textConRef} className="w-[7000px] h-full">
        <h1 ref={textRef} className="-translate-y-1/2 tracking-tighter text-nowrap sm:text-[6.5rem] md:text-[9rem] lg:text-[12rem] xl:text-[14rem] 2xl:text-[19rem]">{text}</h1>
      </div>
    </div>
  )
}

export default ClassicSmooth;