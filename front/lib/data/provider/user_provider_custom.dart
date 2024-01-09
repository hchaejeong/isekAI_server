// import 'dart:convert';
// import 'package:flutter/material.dart';
// import 'package:front/data/db/entity/app_user.dart';
// import 'package:front/screen/register_screen.dart';
// import 'package:http/http.dart' as http;
// import 'package:google_sign_in/google_sign_in.dart';
// import 'package:flutter/foundation.dart';

// class UserProvider_custom extends ChangeNotifier {
//   final GoogleSignIn _googleSignIn;
//   GoogleSignInAccount? _googleAccount;

//   UserProvider_custom()
//       : _googleSignIn = GoogleSignIn(
//             scopes: ['email'],
//             // clientId:
//             //     "168955661710-j93nk0tgq2m1koojchth7appdrgc8vkr.apps.googleusercontent.com");

//   GoogleSignInAccount? get googleAccount => _googleAccount;

//   final String baseUrl =
//       'http://10.0.2.2:8888'; // Replace with your NestJS backend URL

//   Future<void> signInWithGoogle() async {
//     try {
//       final GoogleSignInAccount? googleUser = await _googleSignIn.signIn();
//       final GoogleSignInAuthentication googleAuth =
//           await googleUser!.authentication;
//       final response = await http.post(
//         Uri.parse('$baseUrl/auth/google/verify'),
//         headers: {'Content-Type': 'application/json'},
//         body: jsonEncode({'idToken': googleAuth.idToken}),
//       );
//       print('response.body: ${response.body}');
//       print('response.statusCode: ${response.statusCode}');

//       if (response.statusCode == 200 || response.statusCode == 201) {
//         // Successfully authenticated, parse the response
//         final Map<String, dynamic> userData = jsonDecode(response.body);

//         // Check if the user is a new user
//         bool isNewUser = userData['isNewUser'] ?? false;

//         // Perform actions based on isNewUser
//         if (isNewUser) {
//           // Register the user
//           await registerUserWithGoogle(googleUser, userData);
//         } else {
//           // Login the user
//           final Map<String, dynamic> category_selected =
//               await loginUserWithGoogle(googleUser);

//           final Map<String, dynamic> combinedData = {
//             ...userData,
//             'category': category_selected,
//           };
//         }

//         // You might want to store user data or perform additional processing
//         // For example, updating local variables and notifying listeners
//         print('User Data: $userData');
//         _googleAccount = googleUser;

//         notifyListeners();
//       } else {
//         // Handle error if authentication fails
//         print('Error during Google Sign-In: ${response.body}');
//         throw Exception('Failed to sign in with Google');
//       }
//     } catch (error, stackTrace) {
//       print('Error occurred: $error\n$stackTrace');
//       throw Exception('Failed to sign in with Google');
//     }
//   }

//   Future<Map<String, dynamic>> loginUserWithGoogle(
//       GoogleSignInAccount googleUser) async {
//     // Implement login logic using the googleUser information
//     // For example, you can retrieve user data from your backend
//     // and perform login actions.
//     // ...
//     final response = await http.get(
//       Uri.parse('$baseUrl/auth/google/verify'),
//       headers: {'Content-Type': 'application/json'},
//     );
//     final Map<String, dynamic> preferences = jsonDecode(response.body);

//     return preferences;

//     // After successful login, you can update your local state or perform any other actions
//   }

//   Future<void> registerUserWithGoogle(
//       GoogleSignInAccount googleUser, Map<String, dynamic> userData) async {
//     // Implement registration logic using the googleUser information and userData
//     // For example, you can create a new user account and store additional details.
//     // ...

//     // After successful registration, you can update your local state or perform any other actions
//     notifyListeners();
//   }

//   Future<void> signOut() async {
//     try {
//       await _googleSignIn.signOut();
//       _googleAccount = null;
//       notifyListeners(); // Notify listeners about the user state change
//       print('Signed out');
//     } catch (error) {
//       print('Error signing out: $error');
//     }
//   }
// }
