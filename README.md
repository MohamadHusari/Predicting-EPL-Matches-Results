# Predicting results of competitions between football teams

##### Requierd:
```ssh
Node.js
```
# Instructions:

### First Step :
Upload the files in "**ServerSide**" folder to any website or any localhost server (like: Xampp) that support **php5+** and **mysql**.
Go to phpmyadmin and upload the "**ServerSql.sql**" with any Database name.
###### Change database details in file "**_manage-data.php_**"


### Second Step :
Download "Footballapp" folder
 
```ssh
$ cd FootballApp
$ npm install
```
###### Requierd to Install Ionic3 Framework:
```link
https://ionicframework.com/docs/v1/guide/installation.html
```
After install ionic3 Framework Download "Footballapp" to any place on hard drive. 
go to path Footballapp\src\pages on all the pages you need to change 
###### Things need to change:

1. go to path **Footballapp\src\pages\home** open "**home.ts**" file and change the variable 

```
 public baseURI : string  = "http://serverlink/";
```

2. go to path **Footballapp\src\components\custom-popup** open "**custom-popup.ts**" file and change this two variables

```
 public baseURI : string  = "http://serverlink/";
 public imglink : string = "http://serverlink/img/teams/";
```

### Third Step :
Run the mobile application on the browser.
The majority of Ionic app development can be spent right in the browser using the ionic serve command:
```ssh
$ cd FootballApp
$ ionic serve
```
If you got an error try to run with this commands line:
```ssh
$ cd FootballApp
$ npm run ionic:build --verbose
$ ionic serve
```

### Fourth Step :
Build the mobile application and make .apk file:

```ssh
$ ionic cordova run android --device
OR
$ npm run ionic:build --verbose
$ ionic cordova run android --device
```