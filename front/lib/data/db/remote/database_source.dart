import 'dart:convert';
import 'package:front/data/db/entity/app_user.dart';
import 'package:http/http.dart' as http;

class NestJsDatabaseSource {
  final String baseUrl; // Replace with your Nest.js server URL

  NestJsDatabaseSource(this.baseUrl);

  Future<void> addUser(AppUser user) async {
    await http.post(
      Uri.parse('$baseUrl/users'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode(user.toMap()),
    );
  }

  Future<void> updateProfile(AppUser user) async {
    final response = await http.put(
      Uri.parse('$baseUrl/users/${user.id}'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode(user.toMap()),
    );

    if (response.statusCode != 200) {
      throw Exception('Failed to update user');
    }
  }

  // Implement other methods for updating chat, messages, swipes, etc.
}
