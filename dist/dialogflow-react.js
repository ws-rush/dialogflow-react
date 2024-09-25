import { jsxs as f, jsx as S } from "react/jsx-runtime";
import { createContext as x, useContext as w, useSyncExternalStore as y, useMemo as h } from "react";
function D(i) {
  let e = i;
  const t = /* @__PURE__ */ new Set();
  return {
    getSnapshot: () => e,
    setState: (s) => {
      e = { ...e, ...s };
      for (const l of t) l(e);
    },
    subscribe: (s) => (t.add(s), () => t.delete(s))
  };
}
function P() {
  let i = 0;
  const e = /* @__PURE__ */ new Map(), t = D({
    dialogs: []
  }), s = (r, c = {}) => {
    let o, n;
    if (typeof r == "string") {
      if (n = r, o = e.get(n), !o)
        return Promise.reject(new Error(`No dialog registered with ID "${n}".`));
    } else if (typeof r == "function")
      o = r, n = `dialog_${i++}`;
    else
      return Promise.reject(new Error("Invalid dialog identifier."));
    return new Promise((a) => {
      const d = {
        id: n,
        Component: o,
        resolver: a,
        props: {
          ...c,
          close: (p) => {
            l(n, p);
          }
        }
      }, { dialogs: u } = t.getSnapshot();
      t.setState({ dialogs: [...u, d] });
    });
  }, l = (r, c) => {
    const { dialogs: o } = t.getSnapshot(), n = o.findIndex((a) => a.id === r);
    if (n !== -1) {
      o[n].resolver(c);
      const d = [...o];
      d.splice(n, 1), t.setState({ dialogs: d });
    }
  };
  return {
    open: s,
    ...t
  };
}
const g = x({
  open: async () => null
}), b = () => w(g);
function j({ children: i, manager: e }) {
  const { dialogs: t } = y(e.subscribe, e.getSnapshot, e.getSnapshot), s = h(() => ({ open: e.open }), [e.open]);
  return /* @__PURE__ */ f(g.Provider, { value: s, children: [
    i,
    t.map((l) => {
      const { Component: r, props: c, id: o } = l;
      return /* @__PURE__ */ S(r, { ...c }, o);
    })
  ] });
}
export {
  g as DialogContext,
  j as DialogProvider,
  P as createDialogflow,
  D as createStore,
  b as useDialog
};
