import { ControlState, CourseContent, Frame } from "@/lib/types";
import { useEffect, useRef, useState } from "react";
import { ScrollView, View } from "react-native";
import CheckButton from "./buttons/check-button";
import ContinueButton from "./buttons/continue-button";
import FinishButton from "./buttons/finish-button";
import Feedback from "./feedback";
import FrameView from "./frames/frame";

export default function CourseContentViewHeight({
  content,
  progress,
  setProgress,
  controlState,
  setControlState
}: {
  content: CourseContent;
  progress: number;
  setProgress: (progress: number) => void;
  controlState: ControlState,
  setControlState: (state: ControlState) => void;
}) {

  // Refs ---------------------------------------------------------
  const contentContainerRef = useRef<View>(null);
  const frameRefs = useRef<Record<number, View>>({});
  const scrollRef = useRef<ScrollView>(null);

  // Layout -------------------------------------------------------
  const [CourseContentViewHeight, SetCourseContentViewHeight] = useState<number>(0);

  // App states ---------------------------------------------------
  const [isScrollEnd, setIsScrollEnd] = useState<boolean>(false);


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
    // Sets the state of the current module based on the current frame
    const type = content.frames[progress - 1].type;

    // if the type is not "exercise" - in other words interactive - then the control state is always "static"
    if (type === "exercise") {
      setControlState("exercise-start");
    } else {
      setControlState("static");
    }

  }, [progress, content.frames, setControlState]);

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

  const Controls = ({ state }: { state: ControlState }) => {

    const options = {
      /**
       * A static frame - a frame that does not require any user interactions
       */
      "static": <ContinueButton
        onPress={() => {
          setProgress(progress + 1);
        }}
      />,

      /**
       * When a frame has an exercise and no user input applied
       * show a grayed-out check button
       */
      "exercise-start": <CheckButton disabled />,

      /**
       * When user input has been applied, allow the exercise to be checked
       */
      "exercise-check": <CheckButton
        onPress={() => {
          checkExercise();
        }}
      />,

      /**
       * Return feedback on correct answer
       */
      "exercise-correct": <Feedback answer="correct" xp={10} />,

      /**
       * Return feedback on wrong answer
       */
      "exercise-incorrect": <Feedback answer="wrong" xp={10} />,

      /**
       * When user reaches the last frame
       */
      "finish": <FinishButton onPress={() => { }} />,

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
        {options[state] || null}
      </View>
    );
  };


  return (
    <View
      style={{ flex: 1, position: "relative" }}
      onLayout={(e) => {
        const { height } = e.nativeEvent.layout;
        SetCourseContentViewHeight(height);
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
        <View ref={contentContainerRef} style={{ flex: 1 }}>
          {content.frames.map((frame: Frame, index: number) => (
            <View
              key={index}
              ref={(el) => { if (el) frameRefs.current[index] = el }}
              style={{
                height: index < progress ? "auto" : 0, // all the frames to come are "hidden", by setting height to 0
                minHeight: index === progress - 1 ? CourseContentViewHeight : "auto", // expand the last frame to fit this parent container
              }}
            >
              <FrameView frame={frame} />
            </View>
          ))}
        </View>
        <Controls state={controlState} />
      </ScrollView>
      {isScrollEnd && <Controls state={controlState} />}
    </View>
  );
}
