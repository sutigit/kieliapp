import { CoverFrame, ExerciseFrame, Frame, StaticFrame } from "@/lib/types";
import { View } from "react-native";
import CoverFrameView from "./cover-frame";
import ExerciseFrameView from "./exercise-frame";
import StaticFrameView from "./static-frame";

export default function FrameView({
  frame,
}: {
  frame: Frame;
}) {

  const renderFrame = (frame: Frame) => {
    const frames = {
      cover: <CoverFrameView content={frame.content as CoverFrame} />,
      static: <StaticFrameView content={frame.content as StaticFrame} />,
      exercise: <ExerciseFrameView content={frame.content as ExerciseFrame} />,
    };

    return frames[frame.type] || null;
  }

  return (
    <View style={{ flex: 1 }}>
      {renderFrame(frame)}
    </View>
  );
}
