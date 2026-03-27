package xyz.jdynb.tv.utils

import android.app.Activity
import android.content.Context
import android.content.ContextWrapper
import android.content.Intent
import android.os.Bundle
import android.os.Parcelable
import android.widget.Toast
import androidx.core.os.bundleOf
import androidx.fragment.app.Fragment
import kotlinx.serialization.json.Json
import kotlinx.serialization.Serializable
import xyz.jdynb.tv.DongYuTVApplication

fun String?.showToast(duration: Int = Toast.LENGTH_SHORT) {
  this ?: return
  Toast.makeText(DongYuTVApplication.context, this, duration).show()
}

/**
 * 开启 activity
 * @param args 传递的参数
 */
inline fun <reified T> startActivity(vararg args: Pair<String, Any>) {
  val context = DongYuTVApplication.context
  context.startActivity(Intent(context, T::class.java).apply {
    addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
    args.forEach {
      when (val second = it.second) {
        is String -> putExtra(it.first, second)
        is Int -> putExtra(it.first, second)
        is Long -> putExtra(it.first, second)
        is Float -> putExtra(it.first, second)
        is Parcelable -> putExtra(it.first, second)
      }
    }
  })
}

inline fun <reified T> startActivity(noinline block: (Intent.() -> Unit)? = null) {
  val context = DongYuTVApplication.context
  context.startActivity(Intent(context, T::class.java).also { intent ->
    intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
    block?.let {
      intent.it()
    }
  })
}

fun Any?.toBundle(): Bundle {
  return this?.javaClass?.let { clazz ->
    val fields = clazz.declaredFields
    val bundle = bundleOf()
    fields.forEach {  field ->
      field.isAccessible = true
      val name = field.name
      when (val value = field.get(this)) {
        is String -> bundle.putString(name, value)
        is Int -> bundle.putInt(name, value)
        is Boolean -> bundle.putBoolean(name, value)
      }
    }
    bundle
  } ?: Bundle.EMPTY
}

fun Any?.toArray(): Array<Pair<String, Any>> {
  return this?.javaClass?.let { clazz ->
    val fields = clazz.declaredFields
    val list = mutableListOf<Pair<String, Any>>()
    fields.forEach {  field ->
      field.isAccessible = true
      val name = field.name
      val value = field.get(this)
      if (value is Map<*, *>) {
        value.forEach {
          if (it.value != null) {
            list.add((it.key as String) to it.value!!)
          }
        }
      } else {
        if (value != null) {
          list.add(name to value)
        }
      }
    }
    list.toTypedArray()
  } ?: arrayOf()
}

inline fun <reified T> Bundle.toObj(): T? {
  val objClass = T::class.java
  val obj = objClass.getDeclaredConstructor().newInstance()
  objClass.declaredFields.forEach {
    it.isAccessible = true
    val value = get(it.name)
    it.set(obj, value)
  }
  return obj
}

/**
 * Bundle 中添加序列化参数
 */
inline fun <reified T : @Serializable Any> Bundle.putSerializable(key: String, value: T) {
  val jsonString = Json.encodeToString(value)
  putString(key, jsonString)
}

inline fun <reified T : @Serializable Any> Intent.putSerializable(key: String, value: T) {
  putExtra(key, Json.encodeToString(value))
}

/**
 * Bundle 中获取序列化参数
 */
inline fun <reified T : @Serializable Any> Bundle.getSerializableForKey(key: String): T? {
  val jsonString = getString(key) ?: return null
  return Json.decodeFromString<T>(jsonString)
}


/**
* Fragment 中添加序列化参数
*/
inline fun <reified T : @Serializable Any> Fragment.setSerializableArguments(
  key: String,
  value: T
) {
  arguments = (arguments ?: Bundle()).apply {
    putSerializable(key, value)
  }
}

/**
 * Fragment 中获取序列化参数
 */
inline fun <reified T : @Serializable Any> Fragment.getSerializableArguments(key: String): T? {
  return arguments?.getSerializableForKey(key)
}

/**
 * Context 转 activity
 */
fun Context.activity(): Activity? {
  if (this is Activity) {
    return this
  } else if (this is ContextWrapper) {
    return this.baseContext.activity()
  }
  return null
}

