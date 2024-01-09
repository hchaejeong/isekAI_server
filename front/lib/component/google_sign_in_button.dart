import 'package:flutter/material.dart';
import 'package:front/util/utils.dart';

class Google_Sign_In_Button extends StatelessWidget {
  final VoidCallback onPressed;

  const Google_Sign_In_Button({required this.onPressed});

  @override
  Widget build(BuildContext context) {
    double baseWidth = 390;
    double fem = MediaQuery.of(context).size.width / baseWidth;
    double ffem = fem * 0.97;

    return TextButton(
      onPressed: onPressed,
      style: TextButton.styleFrom(
        padding: EdgeInsets.zero,
      ),
      child: Container(
        width: double.infinity,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Container(
              margin: EdgeInsets.fromLTRB(0 * fem, 0 * fem, 0 * fem, 25 * fem),
              padding:
                  EdgeInsets.fromLTRB(69 * fem, 20 * fem, 66 * fem, 20 * fem),
              width: double.infinity,
              decoration: BoxDecoration(
                color: Color(0xff1b1916),
                borderRadius: BorderRadius.circular(24 * fem),
              ),
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  Container(
                    margin: EdgeInsets.fromLTRB(
                        0 * fem, 0 * fem, 10 * fem, 0 * fem),
                    width: 14 * fem,
                    height: 14 * fem,
                    child: Image.asset(
                      'assets/images/isekAI_Logo.png',
                      width: 14 * fem,
                      height: 14 * fem,
                    ),
                  ),
                  Text(
                    'CONTINUE WITH GOOGLE',
                    style: SafeGoogleFont(
                      'ABeeZee',
                      fontSize: 14 * ffem,
                      fontWeight: FontWeight.w400,
                      height: 1.1825 * ffem / fem,
                      letterSpacing: 1.68 * fem,
                      fontStyle: FontStyle.italic,
                      color: Color(0xfffaf5e8),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
