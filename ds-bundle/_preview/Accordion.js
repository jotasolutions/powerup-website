"use strict";
var __dsPreview = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __esm = (fn, res, err) => function __init() {
    if (err) throw err[0];
    try {
      return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
    } catch (e) {
      throw err = [e], e;
    }
  };
  var __commonJS = (cb, mod) => function __require() {
    try {
      return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    } catch (e) {
      throw mod = 0, e;
    }
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // <define:import.meta.env>
  var init_define_import_meta_env = __esm({
    "<define:import.meta.env>"() {
    }
  });

  // ds-raw:__ds_raw__
  var require_ds_raw = __commonJS({
    "ds-raw:__ds_raw__"(exports, module) {
      init_define_import_meta_env();
      module.exports = window.PowerUpMenuDS;
    }
  });

  // shim:react-shim
  var require_react_shim = __commonJS({
    "shim:react-shim"(exports, module) {
      init_define_import_meta_env();
      var R = window.React;
      function jsx2(t, p, k) {
        return R.createElement(t, k === void 0 ? p : Object.assign({ key: k }, p));
      }
      module.exports = R;
      module.exports.jsx = jsx2;
      module.exports.jsxs = jsx2;
      module.exports.jsxDEV = jsx2;
      module.exports.Fragment = R.Fragment;
    }
  });

  // .design-sync/previews/Accordion.tsx
  var Accordion_exports = {};
  __export(Accordion_exports, {
    FAQ: () => FAQ,
    MultipleOpen: () => MultipleOpen
  });
  init_define_import_meta_env();

  // ds-shim:ds
  var ds_exports = {};
  __export(ds_exports, {
    default: () => ds_default
  });
  init_define_import_meta_env();
  __reExport(ds_exports, __toESM(require_ds_raw()));
  var g = window.PowerUpMenuDS;
  var ds_default = "default" in g ? g.default : g;

  // .design-sync/previews/Accordion.tsx
  var import_jsx_runtime = __toESM(require_react_shim());
  var FAQ = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_exports.Accordion, { defaultValue: "item-1", style: { maxWidth: 420 }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_exports.AccordionItem, { value: "item-1", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_exports.AccordionTrigger, { children: "¿Puedo actualizar mi carta en cualquier momento?" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_exports.AccordionContent, { children: "Sí, puedes actualizar tu carta digital en tiempo real desde nuestro panel de administración. Los cambios se reflejan al instante para tus clientes." })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_exports.AccordionItem, { value: "item-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_exports.AccordionTrigger, { children: "¿Qué pasa si tengo varias sucursales?" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_exports.AccordionContent, { children: "Nuestro plan Pro te permite gestionar hasta 5 sucursales desde una sola cuenta. Cada una puede tener su propia carta y configuración." })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_exports.AccordionItem, { value: "item-3", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_exports.AccordionTrigger, { children: "¿Necesito conocimientos técnicos?" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_exports.AccordionContent, { children: "No. La plataforma está diseñada para ser muy fácil de usar. Si sabes usar un smartphone, puedes gestionar tu carta digital." })
    ] })
  ] });
  var MultipleOpen = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_exports.Accordion, { openMultiple: true, defaultValue: ["q1", "q2"], style: { maxWidth: 420 }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_exports.AccordionItem, { value: "q1", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_exports.AccordionTrigger, { children: "¿Cuánto cuesta?" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_exports.AccordionContent, { children: "Desde $9/mes con prueba gratuita de 14 días." })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_exports.AccordionItem, { value: "q2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_exports.AccordionTrigger, { children: "¿Hay contratos de permanencia?" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_exports.AccordionContent, { children: "No. Puedes cancelar cuando quieras sin penalizaciones." })
    ] })
  ] });
  return __toCommonJS(Accordion_exports);
})();
