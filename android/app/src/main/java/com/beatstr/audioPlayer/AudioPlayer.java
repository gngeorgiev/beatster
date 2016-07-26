package com.beatstr.audioPlayer;

import android.media.AudioManager;
import android.media.MediaPlayer;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

class AudioPlayer extends ReactContextBaseJavaModule {
    private MediaPlayer player;

    AudioPlayer(ReactApplicationContext reactContext) {
        super(reactContext);
        this.player = new MediaPlayer();
        this.player.setAudioStreamType(AudioManager.STREAM_MUSIC);

        this.player.setOnPreparedListener(new MediaPlayer.OnPreparedListener() {
            @Override
            public void onPrepared(MediaPlayer mp) {
                mp.start();
            }
        });
    }

    @Override
    public String getName() {
        return "AudioPlayer";
    }

    @ReactMethod
    public void play(String url, Promise promise) {
        try {
            if (this.player.isPlaying()) {
                this.player.stop();
            }

            this.player.setDataSource(url);
            this.player.prepareAsync();
            promise.resolve(null);
        } catch (Exception e) {
            promise.reject(e);
        }
    }
}
