declare module "*.css";

declare module "*.svg" {
  import { FunctionalComponent } from "preact";
  const ReactComponent: FunctionalComponent<JSX.IntrinsicElements["svg"] & { title?: string }>;
  export default ReactComponent;
}
