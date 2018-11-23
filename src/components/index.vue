<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="#/" class="router-link-active">首页</a> &gt;
                <a href="#/site/goodslist" class="router-link-exact-active router-link-active">购物商城</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper">
                <div class="wrap-box">
                    <!-- 分类 -->
                    <div class="left-220" style="margin: 0px;">
                        <div class="banner-nav">
                            <ul>
                                <li v-for="(item) in catelist" :key="item.id">
                                    <h3>
                                        <i class="iconfont icon-arrow-right"></i>
                                        <span>{{item.title}}</span>
                                        <p>
                                            <span v-for="(it) in item.subcates" :key="it.id">
                                                {{it.title}}&nbsp;
                                            </span>

                                        </p>
                                    </h3>
                                    <div class="item-box">
                                        <dl>
                                            <dt>
                                                <a href="/goods/40.html">{{item.title}}</a>
                                            </dt>
                                            <dd>
                                                <a v-for="(it) in item.subcates" :key="it.id" href="/goods/43.html">{{it.title}}</a>
                                            </dd>
                                        </dl>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--幻灯片-->
                    <div class="left-705">
                        <div class="banner-img">
                            <!-- 使用element-ui实现轮播图 -->
                            <el-carousel height="341px">
                                <el-carousel-item v-for="item in sliderlist" :key="item.id">
                                        <img :src="item.img_url" alt="">
                                </el-carousel-item>
                            </el-carousel>
                        </div>
                    </div>
                    <!--/幻灯片-->
                    <!-- 热卖 -->
                    <div class="left-220">
                        <ul class="side-img-list">
                            <li v-for="(item, index) in toplist" :key="item.id">
                                <div class="img-box">
                                    <label>{{index+1}}</label>
                                    <img :src="item.img_url">
                                </div>
                                <div class="txt-box">
                                    <a href="/goods/show-98.html">{{item.title}}</a>
                                    <!-- 过滤器过滤 -->
                                    <span>{{item.add_time | shortTime }}</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="section" v-for="(item) in groupList" :key="item.level1cateid">
            <div class="main-tit">
                <h2>{{item.catetitle}}</h2>
                <p>
                    <a v-for="(it) in item.level2catelist" :key="it.subcateid" href="/goods/43.html">{{it.subcatetitle}}</a>
                    <a href="/goods/40.html">更多
                        <i>+</i>
                    </a>
                </p>
            </div>
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <ul class="img-list">
                        <li v-for="(it) in item.datas" :key="it.artID">
                            <router-link :to="'/detail/'+it.artID">
                                <div class="img-box">
                                    <img :src="it.img_url">
                                </div>
                                <div class="info">
                                    <h3>{{it.artTitle}}</h3>
                                    <p class="price">
                                        <b>{{it.sell_price}}</b>元</p>
                                    <p>
                                        <strong>库存 {{it.stock_quantity}}</strong>
                                        <span>市场价：
                                            <s>{{it.market_price}}</s>
                                        </span>
                                    </p>
                                </div>
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

// 暴露出去
export default {
  name: "index",
  data: function() {
    return {
      // 分类
      catelist: [],
      // 轮播
      sliderlist: [],
      // 置顶
      toplist: [],

     // 底部数据
      groupList:[]
    };
  },
  //   生命周期函数
  created() {
    this.$axios
      .get("http://111.230.232.110:8899/site/goods/gettopdata/goods")
      .then(result => {
        // console.log(result);
        this.catelist = result.data.message.catelist;
        // 轮播
        this.sliderlist = result.data.message.sliderlist;
        // 置顶
        this.toplist = result.data.message.toplist;
      });

    
    this.$axios
      .get("http://111.230.232.110:8899/site/goods/getgoodsgroup")
      .then(result => {
         // console.log(result);
        this.groupList = result.data.message;
      });  
  },

  
};
</script>
<style >
/* 覆盖轮播图图片大小 */
.banner-img img{
    width: 100%;
    height: 100%;
}
</style>