import 'package:flutter/material.dart';
import 'package:google_nav_bar/google_nav_bar.dart';

class Bottom_Tab extends StatefulWidget {
  final Function(int) onTabChange;

  Bottom_Tab({required this.onTabChange});

  @override
  _BottomTabState createState() => _BottomTabState();
}

class _BottomTabState extends State<Bottom_Tab> {
  int _selectedIndex = 0; // <-- Revision: Define _selectedIndex here

  @override
  Widget build(BuildContext context) {
    return Container(
      color: Colors.black,
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 15.0, vertical: 5),
        child: GNav(
          backgroundColor: Colors.black,
          color: Colors.white,
          activeColor: Colors.black,
          tabBackgroundColor: Colors.grey.shade400,
          gap: 8,
          padding: const EdgeInsets.all(16),
          tabs: const [
            GButton(icon: Icons.home, text: 'Home'),
            GButton(icon: Icons.search, text: 'Search'),
            GButton(
              icon: Icons.import_contacts,
              text: 'Library',
            ),
            GButton(
              icon: Icons.person,
              text: 'Profile',
            ),
          ],
          selectedIndex: _selectedIndex,
          onTabChange: (index) {
            setState(() {
              _selectedIndex =
                  index; // <-- Revision: Update _selectedIndex here
            });
            widget.onTabChange(index);
          },
        ),
      ),
    );
  }
}
