import { ExerciseFrame } from '@/lib/types'
import React from 'react'
import { View } from 'react-native'
import SelectionEx from './exercises/selection'
import TextBlock from './text-block'

export default function ExerciseFrameView({ content }: { content: ExerciseFrame }) {
    return (
        <View style={{ flex: 1, paddingHorizontal: 20, paddingVertical: 15 }}>
            {content.text && <TextBlock text={content.text} />}
            {content.exercise && (
                <SelectionEx exercise={content.exercise} />
            )}
        </View>
    )
}