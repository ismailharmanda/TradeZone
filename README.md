<h1 style="color:rgb(255,119,5);font-weight:bold;text-align:center" >Welcome to TradeZone 👋</h1>

## _Fashion starts here.._

<br/>

## Technologies ⚡

<br/>

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![React Native](https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![Yarn](https://img.shields.io/badge/yarn-%232C8EBB.svg?style=for-the-badge&logo=yarn&logoColor=white)

<br/>

<h2>This work is a micro clone e-commerce app made using <a href="https://fakestoreapi.com">FakeStoreApi</a>.</h2>

<br/>

You can watch the Demo Record: [DEMO](https://streamable.com/7a8dfg)

<br/>

## Authentication

You can log in with any <kbd>email</kbd> and <kbd>password</kbd>that complies with the validation rules.

<br/>

<h4>In the project, I used the endpoints provided by fakestoreapi as much as possible. Since I could not find answers to some needs in the endpoints, I installed the necessary logics in the frontend. One of them was for the search feature. Apart from that, I simulated api calls as much as possible.</h4>

<br/>

<!-- - https://fazlagida-case.netlify.app/
- Navigate through the navigation links.
- Click the album/podcast item card.
- ✨Magic ✨ -->

<h2 style="color:rgb(255,119,5);font-weight:bold;text-align:center" >Getting Started</h2>
<br/>

> **Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

<br/>

> ## Step 1: Start the Metro Server

```sh
$ git clone git@github.com:DevelopmentHiring/IsmailHarmanda.git
```

> cd into the directory, install dependencies.

```sh
$ cd IsmailHarmanda
$ yarn
```

<br/>

> ## Step 2: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
yarn start
```

<br/>

> ## Step 3: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
yarn android
```

### For iOS

```bash
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

<br/>

## Congratulations! 🎉

You've successfully run TradeZone 🥳

<br/>

## Deep Linking

Deep linking allows users to navigate to specific screens or perform actions within app by clicking on or typing in specific URLs. In TradeZone, I have implemented deep links to provide a seamless and convenient way for users to access product details and their shopping cart directly.

### Supported Deep Links:

The following deep links are supported in TradeZone. Similarly, you can open the deep links on Android using the --android flag:

<kbd>tradezone://product/:productId/:productTitle</kbd> Navigates to the product details screen for a specific product. Replace <kbd>:productId</kbd> with the ID of the product and <kbd>:productTitle</kbd> with the title of the product. For example:

```bash
npx uri-scheme open "tradezone://product/3/SSD" --ios

```

<kbd>tradezone://cart</kbd> Navigates to the user's shopping cart screen. For example:

```bash
npx uri-scheme open "tradezone://cart" --ios

```

<br/>

## Running Tests:

TradeZone comes with a comprehensive test suite to ensure the stability and functionality of the application. You can run these tests using the following command:

```bash
yarn test

```

 <br/>

## Boot Splash Screen

TradeZone features a boot splash screen that appears when the application is launched, providing a visually appealing and branded experience to users during the initial loading phase. The boot splash screen is a static image that serves as a placeholder while the app initializes and prepares its core components for use.

The boot splash screen in TradeZone is designed to capture users' attention and maintain a consistent brand image. It helps create a smooth transition from the launch process to the main application interface, improving the overall user experience.

 <br/>

## Author

👤 **İsmail Harmanda**

- Github: [İsmail Harmanda](https://github.com/ismailharmanda)
- Medium: [İsmail Harmanda](https://medium.com/@ismailharmanda)
- Twitter: [İsmail Harmanda](https://twitter.com/ismail_harmanda)

<br/>

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/DevelopmentHiring/IsmailHarmanda/issues).

1. Fork it (https://github.com/DevelopmentHiring/IsmailHarmanda/fork)
2. Create your working branch (git checkout -b [choose-a-name])
3. Commit your changes (git commit -am 'what this commit will fix/add/improve')
4. Push to the branch (git push origin [chosen-name])
5. Create a new Pull Request

<br/>

## Show your support

Give a ⭐️ if you like this project!

<br/>

# Troubleshooting

If you get an error message like <kbd>error Your Ruby version is 2.6.8, but your Gemfile specified 2.7.5</kbd> or something like that you may need to upgrade your shell ruby version.

- You may use http://rbenv.org/ or https://rvm.io/ to install and use required version.

if you have problems with installing pods, you can go to ios folder and type:

```bash
pod install --repo-update
```

and start the project again.

If you can't get this to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.
