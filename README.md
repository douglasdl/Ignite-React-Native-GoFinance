<p align="center">
    <a href="#-technologies">Technologies</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
    <a href="#-project">Project</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
    <a href="#-layout">Layout</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
    <a href="#-ide">IDE</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-licence">Licence</a>
</p>

<p align="center">
 <img src="https://img.shields.io/static/v1?label=PRs&message=welcome&color=49AA26&labelColor=000000" alt="PRs welcome!" />

  <img alt="License" src="https://img.shields.io/static/v1?label=license&message=MIT&color=49AA26&labelColor=000000">
</p>

<br>
<p align="center">
    <a href="https://douglasdl.github.io/Ignite-React-Native-GoFinance/">
        <img alt="GoFinance" src="https://douglasdl.github.io/images/GoFinance.png" width="100%">
    </a>
</p>

## 🚀 Technologies

This project was developped using the following technologies:
<p alight="center">
    <a href="https://reactnative.dev/"><img height="40" src="https://douglasdl.github.io/images/ReactNative2.png"></a>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <a href="https://expo.dev/"><img height="40" src="https://douglasdl.github.io/images/Expo.png"></a>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <a href="https://www.typescriptlang.org/"><img height="40" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg"></a>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</p>

📚 Libraries
- [Styled Components](https://styled-components.com)
- [Google Fonts](https://fonts.google.com/)

- [SwiperJS](https://swiperjs.com/) or [SwipeJS (Github)](https://github.com/nolimits4web/Swiper)
- [ScrollRevel](https://scrollrevealjs.org)
- [Scroll Reveal](https://scrollrevealjs.org/)

🛠 Utilities

Sample Images
- [Unsplash](https://unsplash.com/s/photos/hairdresser)
- [Random User Generator](https://randomuser.me/)

Icons
- [Icons Expo FYI](https://icons.expo.fyi)
- [IcoMoon App](https://icomoon.io/app/#/select)
- [FlatIcon](https://www.flaticon.com/br/)
- [IconFinder](https://www.iconfinder.com/)
- [ReactIcons](https://react-icons.github.io/react-icons/icons?name=fi)

## 📐 Project

This was a React Native project from Ignite.
Check the project online [here](https://douglasdl.github.io/Ignite-React-Native-GoFinance/).
GoFinance is a financial self management app to input your incomes, expenses, etc.
It's composed by a Social SignIn and LogIn, a bottom tabbar navigation for: Balance, inputs and Chart Details.
The data is saved using localstorage.

Create the project
```sh
expo init gofinances
```
Choose "----- Bare workflow ----- (minimal TypeScript)"

For new version of CLI this option is not available anymore, so choose "----- Bare workflow ----- (minimal)"
Create the "tsconfig.json" file in the root directory of your project.
Start the project.
```sh
expo start
```
Select "Y" to use TypeScript in your project.
Open the "tsconfig.json" file and add the property ```"strict": true``` in the compilerOptions:
```sh
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true
  }
}
```
Rename the file "App.js" to "App.tsx".

```sh
yarn add styled-components
```

```sh
yarn add @types/styled-components-react-native -D
```

Install Google Fonts
```sh
expo install expo-font @expo-google-fonts/poppins
```

```sh
expo install expo-app-loading
```
[Responsive Font Size React Native](https://www.npmjs.com/package/react-native-responsive-fontsize)
```sh
yarn add react-native-responsive-fontsize
```

[React Native iPhone X Helper](https://github.com/ptelad/react-native-iphone-x-helper)
```sh
yarn add react-native-iphone-x-helper
```

## 🔖 Layout

The basic layout project can be accessed in [this link](https://www.figma.com/file/oCOd1RWa6ByXxkG4ZVUvzC/GoFinances-Ignite) in your [Figma](https://figma.com) account.

## 💻 IDE
This project was done using [Visual Studio Code](https://code.visualstudio.com/) IDE.

### 🧩 VS Code Extensions

- [Bracket Pair Colorizer](https://marketplace.visualstudio.com/items?itemName=CoenraadS.bracket-pair-colorizer)
- [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
- [Material Icon Theme](https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme)
- [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode#:~:text=Prettier%20is%20an%20opinionated%20code,account%2C%20wrapping%20code%20when%20necessary.)
- [vscode-styled-components](https://marketplace.visualstudio.com/items?itemName=jpoissonnier.vscode-styled-components)

### ⚙ VS Code Configuration

-   CRTL + SHIFT + P
    -   settings.json

```javascript
{
    /* Define o tema do VS Code */
    "workbench.colorTheme": "Dracula",
    /*"workbench.colorTheme": "Omini", */
    "workbench.iconTheme": "material-icon-theme",

    /* Configura tamanho e família da fonte */
    "editor.fontSize": 18,
    "editor.lineHeight": 24,
    "editor.fontFamily": "Fira Code, Menlo, Monaco, 'Courier New', monospace",
    "editor.fontLigatures": true,
    "editor.wordWrap": "on",
    "workbench.editor.tabSizing": "shrink",
    "explorer.compactFolders": false,

    /* Aplica linhas verticais para lembrar quabra de linha em códigos muito grandes */
    "editor.rulers": [80, 120],
    "editor.formatOnSave": false,
    "editor.minimap.enabled": false,

    "window.zoomLevel": -1,
    "explorer.confirmDelete": false,
    "terminal.integrated.shell.osx": "/bin/zsh",
    "tabnine.experimentalAutoImports": true,
    "python.languageServer": "Pylance",
    "explorer.confirmDragAndDrop": false,
    "editor.accessibilitySupport": "off",

    /* Formatter */
    "prettier.tabWidth": 4,
    "prettier.semi": false,
    "prettier.singleQuote": true,
    "prettier.trailingComma": "none",
    "prettier.arrowParens": "avoid",
    "prettier.endOfLine": "auto",
    "editor.tabSize": 4,
    "editor.formatOnSave": true,

    "liveServer.settings.donotShowInfoMsg": true,
    "liveServer.settings.doNotVerifyTags": true,

    "[javascript]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },

    "[html]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },

    "workbench.editorAssociations": {
        "*.ipynb": "jupyter.notebook.ipynb"
    },
    "[typescriptreact]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[typescript]": {
        "editor.defaultFormatter": "vscode.typescript-language-features"
    }

    /*"eslint.packageManager": "yarn", */
    /*"eslint.autoFixOnSave": true, */
}
```

## 📝 Licence

This project is under the MIT license. See the file [LICENSE](.github/LICENSE.md) for more details.

---

Done with ♥ by [Douglas Dias Leal](mailto:douglasdiasleal87@gmail.com)