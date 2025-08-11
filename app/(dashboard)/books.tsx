import { StyleSheet } from 'react-native'

import { Spacer, ThemedText, ThemedView } from '../../components';

const Books = () => {
  return (
    <ThemedView safe={true} style={styles.container}>

      <Spacer />
      <ThemedText title={true} style={styles.heading}>
        Your Reading List
      </ThemedText>

    </ThemedView>
  )
}

export default Books

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
  },
  heading: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
})