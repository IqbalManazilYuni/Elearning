import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const SoalItem = ({ item, index, onChangeText }) => {
  return (
    <View key={index}>
      {item.type === 'deskripsi' ? (
        <Text style={styles.fontDeskripsi}>{item.content}</Text>
      ) : (
        <>
          <View style={{ flexDirection: 'row', width: '100%', paddingLeft: 10 }}>
            <View style={{ width: '100%', paddingLeft: 10 }}>
              <Text style={styles.fontDeskripsi}>{item.content}</Text>
            </View>
          </View>
          <View style={{ width: '100%', alignItems: 'center' }}>
            <TextInput
              style={styles.inputMultiline}
              placeholder="Masukkan Jawaban"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              onChangeText={(text) => onChangeText(text, index)}
            />
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  fontDeskripsi: {
    fontFamily: 'lexend',
    fontSize: 16, // Sesuaikan dengan kebutuhan
    fontWeight: 'black',
    marginBottom: 10,
  },
  inputMultiline: {
    width: '90%',
    height: 80,
    borderWidth: 1,
    elevation: 5,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: 'white',
    textAlignVertical: 'top',
    marginBottom: 10,
  },
});

export default SoalItem;