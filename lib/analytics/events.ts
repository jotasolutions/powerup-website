export const ANALYTICS_EVENTS = {
  PAGE_VIEW: "page_view",
  SIGN_UP_CLICK: "sign_up_click",
  LOGIN_CLICK: "login_click",
  NAV_CLICK: "nav_click",
  OUTBOUND_CLICK: "outbound_click",
  EXAMPLE_MENU_CLICK: "example_menu_click",
  MENU_SHOWCASE_CLICK: "menu_showcase_click",
  MENU_SHOWCASE_SLIDE: "menu_showcase_slide",
  SECTION_VIEW: "section_view",
  ADVISOR_STEP_1: "advisor_step_1_complete",
  GENERATE_LEAD: "generate_lead",
  COOKIE_SETTINGS_OPEN: "cookie_settings_open",
  FILE_UPLOAD: "file_upload",
  PRICING_BILLING_TAB_CLICK: "pricing_billing_tab_click",
} as const;

export type AnalyticsEventName =
  (typeof ANALYTICS_EVENTS)[keyof typeof ANALYTICS_EVENTS];

export type AnalyticsEventParams = Record<
  string,
  string | number | boolean | undefined
>;
