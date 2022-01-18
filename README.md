# City Search
2022 Brooklyn College TTP - Assignment #6, Part 2
https://lucylee-412.github.io/city-api/

Using the http://ctp-zip-api.herokuapp.com/ API, our app displays a list of ZIP codes associated with a user-given city*.
This app is closely related to the app found at the [zip-api](https://github.com/lucylee-412/city-api) repository, the first half of this assignment. Almost all of the code structure for this city-search app was borrowed from the zip-search app, and then modified.

*Fun fact: This API considers "California" to be a city. I presume it actually refers to "California City."*

---
**View the app on GitHub Pages: https://lucylee-412.github.io/city-api/**

*Group members:*  
* [Bryant Bardales](https://github.com/bryant-bardales)
* [Lucy Lee](https://github.com/lucylee-412)
* [Max Yedid](https://github.com/maxyedid)

---
## Changelog
*January 14, 2022:*

* Thanks to TA Abi for sharing helpful links, we were able to deploy our app to GitHub Pages.

*January 13, 2022:*  

* Teammate Bryant's CSS from part 1 of this assignment was adapted to this app.
* Stumbled into an [issue](/../../issues/9) where the map function used was displaying both the empty container for the ZIP codes, as well as the error message. Took a while to get the conditional rendering to work.

*January 12, 2022:*

* Created a function to capitalize the user-given city to append to the end of the URL (the API could not recognize lowercase letters).
