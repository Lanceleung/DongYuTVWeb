package xyz.jdynb.tv.ui.fragment

import xyz.jdynb.tv.model.LiveChannelModel

/**
 * 原生播放器（未实现）
 * TODO: 待实现
 */
class NativeLivePlayerFragment: LivePlayerFragment() {
  override fun onLoadUrl(url: String?, channelModel: LiveChannelModel) {

  }

  override fun shouldOverride(url: String): Boolean {
    TODO("Not yet implemented")
  }

  override fun onPageFinished(
    url: String,
    channelModel: LiveChannelModel
  ) {
    TODO("Not yet implemented")
  }

  override fun onPageStarted(
    url: String,
    channelModel: LiveChannelModel
  ) {
    TODO("Not yet implemented")
  }

  override fun play(channel: LiveChannelModel) {
    TODO("Not yet implemented")
  }

  override fun resumeOrPause() {
    TODO("Not yet implemented")
  }


}