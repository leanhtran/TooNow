import React, {Component} from 'react'
import {ActivityIndicator, View, StyleSheet, Dimensions} from 'react-native'
import {WebView} from 'react-native-webview'
import TextComponent from './TextComponent'
import Sizes from '../Themes/Sizes'
import {APP_COLOR} from '../Containers/Styles/AppStyles'

class WebViewComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      isFailed: false,
      progress: 0,
    }
  }

  _onLoadStart = () => {
    this.setState({
      loading: true,
      progress: 0.1,
    })
    this.progress = setInterval(() => {
      if (this.state.progress < 1) {
        this.setState(prev => {
          return {
            progress: prev.progress + 0.05,
          }
        })
      } else {
        clearInterval(this.progress)
        this.setState({
          loading: false,
          progress: 1,
        })
      }
    }, 1000)
  }

  _onLoadEnd = () => {
    clearInterval(this.progress)
    this.setState({
      loading: false,
      progress: 1,
    })
  }

  _onError = error => {
    this.setState({isFailed: true})
  }

  render() {
    const {isFailed} = this.state
    const {uri, titleError, contentError} = this.props
    const isShowLoading = this.state.loading || this.state.progress < 1

    if (isFailed)
      return (
        <WebViewError titleError={titleError} contentError={contentError} />
      )

    return (
      <View style={styles.container}>
        <WebView
          onNavigationStateChange={this._onNavigationStateChange}
          source={{uri}}
          mixedContentMode={'always'}
          onLoadStart={this._onLoadStart}
          onLoadEnd={this._onLoadEnd}
          onError={error => this._onError(error)}
        />
        {isShowLoading && <LoadingComponent />}
      </View>
    )
  }

  // renderLoadingBar = () => {
  //   const {progress} = this.state;
  //   const width = sizeWidth(100) * progress;
  //   return (
  //     <View style={styles.loadingBar}>
  //       <View style={[styles.loadedBar, {width}]} />
  //     </View>
  //   );
  // };

  _onNavigationStateChange = navState => {
    // const {onNavigationStateChange} = this.props;
    // if (onNavigationStateChange)
    //   onNavigationStateChange(navState.canGoBack, this.refs.web_view_ref);
    // this.setState({
    //   canGoBack: navState.canGoBack,
    // });
  }
}

const LoadingComponent = () => (
  <View style={styles.indicator}>
    <ActivityIndicator size={'large'} color={APP_COLOR.PRIMARY} />
  </View>
)

const WebViewError = () => {
  const {titleError, contentError} = this.props
  return (
    <View style={styles.errorContainer}>
      <TextComponent>{titleError || 'Network error'}</TextComponent>
      <TextComponent style={styles.errorText}>
        {contentError || 'Content network error'}
      </TextComponent>
    </View>
  )
}

const {height} = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
  },
  indicator: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    position: 'absolute',
    justifyContent: 'center',
    bottom: 0,
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
  },
  errorText: {
    fontSize: Sizes.font12,
    lineHeight: Sizes.width21,
    marginHorizontal: Sizes.width30,
  },
  loadingBar: {
    height: 3,
    width: '100%',
    backgroundColor: '#dadada',
  },
  loadedBar: {
    height: 3,
    backgroundColor: 'black',
  },
})

export default WebViewComponent
