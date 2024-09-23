
A lightweight and flexible React library for managing dialogs and modals in your React applications.

# Dialogflow React

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

## Features

- **Simple API**: Open and close dialogs with ease using a minimal API.
- **Promise-Based**: `open` method returns a promise that resolves when the dialog is closed.
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

export const dialogflow = createDialogflow();
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

Your dialog components can be regular React components that use the `useDialog` hook to close themselves.

>in real world build your dialogs with [React Portals](https://react.dev/reference/react-dom/createPortal), or use dialogs from any components library.

```tsx
// MyDialogComponent.tsx
import React from 'react';
import { useDialog } from 'dialogflow-react';

interface MyDialogProps {
    message: string;
}

export default function MyDialogComponent({ message }) {
    const { close } = useDialog();

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

#### Use `useDialog` Hook 

Import and use the `useDialog` hook in your components to open dialogs.

```tsx
// SomeComponent.tsx
import React from 'react';
import { useDialog } from 'dialogflow-react';

export default function SomeComponent() {
    const { open } = useDialog();

    const handleOpenDialog = async () => {
        const result = await open(MyDialogComponent, { message: 'Hello World!' });
        console.log('Dialog closed with result:', result);
    };

    return (
        <button onClick={handleOpenDialog}>Open Dialog</button>
    );
};
```

#### Use `dialogflow` instance 


```tsx
// SomeComponent.tsx
import React from 'react';
import { dialogflow } from './dialogflow';

export default function SomeComponent() {

    const handleOpenDialog = async () => {
        const result = await dialogflow.open(MyDialogComponent, { message: 'Hello World!' });
        console.log('Dialog closed with result:', result);
    };

    return (
        <button onClick={handleOpenDialog}>Open Dialog</button>
    );
};
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

A hook that provides `open` and `close` functions to manage dialogs.

```ts
const { open, close } = useDialog();
```


- **`open(Component, props?)`**

  Opens a dialog component.

  - `Component`: The dialog component to render.
  - `props` (optional): Props to pass to the dialog component.

  Returns a promise that resolves to the result passed to `close`.

- **`close(result?)`**

  Closes the dialog and resolves the promise returned by `open`.

  - `result` (optional): The result to pass back to the caller of `open`.

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

### What happens if I try to open multiple dialogs at once?

The dialog manager maintains a single dialog state. Opening a new dialog while one is already open will replace the current dialog. If you need to handle multiple dialogs or a dialog stack, you may need to extend the dialog manager or manage dialog stacks in your application.

### Can I pass functions in the dialog props?

Yes, you can pass any valid React props, including functions, to the dialog component via the `props` parameter of the `open` function.

```tsx
// Passing functions to the dialog
open(MyDialogComponent, {
onCustomEvent: handleCustomEvent,
});
```


### How do I handle errors within the dialog?

You can manage errors within your dialog component as you would in any React component. If you need to notify the parent component of an error, you can use the `close` function with an error object or status.

## Acknowledgments

This library was inspired by the need for a simple, promise-based dialog management solution in React applications without coupling to any specific UI library.

If you find this library helpful, please give it a star on [GitHub](https://github.com/ws-rush/dialogflow-react)!

---

Happy Coding! 🚀

---