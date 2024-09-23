
A lightweight and flexible React library for managing dialogs and modals in your React applications.

# Dialogflow React

[![Free Palestine](https://raw.githubusercontent.com/Safouene1/support-palestine-banner/master/banner-support.svg)](https://stand-with-palestine.org)

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Getting Started](#getting-started)
- [API Overview](#api-overview)
- [Usage Examples](#usage-examples)
  - [Basic Confirmation Dialog](#basic-confirmation-dialog)
  - [Custom Dialog with Return Data](#custom-dialog-with-return-data)
- [TypeScript Support](#typescript-support)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Simple API**: Open and close dialogs with ease using a minimal API.
- **Promise-Based**: `open` method returns a promise that resolves when the dialog is closed.
- **Flexible**: Works with any dialog or modal component, including third-party UI libraries.
- **TypeScript Ready**: Written in TypeScript with complete type definitions.
- **No Dependencies**: Minimal and focuses only on dialog management without extra bloat.

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
// dialogManager.ts
import { createDialogManager } from 'dialogflow-react';

export const dialogManager = createDialogManager();
```


### 2. Wrap Your App with `DialogProvider`

Use the `DialogProvider` component to make dialog functions available throughout your app via React Context.

```tsx
// index.tsx or App.tsx
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { DialogProvider } from 'dialogflow-react';
import { dialogManager } from './dialogManager';

ReactDOM.render(
    <React.StrictMode>
        <DialogProvider manager={dialogManager}>
            <App />
        </DialogProvider>
    </React.StrictMode>,
document.getElementById('root')
);
```

### 3. Create Dialog Components

Your dialog components can be regular React components that use the `useDialog` hook to close themselves.

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

#### Use `dialogManager` instance 


```tsx
// SomeComponent.tsx
import React from 'react';
import { dialogManager } from './dialogManager';

export default function SomeComponent() {

    const handleOpenDialog = async () => {
        const result = await dialogManager.open(MyDialogComponent, { message: 'Hello World!' });
        console.log('Dialog closed with result:', result);
    };

    return (
        <button onClick={handleOpenDialog}>Open Dialog</button>
    );
};
```

## API Overview

### `createDialogManager`

Creates a dialog manager that maintains the dialog state.

```ts
import { createDialogManager } from 'dialogflow-react';

const dialogManager = createDialogManager();
```


### `DialogProvider`

A provider component that supplies dialog management functionalities via context.

```tsx
<DialogProvider manager={dialogManager}>
    {children}
</DialogProvider>
```


- **Props:**
  - `manager`: The dialog manager instance created by `createDialogManager`.

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

## Usage Examples

### Basic Confirmation Dialog

#### 1. Create a Confirmation Dialog Component

```tsx
// ConfirmationDialog.tsx
import React from 'react';
import { useDialog } from 'dialogflow-react';

interface ConfirmationDialogProps {
title: string;
message: string;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({ title, message }) => {
const { close } = useDialog();

const handleConfirm = () => {
close(true);
};

const handleCancel = () => {
close(false);
};

return (
<div className="dialog-overlay">
<div className="dialog-content">
<h2>{title}</h2>
<p>{message}</p>
<button onClick={handleConfirm}>Confirm</button>
<button onClick={handleCancel}>Cancel</button>
</div>
</div>
);
};

export default ConfirmationDialog;
```


#### 2. Use the Dialog in a Component

```tsx
// DeleteButton.tsx
import React from 'react';
import { useDialog } from 'dialogflow-react';
import ConfirmationDialog from './ConfirmationDialog';

const DeleteButton: React.FC = () => {
const { open } = useDialog();

const handleDelete = async () => {
const confirmed = await open(ConfirmationDialog, {
title: 'Confirm Delete',
message: 'Are you sure you want to delete this item?',
});

if (confirmed) {
  // Perform the delete action
  console.log('Item deleted');
} else {
  console.log('Delete canceled');
}
};

return (
<button onClick={handleDelete}>Delete Item</button>
);
};

export default DeleteButton;
```


### Custom Dialog with Return Data

You can also have dialogs that return data back to the calling component.

#### 1. Create an Input Dialog Component

```tsx
// InputDialog.tsx
import React, { useState } from 'react';
import { useDialog } from 'dialogflow-react';

interface InputDialogProps {
prompt: string;
}

const InputDialog: React.FC<InputDialogProps> = ({ prompt }) => {
const { close } = useDialog();
const [inputValue, setInputValue] = useState('');

const handleSubmit = () => {
close(inputValue);
};

const handleCancel = () => {
close(null);
};

return (
<div className="dialog-overlay">
<div className="dialog-content">
<p>{prompt}</p>
<input
type="text"
value={inputValue}
onChange={(e) => setInputValue(e.target.value)}
/>
<button onClick={handleSubmit}>OK</button>
<button onClick={handleCancel}>Cancel</button>
</div>
</div>
);
};

export default InputDialog;
```


#### 2. Use the Input Dialog to Get User Input

```tsx
// UsernameForm.tsx
import React, { useState } from 'react';
import { useDialog } from 'dialogflow-react';
import InputDialog from './InputDialog';

const UsernameForm: React.FC = () => {
const { open } = useDialog();
const [username, setUsername] = useState('');

const handleChangeUsername = async () => {
const newUsername = await open(InputDialog, {
prompt: 'Enter your new username:',
});

if (newUsername !== null) {
  setUsername(newUsername);
  console.log('Username updated to:', newUsername);
} else {
  console.log('Username change canceled');
}
};

return (
<div>
<p>Current Username: {username || 'Not set'}</p>
<button onClick={handleChangeUsername}>Change Username</button>
</div>
);
};

export default UsernameForm;
```


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

## Additional Information

### Styling the Dialogs

The library does not impose any styles, allowing you to style your dialogs as needed. Use your preferred method (CSS modules, styled-components, etc.) to style the dialog components.

### Using with UI Libraries

You can integrate `dialogflow-react` with UI libraries like Material-UI, Ant Design, or Bootstrap.

#### Example with Material-UI

```tsx
// MuiDialog.tsx
import React from 'react';
import { useDialog } from 'dialogflow-react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

interface MuiDialogProps {
title: string;
}

const MuiDialog: React.FC<MuiDialogProps> = ({ title }) => {
const { close } = useDialog();

const handleClose = () => {
close();
};

return (
<Dialog open onClose={handleClose}>
<DialogTitle>{title}</DialogTitle>
<DialogActions>
<Button onClick={handleClose} color="primary">
Close
</Button>
</DialogActions>
</Dialog>
);
};

export default MuiDialog;
```


#### Opening the Material-UI Dialog

```tsx
// App.tsx
import React from 'react';
import { useDialog } from 'dialogflow-react';
import MuiDialog from './MuiDialog';

const App: React.FC = () => {
const { open } = useDialog();

const handleOpenMuiDialog = () => {
open(MuiDialog, { title: 'Material-UI Dialog' });
};

return (
<div>
<button onClick={handleOpenMuiDialog}>Open MUI Dialog</button>
</div>
);
};

export default App;
```


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