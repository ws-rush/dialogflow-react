import { jsxs as c, jsx as i } from "react/jsx-runtime";
import { createContext as u, useContext as p, useSyncExternalStore as a, useMemo as S } from "react";
function d(t) {
  let e = t;
  const s = /* @__PURE__ */ new Set();
  return {
    getSnapshot: () => e,
    setState: (o) => {
      e = { ...e, ...o };
      for (const n of s) n(e);
    },
    subscribe: (o) => (s.add(o), () => s.delete(o))
  };
}
function g() {
  const t = d({
    dialog: null,
    resolver: null
  });
  return {
    close: (o) => {
      const n = t.getSnapshot();
      n.resolver && (n.resolver(o), t.setState({
        dialog: null,
        resolver: null
      }));
    },
    open: (o, n = {}) => new Promise((l) => {
      t.setState({ dialog: { Component: o, props: n }, resolver: l });
    }),
    ...t
  };
}
const r = u({
  close: () => null,
  open: async () => null
}), x = () => p(r);
function h({ children: t, manager: e }) {
  const { dialog: s } = a(e.subscribe, e.getSnapshot, e.getSnapshot), o = S(() => ({ close: e.close, open: e.open }), [e.close, e.open]);
  return /* @__PURE__ */ c(r.Provider, { value: o, children: [
    t,
    s && /* @__PURE__ */ i(s.Component, { ...s.props })
  ] });
}
export {
  r as DialogContext,
  h as DialogProvider,
  g as createDialogManager,
  d as createStore,
  x as useDialog
};
