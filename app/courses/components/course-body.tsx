import { CourseContent } from "@/app/lib/types";
import { useEffect, useRef, useState } from "react";
import { ScrollView, View } from "react-native";
import CheckButton from "./buttons/check-button";
import ContinueButton from "./buttons/continue-button";
import FinishButton from "./buttons/finish-button";
import Feedback from "./feedback";
import Frame from "./frame-components/frame";

export default function CourseBody({
  content,
  progress,
  setProgress,
}: {
  content: CourseContent;
  progress: number;
  setProgress: (progress: number) => void;
}) {
  const frameContainerRef = useRef<View>(null);
  const frameRefs = useRef<Record<number, View>>({});

  const scrollRef = useRef<ScrollView>(null);

  const [containerHeight, setContainerHeight] = useState(0);
  const [touchBottom, setTouchBottom] = useState(false);

  const [controlState, setControlState] = useState<
    "static" | "work" | "check" | "correct" | "incorrect" | "finish"
  >("static");

  const handleScroll = (event: any) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const isAtBottom =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 5; // 5px for small buffer

    if (isAtBottom) {
      setTouchBottom(true);
    }
  };

  useEffect(() => {
    frameRefs.current[progress - 1].measure((x, y) => {
      setTouchBottom(false);
      scrollRef.current?.scrollTo({
        y,
        animated: true
      })
    });
  }, [progress]);

  useEffect(() => {
    const type = content.frames[progress - 1].type;
    if (type === "exercise") {
      setControlState("work");
    } else {
      setControlState("static");
    }
  }, [progress, content.frames]);

  const checkExercise = () => {
    console.log("Check exercise");
  };

  const FrameControls = () => {
    const getControl = () => {
      switch (controlState) {
        case "static":
          return (
            <ContinueButton
              onPress={() => {
                setProgress(progress + 1);
              }}
            />
          );
        case "work":
          return <CheckButton disabled />;
        case "check":
          return (
            <CheckButton
              onPress={() => {
                checkExercise();
              }}
            />
          );
        case "correct":
          return <Feedback answer={"correct"} xp={10} />;
        case "incorrect":
          return <Feedback answer={"wrong"} xp={10} />;
        case "finish":
          return <FinishButton onPress={() => { }} />;
      }
    };

    return (
      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: "white",
          padding: 30,
        }}
      >
        {getControl()}
      </View>
    );
  };


  return (
    <View
      style={{ flex: 1, position: "relative" }}
      onLayout={(e) => {
        const { height } = e.nativeEvent.layout;
        setContainerHeight(height);
      }}
    >
      {/* <Button
        title="Scroll Smoothly to 500px"
        onPress={() => smoothScrollTo(scrollRef, 800)}
      /> */}
      <ScrollView
        ref={scrollRef}
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
              <Frame content={frame} action={() => { }} />
            </View>
          ))}
        </View>
        <FrameControls />
      </ScrollView>
      {touchBottom && <FrameControls />}
    </View>
  );
}
