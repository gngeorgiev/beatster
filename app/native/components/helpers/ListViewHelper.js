import React, {Component} from 'react';
import {View} from 'react-native';

export function renderListSeparator(sectionId, rowId) {
    return (
        <View
            key={`${sectionId}-${rowId}`}
            style={{
                borderTopColor: 'black',
                borderTopWidth: 1,
                marginTop: 4,
                marginBottom: 4,
                marginRight: 10,
                marginLeft: 10,
                opacity: 0.2
            }}
        />
    )
}
