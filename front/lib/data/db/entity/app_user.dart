class AppUser {
  String id;
  String firstName; // Updated field name
  String lastName;
  String profileIcon; // Updated field name
  String accessToken;
  bool isNewUser;

  AppUser({
    required this.id,
    required this.firstName,
    required this.lastName,
    required this.profileIcon,
    required this.accessToken,
    required this.isNewUser,
  });

  AppUser.fromSnapshot(DocumentSnapshot snapshot)
      : id = snapshot.id,
        firstName = snapshot.firstName,
        lastName = snapshot.lastName,
        profileIcon = snapshot.profileIcon,
        accessToken = snapshot.accessToken,
        isNewUser = snapshot.isNewUser;

  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'firstName': firstName,
      'lastName': lastName,
      'profile_icon': profileIcon,
      'accessToken': accessToken,
      'isNewUser': isNewUser,
    };
  }
}

class DocumentSnapshot {
  String get id => data['id'];
  String get firstName => data['firstName']; // Updated field name
  String get lastName => data['lastName'];
  String get profileIcon => data['profile_icon']; // Updated field name
  String get accessToken => data['accessToken'];
  bool get isNewUser => data['isNewUser'];

  final Map<String, dynamic> data;

  DocumentSnapshot(this.data);

  factory DocumentSnapshot.fromMap(Map<String, dynamic> map) {
    return DocumentSnapshot(map);
  }
}

class QuerySnapshot {
  final List<Map<String, dynamic>> documents;

  QuerySnapshot(this.documents);

  factory QuerySnapshot.fromList(List<dynamic> list) {
    return QuerySnapshot(List<Map<String, dynamic>>.from(list));
  }
}
