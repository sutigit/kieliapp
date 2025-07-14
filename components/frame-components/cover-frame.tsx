import { CoverFrame } from '@/lib/types';
import React from 'react';
import { View } from 'react-native';
import Image from "./image";
import TextBlock from './text-block';
import Title from './title';


export default function CoverFrameView({ content }: { content: CoverFrame }) {
    return (
        <View>
            <Image image={content.imageUrl} />
            <View style={{ flex: 1, paddingHorizontal: 20, paddingVertical: 15 }}>
                <Title text={content.title} />
                <TextBlock text={content.text} />
            </View>
        </View>
    )
}