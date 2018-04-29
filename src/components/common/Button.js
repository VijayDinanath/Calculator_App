import React, { PropTypes } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableHighlight
} from 'react-native';

export default class Button extends React.Component {
    constructor(props) {
        super(props);
    }

    onPress = () => {
        const { onPress, title } = this.props;
        if (onPress) {
            onPress(title);
        }
    }

    render() {
        return (
            <TouchableHighlight onPress={this.onPress} style={[styles.container, this.props.style]} underlayColor={this.props.underlayColor || '#d1d1d1'}>
                <Text style={[styles.title, this.props.titleStyle]} >
                    {this.props.title}
                </Text>
            </TouchableHighlight>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#d3d3d3',
        borderWidth: 0.5
    },
    title: {
        fontSize: 25
    }
})