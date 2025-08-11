import { StyleSheet } from 'react-native'

import { Spacer, ThemedText, ThemedView } from '../../components';

const Create = () => {
  return (
    <ThemedView safe={true} style={styles.container}>

      <ThemedText title={true} style={styles.heading}>
        Add a New Book
      </ThemedText>
      <Spacer />

    </ThemedView>
  )
}

export default Create

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
})