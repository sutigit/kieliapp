import { CourseContent } from "@/app/lib/types";
import { useRef } from "react";
import { Button, ScrollView, Text, View } from "react-native";

export default function CourseBody({
  content,
  progress,
  setProgress,
}: {
  content: CourseContent;
  progress: number;
  setProgress: (progress: number) => void;
}) {
  // const scrollViewRef = useAnimatedRef<Animated.ScrollView>();
  // const frameContainerRef = useRef<View>(null);
  // const frameRefs = useRef<Record<number, View>>({});
  // const scrollY = useSharedValue(0);

  const scrollRef = useRef<ScrollView>(null);

  // const [containerHeight, setContainerHeight] = useState(0);
  // const [touchBottom, setTouchBottom] = useState(false);

  // const [controlState, setControlState] = useState<
  //   "static" | "work" | "check" | "correct" | "incorrect" | "finish"
  // >("static");

  // const handleScroll = (event: any) => {
  //   const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
  //   const isAtBottom =
  //     layoutMeasurement.height + contentOffset.y >= contentSize.height - 5; // 5px for small buffer

  //   if (isAtBottom) {
  //     setTouchBottom(true);
  //   }
  // };

  // useEffect(() => {
  //   frameRefs.current[progress - 1].measure((x, y) => {
  //     setTouchBottom(false);
  //     scrollY.value = y;
  //   });
  // }, [progress, scrollY]);

  // useEffect(() => {
  //   const type = content.frames[progress - 1].type;
  //   if (type === "exercise") {
  //     setControlState("work");
  //   } else {
  //     setControlState("static");
  //   }
  // }, [progress, content.frames]);

  // useDerivedValue(() => {
  //   scrollTo(scrollViewRef, 0, scrollY.value, true);
  // });

  // const checkExercise = () => {
  //   console.log("Check exercise");
  // };

  // const FrameControls = () => {
  //   const getControl = () => {
  //     switch (controlState) {
  //       case "static":
  //         return (
  //           <ContinueButton
  //             onPress={() => {
  //               setProgress(progress + 1);
  //             }}
  //           />
  //         );
  //       case "work":
  //         return <CheckButton disabled />;
  //       case "check":
  //         return (
  //           <CheckButton
  //             onPress={() => {
  //               checkExercise();
  //             }}
  //           />
  //         );
  //       case "correct":
  //         return <Feedback answer={"correct"} xp={10} />;
  //       case "incorrect":
  //         return <Feedback answer={"wrong"} xp={10} />;
  //       case "finish":
  //         return <FinishButton onPress={() => {}} />;
  //     }
  //   };

  //   return (
  //     <Animated.View
  //       style={{
  //         position: "absolute",
  //         bottom: 0,
  //         left: 0,
  //         right: 0,
  //         backgroundColor: "white",
  //         padding: 30,
  //       }}
  //     >
  //       {getControl()}
  //     </Animated.View>
  //   );
  // };

  const smoothScrollTo = (targetY: number, duration: number) => {
    const startTime = Date.now();
    const startY = 0; // Start from 0 or you can use a state to track current scroll position

    const scrollStep = () => {
      const now = Date.now();
      const elapsed = now - startTime;

      /**
       * 
       * Elapsed / duration gives us a normalized value from 0 to 1, representing how far along we are in the animation.
       * progress = 0, animation started
       * progress = 1, animation finished
       */
      const progress = Math.min(elapsed / duration, 1);

      /**
       * ease-in-out-quad math funciton. No need to understand.
       */
      const easeInOutQuad =
        progress < 0.5
          ? 2 * progress * progress
          : -1 + (4 - 2 * progress) * progress;

      /**
       * Scroll to new position
       */
      const currentY = startY + (targetY - startY) * easeInOutQuad;
      scrollRef.current?.scrollTo({ y: currentY, animated: false });

      /**
       * Keep animating until done. 
       * Termination condition
       */
      if (progress < 1) {
        requestAnimationFrame(scrollStep);
      }
    };

    requestAnimationFrame(scrollStep);
  };

  return (
    <View
      style={{ flex: 1, position: "relative" }}
      // onLayout={(e) => {
      //   const { height } = e.nativeEvent.layout;
      //   setContainerHeight(height);
      // }}
    >
      {" "}
      <Button
        title="Scroll Smoothly to 500px"
        onPress={() => smoothScrollTo(500, 1000)}
      />
      <ScrollView ref={scrollRef} style={{ flex: 1 }}>
        {Array.from({ length: 500 }).map((_, i) => (
          <Text key={i} style={{ padding: 20 }}>{`Item ${i + 1}`}</Text>
        ))}
      </ScrollView>
      {/* <Animated.ScrollView
        ref={scrollViewRef}
        style={{ flex: 1 }}
        onScroll={handleScroll}
        scrollEventThrottle={16} // ~60fps for better responsiveness
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View ref={frameContainerRef} style={{ flex: 1 }}>
          {content.frames.map((frame: any, index: number) => (
            <View
              key={index}
              ref={(el) => {
                if (el) {
                  frameRefs.current[index] = el;
                }
              }}
              style={{
                height: index < progress ? "auto" : 0,
                minHeight: index === progress - 1 ? containerHeight : "auto",
              }}
            >
              <Frame content={frame} action={() => {}} />
            </View>
          ))}
        </View>
        <FrameControls />
      </Animated.ScrollView> */}
      {/* {touchBottom && <FrameControls />} */}
    </View>
  );
}
