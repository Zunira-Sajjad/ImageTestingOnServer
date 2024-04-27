import React, { useState } from 'react';
import { View, Button, Image, Text } from 'react-native'; // Import Text component
import axios from 'axios';
import FormData from 'form-data'; // Import FormData
import mime from 'mime'; // Import mime to get accurate image type

const App = () => {
  const [watchImage, setWatchImage] = useState(require('./android/app/src/main/res/drawable/try1.jpg'));
  const [wristImage, setWristImage] = useState(require('./android/app/src/main/res/drawable/wrist.jpg'));
  const [resultImage, setResultImage] = useState(null);

  const uploadImages = async () => {
    console.log('Upload Images Function');
    const formData = new FormData();

    // Add watch image to form data
    console.log('Here 1');
    formData.append('watchImage', {
      uri: watchImage,
      name: watchImage, // Get image name from uri
      type: mime.getType(watchImage), // Get accurate image type
    });
    console.log('Here 2');
    // Add wrist image to form data
    formData.append('wristImage', {
      uri: wristImage,
      name: wristImage, // Get image name from uri
      type: mime.getType(wristImage), // Get accurate image type
    });
  
    console.log('Here 3');
    try {
      const response = await axios.post('http://192.168.27.26:8000', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },        
      });
      console.log('Here 4');
      //setResultImage({ uri: response.data.result_image_url }); // Update this line
  
    } catch (error) {
      console.error('Error uploading images: ', error);
    }
  };

  return (
    <View>
      <Button title="Upload Images" onPress={uploadImages} />
      <Image source={watchImage} style={{ width: 200, height: 200 }} />
      <Image source={wristImage} style={{ width: 200, height: 200 }} />
      {/* Wrap the conditional rendering within a Text component */}
      {resultImage && <Text><Image source={resultImage} style={{ width: 200, height: 200 }} /></Text>}
    </View>
  );
};

export default App;
