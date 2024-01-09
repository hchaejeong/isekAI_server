import 'package:flutter/material.dart';
import 'package:front/widget/bottom_bar.dart';

class NavigationScreen extends StatefulWidget {
  static const String id = 'navigation_screen';

  @override
  _NavigationScreenState createState() => _NavigationScreenState();
}

class _NavigationScreenState extends State<NavigationScreen> {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
          body: Container(
            child: Text('Navigation Screen'),
          ),
          bottomNavigationBar: Bottom_Tab(
            onTabChange: (index) {
              print(index);
            },
          )),
    );
  }
}
