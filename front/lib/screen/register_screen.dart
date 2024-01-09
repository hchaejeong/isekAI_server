// import 'package:flutter/material.dart';
// import 'package:front/data/model/user_registration.dart';
// import 'package:front/data/provider/user_provider_custom.dart';
// import 'package:front/screen/register_sub_screens.dart/register_category_select_screen.dart';
// import 'package:front/screen/register_sub_screens.dart/register_content_select_screen.dart';
// import 'package:front/screen/start_screen.dart';
// import 'package:provider/provider.dart';

// class RegisterScreen extends StatefulWidget {
//   static const String id = 'register_screen';

//   @override
//   _RegisterScreenState createState() => _RegisterScreenState();
// }

// class _RegisterScreenState extends State<RegisterScreen> {
//   final UserRegistration _userRegistration = UserRegistration();

//   final int _endScreenIndex = 3;
//   int _currentScreenIndex = 0;
//   bool _isLoading = false;
//   late UserProvider _userProvider;

//   @override
//   void initState() {
//     super.initState();
//     _userProvider = Provider.of<UserProvider>(context, listen: false);
//   }

//   void registerUser() async {
//     setState(() {
//       _isLoading = true;
//     });

//     await _userProvider.signInWithGoogle().then((response) {
//       if (response) {
//         Navigator.pop(context);
//         Navigator.pushNamed(context, TopNavigationScreen.id);
//       }
//     });

//     setState(() {
//       _isLoading = false;
//     });
//   }

//   void goBackPressed() {
//     if (_currentScreenIndex == 0) {
//       Navigator.pop(context);
//       Navigator.pushNamed(context, StartScreen.id);
//     } else {
//       setState(() {
//         _currentScreenIndex--;
//       });
//     }
//   }

//   Widget getSubScreen() {
//     switch (_currentScreenIndex) {
//       case 0:
//         return CategorySelectScreen(
//             onChanged: (value) => {_userRegistration.name = value});
//       case 1:
//         return ContentSelectScreen(
//             onChanged: (value) => {_userRegistration.age = value});
//       default:
//         return Container();
//     }
//   }
// }
