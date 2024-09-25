import { jsxs as S, jsx as w } from "react/jsx-runtime";
import { createContext as h, useContext as x, useSyncExternalStore as y, useMemo as D } from "react";
function v(l) {
  let e = l;
  const t = /* @__PURE__ */ new Set();
  return {
    getSnapshot: () => e,
    setState: (r) => {
      e = { ...e, ...r };
      for (const c of t) c(e);
    },
    subscribe: (r) => (t.add(r), () => t.delete(r))
  };
}
function b() {
  let l = 0;
  const e = /* @__PURE__ */ new Map(), t = v({
    dialogs: []
  }), r = (o, n) => {
    e.has(n) && console.warn(`Dialog with ID "${n}" is already registered. Overwriting.`), e.set(n, o);
  }, c = (o, n = {}) => {
    let i, s;
    if (typeof o == "string") {
      if (s = o, i = e.get(s), !i)
        return Promise.reject(new Error(`No dialog registered with ID "${s}".`));
    } else if (typeof o == "function")
      i = o, s = `dialog_${l++}`;
    else
      return Promise.reject(new Error("Invalid dialog identifier."));
    return new Promise((a) => {
      const d = {
        id: s,
        Component: i,
        resolver: a,
        props: {
          ...n,
          close: (f) => {
            g(s, f);
          }
        }
      }, { dialogs: p } = t.getSnapshot();
      t.setState({ dialogs: [...p, d] });
    });
  }, g = (o, n) => {
    const { dialogs: i } = t.getSnapshot(), s = i.findIndex((a) => a.id === o);
    if (s !== -1) {
      i[s].resolver(n);
      const d = [...i];
      d.splice(s, 1), t.setState({ dialogs: d });
    }
  };
  return {
    open: c,
    register: r,
    ...t
  };
}
const u = h({
  open: async () => null
}), j = () => x(u);
function m({ children: l, manager: e }) {
  const { dialogs: t } = y(e.subscribe, e.getSnapshot, e.getSnapshot), r = D(() => ({ open: e.open }), [e.open]);
  return /* @__PURE__ */ S(u.Provider, { value: r, children: [
    l,
    t.map((c) => {
      const { Component: g, props: o, id: n } = c;
      return /* @__PURE__ */ w(g, { ...o }, n);
    })
  ] });
}
export {
  u as DialogContext,
  m as DialogProvider,
  b as createDialogflow,
  v as createStore,
  j as useDialog
};
