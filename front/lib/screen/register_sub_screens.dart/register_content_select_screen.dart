import 'package:flutter/material.dart';

class ContentSelectScreen extends StatefulWidget {
  final Function(String) onChanged;

  ContentSelectScreen({required this.onChanged});

  @override
  _ContentSelectScreenState createState() => _ContentSelectScreenState();
}

class _ContentSelectScreenState extends State<ContentSelectScreen> {
  final List<String> _contents = [
    'Star Wars',
    'Lord of the Rings',
    'Breaking Bad',
    'Harry Potter',
  ];

  final List<String> _selectedContents = [];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Select Contents'),
        leading: IconButton(
          icon: Icon(Icons.arrow_back),
          onPressed: () => Navigator.pop(context),
        ),
        actions: [
          TextButton(
            child: Text(
              'Next',
              style: TextStyle(
                color: Colors.white,
                fontSize: 16,
              ),
            ),
            onPressed: () {
              widget.onChanged(_selectedContents.join(','));
              Navigator.pop(context);
            },
          ),
        ],
      ),
      body: Container(
        padding: EdgeInsets.all(16),
        child: GridView.builder(
          itemCount: _contents.length,
          gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
            crossAxisCount: 3,
            childAspectRatio: 3,
            crossAxisSpacing: 16,
            mainAxisSpacing: 16,
          ),
          itemBuilder: (context, index) {
            return GestureDetector(
              onTap: () {
                setState(() {
                  if (_selectedContents.contains(_contents[index])) {
                    _selectedContents.remove(_contents[index]);
                  } else {
                    _selectedContents.add(_contents[index]);
                  }
                });
              },
              child: Container(
                decoration: BoxDecoration(
                  color: _selectedContents.contains(_contents[index])
                      ? Colors.blue
                      : Colors.grey[200],
                  borderRadius: BorderRadius.circular(5),
                ),
                alignment: Alignment.center,
                child: Text(
                  _contents[index],
                  style: TextStyle(
                    color: _selectedContents.contains(_contents[index])
                        ? Colors.white
                        : Colors.black,
                  ),
                ),
              ),
            );
          },
        ),
      ),
    );
  }
}
