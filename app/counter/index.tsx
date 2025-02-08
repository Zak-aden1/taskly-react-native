import * as Haptics from "expo-haptics";
import * as Notifications from "expo-notifications";

import {
  ActivityIndicator,
  Alert,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Duration, intervalToDuration, isBefore } from "date-fns";
import { useEffect, useRef, useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import ConfettiCannon from "react-native-confetti-cannon";
import { TimeSegment } from "../../components/timeSegment";
import { registerForPushNotificationsAsync } from "../../utils/registerForPushNotifications";
import { saveToStorage } from "../../utils/storage";

// 10 seconds from now
const frequency = 10 * 1000;

export const countdownStorageKey = "taskly-countdown";

export type persistedCountDownState = {
  currentNotificationId: string | undefined;
  completedAtTimestamps: number[];
};

type CountDownStatus = {
  isOverDue: boolean;
  distance: Duration;
};

export default function CounterScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const confettiRef = useRef<ConfettiCannon>(null);
  const [count, setCount] = useState<persistedCountDownState>();
  const [status, setStatus] = useState<CountDownStatus>({
    isOverDue: false,
    distance: {},
  });

  const lastCompletedTimestamp = count?.completedAtTimestamps[0];

  useEffect(() => {
    const init = async () => {
      const value = await AsyncStorage.getItem(countdownStorageKey);
      if (value) {
        setCount(JSON.parse(value));
      }
    };
    init();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const timeSinceLastCompleted = lastCompletedTimestamp
        ? lastCompletedTimestamp + frequency
        : Date.now();
      const isOverDue = isBefore(timeSinceLastCompleted, Date.now());
      const distance = intervalToDuration(
        isOverDue
          ? { start: timeSinceLastCompleted, end: Date.now() }
          : { start: Date.now(), end: timeSinceLastCompleted },
      );
      setStatus({ isOverDue, distance });
      setIsLoading(false);
    }, 1000);
    return () => clearInterval(interval);
  }, [lastCompletedTimestamp]);

  const scheduleNotification = async () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    confettiRef.current?.start();
    let pushNotificationId;
    const permission = await registerForPushNotificationsAsync();
    console.log(permission);
    if (permission === "granted") {
      pushNotificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title: "The thing is overdue",
          body: "This is a test notification",
        },
        trigger: {
          seconds: frequency / 1000,
          type: "timeInterval",
        } as Notifications.TimeIntervalTriggerInput,
      });
    } else {
      Alert.alert(
        "Permission not granted",
        "Please grant permission to schedule notifications",
      );
    }
    if (count?.currentNotificationId) {
      await Notifications.cancelScheduledNotificationAsync(
        count.currentNotificationId,
      );
    }
    const newCount = {
      ...count,
      currentNotificationId: pushNotificationId,
      completedAtTimestamps: count?.completedAtTimestamps
        ? [Date.now(), ...count.completedAtTimestamps]
        : [Date.now()],
    };
    setCount(newCount);
    await saveToStorage(countdownStorageKey, newCount);
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={[styles.container, status.isOverDue && styles.overdue]}>
      {status.isOverDue ? (
        <Text style={styles.heading}>Thing Overdue by</Text>
      ) : (
        <Text style={styles.heading}>Thing due by</Text>
      )}
      <View style={styles.timeSegments}>
        <TimeSegment number={status.distance.days ?? 0} unit="days" />
        <TimeSegment number={status.distance.hours ?? 0} unit="hours" />
        <TimeSegment number={status.distance.minutes ?? 0} unit="minutes" />
        <TimeSegment number={status.distance.seconds ?? 0} unit="seconds" />
      </View>
      <TouchableOpacity style={styles.button} onPress={scheduleNotification}>
        <Text style={styles.buttonText}>Get Notification</Text>
      </TouchableOpacity>
      <ConfettiCannon
        count={200}
        origin={{ x: Dimensions.get("window").width / 2, y: -20 }}
        autoStart={false}
        fadeOut
        ref={confettiRef}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  overdue: {
    backgroundColor: "red",
  },
  // eslint-disable-next-line react-native/no-unused-styles
  text: {
    fontSize: 24,
  },
  button: {
    backgroundColor: "black",
    padding: 12,
    borderRadius: 6,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  timeSegments: {
    flexDirection: "row",
    gap: 8,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
});
