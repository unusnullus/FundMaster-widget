export interface EmbedProps {
  shadowRoot: ShadowRoot;
  fontFamily: string;
  onClose: () => void;
}

export interface RootProps {
  rootId: string;
  fontFamily: string;
}

export interface AppContainerProps {
  fontFamily: string;
}
