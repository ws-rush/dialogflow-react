# Getting Started

To start using `dialogflow-react` in your project, follow these steps:

## Create a Dialog Manager Instance

Create a dialog manager instance that will handle dialog states throughout your app.

```ts
// dialogflow.ts
import { createDialogflow } from 'dialogflow-react';
import { MyDialogComponent } from 'MyDialogComponent'

export const dialogflow = createDialogflow();

// optional: register dialogs here
dialogflow.register(MyDialogComponent, 'registered-dialog-id')
```


## Wrap Your App with `DialogProvider`

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

## Create Dialog Components

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

## Manage Dialogs

### Using `useDialog` Hook 

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

### Using `dialogflow` Instance 

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
