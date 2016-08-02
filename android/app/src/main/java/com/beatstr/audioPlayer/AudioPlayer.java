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
        this.player = this.createMediaPlayer();
    }

    private MediaPlayer createMediaPlayer() {
        MediaPlayer player = new MediaPlayer();
        player.setAudioStreamType(AudioManager.STREAM_MUSIC);

        return player;
    }

    private void handleError(Exception e, Promise promise) {
        this.handleError("EAUDIOERROR", e, promise);
    }

    private void handleError(String code, Exception e, Promise promise) {
        Log.v(TAG, code, e);
        if (this.player.isPlaying()) {
            this.player.stop();
        }

        this.player.reset();
        this.player.release();
        this.player = null;
        this.player = this.createMediaPlayer();
        this.dataSource = null;

        promise.reject(code, e.getMessage(), e);
    }

    private void emitEvent() {
//        this.getReactApplicationContext()
//                    .getJSModule(AudioPlayerPackage.class).
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
            this.player.pause();
            promise.resolve(null);
        } catch (Exception e) {
            this.handleError(e, promise);
        }
    }

    @ReactMethod
    public void play(String url, final Promise promise) {
        try {
            if (this.player.isPlaying()) {
                promise.resolve(null);
                return;
            }

            if (url == null || url.equals("")) {
                url = this.dataSource;
            }

            if (this.dataSource != null && this.dataSource.equals(url)) {
                this.player.start();
                promise.resolve(null);
                return;
            }

            final AudioPlayer self = this;

            this.player.reset();
            this.player.setDataSource(url);
            this.player.setOnPreparedListener(new MediaPlayer.OnPreparedListener() {
                @Override
                public void onPrepared(MediaPlayer mp) {
                    mp.start();
                    promise.resolve(null);
                }
            });
            this.player.setOnErrorListener(new MediaPlayer.OnErrorListener() {
                @Override
                public boolean onError(MediaPlayer mp, int what, int extra) {
                    self.handleError(Integer.toString(what), new Exception(Integer.toString(extra)), promise);
                    return true;
                }
            });
            this.player.setOnCompletionListener(new MediaPlayer.OnCompletionListener() {
                @Override
                public void onCompletion(MediaPlayer mp) {

                }
            });
            this.player.prepareAsync();
            this.dataSource = url;
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


}
