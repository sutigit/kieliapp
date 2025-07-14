import { CoverFrame, ExerciseFrame, Frame, StaticFrame } from "@/lib/types";
import { View } from "react-native";
import CoverFrameView from "./cover-frame";
import ExerciseFrameView from "./exercise-frame";
import StaticFrameView from "./static-frame";

export default function FrameView({
  frame,
  action,
}: {
  frame: Frame;
  action: () => void;
}) {

  const renderFrame = (frame: Frame) => {
    switch (frame.type) {
      case 'cover':
        return <CoverFrameView content={frame.content as CoverFrame} />
      case 'static':
        return <StaticFrameView content={frame.content as StaticFrame} />
      case 'exercise':
        return <ExerciseFrameView content={frame.content as ExerciseFrame} />
    }
  }

  return (
    <View style={{ flex: 1 }}>
      {renderFrame(frame)}
    </View>
  );
}
