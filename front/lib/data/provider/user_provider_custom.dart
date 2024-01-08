import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:google_sign_in/google_sign_in.dart';
import 'package:flutter/foundation.dart';

class UserProviderCustom extends ChangeNotifier {
  final GoogleSignIn _googleSignIn;
  GoogleSignInAccount? _googleAccount;

  UserProviderCustom()
      : _googleSignIn = GoogleSignIn(
            scopes: ['email'],
            clientId:
                "168955661710-j93nk0tgq2m1koojchth7appdrgc8vkr.apps.googleusercontent.com");

  GoogleSignInAccount? get googleAccount => _googleAccount;

  final String baseUrl =
      'http://10.0.2.2:8888'; // Replace with your NestJS backend URL

  Future<void> signInWithGoogle() async {
    try {
      final GoogleSignInAccount? googleUser = await _googleSignIn.signIn();
      final GoogleSignInAuthentication googleAuth =
          await googleUser!.authentication;
      final response = await http.post(
        Uri.parse('$baseUrl/auth/google/verify'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({'idToken': googleAuth.idToken}),
      );
      print('response.body: ${response.body}');
      print('response.statusCode: ${response.statusCode}');

      if (response.statusCode == 200 || response.statusCode == 201) {
        // Successfully authenticated, parse the response
        final Map<String, dynamic> userData = jsonDecode(response.body);
        // You might want to store user data or perform additional processing
        // For example, updating local variables and notifying listeners
        print('User Data: $userData');
        _googleAccount = googleUser;
        notifyListeners();
      } else {
        // Handle error if authentication fails
        print('Error during Google Sign-In: ${response.body}');
        print(googleAuth.idToken);
        throw Exception('Failed to sign  in with Google');
      }
    } catch (error, stackTrace) {
      print('Error occurred: $error\n$stackTrace');
      throw Exception('Failed to sign in with Google');
    }
  }
}
