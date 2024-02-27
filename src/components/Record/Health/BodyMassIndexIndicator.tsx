
import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import  BMI_Image from "../../../assets/Health/BMI_Indicator.svg";
import { width,height } from '../../../constants/Layout';
import FontSize from '../../../constants/FontSize';

interface BodyMassIndexIndicatorProps {
    BMI_Value : number;
};

const BodyMassIndexIndicator: React.FC<BodyMassIndexIndicatorProps> = ({
	BMI_Value
}) => {
    const scale = {
        min: 15,
        max: 35,
      };
    const clampedBMI = Math.max(scale.min, Math.min(BMI_Value, scale.max));
    const indicatorPosition = (clampedBMI - scale.min) / (scale.max - scale.min + 1);

	return (
        <View style={styles.container}>
            <View style={styles.mapPadding}>
                <BMI_Image />
                <View style={[styles.indicator, { left: `${indicatorPosition * 100}%` }]} />
            </View>
            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    mapPadding: {
        flexDirection: "column",
        justifyContent: "flex-end",
        // backgroundColor: "yellow",
        position: 'relative', // 为了绝对定位指示点
        width: '100%', // 容器宽度100%
        height: 50, // 根据热力图的高度调整
    },

    indicator: {
        position: 'absolute',
        top: 13, 
        width: "3%",
        height: "10%",
        borderRadius: 50,
        backgroundColor: 'red', 
        transform: [{ translateY: -(5 / 2) }],
    },
});

export default BodyMassIndexIndicator;