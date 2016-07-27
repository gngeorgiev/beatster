package com.beatstr.audioPlayer;

import android.media.AudioManager;
import android.media.MediaPlayer;
import android.util.Log;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

class AudioPlayer extends ReactContextBaseJavaModule {
    private static final String TAG = "AudioPlayer";

    private MediaPlayer player;
    private String dataSource;

    AudioPlayer(ReactApplicationContext reactContext) {
        super(reactContext);
        this.player = new MediaPlayer();
        this.player.setAudioStreamType(AudioManager.STREAM_MUSIC);

        this.dataSource = "";
    }

    private void handleError(Exception e, Promise promise) {
        Log.v(TAG, e.toString());
        this.player.reset();
        promise.reject(e);
    }

    @Override
    public String getName() {
        return "AudioPlayer";
    }

    @ReactMethod
    public void stop(Promise promise) {
        try {
            this.player.stop();
            promise.resolve(null);
        } catch (Exception e) {
            this.handleError(e, promise);
        }
    }

    @ReactMethod
    public void pause(Promise promise) {
        try {
            if (!this.player.isPlaying()) {
                promise.resolve(null);
                return;
            }

            this.player.pause();
            promise.resolve(null);
        } catch (Exception e) {
            this.handleError(e, promise);
        }
    }

    @ReactMethod
    public void play(String url, Promise promise) {
        try {
            if (this.player.isPlaying()) {
                promise.resolve(null);
                return;
            }

            if (this.dataSource.equals(url)) {
                this.player.start();
                promise.resolve(null);
                return;
            }

            if (url == null || url.equals("")) {
                url = this.dataSource;
            }

            this.player.setDataSource(url);
            this.player.prepare();
            this.player.start();

            this.dataSource = url;
            promise.resolve(null);
        } catch (Exception e) {
            this.handleError(e, promise);
        }
    }

    @ReactMethod
    public void getDuration(Promise promise) {
        try {
            int duration = this.player.getDuration();
            promise.resolve(duration);
        } catch (Exception e) {
            this.handleError(e, promise);
        }
    }

    @ReactMethod
    public void getCurrentPosition(Promise promise) {
        try {
            int pos = this.player.getCurrentPosition();
            promise.resolve(pos);
        } catch (Exception e) {
            this.handleError(e, promise);
        }
    }

    @ReactMethod
    public void isPlaying(Promise promise) {
        try {
            boolean isPlaying = this.player.isPlaying();
            promise.resolve(isPlaying);
        } catch (Exception e) {
            this.handleError(e, promise);
        }
    }

    @ReactMethod
    public void setVolume(float volume, Promise promise) {
        try {
            this.player.setVolume(volume, volume);
            promise.resolve(null);
        } catch (Exception e) {
            this.handleError(e, promise);
        }
    }
}
