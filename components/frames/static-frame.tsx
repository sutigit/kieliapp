import { StaticFrame } from '@/lib/types'
import React from 'react'
import { View } from 'react-native'
import Example from '../frame-components/example'
import Image from '../frame-components/image'
import TextBlock from '../frame-components/text-block'
import Title from '../frame-components/title'

export default function StaticFrameView({ content }: { content: StaticFrame }) {

    return (
        <View style={{ flex: 1, paddingHorizontal: 20, paddingVertical: 15 }}>
            {content.imageUrl && <Image image={content.imageUrl} />}
            {content.title && <Title text={content.title} />}
            {content.text && <TextBlock text={content.text} />}
            {content.example && <Example text={content.example} />}
        </View>
    )
}