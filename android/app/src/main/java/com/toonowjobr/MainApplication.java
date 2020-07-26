package com.toonowjobr;
import android.app.Application;
import com.reactcommunity.rndatetimepicker.RNDateTimePickerPackage;
import com.marianhello.bgloc.react.BackgroundGeolocationPackage;
import com.AlexanderZaytsev.RNI18n.RNI18nPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.airbnb.android.react.maps.MapsPackage;
import com.facebook.CallbackManager;
import com.facebook.react.ReactApplication;
import com.reactnativecommunity.webview.RNCWebViewPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.facebook.soloader.SoLoader;
import com.imagepicker.ImagePickerPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.reactnativecommunity.geolocation.GeolocationPackage;
import com.reactnativecommunity.netinfo.NetInfoPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.voximplant.foregroundservice.VIForegroundServicePackage;
import com.voximplant.reactnative.VoxImplantReactPackage;
import org.reactnative.camera.RNCameraPackage;
import com.reactnativecommunity.rnpermissions.RNPermissionsPackage;

import java.util.Arrays;
import java.util.List;

import co.apptailor.googlesignin.RNGoogleSigninPackage;
import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.auth.RNFirebaseAuthPackage;
import io.invertase.firebase.database.RNFirebaseDatabasePackage;
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage;
import io.invertase.firebase.notifications.RNFirebaseNotificationsPackage;
import io.wazo.callkeep.RNCallKeepPackage;

public class MainApplication extends Application implements ReactApplication {
private static CallbackManager mCallbackManager = CallbackManager.Factory.create();

  protected static CallbackManager getCallbackManager() {
    return mCallbackManager;
  }

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNCWebViewPackage(),
            new BackgroundGeolocationPackage(),
            new SplashScreenReactPackage(),
            new FBSDKPackage(mCallbackManager),
            new RNGoogleSigninPackage(),
            new RNFirebasePackage(),
            new RNCallKeepPackage(),
            new AsyncStoragePackage(),
            new VIForegroundServicePackage(),
            new GeolocationPackage(),
            new NetInfoPackage(),
            new RNDeviceInfo(),
            new ReactNativeConfigPackage(),
            new ImagePickerPackage(),
            new LinearGradientPackage(),
            new RNI18nPackage(),
            new VectorIconsPackage(),
            new RNGestureHandlerPackage(),
            new MapsPackage(),
            new VoxImplantReactPackage(),
            new RNFirebaseMessagingPackage(),
            new RNFirebaseNotificationsPackage(),
              new RNFirebaseAuthPackage(),
              new RNFirebaseDatabasePackage(),
              new RNDateTimePickerPackage(),
              new RNCameraPackage(),
              new RNPermissionsPackage()

      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
