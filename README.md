<!--
*** Thanks for checking out this README Template. If you have a suggestion that would
*** make this better, please fork the repo and create a pull request or simply open
*** an issue with the tag "enhancement".
*** Thanks again! Now go create something AMAZING! :D
***
***
***
*** To avoid retyping too much info. Do a search and replace for the following:
*** github_username, repo, twitter_handle, email
-->





<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/marchage/tarotmoji">
    <img src="app/assets/logo.png" alt="Logo" width="385" height="87">
  </a>

  <h3 align="center">TarotMoji</h3>

  <p align="center">
    A nicely-designed app that uses emoji to enhance a Tarot card reading.
    <br />
    <a href="https://play.nativescript.org/?template=play-vue&id=zhtusY"><strong>Explore on Playground »</strong></a>
    <br />
    <br />
    <a href="https://github.com/marchage/tarotmoji">View Demo</a>
    ·
    <a href="https://github.com/marchage/tarotmoji/issues">Report Bug</a>
    ·
    <a href="https://github.com/marchage/tarotmoji/issues">Request Feature</a>
  </p>
</p>



<!-- TABLE OF CONTENTS -->
## Table of Contents

* [About the Project](#about-the-project)
  * [Descriptive Quotes](#descriptive-qoutes)
  * [Own Additions](#own-additions)
  * [Discovered Errata](#discovered-errata)
  * [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [Usage](#usage)
* [Roadmap](#roadmap)
* [Contributing](#contributing)
* [License](#license)
* [Contact](#contact)
* [Acknowledgements](#acknowledgements)



<!-- ABOUT THE PROJECT -->
## About The Project

An iOS/Android Tarot app, expanded on by yours truly. Or - in other words - putting knowledge into practice by completing extra challenges to a "Tarot-reading w/ emoji"-app making-tutorial.

[![TarotMoji on your device][playground-qr]](https://example.com)
[![TarotMoji Screen Cast][product-screenshot]](https://nsvue-workshop.netlify.com/docs/1.html)


### Descriptive Quotes

Perhaps simply quoting from the initial source is best.

#### [Originally](https://nsvue-workshop.netlify.com/docs/), a work by Jen Looper and Lester Gonzales:

> For this app, we'll also use Microsoft's very cute emoji pack, which you can discover in the [Emojipedia](http://www.emojipedia.com/) alongside other styles. The design of this app was done by talented designer Lester Gonzales, and built by Jen Looper for the NativeScript [Uplabs](https://www.uplabs.com/) Challenge in 2018.
[source](https://nsvue-workshop.netlify.com/docs/1.html)


#### Its list of [extra challenges](https://nsvue-workshop.netlify.com/docs/6.html#some-challenges):

(check-marks added by me)


> Now that you've built your app, there are a lot more things you can do to make it better. Here are some ideas:
>
> - [x] Put your data in a Vuex store
> - [x] Refactor the card markup to be a reusable child component
> - [ ] Change the Past/Present/Future layout to be a different Tarot layout, such as the "Celtic Cross"
> - [ ] Move the Tarot data into a GraphQL database, or port it elsewhere and make API calls against it
> - [x] Change the One Card page to change only when the date changes so that it's a true "Daily Reading". More cool: save the date in Application Settings and test against that
> - [x] Find a way to store cards and retrieve them.
> - [ ] Find a way for a Querant to make notes about various readings and their dates

### Own Additions

To this list I have added the following, some in Dutch:

- [x] incorporate more animation and/or use standard components
- [x] moduled store
- [x] maak de tarot werking realistischer door een maximum aantal keer kijken toetestaan voor deze ongeldig wordt en wordt verwijderd
- [x] goede tijds ondersteuning (maar minder groot dan moment.js) 
- [ ] voeg meer info mogelijkheden toe met uitleg of verwijzingen wellicht
- [ ] maak lastige termen klikbaar
- [ ] voeg ondersteuning voor Chinees toe

Some of these are not checked but have indeed been examined and are already half-way finished.

### Discovered Errata

- 72 ipv 80-something kaarten waaruit gekozen werd
- missing reversed indicator bij readings

### Features

- Run on 2 major mobile platforms with one code base, "more native" than Ionic.
- Cards are valid for a period of time, and then updated. Inspecting the readings cards slowly invalidates them (you slide between them between 5 to 11 times and then the reading changes).
- Card instances are stored to application storage for persistance, and loaded on next startup.
- Tabs component is not supposed to be `refresh()`-able like RadListItem component can be. But with the help of `ObservableArray`, and/or removing the v-for loop and accepting a few lines of code duplication I was able to achieve refreshability of cards.
- descriptions for Celtic Cross card reading positions are already in place, all that is left is its layout on screen
- times are set really short: 1 day is "to the end of the current hour", and reading cards are only valid "till the end of the currrent minute" so you can easily verify their workings.

### Built With

* [NativeScript](https://www.nativescript.org/)
* [Vue.js](https://vuejs.org/)
* [NativeScript-Vue](https://nativescript-vue.org/)
* [NativeScript Playground](https://play.nativescript.org/)
* [VSCode](https://code.visualstudio.com/)
* [ext:NativeScript](https://github.com/NativeScript/nativescript-vscode-extension)


<!-- GETTING STARTED -->
## Getting Started

You can run this app. You have 2 options for running, as far as I can see.

### Online Playground

#### Prerequisites

To run the app from the online NativeScript playground scan the following QR-code with your device. 

#### Installation

Most likely, you will need 2 apps run the app in preview mode: [Playground](https://apps.apple.com/us/app/nativescript-playground/id1263543946?ls=1), but certainly [Preview](https://apps.apple.com/us/app/nativescript-preview/id1264484702). After that scan the following QR-code with the Playground or camera app.

[![scan qr-code][playground-qr]](https://play.nativescript.org/?template=play-vue&id=zhtusY)


### Local NativeScript environment

To get a local copy up and running follow these simple steps.

#### Prerequisites

These are exact versions, if you prefer
* NativeScript 6.3.2
```sh
npm install nativescript@6.3.2 -g
```
* Vue cli 4.1.2
```sh
npm install @vue/cli@4.1.2
```

#### Installation
 
1. Clone the repo
```sh
git clone https://github.com/marchage/tarotmoji.git
```
2. Install NPM packages which have not been included. Some where included by the native script playground. I decided that I wasn't going to use many, so I continued this practice
```sh
npm install
```
After that your options for running are as follows:

A. Run this repo on iOS and/or Android simulator(s)
```sh
tns run ios --bundle
tns run android --bundle
```
B. QR-code to preview on your own device using native script apps
```sh
tns preview
```
C. Run this repo on iOS and/or Android simulators without hot reloading (which sometimes doesn't work)
```sh
tns run ios --no-hmr
tns run android --no-hmr
```


<!-- USAGE EXAMPLES -->
## Usage

Start the app. Now you have 3 options:

* Card of the Day - view the/a Card of the Day by clicking on the square in the bottom button bar. This card is kept the same for a day (which I translated to "until the end of this hour")
* Card Explanations - view the explanations of cards by clicking on the list (three lines) icon. Here you can swip up/down + click on any of the [Major Arcana](https://en.wikipedia.org/wiki/Tarot#Tarot_decks_in_occult_usage) cards to view there up or down meaning.
* My Reading - view the/a past, present, future reading by pressing the third icon on the bottom button bar. Within the latter you start on "Present" but can swipe back to "Past" and forth to "Future". Doing so has a point cost. When there are 0 points left the entire reading is updated with new cards. the reading is also updated when when it expires. I translated this to "until the end of this minute". 

_For more examples, please refer to the [~~Documentation~~](https://example.com) [wikipedia](https://en.wikipedia.org/wiki/Tarot)_



<!-- ROADMAP -->
## Roadmap

See the [open issues](https://github.com/marchage/tarotmoji/issues) for a list of proposed features (and known issues).



<!-- CONTRIBUTING -->
## Contributing

Are you sure? In that case, perhaps you would like to do the following:

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.



<!-- CONTACT -->
## Contact

Marc Hage - [@twitter_handle](https://twitter.com/twitter_handle) - email

Project Link: [https://github.com/marchage/tarotmoji](https://github.com/marchage/tarotmoji)



<!-- ACKNOWLEDGEMENTS -->
## Acknowledgements

* [nsvue-workshop](https://nsvue-workshop.netlify.com/)
* [NativeScript-Vue](https://nativescript-vue.org/)
* [NativeScript](https://www.nativescript.org/)
* [Vue.js](https://vuejs.org/)
* [NativeScript Playground](https://play.nativescript.org/)





<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/marchage/tarotmoji.svg?style=flat-square
[contributors-url]: https://github.com/marchage/tarotmoji/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/marchage/tarotmoji.svg?style=flat-square
[forks-url]: https://github.com/marchage/tarotmoji/network/members
[stars-shield]: https://img.shields.io/github/stars/marchage/tarotmoji.svg?style=flat-square
[stars-url]: https://github.com/marchage/tarotmoji/stargazers
[issues-shield]: https://img.shields.io/github/issues/marchage/tarotmoji.svg?style=flat-square
[issues-url]: https://github.com/marchage/tarotmoji/issues
[license-shield]: https://img.shields.io/github/license/marchage/tarotmoji.svg?style=flat-square
[license-url]: https://github.com/marchage/tarotmoji/blob/master/LICENSE
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=flat-square&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/marc-hage-437794199/
[product-screenshot]: https://nsvue-workshop.netlify.com/demo-tarotmoji.gif
[playground-qr]: ./app/assets/playground-qr.png
[playground-url]: https://play.nativescript.org/?template=play-vue&id=zhtusY
