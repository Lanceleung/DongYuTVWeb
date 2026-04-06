pluginManagement {
  repositories {
    google {
      content {
        includeGroupByRegex("com\\.android.*")
        includeGroupByRegex("com\\.google.*")
        includeGroupByRegex("androidx.*")
      }
    }
    mavenCentral()
    gradlePluginPortal()
  }
}
dependencyResolutionManagement {
  repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
  repositories {
    mavenCentral()
    google()
    maven {
      setUrl("https://jitpack.io")
    }
    maven { setUrl("https://artifact.bytedance.com/repository/releases/") }
    maven { setUrl("https://maven.aliyun.com/nexus/content/groups/public/") }
    maven { setUrl("https://maven.aliyun.com/nexus/content/repositories/jcenter") }
    maven { setUrl("https://s01.oss.sonatype.org/content/groups/public") }
    maven {
      setUrl("https://maven.mozilla.org/maven2/")
    }
  }
}

rootProject.name = "DongYuTvWeb"
include(":app")
include(":easydanmaku")
