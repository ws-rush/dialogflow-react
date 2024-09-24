import { jsxs as a, jsx as u } from "react/jsx-runtime";
import { createContext as p, useContext as g, useSyncExternalStore as d, useMemo as S } from "react";
function f(s) {
  let t = s;
  const n = /* @__PURE__ */ new Set();
  return {
    getSnapshot: () => t,
    setState: (o) => {
      t = { ...t, ...o };
      for (const e of n) e(t);
    },
    subscribe: (o) => (n.add(o), () => n.delete(o))
  };
}
function D() {
  const s = f({
    dialogs: []
  });
  return {
    close: (o) => {
      const { dialogs: e } = s.getSnapshot();
      e.length > 0 && (e[e.length - 1].resolver(o), s.setState({ dialogs: e.slice(0, -1) }));
    },
    open: (o, e = {}) => new Promise((l) => {
      const r = {
        dialog: { Component: o, props: e },
        resolver: l
      }, { dialogs: c } = s.getSnapshot();
      s.setState({ dialogs: [...c, r] });
    }),
    ...s
  };
}
const i = p({
  close: () => null,
  open: async () => null
}), v = () => g(i);
function y({ children: s, manager: t }) {
  const { dialogs: n } = d(t.subscribe, t.getSnapshot, t.getSnapshot), o = S(() => ({ close: t.close, open: t.open }), [t.close, t.open]);
  return /* @__PURE__ */ a(i.Provider, { value: o, children: [
    s,
    n.map((e, l) => {
      const { Component: r, props: c } = e.dialog;
      return /* @__PURE__ */ u(r, { ...c }, l);
    })
  ] });
}
export {
  i as DialogContext,
  y as DialogProvider,
  D as createDialogflow,
  f as createStore,
  v as useDialog
};
