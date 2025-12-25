import { Text, View } from "react-native";

function Header() {
  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.greeting}>Good Morning!</Text>
        <Text style={styles.name}>Prabhat Pandey</Text>
      </View>

      <View style={styles.avatar} />
    </View>
  );
}
export { Header };

const styles = {
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  greeting: {
    fontSize: 14,
    color: "#777",
  },
  name: {
    fontSize: 22,
    fontWeight: "700",
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#ccc", // replace with Image later
  },
};
