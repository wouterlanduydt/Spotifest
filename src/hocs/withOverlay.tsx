import * as React from 'react';
import { Overlay } from 'components';

export type TWithOverlayProps = {
  showOverlay: (options?: TOverlayOptions) => void;
  hideOverlay: () => void;
};

export type TOverlayOptions = {
  text: string;
};

export const { Provider, Consumer } = React.createContext<TWithOverlayProps>({
  showOverlay: (_?: TOverlayOptions) => null,
  hideOverlay: () => null,
});

type TState = {
  overlayOptions: TOverlayOptions | undefined;
  isVisible: boolean;
};

export const withOverlayProvider = <P extends object>(Component: React.ComponentType<P>) => {
  class OverlayHOC extends React.Component<P, TState> {
    constructor(props: P) {
      super(props);
      this.state = {
        overlayOptions: undefined,
        isVisible: false,
      };
    }

    public render() {
      const { overlayOptions, isVisible } = this.state;

      return (
        <Provider
          value={{
            showOverlay: options => this.showOverlay(options),
            hideOverlay: () => this.hideOverlay(),
          }}
        >
          {isVisible && <Overlay {...overlayOptions} />}
          <Component {...this.props} />
        </Provider>
      );
    }

    private showOverlay = (overlayOptions?: TOverlayOptions) =>
      this.setState({ overlayOptions, isVisible: true });
    private hideOverlay = () => this.setState({ isVisible: false });
  }
  return OverlayHOC;
};

export const withOverlay = <P extends object>(Component: React.ComponentType<P>) => (props: P) => (
  <Consumer>{overlayContext => <Component {...props} {...overlayContext} />}</Consumer>
);
