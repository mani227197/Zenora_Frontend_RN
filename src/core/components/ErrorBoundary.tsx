import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import type {CrashReporter, Logger} from '../observability';
import {theme} from '../theme';

type Props = {
  children: React.ReactNode;
  crashReporter: CrashReporter;
  logger: Logger;
};

type State = {
  error: Error | null;
};

export class ErrorBoundary extends React.Component<Props, State> {
  state: State = {
    error: null,
  };

  static getDerivedStateFromError(error: Error): State {
    return {error};
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.props.logger.error('React tree crashed', {componentStack: errorInfo.componentStack});
    this.props.crashReporter.recordError(error, {
      componentStack: errorInfo.componentStack,
    });
  }

  render() {
    if (this.state.error) {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Something needs attention</Text>
          <Text style={styles.message}>
            Zenora could not load this view. Please restart the app.
          </Text>
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.background,
  },
  title: {
    ...theme.typography.title,
    color: theme.colors.textPrimary,
    textAlign: 'center',
  },
  message: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.sm,
    textAlign: 'center',
  },
});
