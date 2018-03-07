import { SHOW_TOASTER, HIDE_TOASTER } from "./display.constants";

export const showToaster = (message, style = "default", timeout = 3000) => ({
	type: SHOW_TOASTER,
	message,
	style,
	timeout
});

export const hideToaster = () => ({
	type: HIDE_TOASTER
});
