import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, View, TouchableOpacity, Image, PermissionsAndroid, } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';


let options = {
  saveToPhotos: true,
  mediaType: 'photo',
  cameraType : 'front',
  
};

let optionsGallery = {
  saveToPhotos: true,
  mediaType: 'photo',
  
};

let myArray;


export default function App() {

  const [cameraphoto, setcameraphoto] = useState();
  const [galleryphoto, setgalleryphoto] = useState();

  const openCamera = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      const result = await launchCamera(options);
      setcameraphoto(result.assets[0].uri);
      
    }
  }

  
  const openGallery = async () => {

    const result = await launchImageLibrary(optionsGallery);
    setgalleryphoto(result.assets[0].uri);

    myArray = result.assets[0].uri.split(",");
    console.log(myArray[1]);

    await fetch("http://1ea0-34-74-248-219.ngrok.io/prediction", {
      method: "POST",
      mode: 'no-cors',
      body: {

        image: String(myArray[1])

      }
    }).then((result) => {
      console.log(result)
    })
    
  }


  return (
    <>
      <View style={styles.container}>
        <Text style={{ color: '#DFF3ED', marginTop: '15px', marginBottom: '25px', fontSize: '35px' }}> <Icon name="brain" size={40} color="#DFF3ED" /> Brain Tumor Detection </Text>

        <TouchableOpacity onPress={openGallery} style={styles.button}>
          <Text style={styles.buttonText}>Open Gallery</Text>
        </TouchableOpacity>
        <Image style={styles.ImageStyle} source={{ uri: galleryphoto }} />

        <StatusBar style="auto" />
      </View>
    </>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111B21',
    alignItems: 'center',
  },
  button: {
    padding: '10px',
    width: '150px',
    borderRadius: '10px',
    border: '1px #DFF3ED solid',
    backgroundColor: '#841584',
    marginBottom: '20px',
    alignItems: 'center',
  },
  buttonText: {
    color: '#DFF3ED',
    alignItems: 'center',
  },
  ImageStyle: {
    width: '200px',
    height: '200px',
  }
});
