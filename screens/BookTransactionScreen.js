import React from 'react';
import { Text, View, ToastAndroid, TouchableOpacity, StyleSheet, TextInput, Image, KeyboardAvoidingView } from 'react-native';
import { BarCodeScanner } from "expo-barcode-scanner";
import *as Permissions from "expo-permissions"

export default class TransactionScreen extends React.Component {

  constructor() {
    super()
    this.state = {
      hasCameraPermission: null,
      scanned: false,
      scannedBookId: '',
      scannedStudentId: '',
      buttonState: "normal"
    }
  }

  getCameraPermission = async (id) => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA)
    this.setState({
      hasCameraPermission: status === "granted",
      buttonState: id,
      scanned: false
    })
    console.log(this.state.scannedData);
  }

  handleBarCodeScanned = async ({ type, data }) => {
    const {buttonState}= this.state
    if(buttonState==="BookId"){
      this.setState({
        scanned:true,
        scannedBookId:data,
        buttonState:"normal"
      })

    }
    else if(buttonState==="StudentId"){
      this.setState({
        scanned:true,
        scannedStudentId:data,
        buttonState:"normal"
      })
    }

  }



  render() {
    const hasCameraPermission = this.state.hasCameraPermission;
    const scanned = this.state.scanned;
   // const scannedData = this.state.scannedData;
    const buttonState = this.state.buttonState;

    if (buttonState !=="normal" && hasCameraPermission) {
      return (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      )
    }

    else if (buttonState === "normal") {
      return (
        <View style={styles.container}>
          <View>
            <Image source={require("../assets/booklogo.jpg")}
              style={{ width: 200, height: 200 }}></Image>
            <Text style={{ textAlign: 'center', fontSize: 30 }}>Wily</Text>
          </View>

          <View style={styles.inputView}>
            <TextInput
              style={styles.inputBox}
              placeholder="Book Id"
              value={this.state.scannedBookId} />
            <TouchableOpacity
              style={styles.scanButton}
              onPress={() => {
                this.getCameraPermission("BookId")
              }}>
              <Text style={styles.buttonText}>Scan</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputBox}
              placeholder="Student Id"
              value={this.state.scannedStudentId} />
            <TouchableOpacity
              style={styles.scanButton}
              onPress={() => {
                this.getCameraPermission("StudentId")
              }}>
              <Text style={styles.buttonText}>Scan</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputView: {
    flexDirection: 'row',
    margin: 20
  },
  inputBox: {
    width: 200,
    height: 40,
    borderWidth: 1.5,
    borderRightWidth: 0,
    fontSize: 20
  },
  scanButton: {
    backgroundColor: '#66BB6A',
    width: 50,
    borderWidth: 1.5,
    borderLeftWidth: 0
  }
})