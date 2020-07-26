import React from 'react'
import { FlatList, View } from 'react-native'
import styles from '../Styles/SignUpStyles'
import ButtonComponent from '../../Components/ButtonComponent'
import TextInputComponent from '../../Components/TextInputComponent'
import { Colors } from '../../Themes'
import I18n from '../../I18n'
import images from '../../Themes/Images';

const CategoriesComponent = props => {
  const {
    categories,
    getSelectedCategories,
    selectedCategories,
    numColumns,
    multiChoiceEnable = true,
    getDescription,
    onAddMore,
    hasAddInfo,
  } = props
  let selectedData = selectedCategories || []
  const [data, setData] = React.useState(categories)

  const _onPressItem = item => {
    const newData = updateCategories(item)
    setData(newData)
    selectedData = selectedArray(newData)
    getSelectedCategories && getSelectedCategories(selectedData)
  }

  const selectedArray = array => {
    return array.filter(item => item.isSelected)
  }

  const updateCategories = item => {
    return data.map(category => {
      if (category.id === item.id) {
        return {
          ...category,
          isSelected: !category.isSelected,
        }
      } else if (!multiChoiceEnable) {
        return {
          ...category,
          isSelected: false,
        }
      }
      return category
    })
  }

  const _keyExtractor = (item, index) => index.toString()
  const _renderItem = ({ item }) => (
    <CategoriesItem numColumns={numColumns} item={item} onPress={() => _onPressItem(item)} onAddMore={onAddMore} />
  )

  React.useEffect(() => {
    let newData = categories
    selectedData.forEach(selectedItem => {
      newData = newData.map(item => {
        if (item.id === selectedItem.id) return selectedItem
        return item
      })
    })
    setData(newData)
  }, [categories])

  return (
    <View>
      <FlatList
        {...props}
        columnWrapperStyle={styles.columnWrapperStyle}
        data={data}
        showsVerticalScrollIndicator={false}
        keyExtractor={_keyExtractor}
        renderItem={_renderItem}
        numColumns={numColumns || 2}
      />
      {hasAddInfo && (
        <TextInputComponent
          onChangeText={getDescription}
          placeholder={I18n.t('levelPlaceHolder')}
          placeholderTextColor={Colors.inActive}
          multiline
          style={styles.addInfoText}
        />
      )}
    </View>
  )
}

const CategoriesItem = ({ item, onPress, numColumns, onAddMore }) => {
  const buttonStyle = item.isSelected ? styles.buttonActive : styles.buttonInactive
  const textStyle = item.isSelected ? styles.textButtonActive : styles.textButtonInactive
  if (item.name != 'add')
    return (
      <ButtonComponent
        style={[styles.buttonStyle, buttonStyle, numColumns === 3 && styles.levelButton]}
        textStyle={textStyle}
        onPress={onPress}
        text={item.name}
      />
    )
  else
    return (
      <ButtonComponent
        style={[styles.addCategory, buttonStyle, numColumns === 3 && styles.levelButton]}
        textStyle={textStyle}
        onPress={onAddMore}
        text={I18n.t('add')}
        icon={images.plus}
      />
    )
}

export default CategoriesComponent
