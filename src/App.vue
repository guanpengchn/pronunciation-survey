<template>
<v-app id="app">
    <v-container class="container">
      <template v-if="isWelcome">
        <v-card class="card" color="lighten-1">
          <span class="main-title" v-html='$t("first.title")'></span>
          <span class="sub-title" v-html='$t("first.subTitle")'></span>
          <template v-if="isLogin">
            <v-btn @click="welcome" color="success">{{ $t("first.start") }}</v-btn>
          </template>
          <template v-else>
            <v-progress-circular :class="{hide: !isCode}" color="green" indeterminate></v-progress-circular>
            <v-btn :class="{hide: isCode}" @click="login" color="success">
              <svg
                class="icon"
                height="24"
                style="margin-right:10px;"
                viewBox="0 0 1024 1024"
                width="24"
              >
                <path
                  d="M0 524.992q0 166.016 95.488 298.496t247.488 185.504q6.016 0.992 10.016 0.992t6.496-1.504 4-3.008 2.016-4.992 0.512-4.992v-100.512q-36.992 4-66.016-0.512t-45.504-14.016-28.992-23.488-16.992-25.504-8.992-24-5.504-14.496q-8.992-15.008-27.008-27.488t-27.008-20-2.016-14.496q50.016-26.016 112.992 66.016 34.016 51.008 119.008 30.016 10.016-40.992 40-70.016Q293.984 736 237.984 670.976t-56-158.016q0-87.008 55.008-151.008-22.016-64.992 6.016-136.992 28.992-2.016 64.992 11.488t50.496 23.008 25.504 17.504q56.992-16 128.512-16t129.504 16q12.992-8.992 28.992-19.008t48.992-21.504 60.992-9.504q27.008 71.008 7.008 135.008 56 64 56 151.008 0 92.992-56.992 158.496t-172 85.504q43.008 43.008 43.008 104v128.992q0 0.992 0.992 3.008 0 6.016 0.512 8.992t4.512 6.016 12 3.008q152.992-52 250.496-185.504t97.504-300.512q0-104-40.512-199.008t-108.992-163.488-163.488-108.992T512.032 12.96 313.024 53.472 149.536 162.464t-108.992 163.488-40.512 199.008z"
                  fill="white"
                ></path>
              </svg>
              {{ $t("first.login") }}
            </v-btn>
          </template>
        </v-card>
      </template>
      <template v-else-if="isOver">
        <v-card class="card" color="lighten-1">
          <span class="main-title">{{ $t("last.title") }}</span>
          <span class="sub-title" v-html='$t("last.subTitle")'></span>
        </v-card>
      </template>
      <template v-else>
        <v-card class="card" color="lighten-1">
          <div class="word">
            <p>{{words[page - 1].word}}</p>
          </div>
          <v-progress-circular
            :class="{hide: !isTime}"
            :rotate="-90"
            :size="75"
            :value="totalTime"
            :width="15"
            color="primary"
          >{{ reverseTime }}</v-progress-circular>
          <div :class="{hidden: isTime}">
            <div :key="'btn' + j" class="symbol" v-for="(url,j) in words[page - 1].origin">
              <a @click="display('audio-' + j)" href="#">
                <svg
                  class="icon"
                  height="24"
                  style="margin:4px 8px 0 0;"
                  viewBox="0 0 1024 1024"
                  width="24"
                >
                  <path
                    d="M529.1 901.6c-2.7 0-12.1-4.1-17-9l-0.3-0.3-230.4-190.1H96.1c-8.9 0-18.3-4.6-22.7-9-4.4-4.4-9-13.8-9-22.7v-319c0-7 2.7-12.9 4.4-14.6H71l2.4-2.4c4.4-4.4 13.8-9 22.7-9h185.3l230.4-195.8 0.2-0.2c5.8-5.8 12.9-7 17.8-7 4.4 0 8.9 1 12.6 2.9l0.5 0.3 0.5 0.2c12.5 4.2 17.2 11.3 17.2 26.4v717.8c0 15.1-4.7 22.3-17.2 26.4l-1.8 0.6-1.4 1.4c-3 3-5.6 3.1-11.1 3.1z m279.1-79.7c-9.9 0-23.1-5.1-26.9-12.6-9-18-5.8-36.4 7.9-46.1 4.8-2 11.6-7.2 20.3-15.6 8.9-8.7 22.4-23.7 36.2-45.7 23-36.8 50.4-99.7 50.4-190.9s-29-154.2-53.3-191.1c-14.5-22-28.8-37-38.2-45.6-6.6-6.1-14.9-13-21-15.5-12.6-9.1-17-31.4-8.9-44.5 9.4-9.1 20.6-14.3 30.8-14.3 5.4 0 10.4 1.4 14.8 4.2 0.7 0.6 1.6 1.3 3 2.4 29.4 23.1 54.9 51.4 75.8 84.1 40.1 62.9 60.5 137 60.5 220.3 0 83.7-19.7 158.1-58.4 221.1-20.1 32.7-44.5 60.9-72.6 83.6-1.7 1.4-2.6 2.1-3.3 2.8-3.4 3.4-13.3 3.4-17.1 3.4zM688.6 696.6c-8.3 0-22.6-9.7-26.9-18.3l-0.2-0.5-0.3-0.4c-8.2-12.4 0.8-30.4 14.5-39.7 6.4-3.4 60.9-35.5 60.9-132.3 0-46.5-18-78.4-33.2-97-16.5-20.2-33.1-29.4-33.7-29.8l-0.6-0.3-0.7-0.2c-5.8-1.9-11.4-8.5-14.3-16.8-2.9-8.3-2.3-16.6 1.4-22.2l0.6-0.9 0.3-1c2.9-8.6 15.6-16.1 27.3-16.1 4.5 0 8.6 1.1 11.7 3.2l2.1 1.4h1.5c4.5 1.7 29.1 14 53.5 41.9 21.7 24.9 47.6 68.1 47.6 132.2 0 72.9-24.5 120.2-45 147.1-22.6 29.5-45.6 42.2-50.4 44.1h-2.4l-2.4 2.4c-3.2 3-5.7 3.2-11.3 3.2z"
                    fill="gray"
                    p-id="5407"
                  ></path>
                </svg>
              </a>
              <span style="line-height:24px;">{{ words[page - 1].symbol[j] }}</span>
              
              <audio
                :id="'audio-' + j"
                :src="url"
                class="hide"
                controls="controls"
                controlslist="nodownload"
              ></audio>
            </div>
            <v-radio-group
              :class="{hide: page - 1 !== i}"
              :key="'radio-' + i"
              @change="nextPage()"
              style="flex: 0 1 auto;"
              v-for="(word,i) in words"
              v-model="answers[i]"
            >
              <v-radio :label='$t("radio.yes")' :value='$t("radio.yes")'></v-radio>
              <v-radio :label='$t("radio.no")' :value='$t("radio.no")'></v-radio>
              <v-radio :label='$t("radio.never")' :value='$t("radio.never")'></v-radio>
            </v-radio-group>
          </div>
        </v-card>
        <div class="mobile-submit">
          <v-btn :disabled="submitDisabled" @click="submit" color="success">{{ $t("submit") }}</v-btn>
        </div>
        <div class="footer ma-3">
          <v-pagination :disabled="pageDisabled" :length="10" v-model="page"></v-pagination>
          <v-btn :disabled="submitDisabled" @click="submit" color="success">{{ $t("submit") }}</v-btn>
        </div>
      </template>
    </v-container>
  </v-app>
</template>

<script>
import { getRepoContent, createComment } from '@/api'
import {
  b64ToUtf8,
  queryParse,
  axiosJSON
} from '@/utils/helper'
import { clientId, clientSecret, ACCESS_TOKEN, PROXY, LANG } from '@/config'

export default {
  data() {
    return {
      repoName: 'awesome-pronunciation',
      filename: 'db.json',
      alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ_',
      words: [],
      page: 1,
      answers: [],
      submitDisabled: true,
      pageDisabled: true,
      isLogin: false,
      isWelcome: true,
      isOver: false,
      isTime: true,
      isCode: false,
      totalTime: 0,
      reverseTime: 2,
      interval: {}
    }
  },
  created() {
    const query = queryParse()
    if (query.lang) {
      this.$i18n.locale = query.lang
      localStorage.setItem(LANG, query.lang)
    }
    if (query.code) {
      this.isCode = true
      const code = query.code
      axiosJSON
        .post(PROXY, {
          code,
          client_id: clientId,
          client_secret: clientSecret
        })
        .then(res => {
          if (res.data && res.data.access_token) {
            const accessToken = res.data.access_token
            localStorage.setItem(ACCESS_TOKEN, accessToken)
            window.location.href = `/`
          } else {
            // no access_token
            console.log('res.data err:', res.data)
          }
        })
        .catch(err => {
          console.log('err: ', err)
        })
    } else if (localStorage.getItem(ACCESS_TOKEN)) {
      this.isCode = false
      this.isLogin = true
      getRepoContent(this.repoName, this.filename).then(item => {
        let content = JSON.parse(b64ToUtf8(item.content))
        this.getWords(content)
        this.pageDisabled = false
      })
    } else {
      this.isCode = false
      this.isLogin = false
      this.pageDisabled = true
    }
  },
  methods: {
    getWords: function(content) {
      while (this.words.length < 10) {
        const first = this.getRandom(this.alphabet.length)
        const firstStr = this.alphabet[first]
        const second = this.getRandom(content[firstStr].length)
        this.words.push(content[firstStr][second])
        this.words = [...new Set(this.words)]
      }
      for (const i of this.words) {
        const length = i.origin.length
        i.origin = []
        for (let j = 0; j < length; j++) {
          const wordUrl = encodeURIComponent(i.word.replace('.', 'dot-'))
          if (length === 1) {
            i.origin.push(
              `https://guanpengchn.github.io/awesome-pronunciation/audio/${wordUrl}.mp3`
            )
          } else {
            i.origin.push(
              `https://guanpengchn.github.io/awesome-pronunciation/audio/${wordUrl}-${j}.mp3`
            )
          }
        }
      }
    },
    getRandom(nums) {
      return Math.floor(Math.random() * nums)
    },
    display(id) {
      const audio = document.getElementById(id)
      audio.play()
    },
    submit() {
      this.submitDisabled = true
      let comment = ''
      for (const i in this.answers) {
        comment += `- ${this.words[i].word}:${this.answers[i]}\n`
      }
      createComment(comment).then(res => {
        if ('id' in res) {
          this.isOver = true
        }
      })
    },
    nextPage() {
      setTimeout(() => {
        if (this.page !== 10) {
          this.isTime = true
          this.totalTime = 0
          this.reverseTime = 2
          this.page++
          this.countDown()
        }
        if (this.answers.length != 10) {
          this.submitDisabled = true
          return
        }
        for (const i of this.answers) {
          if (i !== this.$t('radio.yes') && i !== this.$t('radio.no') && i !== this.$t('radio.never')) {
            this.submitDisabled = true
            return
          }
        }
        this.submitDisabled = false
      }, 200)
    },
    login() {
      // window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=public_repo&redirect_uri=https://guanpengchn.github.io/#/question`
      window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=public_repo`
    },
    countDown() {
      this.interval = setInterval(() => {
        if (this.totalTime === 100) {
          this.isTime = false
          this.display('audio-0')
          clearInterval(this.interval)
          return
        }
        this.totalTime += 50
        this.reverseTime--
      }, 800)
    },
    welcome() {
      this.isWelcome = false
      this.countDown()
    }
  }
}
</script>

<style scoped>
.container {
  width: 100vw;
  height: 100vh;
}
.footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.card {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 80vh;
  background-color: ghostwhite;
}
.word {
  display: flex;
  justify-content: center;
  align-items: center;
  /* min-width: 88px; */
}
.word p {
  font-size:30px;
  color: #1976d2;
}
.symbol {
  display: flex;
  justify-content: center;
  align-items: center;
  /* min-width: 88px; */
}
.stress {
  color: #3692d9;
  font-weight: 500;
  margin-top: 10px;
}
.Grid {
  display: flex;
  flex-wrap: wrap;
}
.Grid-cell {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
}
.mobile-submit {
  display: none;
}
.hide {
  display: none;
}
.time {
  font-size: 28px;
  color: #1976d2;
}
.hidden {
  visibility: hidden;
  position: absolute;
}
.card .main-title {
  font-size: 30px;
  font-weight: 400;
}
.card .sub-title {
  font-size: 15px;
  text-align: center;
  margin-bottom: 10px;
}
@media only screen and (max-width: 720px) {
  .container {
    padding: 0px;
  }
  .Grid-cell {
    flex: auto;
  }
  .footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .card {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;
    height: 100vh;
    padding: 20px;
  }
  .mobile-submit {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    bottom: 10vh;
    width: 100%;
  }
}
</style>

