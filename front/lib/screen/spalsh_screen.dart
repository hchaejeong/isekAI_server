import 'package:animated_splash_screen/animated_splash_screen.dart';
import 'package:flutter/material.dart';
import 'package:front/screen/sign_in_checker.dart';

class SplashScreen extends StatefulWidget {
  static const String id = 'splash_screen';

  @override
  _SplashScreenState createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> {
  // @override
  // void initState() {
  //   super.initState();
  //   checkIfUserExists();
  // }

  // Future<void> checkIfUserExists() async {
  //   String? userId = await SharedPreferencesUtil.getUserId();
  //   Navigator.pop(context);
  //   if (userId != null) {
  //     Navigator.pushNamed(context, NavigationScreen.id);
  //   } else {
  //     Navigator.pushNamed(context, StartScreen.id);
  //   }
  // }

  @override
  Widget build(BuildContext context) {
    return AnimatedSplashScreen(
      splash: Image.asset('assets/images/cat.png'),
      backgroundColor: Colors.grey,
      nextScreen: SignInChecker(),
      duration: 3000,
      splashTransition: SplashTransition.fadeTransition,
    );
  }
}
