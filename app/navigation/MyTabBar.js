import React, {PureComponent} from 'react';
import {Text, View} from 'react-native';
import {DARK_COLOR, GREEN_COLOR, GREY_COLOR} from '../helpers/constants';
import Ripple from 'react-native-material-ripple';
import {SafeAreaView} from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';

export const MyTabBar = ({state, descriptors, navigation}) => {
    return (
        <View
            style={{
                flexDirection: 'row',
                backgroundColor: DARK_COLOR,
                border: 0,
                borderTopColor: '#fff',
                borderTopWidth: 0,
                shadowColor: '#000',
                shadowOffset: {
                    width: 0,
                    height: 7,
                },
                shadowOpacity: 0.61,
                shadowRadius: 9.11,
            }}>
            {state.routes.map((route, index) => {
                const {options} = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                        ? options.title
                        : route.name;

                const isFocused = state.index === index;

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (
                    <MenuButton route={route} isFocused={isFocused} options={options}
                                key={route.key}
                                onLongPress={onLongPress} label={label} navigation={navigation}/>
                );
            })}
        </View>
    );
};

class MenuButton extends PureComponent {

    onPress = () => {
        const {route, isFocused, navigation} = this.props;

        if (this.ref) {
            this.ref.play();
        }
        const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
        });
        if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
        }
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!prevProps.isFocused && this.ref && this.props.isFocused) {
            this.ref.play();
        }
    }

    render() {
        const {route, onLongPress, options, isFocused, label} = this.props;
        const {iconOn, iconOff} = options;

        return (
            <Ripple
                rippleOpacity={0.8}
                key={route.key}
                accessibilityRole="button"
                accessibilityStates={isFocused ? ['selected'] : []}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={this.onPress}
                rippleColor={'#EAEDF2'}
                onLongPress={onLongPress}
                style={{flex: 1}}
            >
                <SafeAreaView style={{justifyContent: 'center'}} edges={['bottom', 'left', 'right']}
                              style={{paddingTop: 5}}>
                    {
                        iconOn && iconOff &&
                        <LottieView source={isFocused ? iconOn : iconOff}

                                    style={{margin: 0, padding: 0, height: 40, alignSelf: 'center'}}
                                    progress={!isFocused ? 0 : undefined}

                                    loop={false}
                                    ref={anim => {
                                        this.ref = anim;
                                    }}/>
                    }

                    <Text style={{
                        textAlign: 'center', color: isFocused ? GREEN_COLOR : GREY_COLOR, margin: 0,
                        fontSize: 12,
                    }}>
                        {label}
                    </Text>
                </SafeAreaView>
            </Ripple>
        );
    }
}


