import 'package:flutter/material.dart';
import 'package:google_nav_bar/google_nav_bar.dart';
// ignore_for_file: prefer_const_constructors

class HomePage extends StatefulWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        bottomNavigationBar: Container(
            color: Colors.black,
            child: Padding(
              padding:
                  const EdgeInsets.symmetric(horizontal: 15.0, vertical: 5),
              child: GNav(
                  backgroundColor: Colors.black,
                  color: Colors.white,
                  activeColor: Colors.black,
                  tabBackgroundColor: Colors.grey.shade400,
                  gap: 8,
                  padding: EdgeInsets.all(16),
                  onTabChange: (index) {
                    print(index);
                  },
                  tabs: const [
                    GButton(icon: Icons.home, text: 'Home'),
                    GButton(icon: Icons.search, text: 'Search'),
                    GButton(
                      icon: Icons.import_contacts,
                      text: 'Liabrary',
                    ),
                    GButton(
                      icon: Icons.person,
                      text: 'Profile',
                    )
                  ]),
            )));
  }
}
