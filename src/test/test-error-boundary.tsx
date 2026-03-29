import { Component, type ErrorInfo, type ReactNode } from 'react'

type TestErrorBoundaryProps = {
  children: ReactNode
  fallback: ReactNode
}

type TestErrorBoundaryState = {
  hasError: boolean
}

export class TestErrorBoundary extends Component<
  TestErrorBoundaryProps,
  TestErrorBoundaryState
> {
  state: TestErrorBoundaryState = {
    hasError: false,
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    void error
    void errorInfo
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback
    }

    return this.props.children
  }
}
