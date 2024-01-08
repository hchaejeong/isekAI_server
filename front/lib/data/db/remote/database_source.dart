// import 'dart:convert';
// import 'package:front/data/db/entity/app_user.dart';
// import 'package:front/data/db/remote/response.dart';
// import 'package:http/http.dart' as http;

// class NestJsDatabaseSource {
//   final String baseUrl; // Replace with your Nest.js server URL

//   NestJsDatabaseSource(this.baseUrl);

//   Future<void> updateProfile(AppUser user) async {
//     final response = await http.put(
//       Uri.parse('$baseUrl/users/${user.id}'),
//       headers: {'Content-Type': 'application/json'},
//       body: jsonEncode(user.toMap()),
//     );

//     if (response.statusCode != 200) {
//       throw Exception('Failed to update user');
//     }
//   }

//   Future<Response> signInWithGoogle() async {
//     try {
//       final response = await http.post(
//         Uri.parse('$baseUrl/auth/google'),
//         headers: {'Content-Type': 'application/json'},
//         body: jsonEncode({'idToken': idToken}),
//       );

//       if (response.statusCode == 200) {
//         // Parse and handle the response accordingly
//         // For example, you might want to decode JWT tokens
//         return Response.success(response.body);
//       } else {
//         return Response.error('Failed to sign in with Google');
//       }
//     } catch (error) {
//       print('Error signing in with Google in CustomAuthSource: $error');
//       return Response.error('Failed to sign in with Google');
//     }
//   }

//   // Implement other methods for updating chat, messages, swipes, etc.

//   Future<DocumentSnapshot> getUser(String userId) async {
//     final response = await http.get(Uri.parse('$baseUrl/users/$userId'));

//     if (response.statusCode == 200) {
//       return DocumentSnapshot.fromMap(jsonDecode(response.body));
//     } else {
//       throw Exception('Failed to get user');
//     }
//   }
// }
