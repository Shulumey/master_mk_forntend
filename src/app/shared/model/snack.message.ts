import DevExpress from "devextreme";
import ToastType = DevExpress.ui.dxToast.ToastType;

export type SnackPosition = "top left" | "top center" | "top right" | "left center" | "center" | "right center" | "bottom left" | "bottom center" | "bottom right";

export interface SnackMessage {
  messageType:ToastType,
  message: string,
  duration: number
}
