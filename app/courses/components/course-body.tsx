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

  // Refs ---------------------------------------------------------
  const frameContainerRef = useRef<View>(null);
  const frameRefs = useRef<Record<number, View>>({});
  const scrollRef = useRef<ScrollView>(null);

  // Layout -------------------------------------------------------
  const [containerHeight, setContainerHeight] = useState<number>(0);

  // App states ---------------------------------------------------
  const [isScrollEnd, setIsScrollEnd] = useState<boolean>(false);
  const [controlState, setControlState] = useState<
    "static" | "work" | "check" | "correct" | "incorrect" | "finish"
  >("static");

  useEffect(() => {
    // Auto-scroll on progress updated
    frameRefs.current[progress - 1].measure((x, y) => {
      setIsScrollEnd(false);
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


  const observeScrollEnd = (event: any) => {
    // Checks if we are at the bottom of the scroll view. Small buffer added
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const isAtBottom =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 5; // 5px for small buffer

    if (isAtBottom) {
      setIsScrollEnd(true);
    }
  };

  const checkExercise = () => { }

  const Controls = () => {
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

      <ScrollView
        ref={scrollRef}
        style={{ flex: 1 }}
        onScroll={observeScrollEnd}
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
        <Controls />
      </ScrollView>
      {isScrollEnd && <Controls />}
    </View>
  );
}
