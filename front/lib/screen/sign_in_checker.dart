import 'package:flutter/material.dart';
import 'package:front/screen/navigation_screen.dart';
import 'package:front/screen/start_screen.dart';
import 'package:front/util/shared_preferences_utils.dart';

class SignInChecker extends StatefulWidget {
  static const String id = 'sigh_in_checker';

  @override
  _SignInCheckerState createState() => _SignInCheckerState();
}

class _SignInCheckerState extends State<SignInChecker> {
  @override
  void initState() {
    super.initState();
    checkIfUserExists();
  }

  Future<void> checkIfUserExists() async {
    String? userId = await SharedPreferencesUtil.getUserId();
    // You may want to show a loading indicator here while checking
    // For example: showLoadingIndicator();
    print('checkIfUserExists: $userId');

    if (userId != null) {
      Navigator.pushReplacementNamed(context, NavigationScreen.id);
      print('move to NavigationScreen');
    } else {
      Navigator.pushReplacementNamed(context, StartScreen.id);
      print('move to StartScreen');
    }
  }

  @override
  Widget build(BuildContext context) {
    // You can show a loading indicator or other UI while checking
    return Scaffold(
      body: Center(
        child: CircularProgressIndicator(),
      ),
    );
  }
}
