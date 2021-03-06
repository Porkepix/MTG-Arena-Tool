import React, { ReactNode } from "react";
import ErrorInfo from "../components/popups/ErrorInfo";
import { reduxAction } from "../../shared-redux/sharedRedux";
import { IPC_NONE } from "../../shared/constants";
import store from "../../shared-redux/stores/rendererStore";

interface ErrorState {
  error: any;
  errorInfo: any;
}

export default class ErrorBoundary extends React.Component<{}, ErrorState> {
  constructor(props: {}) {
    super(props);
    this.state = { error: null, errorInfo: null } as ErrorState;
  }

  componentDidCatch(error: any, errorInfo: any): void {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    // You can also log error messages to an error reporting service here
  }

  closeErrorDialog = (): void => {
    const dispatcher = store.dispatch;
    reduxAction(dispatcher, "SET_TOPNAV", 0, IPC_NONE);
    reduxAction(
      dispatcher,
      "SET_SUBNAV",
      {
        type: -1,
        id: "",
        data: null
      },
      IPC_NONE
    );
    setTimeout(() => {
      this.setState({
        error: null,
        errorInfo: null
      });
    }, 350);
  };

  render(): ReactNode {
    return (
      <>
        {this.state.errorInfo ? (
          <ErrorInfo {...this.state} closeCallback={this.closeErrorDialog} />
        ) : (
          this.props.children
        )}
      </>
    );
  }
}
