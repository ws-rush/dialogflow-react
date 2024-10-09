# Frequently Asked Questions

## What's the difference between `push` and `open`?

`push` is used to add a new dialog to the stack without any prior registration. `open` is used to display a dialog that has been previously registered with a unique ID.

## Can I use `push` and `open` outside of React components?

Yes, you can use both `push` and `open` outside of React components by directly calling them on the `dialogflow` instance created with `createDialogflow()`.

## How do I register a dialog for use with `open`?

Use the `register` method on the `dialogflow` instance:

```ts
dialogflow.register(MyDialogComponent, 'my-dialog-id');
```

## What happens if I try to open a dialog that's already open?

The `open` function will ignore new dialog that's already open.

## Can I pass functions in the dialog props?

Yes, you can pass any valid React props, including functions, to the dialog component via the `props` parameter of both `push` and `open` functions.

## How do I handle errors within the dialog?

You can manage errors within your dialog component as you would in any React component. If you need to notify the parent component of an error, you can use the `close` function with an error object or status.
