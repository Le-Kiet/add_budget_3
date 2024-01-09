import React, { useState } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";

const LaunchScreen = ({ navigation }) => {
  const [showRealApp, setShowRealApp] = useState(false);

  const onDone = () => {
    setShowRealApp(true);
  };
  const onSkip = () => {
    setShowRealApp(true);
  };
  const RenderItem = ({ item }) => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: item.backgroundColor,
          alignItems: "center",
          justifyContent: "space-around",
          paddingBottom: 100,
        }}
      >
        <Image style={styles.introImageStyle} source={item.image} />
        <Text style={styles.introTitleStyle}>{item.text1}</Text>
        <Text style={styles.introTextStyle}>{item.text2}</Text>
      </View>
    );
  };
  const handleSignup = () => {
    navigation.navigate("Signup");
  };
  const handleLogin = () => {
    navigation.navigate("Login");
  };

  const handleSkip = () => {
    navigation.navigate("Login");
  };

  const slides = [
    {
      id: 1,
      image: {
        uri: "https://i.imgur.com/mPMldcU.png",
      },
      text1: "Gain total control of your money",
      text2: "Become your own money manager and make every cent count",
    },
    {
      id: 2,
      image: {
        uri: "https://imgur.com/55cKqV7.png",
      },
      text1: "Take charge of your finances with ease",
      text2:
        "Empower yourself to effortlessly manage and control your finances with our",
    },
    {
      id: 3,
      image: {
        uri: "https://i.imgur.com/a8sWwD2.png",
      },
      text1: "Planning ahead",
      text2: "Set up your budget for each category so you in control",
    },
  ];
  return (
    <>
      {showRealApp ? (
        <SafeAreaView style={styles.container}>
          <View style={styles.container}>
            <Text style={styles.titleStyle}>
              React Native App Intro Slider using AppIntroSlider
            </Text>
            <Text style={styles.paragraphStyle}>
              This will be your screen when you click Skip from any slide or
              Done button at last
            </Text>
            <Button
              title="Show Intro Slider again"
              onPress={() => setShowRealApp(false)}
            />
          </View>
        </SafeAreaView>
      ) : (
        <AppIntroSlider
          data={slides}
          renderItem={RenderItem}
          onDone={onDone}
          showSkipButton={true}
          onSkip={onSkip}
          activeDotStyle={{ backgroundColor: "#7F3DFF" }}
        />
      )}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button1} onPress={handleSignup}>
          <Text style={styles.buttonText2}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button2} onPress={handleLogin}>
          <Text style={styles.buttonText1}>Login</Text>
        </TouchableOpacity>
      </View>
    </>
    // <View style={styles.container}>
    //   {/* <OnboardingSwiper data={slides} renderItem={renderItem} /> */}

    //   <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
    //     <Text style={styles.skipText}>Skip</Text>
    //   </TouchableOpacity>
    //   <View style={styles.introText}>
    //     <Text style={styles.text1}>{slides[0].text1}</Text>
    //     <Text style={styles.text2}>{slides[0].text2}</Text>
    //   </View>

    // </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  slide: {
    width: 390,
    justifyContent: "center",
    alignItems: "center",
  },
  introText: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  skipButton: {
    position: "absolute",
    top: 40,
    right: 10,
    padding: 10,
  },
  skipText: {
    fontSize: 15,
    fontFamily: "Roboto",
    fontWeight: "normal",
    color: "#0D0E0F",
  },
  text1: {
    fontSize: 30,
    fontFamily: "Roboto",
    fontWeight: "bold",
    color: "#0D0E0F",
    textAlign: "center",
  },
  text2: {
    fontSize: 18,
    fontFamily: "Roboto",
    fontWeight: "normal",
    color: "#0D0E0F",
    textAlign: "center",
  },
  buttonsContainer: {
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 20,
  },
  button1: {
    backgroundColor: "#EEE5FF",
    width: 343,
    height: 56,
    padding: 8,
    justifyContent: "center",
    marginBottom: 10,
    width: 200,
    alignItems: "center",
    borderRadius: 16,
  },
  button2: {
    backgroundColor: "#7F3DFF",
    padding: 15,
    marginBottom: 10,
    width: 200,
    alignItems: "center",
    borderRadius: 16,
  },
  buttonText1: {
    color: "#ffffff",
    fontFamily: "Roboto",
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonText2: {
    color: "#7F3DFF",
    fontFamily: "Roboto",
    fontSize: 18,
    fontWeight: "bold",
  },
  Image: {
    width: 300,
    height: 300,
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: 20,
  },
  titleStyle: {
    padding: 10,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  paragraphStyle: {
    padding: 20,
    textAlign: "center",
    fontSize: 16,
  },
  introImageStyle: {
    width: 200,
    height: 200,
  },
  introTextStyle: {
    fontSize: 12,
    color: "gray",
    textAlign: "center",
    paddingVertical: 10,
  },
  introTitleStyle: {
    fontSize: 25,
    color: "black",
    textAlign: "center",
    marginBottom: 16,
    fontWeight: "bold",
  },
});

export default LaunchScreen;
