package xyz.jdynb.tv.utils

import android.view.MotionEvent
import android.view.View
import android.view.animation.AccelerateInterpolator
import android.view.animation.DecelerateInterpolator
import android.view.animation.OvershootInterpolator

/**
 * 滑动辅助类
 */
class SlideTouchHelper(
  /**
   * 需要滑动的视图
   */
  private val container: View,
  /**
   * 滑动距离，超过此距离将触发滑动操作
   */
  private val distance: Int = SLIDE_DISTANCE,
  /**
   * 滑动阈值，超过此阈值将锁定滑动方向
   */
  private val threshold: Int = SLIDE_THRESHOLD
) {

  companion object {

    /**
     * 滑动距离，超过此距离将触发滑动操作
     */
    private const val SLIDE_DISTANCE = 200

    /**
     * 滑动阈值，超过此阈值将锁定滑动方向
     */
    private const val SLIDE_THRESHOLD = 100

  }

  /**
   * 滑动方向
   */
  sealed class SlideDirection {
    /**
     * 上滑
     */
    object Up : SlideDirection()
    /**
     * 下滑
     */
    object Down : SlideDirection()
    /**
     * 左滑
     */
    object Left : SlideDirection()
    /**
     * 右滑
     */
    object Right : SlideDirection()
  }

  /**
   * 滑动滚动方向
   */
  sealed class SlideScrollDirection {
    /**
     * 垂直滑动
     */
    object Vertical : SlideScrollDirection()
    /**
     * 水平滑动
     */
    object Horizontal : SlideScrollDirection()
  }

  interface OnSlideListener {
    /**
     * 滑动位置改变时触发
     *
     * @param x X 轴位移
     * @param y Y 轴位移
     */
    fun onSlideChange(x: Float, y: Float)
    /**
     * 滑动结束时触发
     *
     * @param direction 滑动方向
     */
    fun onSlided(direction: SlideDirection)
  }

  /**
   * 滑动监听器
   */
  var onSlideListener: OnSlideListener? = null

  /**
   * 按下时的 Y 轴坐标
   */
  private var downY = 0f
  /**
   * 按下时的 X 轴坐标
   */
  private var downX = 0f
  /**
   * 移动时的 Y 轴坐标
   */
  private var moveY = 0f
  /**
   * 移动时的 X 轴坐标
   */
  private var moveX = 0f
  /**
   * 是否正在滑动
   */
  private var isSliding = false
  /**
   * 滑动方向
   */
  private var slideDirection: SlideScrollDirection? = null // "vertical" 或 "horizontal"

  /**
   * 处理触摸事件
   *
   * @param event 触摸事件
   */
  fun onTouchEvent(event: MotionEvent) {
    val action = event.action
    when (action) {
      MotionEvent.ACTION_DOWN -> {
        downY = event.y
        downX = event.x
        moveY = 0f
        moveX = 0f
        isSliding = false
        slideDirection = null
      }

      MotionEvent.ACTION_MOVE -> {
        val currentMoveX = event.x - downX
        val currentMoveY = event.y - downY

        // 如果还未锁定方向，判断是否达到滑动阈值
        if (!isSliding) {
          val absMoveX = kotlin.math.abs(currentMoveX)
          val absMoveY = kotlin.math.abs(currentMoveY)

          // 当任一方向达到阈值时，锁定滑动方向
          if (absMoveX > SLIDE_THRESHOLD || absMoveY > SLIDE_THRESHOLD) {
            isSliding = true
            // 哪个方向的绝对值大就锁定哪个方向
            slideDirection =
              if (absMoveY > absMoveX) SlideScrollDirection.Vertical else SlideScrollDirection.Horizontal
          }
        }

        // 根据锁定的方向更新位移
        if (isSliding) {
          when (slideDirection) {
            SlideScrollDirection.Vertical -> {
              // 垂直滑动：只更新 Y 轴
              moveY = currentMoveY
              moveX = 0f
              container.translationY = moveY
              container.translationX = 0f
              onSlideListener?.onSlideChange(0f, moveY)
            }

            SlideScrollDirection.Horizontal -> {
              // 水平滑动：只更新 X 轴
              moveX = currentMoveX
              moveY = 0f
              container.translationX = moveX
              container.translationY = 0f
              onSlideListener?.onSlideChange(moveX, 0f)
            }

            else -> {}
          }
        }
      }

      MotionEvent.ACTION_UP -> {
        if (isSliding) {
          // 根据锁定的方向执行对应操作
          when (slideDirection) {
            SlideScrollDirection.Vertical -> {
              // 垂直滑动
              if (moveY > SLIDE_DISTANCE) {
                // 下滑 - 触发右侧按钮（下一个频道）
                onSlideListener?.onSlided(SlideDirection.Down)
                performSlideAnimation(SlideDirection.Down)
              } else if (moveY < -SLIDE_DISTANCE) {
                // 上滑 - 触发左侧按钮（上一个频道）
                onSlideListener?.onSlided(SlideDirection.Up)
                performSlideAnimation(SlideDirection.Up)
              } else {
                // 滑动距离不足，恢复原位
                restoreFragmentPosition()
              }
            }

            SlideScrollDirection.Horizontal -> {
              // 水平滑动
              if (moveX > SLIDE_DISTANCE) {
                // 右滑 - 左方向操作
                performSlideAnimation(SlideDirection.Right) {
                  onSlideListener?.onSlided(SlideDirection.Right)
                }
              } else if (moveX < -SLIDE_DISTANCE) {
                // 左滑 - 右方向操作
                performSlideAnimation(SlideDirection.Left) {
                  onSlideListener?.onSlided(SlideDirection.Left)
                }
              } else {
                // 滑动距离不足，恢复原位
                restoreFragmentPosition()
              }
            }

            else -> {}
          }
        } else {
          // 未达到滑动阈值，视为点击事件，不处理
          restoreFragmentPosition()
        }
      }

      MotionEvent.ACTION_CANCEL -> {
        restoreFragmentPosition()
        isSliding = false
        slideDirection = null
      }
    }
  }

  /**
   * 执行滑动动画
   *
   * @param direction "up" | "down" | "left" | "right" 滑动方向
   * @param onComplete 动画中途（彻底滑出后）执行的回调，用于切换内容
   */
  private fun performSlideAnimation(direction: SlideDirection, onComplete: (() -> Unit)? = null) {

    val fragmentWidth = container.width.toFloat()
    val fragmentHeight = container.height.toFloat()

    var endX = 0f
    var endY = 0f
    var enterX = 0f
    var enterY = 0f

    when (direction) {
      SlideDirection.Up -> {
        endY = -fragmentHeight
        enterY = fragmentHeight
      }

      SlideDirection.Down -> {
        endY = fragmentHeight
        enterY = -fragmentHeight
      }

      SlideDirection.Left -> {
        endX = -fragmentWidth
        enterX = fragmentWidth
      }

      SlideDirection.Right -> {
        endX = fragmentWidth
        enterX = -fragmentWidth
      }
    }

    // 第一阶段：平稳滑出
    container.animate()
      .translationX(endX)
      .translationY(endY)
      .alpha(0.3f)
      .setDuration(250)
      .setInterpolator(AccelerateInterpolator())
      .withEndAction {
        // 在彻底滑出后执行内容切换
        onComplete?.invoke()

        onSlideListener?.onSlideChange(enterX, enterY)

        // 移到另一侧准备滑入
        container.translationX = enterX
        container.translationY = enterY

        // 第二阶段：平稳滑入
        container.animate()
          .translationX(0f)
          .translationY(0f)
          .alpha(1f)
          .setDuration(300)
          .setInterpolator(DecelerateInterpolator())
          .start()
      }
      .start()
  }

  /**
   * 恢复 container 到原始位置（用于滑动距离不足时）
   */
  private fun restoreFragmentPosition() {
    container.animate()
      .translationX(0f)
      .translationY(0f)
      .alpha(1f)
      .setDuration(400)
      .setInterpolator(OvershootInterpolator(1.2f)) // 弹性回弹更自然
      .start()
  }
}