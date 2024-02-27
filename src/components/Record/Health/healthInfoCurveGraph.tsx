import { StyleSheet, View, Text} from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import BodyInfoType from "../../../constants/BodyInfoType";
import FontSize from "../../../constants/FontSize";
import Colors from "../../../constants/Colors";
import { AreaChart, Grid } from 'react-native-svg-charts'
import * as shape from 'd3-shape'
import { Defs, LinearGradient, Stop } from "react-native-svg";

interface DataPoint {
    x : number,
    y : number
};

interface BodyInfoCurveGraphDisplayProps{
    icon: React.ReactNode;
    type: BodyInfoType,
    value: number[],
};



const BodyInfoCurveGraphDisplay: React.FC<BodyInfoCurveGraphDisplayProps> = ({ icon, type, value }) => {
    const [iconName, setIconName] = useState("");
    const [iconContainerColor,  setIconContainerColor] = useState("");
    const [title, setTitle] = useState('');
    const [unit, setUnit] = useState('');
    const [curveColor, setCurveColor] = useState('');
    const data = value

    useEffect(() => {
        switch(type) {
            case BodyInfoType.HeartRate:
                setIconContainerColor('#FBF1F3');
                setTitle('Heart Rate');
                setUnit('bpm');
                setCurveColor('#CA6C6D')
                break;
            case BodyInfoType.BloodSugar:
                setIconContainerColor('#F8DEBD');
                setTitle('Blood Sugar');
                setUnit("mg / dl");
                setCurveColor('#E79B37');
                break;
            case BodyInfoType.BloodPressure:
                setIconContainerColor('#D2FDFF');
                setTitle('Blood Pressure');
                setUnit("mnhg");
                setCurveColor('#468F96')
                break;
        }
    }, [type]); // 这个effect会在type变化时重新运行

    const Gradient = () => (
        <Defs>
            <LinearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <Stop offset="0%" stopColor={curveColor} stopOpacity="0.6" />
                <Stop offset="100%" stopColor={curveColor} stopOpacity="0" />
            </LinearGradient>
        </Defs>
    );

    return (
        <View style={styles.secondRowBox}> 
            <View style={styles.titleContainer}> 
                <View style={styles.IconContainer}>
                    {icon}
                </View>
                <View style={{flexDirection: 'column', width: '50%'}}>
                    <Text style={{fontSize: 12, fontWeight:'bold', }}>{title}</Text>
                </View>
            </View>

            <View style={styles.currentValueContainer}>
                <Text style={styles.currentValueText}>{value[0]}</Text>
                <Text style={styles.currentValueUnit}>{unit}</Text>
            </View>

            <View style={[styles.healthIndicatorBox, {backgroundColor: iconContainerColor}]}>
                <Text style={styles.healthIndicatorText}>Normal</Text>
            </View>
            <View style={{ height: '40%', width: '100%', flexDirection: "row", justifyContent: "center", alignItems: "center", paddingTop: "20%"}}>
            <AreaChart
                style={{ height: 100, width: "100%" }}
                data={data}
                contentInset={{ top: 20, bottom: 30 }}
                curve={shape.curveNatural}
                svg={{ fill: 'url(#gradient)' }}
            >
                <Gradient/>
            </AreaChart>

            </View>
        </View>
      
    );
};
 
const styles = StyleSheet.create({
    secondRowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: "20%",
        width: "100%",
        paddingTop: "2%",
        paddingBottom: "2%",
        marginVertical: "3%",
        
    },
    secondRowBox: {
        borderRadius: 10,
        borderWidth: 1.2,
        borderColor: "#C4C4C4",
        width: "30%",
        height: "100%",
    },
    titleContainer: {
        height: "30%",
        width: "100%",
        flexDirection: 'row',
        alignItems: 'center',
    },
    IconContainer: {
        borderRadius: 10,
        height: "80%",
        width: "33%",
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: "5%",
        marginLeft: "5%"
    },

    currentValueContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: '2%'
    },

    currentValueText: {
        fontSize: FontSize.large,
        color: Colors.darkGray,
        marginLeft: '8%',
    },

    currentValueUnit: {
        fontSize: 9,
        color: Colors.darkGray,
        marginLeft: '5%'
    },

    healthIndicatorBox: {
        height: "12%",
        width: '40%',
        borderRadius: 5,
        marginLeft: '8%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    healthIndicatorText: {
        fontSize: 8
    }
});

export default BodyInfoCurveGraphDisplay;
