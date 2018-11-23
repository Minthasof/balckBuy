<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a> &gt;
                <a href="/goods/42/1.html">商品详情</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <div class="left-925">
                        <div class="goods-box clearfix">
                            <div class="pic-box"></div>
                            <div class="goods-spec" >
                                <h1>{{goodsinfo.title}}</h1>
                                <p class="subtitle">{{goodsinfo.sub_title}}</p>
                                <div class="spec-box">
                                    <dl>
                                        <dt>货号</dt>
                                        <dd id="commodityGoodsNo">{{goodsinfo.goods_no}}</dd>
                                    </dl>
                                    <dl>
                                        <dt>市场价</dt>
                                        <dd>
                                            <s id="commodityMarketPrice">¥{{goodsinfo.market_price}}</s>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>销售价</dt>
                                        <dd>
                                            <em id="commoditySellPrice" class="price">¥{{goodsinfo.sell_price}}</em>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="spec-box">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>
                                            <div class="stock-box">
                                                
                                                    <el-input-number v-model="buyNum" @change="handleChange" :min="1" :max="goodsinfo.stock_quantity" label="描述文字"></el-input-number>
                                                    <!-- <span role="button" class="el-input-number__decrease is-disabled">
                                                        <i class="el-icon-minus"></i>
                                                    </span>
                                                    <span role="button" class="el-input-number__increase">
                                                        <i class="el-icon-plus"></i>
                                                    </span> -->
                                                    <!-- <div class="el-input el-input--small"> -->
                                                        <!---->
                                                        <!-- <input autocomplete="off" size="small" type="text" rows="2" max="60" min="1" validateevent="true" class="el-input__inner" role="spinbutton" aria-valuemax="60" aria-valuemin="1" aria-valuenow="1" aria-disabled="false"> -->
                                                        <!---->
                                                        <!---->
                                                        <!---->
                                                    <!-- </div> -->
                                                
                                            </div>
                                            <span class="stock-txt">
                                                库存
                                                <em id="commodityStockNum">{{goodsinfo.stock_quantity}}</em>件
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>
                                            <div id="buyButton" class="btn-buy">
                                                <button onclick="cartAdd(this,'/',1,'/shopping.html');" class="buy">立即购买</button>
                                                <button onclick="cartAdd(this,'/',0,'/cart.html');" class="add">加入购物车</button>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div id="goodsTabs" class="goods-tab bg-wrap">
                             <Affix>
                            <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                                <ul>
                                    <li>
                                        <a href="javascript:;" @click="tabIndex=0" :class="{selected:tabIndex==0}">商品介绍</a>
                                    </li>
                                    <li>
                                        <a href="javascript:;" @click="tabIndex=1" :class="{selected:tabIndex==0}">商品评论</a>
                                    </li>
                                </ul>
                            </div>
                            </Affix>
                            <div class="tab-content entry" v-html="goodsinfo.content" v-show="tabIndex==0">
                                内容
                            </div>
                            <div class="tab-content" v-show="tabIndex==1">
                                <div class="comment-box">
                                    <div id="commentForm" name="commentForm" class="form-box">
                                        <div class="avatar-box">
                                            <i class="iconfont icon-user-full"></i>
                                        </div>
                                        <div class="conn-box">
                                            <div class="editor">
                                                <textarea id="txtContent" name="txtContent" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
                                                <span class="Validform_checktip"></span>
                                            </div>
                                            <div class="subcon">
                                                <input id="btnSubmit" name="submit" type="submit" value="提交评论" class="submit">
                                                <span class="Validform_checktip"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <ul id="commentList" class="list-box">
                                       <!-- 判断是否有评论 -->
                                        <p v-show="totalcount==0" style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);">暂无评论，快来抢沙发吧！</p>
                                        <!-- 评论内容 -->
                                        <li  v-for="(item) in comments" :key="item.id">
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span>{{item.user_name}}</span>
                                                    <span>{{item.add_time | shortTime}}</span>
                                                </div>
                                                <p>{{item.content}}</p>
                                            </div>
                                        </li>
                                        
                                    </ul>
                                    <div class="page-box" style="margin: 5px 0px 0px 62px;">
                                        <Page :total="totalcount" show-sizer show-elevator 
                                        placement="top"
                                        @on-change="pageChange"
                                        @on-page-size-change="pageChan"
                                        :page-size-opts="[6,8,12]" 
                                        :page-size="pageSize"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="left-220">
                        <div class="bg-wrap nobg">
                            <div class="sidebar-box">
                                <h4>推荐商品</h4>
                                <ul class="side-img-list">
                                    <li v-for="(item) in hotgoodslist" :key="item.id">
                                        <div class="img-box">
                                            <router-link :to="'/detail/'+item.id">
                                                <img :src="item.img_url">
                                            </router-link>
                                        </div>
                                        <div class="txt-box">
                                            <router-link :to="'/detail/'+item.id">{{item.title}}</router-link>
                                            <span>{{item.add_time | shortTime}}</span>
                                        </div>
                                    </li>

                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <BackTop></BackTop>
    </div>
</template>
<script>
    export default {
        name: "detail",
        data:function(){
            return{
             // 商品id
      artID: "",
      // 服务器返回的商品数据
      // 商品详情
      goodsinfo: {},
      //   热卖商品
      hotgoodslist: [],
      //   图片列表
      imglist: [],
      // 购买数量
      buyNum:1,
      // 记录点击的tab栏索引
      tabIndex:0,

      pageIndex:1,
      pageSize:6,

      comments:[],

      totalcount:0

            }
        },
        methods:{
            initData() {
      // 初始化购买个数
      this.buyNum = 1;
      // 保存数据
      this.artID = this.$route.params.artID;
      // 调用接口 获取 详情数据 axios
      this.$axios
        .get(
          `http://111.230.232.110:8899/site/goods/getgoodsinfo/${this.artID}`
        )
        .then(result => {
          // console.log(result);
          // 商品详情
          this.goodsinfo = result.data.message.goodsinfo;
          //   热卖商品
          this.hotgoodslist = result.data.message.hotgoodslist;
          //   图片列表
          this.imglist = result.data.message.imglist;
        });

        // 调取页码
        this.getCommnents();

    },
    getCommnents(){
      // 获取评论
        this.$axios
        .get(
          `http://111.230.232.110:8899/site/comment/getbypage/goods/${this.artID}?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`
        )
        .then(result=>{
         this.comments=result.data.message;
         this.totalcount=result.data.totalcount;
        // console.log(result)   
        })
    },

       pageChange(pageIndex){
            this.getCommnents()
            this.pageIndex=pageIndex
        }
        },
       pageChan(pageSize){
           this.getCommnents()
           this.pageSize=pageSize
       },

        created() {
            this.initData();
        },
        watch: {
        $route(newVal, oldVal) { 
      //   console.log('数据变了');
      // 重新获取数据即可
      //   this.created();
      // 初始化数据
      this.initData();
      }
      }
   
    }
</script>
<style >
 .tab-content img{
     display: block;
     max-width: 100%;
 }

</style>