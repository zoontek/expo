package expo.modules.core

import android.content.Context
import android.util.Log

import org.apache.commons.io.IOUtils
import org.json.JSONObject

import java.io.FileNotFoundException
import java.nio.charset.StandardCharsets

object AppConfig {
  private val TAG = AppConfig::class.java.simpleName
  private const val CONFIG_FILE_NAME = "app.config"

  private var configString: String? = null
  private var configJSON: JSONObject? = null

  private fun getStringImpl(context: Context): String? {
    if (configString == null) {
      try {
        context.assets.open(CONFIG_FILE_NAME).use {
            stream ->
          configString = IOUtils.toString(stream, StandardCharsets.UTF_8)
        }
      } catch (e: FileNotFoundException) {
        // do nothing, expected in managed apps
      } catch (e: Exception) {
        Log.e(TAG, "Error reading embedded app config", e)
      }
    }

    return configString
  }

  private fun getJSONImpl(context: Context): JSONObject? {
    if (configJSON == null) {
      val config = getStringImpl(context)

      if (!config.isNullOrEmpty()) {
        try {
          configJSON = JSONObject(config)
        } catch (e: Exception) {
          Log.e(TAG, "Error parsing embedded app config", e)
        }
      }
    }

    return configJSON
  }

  @JvmStatic
  fun getString(context: Context): String? = getStringImpl(context)

  @JvmStatic
  fun getJSON(context: Context): JSONObject? = getJSONImpl(context)
}
