import { StaticFrame } from '@/lib/types'
import React from 'react'
import { Text, View } from 'react-native'

export default function StaticFrameView({ content }: { content: StaticFrame }) {
    return (
        <View>
            <Text>static-frame</Text>
        </View>
    )
}