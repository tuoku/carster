import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {SearchBar} from 'react-native-elements';

const Search = () => {
  const [search, setSearch] = useState('');

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Type Here to Search..."
        onChangeText={setSearch}
        value={search}
        style={styles.container}
        containerStyle={styles.container}
        inputStyle={styles.container}
        lightTheme={true}
        autoFocus={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
});

export default Search;
