import { jsxs as u, jsx as g } from "react/jsx-runtime";
import { createContext as S, useContext as f, useSyncExternalStore as x, useMemo as h } from "react";
function y(i) {
  let t = i;
  const n = /* @__PURE__ */ new Set();
  return {
    getSnapshot: () => t,
    setState: (o) => {
      t = { ...t, ...o };
      for (const s of n) s(t);
    },
    subscribe: (o) => (n.add(o), () => n.delete(o))
  };
}
function b() {
  let i = 0;
  const t = y({
    dialogs: []
  }), n = (s, c = {}) => {
    const e = String(i++);
    return new Promise((r) => {
      const l = {
        id: e,
        Component: s,
        resolver: r,
        props: { ...c, close: (p) => {
          o(e, p);
        } }
      }, { dialogs: a } = t.getSnapshot();
      t.setState({ dialogs: [...a, l] });
    });
  }, o = (s, c) => {
    const { dialogs: e } = t.getSnapshot(), r = e.findIndex((l) => l.id === s);
    if (r !== -1) {
      e[r].resolver(c);
      const a = [...e];
      a.splice(r, 1), t.setState({ dialogs: a });
    }
  };
  return {
    open: n,
    ...t
  };
}
const d = S({
  open: async () => null
}), m = () => f(d);
function v({ children: i, manager: t }) {
  const { dialogs: n } = x(t.subscribe, t.getSnapshot, t.getSnapshot), o = h(() => ({ open: t.open }), [t.open]);
  return /* @__PURE__ */ u(d.Provider, { value: o, children: [
    i,
    n.map((s, c) => {
      const { Component: e, props: r } = s;
      return /* @__PURE__ */ g(e, { ...r }, c);
    })
  ] });
}
export {
  d as DialogContext,
  v as DialogProvider,
  b as createDialogflow,
  y as createStore,
  m as useDialog
};
