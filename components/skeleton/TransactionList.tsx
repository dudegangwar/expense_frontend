import React from "react";
import { StyleSheet, View } from "react-native";

export function TransactionListSkeleton({ groups = 2, items = 3 }) {
  return (
    <View style={styles.container}>
      {Array.from({ length: groups }).map((_, groupIndex) => (
        <View key={groupIndex}>
          {/* Group Header Skeleton */}
          <View style={styles.groupHeader}>
            <View style={styles.groupHeaderLeft}>
              <View style={styles.iconSkeleton} />
              <View style={styles.daySkeleton} />
            </View>
            <View style={styles.countSkeleton} />
          </View>

          {/* Transaction Item Skeletons */}
          {Array.from({ length: items }).map((_, itemIndex) => (
            <View key={itemIndex} style={styles.transactionSkeleton}>
              <View style={styles.iconCircle} />
              <View style={styles.textBlock}>
                <View style={styles.titleSkeleton} />
                <View style={styles.subtitleSkeleton} />
              </View>
              <View style={styles.amountSkeleton} />
            </View>
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
    marginTop: 10,
  },

  /* Group Header */
  groupHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  groupHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  iconSkeleton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#2A2A2E",
  },
  daySkeleton: {
    width: 70,
    height: 16,
    borderRadius: 4,
    backgroundColor: "#2A2A2E",
  },
  countSkeleton: {
    width: 90,
    height: 12,
    borderRadius: 4,
    backgroundColor: "#2A2A2E",
  },

  /* Transaction Item */
  transactionSkeleton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    gap: 12,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#2A2A2E",
  },
  textBlock: {
    flex: 1,
    gap: 6,
  },
  titleSkeleton: {
    width: "60%",
    height: 14,
    borderRadius: 4,
    backgroundColor: "#2A2A2E",
  },
  subtitleSkeleton: {
    width: "40%",
    height: 12,
    borderRadius: 4,
    backgroundColor: "#2A2A2E",
  },
  amountSkeleton: {
    width: 60,
    height: 14,
    borderRadius: 4,
    backgroundColor: "#2A2A2E",
  },
});
