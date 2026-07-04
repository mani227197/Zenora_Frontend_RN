import React, {useMemo} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from 'react-native';
import {ErrorBoundary} from '../core/components/ErrorBoundary';
import {appContainer} from '../core/di';
import {theme} from '../core/theme';

const sampleHabits = [
  {title: 'Morning medication', meta: '8:00 AM · Home', status: 'Due soon'},
  {title: 'Walk after lunch', meta: '1:30 PM · Office', status: 'Nearby'},
  {title: 'Review budget', meta: 'Evening · Anywhere', status: 'Pending'},
];

const sampleObligations = [
  {title: 'Credit card payment', meta: 'Due today', amount: 'INR 12,400'},
  {title: 'Cloud subscription', meta: 'Due Jul 8', amount: 'INR 799'},
];

export function ZenoraApp() {
  const colorScheme = useColorScheme();
  const container = appContainer;
  const flags = useMemo(() => container.featureFlags.getAll(), [container]);

  return (
    <ErrorBoundary
      crashReporter={container.crashReporter}
      logger={container.logger}>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar
          barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
          backgroundColor={theme.colors.background}
        />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}
          contentContainerStyle={styles.content}>
          <View style={styles.header}>
            <View>
              <Text style={styles.eyebrow}>Today</Text>
              <Text style={styles.title}>Zenora</Text>
            </View>
            <View style={styles.environmentPill}>
              <Text style={styles.environmentText}>
                {container.config.environment}
              </Text>
            </View>
          </View>

          <View style={styles.summaryGrid}>
            <SummaryMetric label="Habits" value="3" />
            <SummaryMetric label="Done" value="1" />
            <SummaryMetric label="Due" value="2" />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recommended next</Text>
            <View style={styles.highlightCard}>
              <Text style={styles.highlightTitle}>Walk after lunch</Text>
              <Text style={styles.highlightText}>
                Office geofence is active and reminders are ready for this
                afternoon.
              </Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Habits</Text>
            {sampleHabits.map(item => (
              <ListRow
                key={item.title}
                title={item.title}
                meta={item.meta}
                trailing={item.status}
              />
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Obligations</Text>
            {sampleObligations.map(item => (
              <ListRow
                key={item.title}
                title={item.title}
                meta={item.meta}
                trailing={item.amount}
              />
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Native readiness</Text>
            <View style={styles.flagGrid}>
              <FlagPill label="Geofence" enabled={flags.geofencing} />
              <FlagPill
                label="Background"
                enabled={flags.backgroundLocation}
              />
              <FlagPill
                label="Notification tap"
                enabled={flags.notificationTapRouting}
              />
              <FlagPill label="Offline retry" enabled={flags.offlineRetryQueue} />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ErrorBoundary>
  );
}

function SummaryMetric({label, value}: {label: string; value: string}) {
  return (
    <View style={styles.metricCard}>
      <Text style={styles.metricValue}>{value}</Text>
      <Text style={styles.metricLabel}>{label}</Text>
    </View>
  );
}

function ListRow({
  title,
  meta,
  trailing,
}: {
  title: string;
  meta: string;
  trailing: string;
}) {
  return (
    <View style={styles.row}>
      <View style={styles.rowText}>
        <Text style={styles.rowTitle}>{title}</Text>
        <Text style={styles.rowMeta}>{meta}</Text>
      </View>
      <Text style={styles.trailing}>{trailing}</Text>
    </View>
  );
}

function FlagPill({label, enabled}: {label: string; enabled: boolean}) {
  return (
    <View style={[styles.flagPill, enabled ? styles.flagOn : styles.flagOff]}>
      <Text style={[styles.flagText, enabled ? styles.flagTextOn : styles.flagTextOff]}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.xxl,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing.md,
  },
  eyebrow: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
    textTransform: 'uppercase',
  },
  title: {
    ...theme.typography.display,
    color: theme.colors.textPrimary,
  },
  environmentPill: {
    minHeight: 32,
    paddingHorizontal: theme.spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.radius.pill,
    backgroundColor: theme.colors.surfaceMuted,
  },
  environmentText: {
    ...theme.typography.caption,
    color: theme.colors.primary,
    textTransform: 'capitalize',
  },
  summaryGrid: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  metricCard: {
    flex: 1,
    minHeight: 96,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
    justifyContent: 'space-between',
    ...theme.elevation.card,
  },
  metricValue: {
    ...theme.typography.title,
    color: theme.colors.textPrimary,
  },
  metricLabel: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
  },
  section: {
    marginTop: theme.spacing.lg,
  },
  sectionTitle: {
    ...theme.typography.subtitle,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.sm,
  },
  highlightCard: {
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.lg,
  },
  highlightTitle: {
    ...theme.typography.subtitle,
    color: theme.colors.surface,
  },
  highlightText: {
    ...theme.typography.body,
    color: theme.colors.surfaceMuted,
    marginTop: theme.spacing.xs,
  },
  row: {
    minHeight: 72,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: theme.colors.border,
  },
  rowText: {
    flex: 1,
    paddingRight: theme.spacing.md,
  },
  rowTitle: {
    ...theme.typography.body,
    fontWeight: '600',
    color: theme.colors.textPrimary,
  },
  rowMeta: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xxs,
  },
  trailing: {
    ...theme.typography.caption,
    color: theme.colors.primary,
    textAlign: 'right',
  },
  flagGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.xs,
  },
  flagPill: {
    minHeight: 34,
    borderRadius: theme.radius.pill,
    paddingHorizontal: theme.spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flagOn: {
    backgroundColor: theme.colors.surfaceMuted,
  },
  flagOff: {
    backgroundColor: theme.colors.border,
  },
  flagText: {
    ...theme.typography.caption,
  },
  flagTextOn: {
    color: theme.colors.success,
  },
  flagTextOff: {
    color: theme.colors.textSecondary,
  },
});
