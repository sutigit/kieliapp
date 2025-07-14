import { ExerciseFrame } from '@/lib/types'
import React from 'react'
import { Text, View } from 'react-native'

export default function ExerciseFrameView({ content }: { content: ExerciseFrame }) {
    return (
        <View>
            <Text>exercise-frame</Text>
        </View>
    )
}