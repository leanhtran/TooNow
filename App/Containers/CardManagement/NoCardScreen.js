import React, { Component } from 'react'
import { View, StatusBar } from 'react-native'
import I18n from '../../I18n'

// Styles
import styles from '../Styles/NoCardScreenStyle'
import { Images } from '../../Themes'
import ImageBackgroundContainer from '../ImageBackgroundContainer'
import ToolBar from '../../Components/Toolbar'
import TextComponent from '../../Components/TextComponent'
import AddButton from '../../Components/AddButton'

class NoCardScreen extends Component {
  _onAddCard = () => {
    const { navigation, addCardRequest} = this.props
    navigation.navigate("AddCardScreen",  { addCardRequest });
  };

  render () {
    return (
      <View style={styles.mainContainer}>
        <StatusBar barStyle='dark-content' />
        <ImageBackgroundContainer
          resizeMode='stretch'
          style={[styles.container, styles.topBackground]}
          source={Images.bgTopAskr}
        >
          <View>
            <ToolBar title={I18n.t('cardManagement')} theme='dark' />
          </View>
        </ImageBackgroundContainer>

        <TextComponent
          style={styles.noCardMessage}
          multiline
          numberOfLines={2}
        >
          {I18n.t('noCard')}
        </TextComponent>

        <AddButton style={styles.addButton} onPress={this._onAddCard} />

        <TextComponent style={styles.addButtonText}>
          {I18n.t('addCard')}
        </TextComponent>
      </View>
    )
  }
}

export default NoCardScreen
