package xyz.jdynb.tv.base

import android.media.AudioManager
import android.os.Bundle
import android.view.KeyEvent
import androidx.annotation.LayoutRes
import androidx.databinding.ViewDataBinding
import com.drake.engine.base.EngineActivity
import kotlin.system.exitProcess

/**
 * 基础按键事件处理 Activity
 */
abstract class BaseKeyEventActivity<T : ViewDataBinding>(@LayoutRes contentLayoutId: Int = 0) :
  EngineActivity<T>(contentLayoutId) {

  /**
   * 是否长按
   */
  protected var isLongPress = false

  /**
   * 管理音量
   */
  private lateinit var audioManager: AudioManager

  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    audioManager = getSystemService(AUDIO_SERVICE) as AudioManager
  }

  override fun onKeyDown(keyCode: Int, event: KeyEvent?): Boolean {
    return super.onKeyDown(keyCode, event)
  }

  override fun onKeyUp(keyCode: Int, event: KeyEvent?): Boolean {
    return super.onKeyUp(keyCode, event)
  }

  override fun onKeyLongPress(keyCode: Int, event: KeyEvent?): Boolean {
    // 虚拟机上按按了 enter、空格键就只有 dispatchKeyEvent 可以响应？
    return super.onKeyLongPress(keyCode, event)
  }

  /**
   * 按键事件处理
   */
  override fun dispatchKeyEvent(event: KeyEvent): Boolean {
    when (event.action) {
      KeyEvent.ACTION_DOWN -> {
        isLongPress = event.repeatCount > 4
      }
    }
    if (event.action != KeyEvent.ACTION_UP) {
      return super.dispatchKeyEvent(event)
    }

    when (val keyCode = event.keyCode) {
      /**
       * 上
       */
      KeyEvent.KEYCODE_DPAD_UP -> {
        return onDPadUp()
      }

      /**
       * 下
       */
      KeyEvent.KEYCODE_DPAD_DOWN -> {
        return onDPadDown()
      }

      // ENTER、OK（确认）
      KeyEvent.KEYCODE_ENTER, KeyEvent.KEYCODE_DPAD_CENTER, KeyEvent.KEYCODE_SPACE -> {
        return onOk()
      }

      // 静音
      KeyEvent.KEYCODE_MUTE -> {
        try {
          audioManager.setStreamVolume(
            AudioManager.STREAM_SYSTEM,
            0,
            AudioManager.FLAG_REMOVE_SOUND_AND_VIBRATE
          )
        } catch (_: Exception) {
        }
        return true
      }

      KeyEvent.KEYCODE_DPAD_LEFT -> {
        onDPadLeft()
      }

      //  volume down、left
      KeyEvent.KEYCODE_VOLUME_DOWN -> {
        volumeDown()
        return true
      }

      KeyEvent.KEYCODE_DPAD_RIGHT -> {
        onDPadRight()
      }

      // volume up、right
      KeyEvent.KEYCODE_VOLUME_UP -> {
        volumeUp()
        return true
      }

      // 返回
      KeyEvent.KEYCODE_BACK, KeyEvent.KEYCODE_ESCAPE -> {
        return handleBackPress()
      }

      // 主页
      KeyEvent.KEYCODE_HOME -> {
        return onHome()
      }

      // 菜单
      KeyEvent.KEYCODE_MENU, KeyEvent.KEYCODE_P -> {
        return onMenu()
      }

      // 0
      // 数字
      KeyEvent.KEYCODE_0, KeyEvent.KEYCODE_1, KeyEvent.KEYCODE_2, KeyEvent.KEYCODE_3,
      KeyEvent.KEYCODE_4, KeyEvent.KEYCODE_5, KeyEvent.KEYCODE_6, KeyEvent.KEYCODE_7,
      KeyEvent.KEYCODE_8, KeyEvent.KEYCODE_9,
      KeyEvent.KEYCODE_NUMPAD_0, KeyEvent.KEYCODE_NUMPAD_1, KeyEvent.KEYCODE_NUMPAD_2,
      KeyEvent.KEYCODE_NUMPAD_3, KeyEvent.KEYCODE_NUMPAD_4, KeyEvent.KEYCODE_NUMPAD_5,
      KeyEvent.KEYCODE_NUMPAD_6, KeyEvent.KEYCODE_NUMPAD_7, KeyEvent.KEYCODE_NUMPAD_8,
      KeyEvent.KEYCODE_NUMPAD_9 -> {
        val num = getNumForKeyCode(keyCode)
        return onNumber(num)
      }
    }

    return super.dispatchKeyEvent(event)
  }

  /**
   * 音量减
   */
  open fun volumeDown() {
    try {
      audioManager.adjustStreamVolume(
        AudioManager.STREAM_MUSIC,
        AudioManager.ADJUST_LOWER,
        AudioManager.FLAG_SHOW_UI
      )
    } catch (_: Exception) {
    }
  }

  /**
   * 音量加
   */
  open fun volumeUp() {
    val volume = audioManager.getStreamVolume(AudioManager.STREAM_MUSIC)
    if (volume < audioManager.getStreamMaxVolume(AudioManager.STREAM_MUSIC)) {
      try {
        audioManager.adjustStreamVolume(
          AudioManager.STREAM_MUSIC,
          AudioManager.ADJUST_RAISE,
          AudioManager.FLAG_SHOW_UI
        )
      } catch (_: Exception) {
      }
    }
  }

  /**
   * 根据 keyCode 获取数字
   */
  private fun getNumForKeyCode(keyCode: Int): String {
    return when (keyCode) {
      KeyEvent.KEYCODE_0, KeyEvent.KEYCODE_NUMPAD_0 -> "0"
      KeyEvent.KEYCODE_1, KeyEvent.KEYCODE_NUMPAD_1 -> "1"
      KeyEvent.KEYCODE_2, KeyEvent.KEYCODE_NUMPAD_2 -> "2"
      KeyEvent.KEYCODE_3, KeyEvent.KEYCODE_NUMPAD_3 -> "3"
      KeyEvent.KEYCODE_4, KeyEvent.KEYCODE_NUMPAD_4 -> "4"
      KeyEvent.KEYCODE_5, KeyEvent.KEYCODE_NUMPAD_5 -> "5"
      KeyEvent.KEYCODE_6, KeyEvent.KEYCODE_NUMPAD_6 -> "6"
      KeyEvent.KEYCODE_7, KeyEvent.KEYCODE_NUMPAD_7 -> "7"
      KeyEvent.KEYCODE_8, KeyEvent.KEYCODE_NUMPAD_8 -> "8"
      KeyEvent.KEYCODE_9, KeyEvent.KEYCODE_NUMPAD_9 -> "9"
      else -> ""
    }
  }

  /**
   * 处理 App 默认的返回
   *
   * @return true 表示已处理返回键 false 表示未处理返回键
   */
  open fun handleBackPress(): Boolean {
    return true
  }

  /**
   * 上
   */
  open fun onDPadUp(): Boolean {
    return true
  }

  /**
   * 下
   */
  open fun onDPadDown(): Boolean {
    return true
  }

  /**
   * 确认
   */
  open fun onOk(): Boolean {
    return true
  }

  /**
   * 左
   */
  open fun onDPadLeft(): Boolean {
    return true
  }

  /**
   * 右
   */
  open fun onDPadRight(): Boolean {
    return true
  }

  /**
   * 主页
   */
  open fun onHome(): Boolean {
    exitProcess(0)
  }

  /**
   * 菜单
   */
  open fun onMenu(): Boolean {
    return true
  }

  /**
   * 数字
   */
  open fun onNumber(number: String): Boolean {
    return true
  }

}