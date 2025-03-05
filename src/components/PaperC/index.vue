<!-- eslint-disable no-unused-vars -->
<!-- eslint-disable no-unused-vars -->

<template>
  <div class="paper" ref="paperDiv">
    <div class="panelHead"></div>
    <div id="paperPanel" class="panelBody" ref="problemListPanel">
      <el-menu class="el-menu-demo" mode="horizontal" @select="handleSelectProType">
        <el-menu-item index="1">选择题</el-menu-item>
        <el-menu-item index="2">判断题</el-menu-item>
        <el-menu-item index="3">填空题</el-menu-item>
        <el-menu-item index="4">编程题</el-menu-item>
      </el-menu>
      <div id="problemListPanel" @scroll="handleScroll">
        <div class="proItem" v-for="proItem in proList" :key="proItem.id">
          <!-- <template v-if="showProType.indexOf(proItem.type) >= 0"> -->

          <template>
            <el-card class="box-card">
              <div slot="header" class="clearfix" :id="'proTitle_' + proItem.id">
                <svg :id="'title-svg-' + proItem.id" width="800" height="150"
                  :style="'position: absolute; display: inline-block; margin-right: 8px;opacity:' + (proItem.isExp ? '0' : '1')">
                </svg>
                <div class="title-svg" :ref="'title-svg-' + proItem.id"
                  style="display: inline-block; margin-right: 8px"></div>
                <span>{{ proItem.title }}</span>
                <el-button style="float: right; padding: 3px 0" type="text"
                  @click="click_ProDel(proItem.id)">删除</el-button>
                <el-button style="float: right; padding: 3px 0" type="text" @click="proItem.isExp = !proItem.isExp">
                  {{ proItem.isExp ? '收缩' : '展开' }}
                </el-button>
              </div>
              <!-- <div v-for="o in 4" :key="o" class="text item"> -->
              <div v-show="proItem.isExp" v-html="proItem.content"></div>
              <!-- </div> -->
            </el-card>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as d3 from 'd3'
import { onMounted, ref } from 'vue';
import filenames from "@/utils/fileName";
import domtoimage from 'dom-to-image';
// import TestJson from "@/assets/json/case2_fin.json";
// import TestRelJson from "@/assets/json/case2_fin_rel.json";
// import tools from "@/utils/tools1.js";
import conRelJson from "@/assets/json/conceptsRel.json";
import conJson from "@/assets/json/concepts.json";
import tools from "@/utils/tools.js";
export default {
  props: ["toolsState"],
  data() {
    return {
      data: '',
      paperHeight: 0,
      allPapers: "",
      proIdList: [],
      paperProIds: [],
      proList: [],
      paperSelectedData: '',
      showProType: ['MULTIPLE_CHOICE'],
      toolAddRel: false,
      toolAddRelMain: false,
      toolDelRel: false,
      detailsEntPro: [],
      SelectingStudentId: "",
      SelectingConId: "",
      SelectingProId: "",
      groupData: [],
      SelectStudentList: [],
      problemsData: [],
      proSetOriData: [],
      submissionsData: [],
      maxSetCon: 0,
      studentsData: [],
      conceptsData: [],
      conceptTree: [],
      proSetData: [],
      interY: 10,
      problemConceptData: [],
      createdProblemConceptData: [],
      userProblemData: [],
      proMaxMinDR: [],
      proMaxMinDC: [],
      proAttrList: [],
      proAttrMaxMinList: [],
      conMaxMinDR: [],
      conMaxMinDC: [],
      conAttrList: [],
      conAttrMaxMinList: [],
      Ent_problem: [],
      Ent_concept: [],
      entG: "",
      entSetG: "",
      entbySetG: "",
      relG: "",
      frontG: "",
      curProblemId: '',
      curConceptId: '',
      curProblemSetId: '',
      selectProblemId: '',
      selectConceptId: '',
      proX: 450,
      proY: 30,
      setWidth: 300,
      setX: 830,
      setY: 30,
      treeX: 50,
      treeY: 30,
      proStepY: 0,
      conStepY: 0,
      rootSvg: null,
      groupsSvg: null,
      arcG: null,
      curEntId: '',
      minDImportance: 0,
      maxDImportance: 0,
      minDRelevance: 0,
      maxDRelevance: 0,
      maxDDuration: 0,
      maxTotalDuration: 0,
      videoDuration: 672,
      totalDuration: 1000,
      importanceColor_linear: null,
      importanceCompute_color: null,
      relevanceScale_linear: null,
      paperGTransformK: 1,
      paperGTransformX: 10,
      paperGTransformY: 10,
      paperSvgScale: 1,
      graphGTransformK: 1,
      graphGTransformX: 1,
      graphGTransformY: 1,
      graphG: '',
      relG: '',
      conceptsRels: conRelJson,
      colorMap:["rgb(252, 80, 108)",
        "rgb(92, 106, 255)",
        "rgb(6, 215, 160)",
        "rgb(255, 115, 76)",
        "rgb(126, 98, 207)",
        "rgb(253, 114, 213)",
        "rgb(112, 213, 252)",
        "rgb(255, 154, 33)",
        "rgb(83,155,255)",
        "rgb(50,200,120)",
        "rgb(2,50,200)",
        "rgb(0,122,244)",
        "rgb(150,122,244)",
        "rgb(168,168,255)",
        "rgb(200,200,200)",],
      concepts: conJson,
      proConLi: [],
      sTranY:0,
      tTranY:0,
    };
  },

  watch: {
    sTranY(){
      this.updateRel();
    },
    tTranY(){
      this.updateRel();
    },
    type(val) {
    },
    toolAddRel(val) {
    },
    allPapers(val) {
      const _this = this;
      let idList = [];
      for (let i = 0; i < val.length; i++) {
        if (val[i]['Selected']) {
          for (let t = 0; t < 4; t++) {
            let tp = `type${t}`;
            for (let d = 0; d < val[i][tp].length; d++) {
              idList.push(val[i][tp][d])
            }
          }
          _this.proIdList = idList;
          break;
        }
      }
    },
    paperSelectedData(val) {
      const _this = this;
      let idList = [];
      // for (let i = 0; i < val.length; i++) {
      //   if (val[i]['Selected']) {
      for (let t = 0; t < 4; t++) {
        let tp = `type${t}`;
        for (let d = 0; d < val[tp].length; d++) {
          idList.push(val[tp][d] + "")
        }
      }
      _this.proIdList = idList;
      // console.log("paper",val,idList)
      // let proLi  = ['1568086661408161792']
      // let conNet = tools.generateConceptStats(proLi);
      // console.log('net',conNet);
      // _this.$bus.$emit("proConNet", conNet);
    },
    toolsState: {
      deep: true,
      handler(val) {
        this.toolAddRel = val['addRel'];
        this.toolAddRelMain = val['addRelMain'];
        this.toolDelRel = val['delRel'];
      }
    },
    proIdList(val) {
      const _this = this;
      _this.$bus.$emit("proIdList", val);
      _this.getProById(val);
    },
    paperProIds(val) {
      this.getProById(val);
    },
    proList(val) {
      let proLi = Array.from(val).map(pro => (pro['id']));
      let conNet = tools.generateConceptStats(proLi);
      console.log('pro;o', conNet)
      this.proConLi = conNet[2]
      this.$bus.$emit("proConNet", conNet);
      this.updatePaper();
    }
  },
  methods: {
    handleScroll(val){
      this.sTranY = val.target.scrollTop;
    },
    drawSVG() {
      const _this = this;
      let width = this.$refs.problemListPanel.offsetWidth;
      let height = this.$refs.problemListPanel.offsetHeight;
      // let color = _this.mcolor;
      // let colorMap = _this.colorMap;
      d3.select("#paperPanel").selectAll("svg").remove();
      var svg = d3.select("#paperPanel").append("svg")
        .attr("id", "paperSvg")
        .attr("width", 500)
        .attr("height", height).attr("transform", `translate(${width - 500},100)`);;;
      var defs = svg.append("defs");

      let relG = svg.append("g").attr("id", "relG").attr("width", width).attr("height", height);
      let graphG = svg.append("g").attr("id", "paperG").attr("width", width).attr("height", height);



      // let consG = groups.append("g").attr("id", "consG").attr("width", width).attr("height", 900)
      //   // .attr("transform", `translate(${width - 300},0)`);;
      // let netG = svg.append("g").attr("id", "netRootG").attr("width", width - 0).attr("height", 900)
      //     .attr("transform", `translate(${0},0)`);
      // // let graphG = graphs.append("g").attr("id", "relG").attr("width", width).attr("height", height);
      // let rootRelG = groups.append("g").attr("id", "rootRelG").attr("width", width).attr("height", height)
      //   .attr("transform", `translate(0,900)`);;
      // let graphG = groups.append("g").attr("id", "graphG").attr("width", width).attr("height", height)
      //   .attr("transform", `translate(0,900)`);;

      // this.rootG = groups;
      // this.netG = netG;
      this.graphG = graphG;
      this.relG = relG;
      // this.rootRelG = rootRelG;
      // this.consG = consG;

      let graphGTransformX = _this.graphGTransformX;
      let graphGTransformY = _this.graphGTransformY;
      let graphGTransformK = _this.graphGTransformK;
      let stx = 0;
      let sty = 0;
      let stk = 1;
      var graphZoom = d3.zoom()
        .scaleExtent([0, 10])
        .on("start", (e) => {
          sty = e.transform.y;
          stx = e.transform.x;
          stk = e.transform.k;
        })
        .on('zoom', (e) => {
          graphGTransformX = _this.graphGTransformX// + e.transform.x - stx;
          graphGTransformY = _this.graphGTransformY + e.transform.y - sty;
          graphGTransformK = _this.graphGTransformK// + e.transform.k - stk;

          _this.tTranY = graphGTransformY;
          graphG.attr('transform', 'translate(' + (graphGTransformX) + ',' + (graphGTransformY) + ') scale(' + (graphGTransformK) + ')')
        })
        .on('end', (e) => {
          _this.graphGTransformX = graphGTransformX;
          _this.graphGTransformY = graphGTransformY;
          _this.graphGTransformK = graphGTransformK;
          graphG.attr('transform', 'translate(' + (graphGTransformX) + ',' + (graphGTransformY) + ') scale(' + (graphGTransformK) + ')')
        });
      svg.call(graphZoom)
      _this.updateConTree();
    },
    getElementPosition(element) {
      if (element) {
        const svg = element.ownerSVGElement;
        const point = svg.createSVGPoint();
        const ctm = element.getCTM();

        // 获取元素中心点
        const bbox = element.getBBox();
        point.x = bbox.x + bbox.width / 2;
        point.y = bbox.y + bbox.height / 2;

        // 转换为全局坐标
        return point.matrixTransform(ctm);
      }
    },
    updateRel() {
      const _this = this;
      let relG = _this.relG;
      let topH = 100;
      // let relData = this.rootRels;
      // let idList = this.selectIds;
      let tranY = this.tTranY;
      d3.selectAll(`.paperConline`).remove();
      this.proList.forEach(proItem => {
        // let proItem = this.proList[0];
        let conLi = this.proConLi.find(p => { return p.proId == proItem.id })['concepts'];
        let sourceName = `proTitle_${proItem['id']}`;
        let sourceEle = document.getElementById(sourceName);
        let sourceG = document.getElementById(sourceName);
        if (sourceG) {
          // console.log('sds',sourceG,sourceName)
          let sBbox = sourceG.getBoundingClientRect();;
          conLi.forEach(pc => {
            let targetName = `ConsText_${pc}`;
            let targetEle = document.getElementById(targetName);
            // let sourceP = _this.getElementPosition(sourceEle);
            // let targetP = _this.getElementPosition(targetEle);
            // console.log('sp', sourceEle, targetEle, sBbox, tBbox)

            let targetG = document.getElementById(`${targetName}`);
            // console.log('yes',sourceName)
            let tBbox = targetG.getBBox();
            const lineGenerator = d3.line()
              .curve(d3.curveBasis); // 使用贝塞尔曲线
            let stroke = 'rgba(200,200,200,.5)';
            let width = 1;
            let idName = `paperConline_${sourceName}_${targetName}`;
            let updown = 1;
            let sx = 10//sourceP.x//0//parseFloat(sBbox.x + sBbox.width / 2 + parseFloat(0)) + 1;//
            let sy = parseFloat(sBbox.y + parseFloat(0) - sBbox.height*3);//
            let tx = parseFloat(tBbox.x + parseFloat(0));//
            let ty = parseFloat(tBbox.y + parseFloat(0) + tBbox.height / 2+tranY );//
            let cx1 = 230;
            let cy1 = sy;
            let cx2 = 240 - Math.abs(ty-sy)/30;
            let cy2 = (ty + sy) / 2;
            let cx3 = 250 - Math.abs(ty-sy)/30;
            let cy3 = ty;
            const pathData = lineGenerator([[sx, sy],[cx1,cy1],[cx2,cy2],[cx3,cy3], [tx, ty]]);
            tools.drawLine(relG, pathData, stroke, width, "", idName, "paperConline");
            // }
            // else{
            //   console.log('not',sourceName)
            // }
          })
        }
        // break
      })

    },
    updateConTree() {
      const _this = this;
      let width = this.$refs.problemListPanel.offsetWidth;
      let height = this.$refs.problemListPanel.offsetHeight;
      let graphG = this.graphG;
      let concepts = this.concepts;
      let gapY = 25;
      concepts.forEach((cons, idx) => {
        let x = 470 - cons['layout'] * 50;
        let y = (idx + 1) * gapY;
        let r = 10;
        let fill = this.colorMap[parseInt(cons['id'].split("-")[0])];
        let opacity = .5;
        let stroke = 'white';
        let width = 1;
        let idName = `consCircle ${cons['id']}`
        let circle = tools.drawCircle(graphG, x, y, r, fill, opacity, stroke, width, `ConsCircle`, idName);
        circle.datum({ originalX: x, originalY: y, id: cons['id'] }) // 使用datum存储数据
        // .call(dragHandler)
        let tx = x - r * 2;
        let ty = y + r;
        let txts = cons['name'];
        tools.drawTxt(graphG, tx, ty, txts, "grey", 18, `ConsText_${cons['id']}`, "end");//属性文字
      });
    },
    updatePro() {

      let concepts = this.concepts;
      this.proList.forEach(proItem => {
        const refName = `#title-svg-${proItem.id}`;
        const svg = d3.select(refName);
        let conLi = this.proConLi.find(p => { return p.proId == proItem.id })['concepts']
        let indx = 0;
        let px = 10;
        conLi.forEach((con) => {
          let x = px;
          let y = 50;
          let r = 10;
          let h = 25;
          let rx = 1;
          let fill = this.colorMap[parseInt(con.split("-")[0])];
          let opacity = .5;
          let stroke = 'grey';
          let width = 1;
          let idName = `paperConsTag_${proItem.id}_${con}`;
          let tx = x;
          let ty = y+20;
          let oriCon = concepts.find((c)=>{return c.id == con})
          let txts =  oriCon['name']
          let text = tools.drawTxt(svg, tx, ty, txts, fill, 18, `paperConsTagText_${proItem.id}_${con}`, "start");//属性文字
          let textG = document.getElementById(`paperConsTagText_${proItem.id}_${con}`);
            // console.log('yes',sourceName)
            // let tBbox = textG.getBBox();
          console.log(textG.getBBox())
          let w = textG.getBBox().width;
          px+=w+10;
          let rect = tools.drawRect(svg, x, y, w, h, rx, fill, 1, stroke, opacity, idName, 'paperConsTag', '0')
          tools.drawTxt(svg, tx, ty, txts, 'grey', 18, `paperConsTagText_${proItem.id}_${con}`, "start");//属性文字
          // let circle = tools.drawCircle(svg, x, y, r, fill, opacity, stroke, width, `paperConsCircle`, idName);
        })
        this.updateRel();

      });
    },
    getProById(proIds) {
      let pro = '';
      const _this = this;
      this.$http
        .get("/api/problem/problemById", { params: { proIds: proIds } }, {})
        .then((response) => {
          pro = response.body;
          _this.proList = pro.map((p, idx) => { return { ...p, order: idx, isExp: false } });
          // _this.updatePro();
        });

      return pro;
    },
    click_ProDel(val) {
      const _this = this;
      _this.proIdList.splice(_this.proIdList.indexOf(val), 1);
      // _this.$bus.$emit("proIdDelList", val);
    },
    handleSelectProType(val) {
      const _this = this;
      if (val == '1') {
        _this.showProType = ['MULTIPLE_CHOICE'];
      }
      if (val == '2') {
        _this.showProType = ['TRUE_OR_FALSE'];
      }
      if (val == '3') {
        _this.showProType = ['FILL_IN_THE_BLANK'];
      }
      if (val == '4') {
        _this.showProType = ['CODE_COMPLETION', 'PROGRAMMING'];
      }
    },
    updatePaper() {
      const _this = this;
      let proList = _this.proList;
      for (let i = 0; i < proList.length; i++) {
        proList[i].content = proList[i].content.toString().replaceAll("\n", "<br></br>");
      }
      this.$nextTick(() => {
        _this.updatePro();
      });
    },

    click_Ent(time) {
      this.$emit("timeDur", time);
    },
  },
  created() {
    var _this = this;
    let margin = _this.margin
    this.$nextTick(() => {
      _this.drawSVG();
    });
  },
  mounted() {
    const _this = this;

    d3.select(".chartTooltip").classed("hidden", true);
    // _this.proIdList = ["1701115978840051712", "1697260400746143744"];

    this.$bus.$on('ConceptTree', (val) => {
      _this.conceptTree = val;
    });
    this.$bus.$on('proIdList', (val) => {
      _this.proIdList = val;
    });
    this.$bus.$on('paperProIds', (val) => {
      _this.paperProIds = val;
    });
    this.$bus.$on('paperSelected', (val) => {
      _this.paperSelectedData = val;
    });
    // this.$refs.movepaperLeft.addEventListener("mouseover", _this.movepaperLeft); // 监听点击事件

  },
  beforeDestroy() {
    clearInterval(this.moveTimer);
  }
} 
</script>

<style>
@import './index.css';
</style>
