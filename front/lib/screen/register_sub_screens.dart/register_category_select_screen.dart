import 'package:flutter/material.dart';

class CategorySelectScreen extends StatefulWidget {
  final Function(String) onChanged;

  CategorySelectScreen({required this.onChanged});

  @override
  _CategorySelectScreenState createState() => _CategorySelectScreenState();
}

class _CategorySelectScreenState extends State<CategorySelectScreen> {
  final List<String> _categories = [
    'Movie',
    'Anime',
    'Book',
    'Drama',
  ];

  final List<String> _selectedCategories = [];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Select Categories'),
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
              widget.onChanged(_selectedCategories.join(','));
              Navigator.pop(context);
            },
          ),
        ],
      ),
      body: Container(
        padding: EdgeInsets.all(16),
        child: GridView.builder(
          itemCount: _categories.length,
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
                  if (_selectedCategories.contains(_categories[index])) {
                    _selectedCategories.remove(_categories[index]);
                  } else {
                    _selectedCategories.add(_categories[index]);
                  }
                });
              },
              child: Container(
                decoration: BoxDecoration(
                  color: _selectedCategories.contains(_categories[index])
                      ? Colors.blue
                      : Colors.grey[200],
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Center(
                  child: Text(
                    _categories[index],
                    style: TextStyle(
                      color: _selectedCategories.contains(_categories[index])
                          ? Colors.white
                          : Colors.black,
                    ),
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
