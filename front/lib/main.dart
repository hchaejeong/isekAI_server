import 'package:flutter/material.dart';
import 'package:front/data/provider/user_provider_custom.dart';
import 'package:front/screen/navigation_screen.dart';
import 'package:front/screen/sign_in_checker.dart';
import 'package:front/screen/start_screen.dart';
import 'package:provider/provider.dart';

void main() {
  runApp(
    ChangeNotifierProvider<UserProvider>(
      create: (context) => UserProvider(),
      child: MyApp(),
    ),
  );
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider<UserProvider>(
            create: (context) => UserProvider())
      ],
      child: MaterialApp(
        debugShowCheckedModeBanner: false,
        initialRoute: SignInChecker.id,
        routes: {
          SignInChecker.id: (context) => SignInChecker(),
          StartScreen.id: (context) => StartScreen(),
          NavigationScreen.id: (context) => NavigationScreen(),
        },
      ),
    );
  }
}
