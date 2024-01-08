import 'package:flutter/material.dart';
import 'package:google_sign_in/google_sign_in.dart';

class UserProvider extends ChangeNotifier {
  final GoogleSignIn _googleSignIn;
  GoogleSignInAccount? _googleAccount;

  UserProvider() : _googleSignIn = GoogleSignIn(scopes: ['email']);

  GoogleSignInAccount? get googleAccount => _googleAccount;

  Future<void> signInWithGoogle() async {
    try {
      final GoogleSignInAccount? googleAccount = await _googleSignIn.signIn();

      if (googleAccount != null) {
        _googleAccount = googleAccount;
        notifyListeners(); // Notify listeners about the user state change
        print('Signed in as: ${googleAccount.displayName}');
        print(googleAccount);
        print(googleAccount.email);
      }
    } catch (error) {
      print('Error signing in with Google: $error');
    }
  }

  Future<void> signOut() async {
    try {
      await _googleSignIn.signOut();
      _googleAccount = null;
      notifyListeners(); // Notify listeners about the user state change
      print('Signed out');
    } catch (error) {
      print('Error signing out: $error');
    }
  }
}
