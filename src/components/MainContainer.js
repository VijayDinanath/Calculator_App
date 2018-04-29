import React, { PropTypes } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableHighlight
} from 'react-native';
import { Button } from './common';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';

class MainContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            result: '0',
            formula: '0'
        },
            this.keypadEntries = [
                [{ title: '1' }, { title: '2' }, { title: '3' }, { title: '*' }],
                [{ title: '4' }, { title: '5' }, { title: '6' }, { title: '-' }],
                [{ title: '7' }, { title: '8' }, { title: '9' }, { title: '+' }],
                [{ title: '0' }, { title: '00' }, { title: '.' }, { title: '=' }]
            ]
    }

    componentWillReceiveProps(nextProps){
        if((nextProps.resultData.result && nextProps.resultData.result !== '') && (nextProps.resultData.formula && nextProps.resultData.formula !== '')){
            this.setState({result: nextProps.resultData.result, formula:nextProps.resultData.formula});
        }
    }

    onPressOperatorOrNumber = (symbol) => {
        formulaValue = this.state.formula;
        if (this.isUpdateSymbol(symbol)) {
            this.setState({ formula: formulaValue === '0' ? symbol : formulaValue + symbol });
        }
    }

    isUpdateSymbol = (symbol) => {
        let enteredCharacters = formulaValue.split('');
        lastSymbol = enteredCharacters[enteredCharacters.length - 1];
        switch (symbol) {
            case '.': {
                if (lastSymbol === '.')
                    return false;
            }
                break;

            case '+':
            case '-':
            case '*':
            case '/':
                {
                    if (lastSymbol === '+' || lastSymbol === '-' || lastSymbol === '*' || lastSymbol === '/')
                        return false;
                }
                break;

            default:
                break;
        }

        return true;

    }

    onPressSubmitResult = () => {
        this.props.getResultAction({formula:this.state.formula});
    }

    onBackSpaceOperator = () => {
        trimmedValue = this.state.formula.slice(0, this.state.formula.length - 1);
        this.setState({
            formula: trimmedValue === '' ? '0' : trimmedValue
        })
    }

    onPressACButton = () => {
        this.setState({
            formula: '0',
            result: '0'
        });
    }

    renderKeypad() {
        return this.keypadEntries.map((rowButtons, rowIndex) => {
            return <View key={rowIndex} style={styles.row}>
                <Button key={rowButtons[0].title} style={styles.numberButton} onPress={() => { this.onPressOperatorOrNumber(rowButtons[0].title) }} title={rowButtons[0].title} />
                <Button key={rowButtons[1].title} style={styles.numberButton} onPress={() => { this.onPressOperatorOrNumber(rowButtons[1].title) }} title={rowButtons[1].title} />
                <Button key={rowButtons[2].title} style={styles.numberButton} onPress={() => { this.onPressOperatorOrNumber(rowButtons[2].title) }} title={rowButtons[2].title} />
                <Button key={rowButtons[3].title} style={styles.operation} titleStyle={styles.titleOperationStyle} onPress={() => { rowButtons[3].title === '=' ? this.onPressSubmitResult() : this.onPressOperatorOrNumber(rowButtons[3].title) }} title={rowButtons[3].title} />
            </View>
        })
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ backgroundColor: '#282828', height: 130 }}>
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <Text style={[styles.resultText, { fontSize: (60 - (this.state.result.toString().length)) }]}>
                            {this.state.result}
                        </Text>
                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-end' }}>
                    <View style={{ flex: 1, backgroundColor: '#494949' }}>
                        <View style={{ flex: 1, alignItems: 'center', flexDirection: 'row' }}>
                            <Text style={styles.formulaText}>
                                {this.state.formula}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <Button style={styles.acButton} titleStyle={styles.titleOperationStyle} onPress={() => { this.onPressACButton() }} title='AC' />
                        <Button style={styles.operation} titleStyle={styles.titleOperationStyle} onPress={() => { this.onBackSpaceOperator() }} title='⌫' />
                        <Button style={styles.operation} titleStyle={styles.titleOperationStyle} onPress={() => { this.onPressOperatorOrNumber('/') }} title='/' />
                    </View>
                    {this.renderKeypad()}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    Component: {
        flex: 1,
        flexDirection: 'column'
    },
    acButton: {
        flex: 2,
        backgroundColor: '#FD9637',
        height: 75
    },
    numberButton: {
        flex: 1,
        height: 75
    },
    operation: {
        flex: 1,
        backgroundColor: '#FD9637',
        height: 75
    },
    textButton: {
        color: 'black'
    },
    formulaText: {
        flex: 1,
        color: 'white',
        textAlign: 'right',
        fontSize: 30,
        marginRight: 16
    },
    iconStyle: {
        color: 'white',
        marginLeft: 16
    },
    resultText: {
        color: 'white',
        textAlign: 'right',
        fontSize: 60,
        marginRight: 16
    },
    titleOperationStyle: {
        color: 'white'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    equalButton: {
        backgroundColor: '#FD9637',
        flex: 1,
        height: 75
    }
})

function mapStateToProps(state) {
    return {
        resultData: state.getResultData.resultData
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MainContainer);