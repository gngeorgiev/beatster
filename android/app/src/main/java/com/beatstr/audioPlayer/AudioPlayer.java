package com.beatstr.audioPlayer;

import android.media.AudioManager;
import android.media.MediaPlayer;
import android.os.AsyncTask;
import android.support.annotation.Nullable;
import android.util.Log;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.io.*;
import java.net.URL;
import java.net.URLConnection;

class DownloadTrackTask extends AsyncTask<String, Void, Void> {
    @Override
    protected Void doInBackground(String... params) {

        return null;
    }
}

class AudioPlayer extends ReactContextBaseJavaModule {
    private static final String TAG = "AudioPlayer";

    private static final String EVENT_ONCOMPLETED = "OnCompleted";

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

    private void emitEvent(String ev, @Nullable WritableMap params) {
        this.getReactApplicationContext()
                    .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                    .emit(ev, params);
    }

    private FileDescriptor saveToFile(String url, String name) {
        try {
            File root = android.os.Environment.getExternalStorageDirectory();
            File dir = new File(root.getAbsolutePath() + "/beatster/downloads");
            if (!dir.exists()) {
                dir.mkdirs();
            }

            URL downloadUrl = new URL(url);
            File file = new File(dir, name);

            URLConnection conn = downloadUrl.openConnection();
            InputStream inputStream = conn.getInputStream();
            final BufferedInputStream bufferedInputStream = new BufferedInputStream(inputStream);
            final ByteArrayOutputStream buffer = new ByteArrayOutputStream();
            final byte[] data = new byte[50];
            final FileOutputStream fileOutputStream = new FileOutputStream(file);

            final Thread t = new Thread(new Runnable() {
                public void run() {
                    try {
                        int current = 0;
                        while ((current = bufferedInputStream.read(data, 0, data.length)) != -1 &&
                                !Thread.currentThread().isInterrupted()) {
                            buffer.write(data, 0, current);
                            fileOutputStream.write(buffer.toByteArray());
                            fileOutputStream.flush();
                        }

                        fileOutputStream.close();
                        if (Thread.currentThread().isInterrupted()) {
                            //TODO: delete file
                        }
                    } catch (Exception e) {
                        Log.v(TAG, e.toString());
                    }
                }
            });

            t.start();

            return fileOutputStream.getFD();
        } catch (Exception e) {
            Log.v(TAG, e.toString());
            return null;
        }
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
    public void play(String url, String name, final Promise promise) {
        try {
            if (this.player.isPlaying() && this.dataSource.equals(url)) {
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

            FileDescriptor dataSource = this.saveToFile(url, name);

            this.player.reset();
            if (dataSource != null) {
                this.player.setDataSource(dataSource);
            } else {
                this.player.setDataSource(url);
            }
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
                    self.emitEvent(EVENT_ONCOMPLETED, null);
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
