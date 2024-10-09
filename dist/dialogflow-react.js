import { jsxs as f, jsx as w } from "react/jsx-runtime";
import { createContext as y, useContext as x, useSyncExternalStore as D, useMemo as m } from "react";
function v(l) {
  let t = l;
  const e = /* @__PURE__ */ new Set();
  return {
    getSnapshot: () => t,
    setState: (r) => {
      t = { ...t, ...r };
      for (const a of e) a(t);
    },
    subscribe: (r) => (e.add(r), () => e.delete(r))
  };
}
function P() {
  let l = 0;
  const t = /* @__PURE__ */ new Map(), e = v({
    dialogs: []
  }), r = (o, s) => {
    t.has(s) && console.warn(
      `Dialog with ID "${s}" is already registered. Overwriting.`
    ), t.set(s, o);
  }, a = (o, s) => {
    const n = `dialog_${l++}`;
    return new Promise((i) => {
      const p = {
        id: n,
        Component: o,
        resolver: i,
        props: {
          ...s,
          close: (g) => {
            u(n, g);
          }
        }
      }, { dialogs: c } = e.getSnapshot();
      e.setState({ dialogs: [...c, p] });
    });
  }, d = (o, s) => {
    const n = t.get(o);
    if (!n)
      return Promise.reject(
        new Error(`No dialog registered with ID "${o}".`)
      );
    const { dialogs: i } = e.getSnapshot();
    return i.some((c) => c.id === o) ? Promise.resolve() : new Promise((c) => {
      const g = {
        id: o,
        Component: n,
        resolver: c,
        props: {
          ...s,
          close: (S) => {
            u(o, S);
          }
        }
      };
      e.setState({ dialogs: [...i, g] });
    });
  }, u = (o, s) => {
    const { dialogs: n } = e.getSnapshot(), i = n.findIndex((p) => p.id === o);
    if (i !== -1) {
      n[i].resolver(s);
      const c = [...n];
      c.splice(i, 1), e.setState({ dialogs: c });
    }
  };
  return {
    push: a,
    open: d,
    register: r,
    ...e
  };
}
const h = y({
  push: async () => null,
  open: async () => null
}), b = () => x(h);
function j({ children: l, manager: t }) {
  const { dialogs: e } = D(t.subscribe, t.getSnapshot, t.getSnapshot), r = m(() => ({ open: t.open, push: t.push }), [t.open, t.push]);
  return /* @__PURE__ */ f(h.Provider, { value: r, children: [
    l,
    e.map((a) => {
      const { Component: d, props: u, id: o } = a;
      return /* @__PURE__ */ w(d, { ...u }, o);
    })
  ] });
}
export {
  h as DialogContext,
  j as DialogProvider,
  P as createDialogflow,
  v as createStore,
  b as useDialog
};
