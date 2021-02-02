<template>
  <div class="container">
    <form action="/">
      <van-search v-model="value" show-action placeholder="请输入你要搜索的内容" @search="onSearch" @cancel="onCancel" />
    </form>
     <div class="info">
        <div class="item row j-b a-c" @click="InfoDetail(item.id)" v-for="(item,index) in list" :key="index">
          <div class="textWrap col j-b">
            <div class="tltle">{{item.title}}</div>
            <div class="date">{{item.updatetime | moment}}</div>
          </div>
          <div class="imgWrapper row f-w" v-if="item.img.length">
            <img class="comImg" :src="itemImg" alt="" v-for="(itemImg,indexImg) in item.img.slice(0, 1)" :key="indexImg">
          </div>
        </div>
        <noMessage :noinfoShow="noinfoShow" />
      </div>
    <div class="btm row j-c a-c" @click="jion" :style="{'background-color':color}">申请加入公示人员/机构</div>
  </div>

</template>
<script type="text/ecmascript-6">
// import { Toast } from 'vant';
import { articaList } from 'api/index'
import noMessage from 'components/noMessage/noMessage'
export default {
  data() {
    return {
      value: '',
      list: [],
      noinfoShow: false,
      finishedtext: '',
      dropdown: false,
      loading: false,
      finished: true,
      page: 1,
      size: 10,
      key: '',
      count: '',
      color: localStorage.getItem("color")


    }
  },
  mounted() {




  },
  methods: {
    // 分页
    onLoad() {
      setTimeout(() => {

        this._articaList(this.key)

        // 加载状态结束
        this.loading = false;
        if (this.list.length >= this.count) {
          this.finished = true;
        }

      }, 1000);

    },
    _articaList(key) {
      articaList({
        key: key,
        page: this.page,
        size: this.size
      }).then(res => {
        console.log('列表', res)
        this.list = this.list.concat(res.data.list)
        this.count = res.data.count
        this.page = res.data.page
        if (this.count == 0) {
          this.noinfoShow = true
          this.finishedtext = ''
        } else {
          this.noinfoShow = false
          this.finishedtext = '没有更多数据了'
        }
      })
    },
    //搜索
    onSearch(val) {
      this.loadState()
      console.log(val);
      this.key = val
      this._articaList(val)
    },
    onCancel() {
      // Toast('取消');
    },
    // 清除下拉加载状态
    loadState() {
      this.list = []
      this.page = 1
      this.finished = false
      this.loading = false

    },
    jion() {
      this.$router.push({
        path: './jion'
      })

    },
    InfoDetail(id) {
      this.$router.push({
        path: './InfoDetail',
        query: {
          id: id,
        }
      })
    }

  },
  components: {
    noMessage

  }
}
</script>
<style scoped lang="stylus">
.van-search__content
  height 39px
  border-radius 10px
  display flex
  flex-direction row
  align-items center
.container
  position absolute
  background-color #ffffff
  top 0px
  width 100%
  height 100%
  bottom 0
  .info
    background-color #ffffff
    .item
      margin 25px 20px 
      padding-bottom 25px
      border-bottom 1px solid #eaeaea
      .textWrap
       height 150px
       .date
          color #919191
          font-size 28px
          margin-top 5px
       .tltle
          color #252525
          font-size 32px
          overflow hidden
          display -webkit-box
          -webkit-box-orient vertical
          -webkit-line-clamp 2
          text-overflow ellipsis
      .imgWrapper
        width 200px
        height 150px
        overflow hidden
        display block
        margin-left 20px
        flex-shrink 0
        .comImg
          width 100%
          min-height 150px
          -o-object-fit cover
  .btm
    position fixed
    bottom 15px
    background-color #5aa967
    width 690px
    height 90px
    border-radius 10px
    color #ffffff
    left 50%
    transform translate(-50%, 0%)
</style>