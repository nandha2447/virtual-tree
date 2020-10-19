This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

## Understanding code

### `initialData.js`

This file is downloaded from https://cwe.mitre.org/data/definitions/699.html as XML and converted to a javascript object.

### `util.js`

The initialData is a pretty big object. A huge chunk of it won't even be required to render the tree view. This file operates on initial data and exports certain variables necessary for rendering the tree view.

### `index.js`

This is the starting point of the application. `data` prop is passed to the App component. This prop is an array of tree objects which goes by the below interface

```
interface TreeObject {
  id: string,
  name: string,
  children: Array<TreeObject>,
  content: any,
}
```

Please note typescript is not used in this project in the interest of developing faster. The above interface is just to provide an idea of what the TreeObject looks like

### `App.js`

This component is responsible for rendering the virtual tree view of the CWE in the LHS and the Content in the RHS. Material UI
components are primarily used inside this component.

### `components/Content.js`

The data to be displayed on the RHS is fed to this component. This component is responsible for showing data according to the selected node in the tree view (View, Category or Weakness). Every weakness objects contains lot of data with varying data structures. These data structures have to be studied and this component can either be modified to accomodate the variable data structures or can be split to separate components for handling datas from different node types (View, Category or Weakness)
