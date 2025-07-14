import { Exercise, ExerciseFrame } from '@/lib/types'
import React from 'react'
import { View } from 'react-native'
import Selection from '../frame-components/exercises/selection'
import TextBlock from '../frame-components/text-block'

export default function ExerciseFrameView({ content }: { content: ExerciseFrame }) {


    const renderExercise = (type: Exercise["type"]) => {
        const exercises = {
            selection: <Selection content={content.exercise} />,
        }

        return exercises[type] || null;
    }

    return (
        <View style={{ flex: 1, paddingHorizontal: 20, paddingVertical: 15 }}>
            {content.text && <TextBlock text={content.text} />}
            {content.exercise && renderExercise(content.exercise.type)}
        </View>
    )
}