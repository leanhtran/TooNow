import React from 'react'
import {FlatList, View} from 'react-native'
import styles from '../Styles/AddressListStyles'
import TextTouchable from '../../Components/TextTouchable'

const AddressList = ({data, onPressItem}) => {
  const _renderItem = ({item}) => <AddressItem item={item} onPress={() => onPressItem(item)}/>
  const _keyExtractor = (item, index) => index.toString()
  return (
    <View style={styles.addressListContainer}>
      <FlatList
        data={data}
        renderItem={_renderItem}
        keyExtractor={_keyExtractor}
      />
    </View>
  )
}

const AddressItem = ({item, onPress}) => {
  const text = item?.description || ''
  return (
    <TextTouchable
      multiline
      onPress={onPress}
      text={text}
      style={styles.addressItemText}
    />
  )
}

export default AddressList
