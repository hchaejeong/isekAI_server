class AppUser {
  String id;
  String name;
  String profilePhotoPath;

  AppUser({
    required this.id,
    required this.name,
    required this.profilePhotoPath,
  });

  AppUser.fromSnapshot(DocumentSnapshot snapshot)
      : id = snapshot.id,
        name = snapshot.name,
        profilePhotoPath = snapshot.profilePhotoPath;

  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'name': name,
      'profile_photo_path': profilePhotoPath,
    };
  }
}

class DocumentSnapshot {
  String get id => data['id'];
  String get name => data['name'];
  int get age => data['age'];
  String get profilePhotoPath => data['profile_photo_path'];

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
