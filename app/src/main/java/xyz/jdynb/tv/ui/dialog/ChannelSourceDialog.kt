package xyz.jdynb.tv.ui.dialog

import android.content.Context
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.Button
import android.widget.TextView
import android.widget.Toast
import androidx.core.view.forEach
import com.drake.brv.utils.bindingAdapter
import com.drake.brv.utils.dividerSpace
import com.drake.brv.utils.setup
import com.drake.engine.base.EngineDialog
import com.drake.engine.dialog.setMaxWidth
import xyz.jdynb.tv.R
import xyz.jdynb.tv.constants.SPKeyConstants
import xyz.jdynb.tv.databinding.DialogChannelSourceBinding
import xyz.jdynb.tv.model.LiveChannelModel
import xyz.jdynb.tv.model.LiveChannelTypeModel
import xyz.jdynb.tv.utils.SpUtils.get
import xyz.jdynb.tv.utils.SpUtils.getRequired
import xyz.jdynb.tv.utils.SpUtils.put
import xyz.jdynb.tv.utils.showToast

class ChannelSourceDialog(
  context: Context,
  private val currentChannelModel: LiveChannelModel
) : EngineDialog<DialogChannelSourceBinding>(context, R.style.ChannelDialogStyle) {

  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    setContentView(R.layout.dialog_channel_source)
  }

  var onChannelChange: ((LiveChannelModel) -> Unit)? = null

  override fun initData() {
    Log.i("ChannelSourceDialog", "initData: $currentChannelModel")

    val playTimeoutDuration = SPKeyConstants.PLAY_TIMEOUT_DURATION.getRequired<Long>(8000L)
    when (playTimeoutDuration) {
      0L -> binding.btnCloseAuto.isSelected = true
      5000L -> binding.btnTime1.isSelected = true
      8000L -> binding.btnTime2.isSelected = true
      10000L -> binding.btnTime3.isSelected = true
    }
  }

  override fun initView() {

    currentChannelModel.children.forEach {
      it.isSelected = false
    }

    binding.tvTitle.text = currentChannelModel.channelType + " " + currentChannelModel.channelName

    binding.rvType.dividerSpace(30).setup {
      singleMode = true
      addType<LiveChannelModel>(R.layout.item_list_channel)

      onChecked { position, checked, allChecked ->
        val model = getModel<LiveChannelModel>(position)
        model.isSelected = checked
      }

      R.id.tv_channel.onClick {
        val model = getModel<LiveChannelModel>()
        setChecked(modelPosition, true)
        modelPosition.put("channel_config_${currentChannelModel.channelType}", currentChannelModel.channelName)
        onChannelChange?.invoke(model)
        dismiss()
      }
    }.models = currentChannelModel.children.toMutableList()

    val index = "channel_config_${currentChannelModel.channelType}".get<Int>(
      currentChannelModel.channelName,
      0
    ) ?: 0

    if (currentChannelModel.children.isNotEmpty()) {
      binding.rvType.bindingAdapter.setChecked(index, true)
      binding.rvType.post {
        binding.rvType.getChildAt(index).requestFocus()
      }
    }

    binding.btnCloseAuto.setOnClickListener {
      it.setTimeoutDuration(0)
    }

    binding.btnTime1.setOnClickListener {
      it.setTimeoutDuration(5000)
    }

    binding.btnTime2.setOnClickListener {
      it.setTimeoutDuration(8000)
    }

    binding.btnTime3.setOnClickListener {
      it.setTimeoutDuration(10000)
    }
  }

  private fun View.setTimeoutDuration(duration: Long) {
    binding.playTimeout.forEach { it.isSelected = false }
    isSelected = true
    SPKeyConstants.PLAY_TIMEOUT_DURATION.put(duration)
    if (duration == 0L) {
      "已关闭超时播放自动换源".showToast()
      return
    }
    "已设置超时播放自动换源为${duration / 1000}秒".showToast()
  }
}