package xyz.jdynb.tv.ui.dialog

import android.content.Context
import android.os.Bundle
import com.drake.engine.base.EngineDialog
import com.drake.engine.dialog.setMaxWidth
import xyz.jdynb.tv.R
import xyz.jdynb.tv.constants.SPKeyConstants
import xyz.jdynb.tv.databinding.DialogChannelCustomBinding
import xyz.jdynb.tv.utils.SpUtils.put
import xyz.jdynb.tv.utils.SpUtils.remove
import xyz.jdynb.tv.utils.showToast

/**
 * 自定义频道
 */
class CustomChannelDialog(context: Context): EngineDialog<DialogChannelCustomBinding>(context, R.style.Theme_BaseDialog) {

  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    setContentView(R.layout.dialog_channel_custom)
  }

  override fun initData() {

  }

  override fun initView() {
    setMaxWidth(percent = 0.8f)

    binding.btnSave.setOnClickListener {
      val url = binding.editUrl.text.toString()

      if (url.isBlank()) {
        "请输入地址".showToast()
        return@setOnClickListener
      }

      SPKeyConstants.CHANNEL_CONFIG_URL.put(url)
      "保存成功".showToast()
    }

    binding.btnReset.setOnClickListener {
      SPKeyConstants.CHANNEL_CONFIG_URL.remove()
      "重置成功".showToast()
    }
  }
}