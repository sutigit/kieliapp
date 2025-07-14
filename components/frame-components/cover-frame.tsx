import { CoverFrame } from '@/lib/types'
import React from 'react'
import { Text, View } from 'react-native'

export default function CoverFrameView({ content }: { content: CoverFrame }) {
    return (
        <View>
            <Text>cover-frame</Text>
        </View>
    )
}