import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RecordStackParamList } from "../../../types";
import { SafeAreaView, StyleSheet, View, TouchableOpacity, Text, TextInput } from "react-native";
import { height, width } from "../../constants/Layout";
import { AntDesign } from '@expo/vector-icons';
import FontSize from "../../constants/FontSize";
import Colors from "../../constants/Colors";
import { useState } from "react";

type Props = NativeStackScreenProps<RecordStackParamList, "LogHealthInfoScreen">;

const LogHealthInfoScreen = ({navigation}: Props) => {
    const [heightInfo, setHeightInfo] = useState('');
    const [weightInfo, setWeightInfo] = useState('');

    const [heartRate, setHeartRate] = useState('');
    const [bloodSugar, setBloodSugar] = useState('');
    const [BloodPressure, setBloodPressure] = useState('');

    const [chest, setChest] = useState('');
    const [waist, setWaist] = useState('');
    const [hip, setHip] = useState('');

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
				<AntDesign
					name="arrowleft"
					size={ 0.06 * width}
					color="grey"
					onPress={() => {
						navigation.goBack();
					}}
				/>
				<TouchableOpacity>
                    <Text style={{fontSize: FontSize.medium, color: Colors.darkGray}}>SAVE</Text>
                </TouchableOpacity>
			</View>


            <View style={styles.contentContainer}>
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Basic information</Text>
                    <View style={styles.inputContainer}>
                        <Text>Height (cm)</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={setHeightInfo}
                            value={heightInfo}
                            placeholder="170"
                            placeholderTextColor="grey"
                            keyboardType="numeric"
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text>Weight (kg)</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={setWeightInfo}
                            value={weightInfo}
                            placeholder="65"
                            placeholderTextColor="grey"
                            keyboardType="numeric"
                        />
                    </View>
                </View>
                
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Health Index</Text>
                    <View style={styles.inputContainer}>
                        <Text>Heart Rate (bpm)</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={setHeartRate}
                            value={heartRate}
                            placeholder="98"
                            placeholderTextColor="grey"
                            keyboardType="numeric"
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text>Blood Sugar (mg/dl)</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={setBloodSugar}
                            value={bloodSugar}
                            placeholder="80"
                            placeholderTextColor="grey"
                            keyboardType="numeric"
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text>Blood pressure (mmhg)</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={setBloodPressure}
                            value={BloodPressure}
                            placeholder="72/102"
                            placeholderTextColor="grey"
                            keyboardType="numeric"
                        />
                    </View>
                </View>

                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Body Measurement</Text>
                    <View style={styles.inputContainer}>
                        <Text>Chest (in)</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={setChest}
                            value={chest}
                            placeholder="44.5"
                            placeholderTextColor="grey"
                            keyboardType="numeric"
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text>Waist (in)</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={setWaist}
                            value={waist}
                            placeholder="34"
                            placeholderTextColor="grey"
                            keyboardType="numeric"
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text>Hip (in)</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={setHip}
                            value={hip}
                            placeholder="42.5"
                            placeholderTextColor="grey"
                            keyboardType="numeric"
                        />
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container : {
        flex : 1
    },
    header : {
        backgroundColor: "white",
        padding: 0.04 * width,
        flexDirection: "row",
        justifyContent: "space-between",
        alignContent: "space-between",
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
        height: 0.06 * height,
    },


    contentContainer: {
        padding: 0.04 * width,
    },
    sectionContainer: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: FontSize.large,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 8,
        
    },
    input: {
        backgroundColor: '#F7F7F7',
        borderRadius: 5,
        padding: 8,
        width: '30%',
        textAlign: 'right',
    },
});

export default LogHealthInfoScreen;