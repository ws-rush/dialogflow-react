# Dialogflow React

A lightweight and flexible React library for managing dialogs and modals in your React applications.

[![Free Palestine](https://raw.githubusercontent.com/Safouene1/support-palestine-banner/master/banner-support.svg)](https://stand-with-palestine.org)

## Table of Contents

- [Features](#features)
- [Usage](#usage)
- [Installation](#installation)
- [Getting Started](#getting-started)
- [API Overview](#api-overview)
- [TypeScript Support](#typescript-support)
- [Contributing](#contributing)
- [License](#license)
- [Frequently Asked Questions](#frequently-asked-questions)
- [Acknowledgments](#acknowledgments)

## Features

- **Simple API**: Open and close dialogs with ease using a minimal API.
- **Promise-Based**: `open` and `push` methods return promises that resolve when the dialog is closed.
- **Flexible**: Works with any dialog or modal component, including third-party UI libraries.
- **TypeScript Ready**: Written in TypeScript with complete type definitions.
- **No Dependencies**: Minimal and focuses only on dialog management without extra bloat.

## Usage

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/edit/vitejs-vite-652gmg)

## Installation

Install the library using pnpm, npm or yarn:

```bash
## using pnpm
pnpm add dialogflow-react

## using npm
npm install dialogflow-react

## using yarn
yarn add dialogflow-react
```

## Getting Started

To start using `dialogflow-react` in your project, follow these steps:

### 1. Create a Dialog Manager Instance

Create a dialog manager instance that will handle dialog states throughout your app.

```ts
// dialogflow.ts
import { createDialogflow } from 'dialogflow-react';
import { MyDialogComponent } from 'MyDialogComponent'

export const dialogflow = createDialogflow();

// optional: register dialogs here
dialogflow.register(MyDialogComponent, 'registered-dialog-id')
```


### 2. Wrap Your App with `DialogProvider`

Use the `DialogProvider` component to make dialog functions available throughout your app via React Context.

```tsx
// index.tsx or App.tsx
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { DialogProvider } from 'dialogflow-react';
import { dialogflow } from './dialogflow';

ReactDOM.render(
    <React.StrictMode>
        <DialogProvider manager={dialogflow}>
            <App />
        </DialogProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
```

### 3. Create Dialog Components

Your dialog components can be regular React components that accepts `close` function to close themselves.

>In real-world applications, build your dialogs with [React Portals](https://react.dev/reference/react-dom/createPortal), or use dialogs from any component library.

```tsx
// MyDialogComponent.tsx
import React from 'react';

interface MyDialogProps {
    message: string;
    close: (message: string) => void
}

export default function MyDialogComponent({ message, close }) {

const handleClose = () => {
    close('Dialog was closed');
};

return (
    <div className="dialog">
        <p>{message}</p>
        <button onClick={handleClose}>Close Dialog</button>
    </div>
);
}
```

### 4. Manage Dialogs

#### Using `useDialog` Hook 

Import and use the `useDialog` hook in your components to push or open dialogs.

```tsx
// SomeComponent.tsx
import React from 'react';
import { useDialog } from 'dialogflow-react';
import MyDialogComponent from './MyDialogComponent';

export default function SomeComponent() {
    const { push, open } = useDialog();

    // open `MyDialogComponent` every time button clicked
    const handlePushDialog = async () => {
        const result = await push(MyDialogComponent, { message: 'Pushed Dialog!' });
        console.log('Pushed dialog closed with result:', result);
    };

    // open `MyDialogComponent` only once, should registered as in step 1
    const handleOpenDialog = async () => {
        const result = await open('registered-dialog-id', { message: 'Opened Dialog!' });
        console.log('Opened dialog closed with result:', result);
    };

    return (
        <>
            <button onClick={handlePushDialog}>Push Dialog</button>
            <button onClick={handleOpenDialog}>Open Registered Dialog</button>
        </>
    );
};
```

#### Using `dialogflow` Instance 

You can also manage dialogs outside of React components using the `dialogflow` instance.

```tsx
// someModule.ts
import { dialogflow } from './dialogflow';
import MyDialogComponent from './MyDialogComponent';

export async function showDialog() {
    const result = await dialogflow.push(MyDialogComponent, { message: 'Dialog from module!' });
    console.log('Dialog closed with result:', result);
}

export async function openRegisteredDialog() {
    const result = await dialogflow.open('registered-dialog-id', { message: 'Registered Dialog!' });
    console.log('Registered dialog closed with result:', result);
}
```

## API Overview

### `createDialogflow`

Creates a dialog manager that maintains the dialog state.

```ts
import { createDialogflow } from 'dialogflow-react';

const dialogflow = createDialogflow();
```

### `DialogProvider`

A provider component that supplies dialog management functionalities via context.

```tsx
<DialogProvider manager={dialogflow}>
    {children}
</DialogProvider>
```

- **Props:**
  - `manager`: The dialog manager instance created by `createDialogflow`.

### `useDialog`

A hook that provides `push`, `open`, and `close` functions to manage dialogs.

```ts
const { push, open, close } = useDialog();
```

- **`push(Component, props?)`**

  Pushes a new dialog component onto the stack.

  - `Component`: The dialog component to render.
  - `props` (optional): Props to pass to the dialog component.

  Returns a promise that resolves to the result passed to `close`.

- **`open(dialogId, props?)`**

  Opens a registered dialog component.

  - `dialogId`: The ID of the registered dialog component.
  - `props` (optional): Props to pass to the dialog component.

  Returns a promise that resolves to the result passed to `close`. Throws an error if the dialog is not registered or is already open.

## TypeScript Support

`dialogflow-react` is built with TypeScript, providing full type safety and autocompletion in compatible editors.

## Contributing

Contributions are welcome! If you find a bug or have a feature request, please open an issue or submit a pull request.

To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/my-feature`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add my feature'`).
5. Push to the branch (`git push origin feature/my-feature`).
6. Open a pull request.

## License

MIT License

---

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Frequently Asked Questions

### What's the difference between `push` and `open`?

`push` is used to add a new dialog to the stack without any prior registration. `open` is used to display a dialog that has been previously registered with a unique ID.

### Can I use `push` and `open` outside of React components?

Yes, you can use both `push` and `open` outside of React components by directly calling them on the `dialogflow` instance created with `createDialogflow()`.

### How do I register a dialog for use with `open`?

Use the `register` method on the `dialogflow` instance:

```ts
dialogflow.register(MyDialogComponent, 'my-dialog-id');
```

### What happens if I try to open a dialog that's already open?

The `open` function will ignore new dialog that's already open.

### Can I pass functions in the dialog props?

Yes, you can pass any valid React props, including functions, to the dialog component via the `props` parameter of both `push` and `open` functions.

### How do I handle errors within the dialog?

You can manage errors within your dialog component as you would in any React component. If you need to notify the parent component of an error, you can use the `close` function with an error object or status.

## Acknowledgments

This library was inspired by the need for a simple, promise-based dialog management solution in React applications without coupling to any specific UI library.

If you find this library helpful, please give it a star on [GitHub](https://github.com/ws-rush/dialogflow-react)!

---

Happy Coding! 🚀

---