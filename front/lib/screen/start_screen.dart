import 'package:flutter/material.dart';
import 'package:front/component/google_sign_in_button.dart';
import 'package:front/data/provider/user_provider_custom.dart';
import 'package:front/screen/navigation_screen.dart';
import 'package:front/util/utils.dart';
import 'package:provider/provider.dart';

// ignore_for_file: prefer_const_constructors

void signInWithGoogleAndNavigate(
    BuildContext context, UserProvider userProvider) async {
  await userProvider.signInWithGoogle();

  try {
    // Check if the user sign-in was successful
    if (userProvider.googleAccount != null) {
      Navigator.pushReplacementNamed(context, NavigationScreen.id);
      print('Navigate to NavigationScreen');
    } else {
      // Handle unsuccessful sign-in if needed
      print('Sign-in with Google failed');
    }
  } catch (error) {
    // Handle any errors that occur during the sign-in process
    print('Error occurred during sign-in: $error');
  }
}

class StartScreen extends StatelessWidget {
  static const String id = 'start_screen';

  @override
  Widget build(BuildContext context) {
    double baseWidth = 390;
    double fem = MediaQuery.of(context).size.width / baseWidth;
    double ffem = fem * 0.97;
    return Scaffold(
      body: Container(
        width: double.infinity,
        child: Container(
          // welcomeEKN (3:1647)
          padding: EdgeInsets.fromLTRB(16 * fem, 67 * fem, 16 * fem, 47 * fem),
          width: double.infinity,
          decoration: BoxDecoration(
            color: Color(0xffffffff),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              Container(
                // kindalogo6sN (3:1655)
                margin:
                    EdgeInsets.fromLTRB(83 * fem, 0 * fem, 82 * fem, 89 * fem),
                width: double.infinity,
                height: 173 * fem,
                child: Stack(
                  children: [
                    Positioned(
                      // vectorcqi (3:1656)
                      left: 28 * fem,
                      top: 50 * fem,
                      child: Align(
                        child: SizedBox(
                          width: 137 * fem,
                          height: 123 * fem,
                          child: Image.asset(
                            'assets/images/isekAI_Logo.png',
                            width: 137 * fem,
                            height: 123 * fem,
                          ),
                        ),
                      ),
                    ),
                    Positioned(
                      // isekaiitk (3:1660)
                      left: 75.5 * fem,
                      top: 157 * fem,
                      child: Align(
                        child: SizedBox(
                          width: 41 * fem,
                          height: 12 * fem,
                          child: Text(
                            'isekAI',
                            textAlign: TextAlign.center,
                            style: SafeGoogleFont(
                              'ABeeZee',
                              fontSize: 10 * ffem,
                              fontWeight: FontWeight.w400,
                              height: 1.1825 * ffem / fem,
                              letterSpacing: 2.2 * fem,
                              fontStyle: FontStyle.italic,
                              color: Color(0xff1b1916),
                            ),
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
              ),
              Container(
                // welcomeypg (3:2986)
                margin:
                    EdgeInsets.fromLTRB(0 * fem, 0 * fem, 0 * fem, 35 * fem),
                child: Text(
                  'Welcome',
                  textAlign: TextAlign.center,
                  style: SafeGoogleFont(
                    'Alegreya Sans SC',
                    fontSize: 32 * ffem,
                    fontWeight: FontWeight.w400,
                    height: 1.2 * ffem / fem,
                    letterSpacing: 7.04 * fem,
                    color: Color(0xff000000),
                  ),
                ),
              ),
              Container(
                // totRr (3:2987)
                margin:
                    EdgeInsets.fromLTRB(0 * fem, 0 * fem, 2 * fem, 35 * fem),
                child: Text(
                  'to',
                  textAlign: TextAlign.center,
                  style: SafeGoogleFont(
                    'Alegreya Sans SC',
                    fontSize: 32 * ffem,
                    fontWeight: FontWeight.w400,
                    height: 1.2 * ffem / fem,
                    letterSpacing: 7.04 * fem,
                    color: Color(0xff000000),
                  ),
                ),
              ),
              Container(
                // isekaiBvk (3:2988)
                margin:
                    EdgeInsets.fromLTRB(1 * fem, 0 * fem, 0 * fem, 153 * fem),
                child: Text(
                  'isekAI',
                  textAlign: TextAlign.center,
                  style: SafeGoogleFont(
                    'Amarante',
                    fontSize: 36 * ffem,
                    fontWeight: FontWeight.w400,
                    height: 1.25 * ffem / fem,
                    letterSpacing: 7.92 * fem,
                    color: Color(0xff000000),
                  ),
                ),
              ),
              Container(
                child:
                    Consumer<UserProvider>(builder: (context, userProvider, _) {
                  return userProvider.googleAccount == null
                      ? Google_Sign_In_Button(
                          onPressed: () => signInWithGoogleAndNavigate(
                              context, userProvider))
                      : Container();
                }),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
