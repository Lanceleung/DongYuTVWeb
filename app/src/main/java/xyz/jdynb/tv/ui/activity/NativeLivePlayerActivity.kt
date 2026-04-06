package xyz.jdynb.tv.ui.activity

import android.annotation.SuppressLint
import android.webkit.JavascriptInterface
import androidx.annotation.OptIn
import androidx.media3.common.C
import androidx.media3.common.MediaItem
import androidx.media3.common.Player
import androidx.media3.common.util.UnstableApi
import androidx.media3.datasource.DefaultHttpDataSource
import androidx.media3.exoplayer.ExoPlayer
import androidx.media3.exoplayer.LoadControl
import androidx.media3.exoplayer.hls.HlsMediaSource
import com.drake.engine.base.EngineActivity
import com.tencent.smtt.export.external.interfaces.ConsoleMessage
import com.tencent.smtt.export.external.interfaces.WebResourceRequest
import com.tencent.smtt.sdk.WebChromeClient
import com.tencent.smtt.sdk.WebSettings
import com.tencent.smtt.sdk.WebView
import com.tencent.smtt.sdk.WebViewClient
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import okhttp3.internal.addHeaderLenient
import timber.log.Timber
import xyz.jdynb.tv.R
import xyz.jdynb.tv.databinding.ActivityNativeLivePlayerBinding
import xyz.jdynb.tv.ui.fragment.LivePlayerFragment.Companion.USER_AGENT
import java.nio.charset.StandardCharsets

class NativeLivePlayerActivity :
  EngineActivity<ActivityNativeLivePlayerBinding>(R.layout.activity_native_live_player) {

  private lateinit var webview: WebView
  private lateinit var player: Player

  private val webviewClient = object : WebViewClient() {
    override fun shouldOverrideUrlLoading(p0: WebView?, p1: WebResourceRequest?): Boolean {
      return super.shouldOverrideUrlLoading(p0, p1)
    }
  }

  private val webviewChromeClient = object : WebChromeClient() {
    override fun onConsoleMessage(msg: ConsoleMessage): Boolean {
      Timber.d("onConsoleMessage: ${msg.messageLevel().name} ${msg.message()} ${msg.lineNumber()}")
      return false
    }
  }

  inner class WebViewJavaScriptBridge {

    @JavascriptInterface
    fun play(url: String) {
      Timber.i("playUrl: ${url}")
      runOnUiThread {
        player.setMediaItem(MediaItem.fromUri(url))
        player.prepare()
      }
    }

  }

  override fun initData() {
    CoroutineScope(Dispatchers.IO).launch {
      assets.open("js/test/index.js").use { inputStream ->
        val js = inputStream.readBytes().toString(StandardCharsets.UTF_8)
        Timber.d("js: %s", js)
        withContext(Dispatchers.Main) {
          webview.evaluateJavascript(js) {}
        }
      }
    }
  }

  @SuppressLint("SetJavaScriptEnabled")
  override fun initView() {
    webview = WebView(this)
    webview.loadUrl("file:///android_asset/html/base.html")
    webview.addJavascriptInterface(WebViewJavaScriptBridge(), "WebViewJavaScriptBridge")

    initPlayer()

    initWebViewSettings()
    webview.webViewClient = webviewClient
    webview.webChromeClient = webviewChromeClient
  }

  @OptIn(UnstableApi::class)
  private fun initPlayer() {
    val httpDataSourceFactory = DefaultHttpDataSource.Factory().apply {
      setConnectTimeoutMs(15000) // 连接超时 15 秒
      setReadTimeoutMs(15000)    // 读取超时 15 秒
      setKeepPostFor302Redirects(true)  // 保持 POST 请求重定向
      setAllowCrossProtocolRedirects(true) // 允许跨协议重定向
    }
    val hlsMediaSource = HlsMediaSource.Factory(httpDataSourceFactory)
      .setAllowChunklessPreparation(true)

    player = ExoPlayer.Builder(this, hlsMediaSource)
      .setWakeMode(C.WAKE_MODE_NETWORK)
      .setPriority(C.PRIORITY_MAX)
      .build()
    player.playWhenReady = true
    binding.playerView.player = player
  }

  /**
   * 初始化webview设置
   */
  private fun initWebViewSettings() {
    webview.settings.apply {
      // 获取当前的 UA，可以获取当前的浏览器内核版本
      Timber.i("userAgent: $userAgentString")
      userAgentString = USER_AGENT

      // 基本设置
      javaScriptEnabled = true
      domStorageEnabled = false
      databaseEnabled = false
      allowFileAccess = true
      allowContentAccess = true

      // 缓存设置
      cacheMode = WebSettings.LOAD_DEFAULT

      // 布局渲染
      layoutAlgorithm = WebSettings.LayoutAlgorithm.NORMAL
      useWideViewPort = false
      loadWithOverviewMode = false
      builtInZoomControls = false
      displayZoomControls = false
      setSupportZoom(false)

      // 文本渲染
      textZoom = 100
      defaultFontSize = 16
      defaultFixedFontSize = 13
      minimumFontSize = 8
      minimumLogicalFontSize = 8
      // setInitialScale(getMinimumScale())

      // 其他设置
      setSupportMultipleWindows(false)
      javaScriptCanOpenWindowsAutomatically = false
      loadsImagesAutomatically = false
      blockNetworkImage = true
      mediaPlaybackRequiresUserGesture = false

      setAllowUniversalAccessFromFileURLs(true)
      setAllowFileAccessFromFileURLs(true)
    }
  }
}