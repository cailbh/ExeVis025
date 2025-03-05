<!-- eslint-disable no-unused-vars -->
<!-- eslint-disable no-unused-vars -->

<template>
  <div class="indexGraph" ref="indexGraphDiv">
    <div class="panelHead">知识点参数</div>
    <div id="indexGraph" class="panelBody" ref="indexDev">

      <!-- <el-button type="primary" @click="onSubmit">Create</el-button> -->
    </div>
  </div>
  <!-- <div id="moveLeft" ref="moveindexGraphLeft"></div>
                    <div id="moveRight" ref="moveindexGraphRight"></div> -->
  <!-- <div id="assistindexGraphPanel" class="panel">
        <div class="panelHead"></div>
      </div> -->
  <!-- <div id="zoomInDiv" @click="zoomInLayoutClk">
      <img class="icons" :src="zoomInUrl">
    </div>
    <div id="zoomOutDiv" @click="zoomOutLayoutClk">
      <img class="icons" :src="zoomOutUrl">
    </div>
    <div id="editToolDiv" @click="editToolClk">
      <img class="icons" :src="editToolUrl">
    </div>
</div> -->
</template>

<script>
// import { param } from 'server/api';
import * as d3 from 'd3'
import { onMounted, ref } from 'vue';
import filenames from "@/utils/fileName";
import domtoimage from 'dom-to-image';
// import TestJson from "@/assets/json/case2_fin.json";
// import TestRelJson from "@/assets/json/case2_fin_rel.json";
import tools from "@/utils/tools.js";
import drawTools from "@/utils/drawingTools.js";
import conJson from "@/assets/json/concepts.json";
import conTreeJson from "@/assets/json/conceptTree.json";
import conRelJson from "@/assets/json/conceptsRel.json";
export default {
  props: ["toolsState"],
  data() {
    return {
      conceptTree: conTreeJson,
      delConceptTree: '',
      concepts: conJson,
      conceptsRels: conRelJson,
      contentTreeData: [{
        id: "1",
        name: '基本数据类型',
        layout: 0,
        father: -1,
        indexValue: 0,
        son: [{
          id: "1-1",
          name: "整型",
          layout: 1,
          father: "1",
          indexValue: 0,
          son: []
        }, {
          id: "1-2",
          name: "浮点型",
          layout: 1,
          father: "1",
          indexValue: 0,
          son: []
        }, {
          id: "1-3",
          name: "字符型",
          layout: 1,
          father: "1",
          indexValue: 0,
          son: [{
            id: "1-3-1",
            name: "ASCII码",
            layout: 2,
            father: "1-3",
            indexValue: 0,
            son: []
          }]
        }, {
          id: "1-4",
          name: "枚举型",
          layout: 1,
          father: "1",
          indexValue: 0,
          son: []
        }, {
          id: "1-5",
          name: "布尔型",
          layout: 1,
          father: "1",
          indexValue: 0,
          son: []
        }, {
          id: "1-6",
          name: "进制转换",
          layout: 1,
          father: "1",
          indexValue: 0,
          son: []
        }, {
          id: "1-7",
          name: "输入输出",
          layout: 1,
          father: "1",
          indexValue: 0,
          son: []
        }
        ]
      }, {
        id: "2",
        name: "表达式",
        layout: 0,
        father: "1",
        indexValue: 0,
        son: [{
          id: "2-1",
          name: "运算符",
          layout: 1,
          father: "2",
          indexValue: 0,
          son: [{
            id: "2-1-1",
            name: "算术运算符",
            layout: 2,
            father: "2-1",
            indexValue: 0,
            son: []
          }, {
            id: "2-1-2",
            name: "赋值运算符",
            layout: 2,
            father: "2-1",
            indexValue: 0,
            son: []
          }, {
            id: "2-1-3",
            name: "比较运算符",
            layout: 2,
            father: "2-1",
            indexValue: 0,
            son: []
          }, {
            id: "2-1-4",
            name: "逻辑运算符",
            layout: 2,
            father: "2-1",
            indexValue: 0,
            son: []
          }, {
            id: "2-1-5",
            name: "位运算符",
            layout: 2,
            father: "2-1",
            indexValue: 0,
            son: []
          }]
        },
        {
          id: "2-2",
          name: "优先级",
          layout: 1,
          father: "2",
          indexValue: 0,
          son: []
        }, {
          id: "2-3",
          name: "字符串",
          layout: 1,
          father: "2",
          indexValue: 0,
          son: []
        }, {
          id: "2-4",
          name: "类型转换",
          layout: 0,
          father: "2",
          indexValue: 0,
          son: []
        }, {
          id: "2-5",
          name: "转义字符",
          layout: 0,
          father: "2",
          indexValue: 0,
          son: []
        }, {
          id: "2-6",
          name: "格式控制符",
          layout: 0,
          father: "2",
          indexValue: 0,
          son: []
        }, {
          id: "2-7",
          name: "标识符",
          layout: 0,
          father: "2",
          indexValue: 0,
          son: []
        }, {
          id: "2-8",
          name: "注释",
          layout: 0,
          father: "2",
          indexValue: 0,
          son: []
        }, {
          id: "2-9",
          name: "条件表达式",
          layout: 0,
          father: "2",
          indexValue: 0,
          son: []
        }
        ]
      }, {
        id: "3",
        name: "分支控制",
        layout: 0,
        father: "-1",
        indexValue: 0,
        son: [{
          id: "3-1",
          name: "if-else",
          layout: 1,
          father: "3",
          indexValue: 0,
          son: []
        }, {
          id: "3-2",
          name: "switch",
          layout: 1,
          father: "3",
          indexValue: 0,
          son: []
        }]
      }, {
        id: "4",
        name: "循环控制",
        layout: 0,
        father: "-1",
        indexValue: 0,
        son: [{
          id: "4-1",
          name: "for循环",
          layout: 1,
          father: "4",
          indexValue: 0,
          son: []
        }, {
          id: "4-2",
          name: "while循环",
          layout: 1,
          father: "4",
          indexValue: 0,
          son: []
        }, {
          id: "4-3",
          name: "break/continue",
          layout: 1,
          father: "4",
          indexValue: 0,
          son: []
        }
        ]
      }, {
        id: "5",
        name: "函数与程序结构",
        layout: 0,
        father: "1",
        indexValue: 0,
        son: [{
          id: "5-1",
          name: "函数定义与调用",
          layout: 1,
          father: "5",
          indexValue: 0,
          son: []
        }, {
          id: "5-2",
          name: "函数定义与调用",
          layout: 1,
          father: "5",
          indexValue: 0,
          son: []
        }, {
          id: "5-3",
          name: "递归函数",
          layout: 1,
          father: "5",
          indexValue: 0,
          son: []
        }]
      }, {
        id: "6",
        name: "数组",
        layout: 0,
        father: "-1",
        indexValue: 0,
        son: [{
          id: "6-1",
          name: "一维数组",
          layout: 1,
          father: "6",
          indexValue: 0,
          son: []
        }, {
          id: "6-2",
          name: "二维数组",
          layout: 1,
          father: "6",
          indexValue: 0,
          son: []
        }, {
          id: "6-3",
          name: "字符串数组",
          layout: 1,
          father: "6",
          indexValue: 0,
          son: []
        }]
      }, {
        id: "7",
        name: "指针",
        layout: 0,
        father: "-1",
        indexValue: 0,
        son: []
      }, {
        id: "8",
        name: "结构体",
        layout: 0,
        father: "-1",
        indexValue: 0,
        son: [{
          id: "8-1",
          name: "结构体定义",
          layout: 1,
          father: "8",
          indexValue: 0,
          son: []
        }, {
          id: "8-2",
          name: "结构体数组",
          layout: 1,
          father: "8",
          indexValue: 0,
          son: []
        }]
      }
      ],
      selectedConcepts: [],
      rootG: '',
      graphG: '',
      rootRelG: '',
      consG: '',
      gapX: 50,
      currentNetData: [],
      proConNet: [],
      proConRels:[],
      edgeList: [],
      nodeList: [],
      curEdgeList: [],
      curNodeList: [],
      rootConData: [],
      maxDif: 5,
      maxNum: 50,
      netG: '',
      rootRels: [],
      rootConDatas: [],
      rootNumMax: 50,
      graphGTransformK: 1,
      graphGTransformX: 1,
      graphGTransformY: 1,
    };
  },

  watch: {
    type(val) {
    },
    proConNet(val) {
      this.delConsNet();
      // this.delRootConData();
    }
  },
  methods: {
    delConsNet() {
      let proConNet = this.proConNet;
      let proConRels = this.proConRels;
      const edgeList = [];
      let relWeightMax = 0;
      let rootRelMap = {};
      let rootConDatas = tools.deepClone(this.delConceptTree);
      proConNet.forEach(concept => {
        let conceptId = concept['conceptId'];

        let rootId = conceptId.split("-")[0];
        let rootConData = rootConDatas.find((c) => { return c['id'] == rootId });
        rootConData['deepI'] += concept['proNum'];
        // rootConData['dif']+=concept['difficulty'];

        concept.rel.forEach(relation => {
          let relRootId = relation['id'].split("-")[0];
          // console.log('rel',relation,relRootId,rootId,relRootId>rootId)
          if (relRootId != rootId) {
            let rootRelKey = relRootId < rootId ? `${relRootId}-${rootId}` : `${rootId}-${relRootId}`;
            if (!rootRelMap[rootRelKey]) {
              rootRelMap[rootRelKey] = relation.num;
            }
            else {
              rootRelMap[rootRelKey] += relation.num;
            }
          }


          if (relation.num > relWeightMax) { relWeightMax = relation.num; };
          edgeList.push({
            source: conceptId,
            target: relation.id,
            weight: relation.num,
          });
        });
      });
      const nodeList = Array.from(proConNet).map(con => ({ id: con['conceptId'], dif: con['difficulty'], num: con['proNum'],type:'con' }));
      const rootRels = Array.from(Object.keys(rootRelMap)).map((rel) => ({ source: rel.split("-")[0], target: rel.split("-")[1], weight: rootRelMap[rel] }));

      // proConRels.forEach(pro=>{
      //   nodeList.push({id:pro['proId'],type:'pro',order:pro['order']});
      //   pro['concepts'].forEach(pc=>{
      //     edgeList.push({
      //       source: pc,
      //       target: pro['proId'],
      //       weight: 1,
      //     })
      //   })
      // })

      this.nodeList = nodeList;
      this.edgeList = edgeList;
      this.curNodeList = nodeList;
      this.curEdgeList = edgeList;
      this.rootConDatas = rootConDatas;
      this.rootRels = rootRels;
      this.drawConsNet();
      this.drawRootCon();
    },

    drawRootConceptTree() {
      const _this = this;
      let width = this.$refs.indexDev.offsetWidth;
      let height = this.$refs.indexDev.offsetHeight;
      // let color = _this.mcolor;
      // let colorMap = _this.colorMap;
      d3.select("#indexGraph").selectAll("svg").remove();
      var svg = d3.select("#indexGraph").append("svg")
        .attr("id", "conDevTree")
        .attr("width", width)
        .attr("height", height);
      var defs = svg.append("defs");

      let groups = svg.append("g").attr("id", "groups").attr("width", width).attr("height", height);
      


      let consG = groups.append("g").attr("id", "consG").attr("width", width).attr("height", 900)
        // .attr("transform", `translate(${width - 300},0)`);;
      let netG = svg.append("g").attr("id", "netRootG").attr("width", width - 0).attr("height", 900)
          .attr("transform", `translate(${0},0)`);
      // let graphG = graphs.append("g").attr("id", "relG").attr("width", width).attr("height", height);
      let rootRelG = groups.append("g").attr("id", "rootRelG").attr("width", width).attr("height", height)
        .attr("transform", `translate(0,900)`);;
      let graphG = groups.append("g").attr("id", "graphG").attr("width", width).attr("height", height)
        .attr("transform", `translate(0,900)`);;
      const backArea = rootRelG.append("rect")
        .attr("x", 0).attr("y", 0)
        .attr("width", width).attr("height", height)
        .attr("fill", 'white')
      this.rootG = groups;
      this.netG = netG;
      this.graphG = graphG;
      this.rootRelG = rootRelG;
      // this.riverG = riverG;
      // this.matG = matG;
      this.consG = consG;
      
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

          consG.attr('transform', 'translate(' + (graphGTransformX) + ',' + (graphGTransformY) + ') scale(' + (graphGTransformK) + ')')
        })
        .on('end', (e) => {
          _this.graphGTransformX = graphGTransformX;
          _this.graphGTransformY = graphGTransformY;
          _this.graphGTransformK = graphGTransformK;
          consG.attr('transform', 'translate(' + (graphGTransformX) + ',' + (graphGTransformY) + ') scale(' + (graphGTransformK) + ')')
        });
        svg.call(graphZoom)
    },
    update() {
      const _this = this;

      let width = this.$refs.indexDev.offsetWidth;
      let height = this.$refs.indexDev.offsetHeight;

      let conceptTree = this.conceptTree;
      let concepts = this.concepts;
      let graphG = this.graphG;
      let consG = this.consG;
      let gapX = (width - 200) / (conceptTree.length + 1);
      let gapY = 26;
      let bottomH = 50;
      let topH = 150;
      // let maxBoxValue = 
      // let gapY = (height - bottomH - topH) / (Object.keys(yearsData[years[0]]).length + 2);
      // let rScale = d3.scaleLinear().domain([0, maxLeafValue]).range([2, 10]);
      // let hScale = d3.scaleLinear().domain([0, Math.pow(maxLeafValue, 1)]).range([20, height - bottomH - topH]);
      // let boxHScale = d3.scaleLinear().domain([0, Math.pow(maxBoxValue * 1.2, 1)]).range([0, (height - bottomH - topH)]);
      // this.riverG.attr("transform", `translate(0,${height - bottomH / 2 + 10})`);
      // const lineGenerator = d3.line()
      //   .curve(d3.curveBasis); // 使用贝塞尔曲线
      // 定义目标区域
      const targetArea = graphG.append("rect")
        .attr("x", 100).attr("y", 300)
        .attr("width", 800).attr("height", 950)
        .attr("opacity", 0)
      // .attr("fill", "lightgreen")
      // .attr("stroke", "darkgreen");

      const dragHandler = d3.drag()
        .on("start", function (event) {
          d3.select(this)
            .classed("dragging", true)
            .interrupt(); // 中断可能正在进行的动画
        })
        .on("drag", function (event) {
          // 更新圆形位置
          d3.select(this)
            .attr("cx", event.x)
            .attr("cy", event.y);
          // 检测是否进入目标区域 
          const targetBounds = targetArea.node().getBBox();
          const circlePos = {
            x: +d3.select(this).attr("cx"),
            y: +d3.select(this).attr("cy")
          };

          if (checkCollision(circlePos, targetBounds)) {
            handleAreaEnter(this);  // 进入区域触发
          } else {
            handleAreaLeave(this);  // 离开区域恢复
          }

        })
        .on("end", function (event) {
          // 检测是否进入目标区域 
          const targetBounds = targetArea.node().getBBox();
          const circlePos = {
            x: +d3.select(this).attr("cx"),
            y: +d3.select(this).attr("cy")
          };
          d3.select(this)
            .classed("dragging", false)
            // 添加回到原位的动画
            .transition()
            .duration(500)
            .ease(d3.easeCubicOut)
            .attr("cx", d => d.originalX)
            .attr("cy", d => d.originalY)
          // .on("end", function() {
          //   handleAreaLeave(this); // 确保离开状态
          // });


          if (checkCollision(circlePos, targetBounds)) {
            let arr = _this.selectedConcepts;
            let tsId = d3.select(this).attr("id").split(" ")[1];
            const newArray = [...new Set([...arr, tsId])];
            _this.selectedConcepts = newArray;
            _this.drawConsNet()
          } else {
            // handleAreaLeave(this);  // 离开区域恢复
          }
        });
      function checkCollision(circle, rect) {
        return circle.x + width - 300 > rect.x &&
          circle.x + width - 300 < rect.x + rect.width &&
          circle.y > rect.y &&
          circle.y < rect.y + rect.height;
      }

      // 区域进入/离开处理
      function handleAreaEnter(element) {
        d3.select(element)
          .attr("fill", "orange")
          .transition().duration(100)
          .attr("r", 15);
      }

      function handleAreaLeave(element) {
        d3.select(element)
          .attr("fill", "steelblue")
          .transition().duration(500)
          .attr("r", 10);
      }
      // concepts.forEach((cons, idx) => {
      //   let x = 10;
      //   let y = (idx + 1) * gapY;
      //   let r = 10;
      //   let fill = 'grey';
      //   let opacity = 1;
      //   let stroke = 'white';
      //   let width = 1;
      //   let idName = `consCircle ${cons['id']}`
      //   let circle = tools.drawCircle(consG, x, y, r, fill, opacity, stroke, width, `ConsCircle`, idName);
      //   circle.datum({ originalX: x, originalY: y, id: cons['id'] }) // 使用datum存储数据
      //     .call(dragHandler)
      //   let tx = x + r * 2;
      //   let ty = y + r;
      //   let txts = cons['name'];
      //   tools.drawTxt(consG, tx, ty, txts, "grey", 18, `ConsText_${idx}`, "left");//属性文字
      // });
      // this.drawConsNet();
      // this.drawRootCon();
    },
    updataRootRel() {
      const _this = this;
      let relG = _this.rootRelG;
      let topH = 100;
      let relData = this.rootRels;
      let idList = this.selectIds;
      let tranY = 0;
      d3.selectAll(`.rootConRel`).remove();
      d3.selectAll(".topRect").style("filter", "url()");
      let valueMax = Math.max.apply(Math, relData.map(function (d) { return d["weight"]; }));
      let wScale = d3.scaleLinear().domain([0, valueMax]).range([5, 25]);
      relData.forEach(rel => {
        let sourceName = `rootConCircle_${rel['source']}`;
        let targetName = `rootConCircle_${rel['target']}`;
        // if ((idList.indexOf(sourceName) != -1) || (idList.indexOf(targetName) != -1)) {
        let value = rel['weight'];
        let sourceG = document.getElementById(`${sourceName}`);
        let targetG = document.getElementById(`${targetName}`);
        const regex = /translate\(([^,]+),\s*([^)]+)\)/;
        let transformSO = (d3.select(`#${sourceName}`).attr('transform'));
        let transformTO = (d3.select(`#${targetName}`).attr('transform'));
        if (!transformTO) { transformTO = 'translate(0,0)'; }
        if (!transformSO) { transformSO = 'translate(0,0)'; }
        const transformS = transformSO.match(regex);
        const transformT = transformTO.match(regex);
        let sBbox = sourceG.getBBox();
        let tBbox = targetG.getBBox();
        const lineGenerator = d3.line()
          .curve(d3.curveBasis); // 使用贝塞尔曲线
        let stroke = 'rgba(200,200,200,.5)';
        let width = wScale(value);
        let idName = `line_${sourceName}_${targetName}`;
        let updown =  (parseInt(rel['source']) + parseInt(rel['target'])) % 2 == 0 ? -1 : 1;
        let sx = parseFloat(sBbox.x + sBbox.width / 2 + parseFloat(transformS[1])) + tranY;
        let sy = parseFloat(sBbox.y + parseFloat(transformS[2]) + sBbox.height / 2+updown*sBbox.height / 3);
        let tx = parseFloat(tBbox.x + parseFloat(transformT[1]) + tBbox.width / 2);
        let ty = parseFloat(tBbox.y + parseFloat(transformT[2]) + tBbox.height / 2+updown*tBbox.height / 3);
        let cx = (sx + tx) / 2;
        // let cy = (parseInt(rel['source']) + parseInt(rel['target'])) % 2 == 0 ? topH : (ty + sy + 20) / 2 + topH;
        let cy = (ty + sy)/2 + (updown) * topH;
        const pathData = lineGenerator([[sx, sy], [cx, cy], [tx, ty]]);
        tools.drawLine(relG, pathData, stroke, width, "", idName, "rootConRel");
        d3.select(`#${targetName}`).style("filter", "url(#coolShadow)")
        // }

      })
    },
    drawRootCon() {
      const _this = this;

      let width = this.$refs.indexDev.offsetWidth;
      let height = this.$refs.indexDev.offsetHeight;
      let graphG = this.graphG;
      d3.selectAll(`.rootConCircle`).remove();
      let conceptTree = this.conceptTree;
      let concepts = this.concepts;
      let consG = this.consG;
      let gapX = (width) / (conceptTree.length);
      let gapY = 26;
      let bottomH = 50;
      let topH = 150;

      let rootConDatas = this.rootConDatas;
      let rootRels = this.rootRels;
      let cFill = 'red';
      const dimensions = ['bandI', 'deepI', 'dif', 'num','maxDif'];
      // let maxValues = [10,10,5,10,5];
        // 计算最大值
      const maxValues = dimensions.reduce((acc, dim) => {
        acc[dim] = d3.max(rootConDatas, d => d[dim]);
        return acc;
      }, {});

      let rScale = d3.scaleLinear().domain([0, this.rootNumMax]).range([10, 15]);
      const color_linear = d3.scaleLinear().domain([0, _this.maxDif]).range([0, 1]);
      const Compute_color = d3.interpolate("#fff", cFill);

      rootConDatas.forEach((rootCon, idx) => {
        let x = (idx+0.5) * gapX;
        let y = topH;
        let r = 25//rScale(rootCon['num']);
        let fill = Compute_color(color_linear(rootCon['dif']/rootCon['num']));
        let opacity = 1;
        let stroke = 'white';
        let width = 1;
        let idName = `rootConCircle_${rootCon['id']}`;
        let tx = x;
        let ty = y+150;
        let txts = rootCon['name'];
        tools.drawTxt(graphG, tx, ty, txts, "grey", 18, `rootConText_${idx}`, "middle");//属性文字
        const radius = 50;
        // 创建角度比例尺
        const angleSlice = (2 * Math.PI) / dimensions.length;
        // 创建半径比例尺
        const rScales = [];
        dimensions.forEach((dim,idx) => {
            // if (dim == '')
              rScales.push(d3.scaleLinear()
                .domain([0, maxValues[dim]])
                .range([20, radius-5]))
        })
        
        // 绘制网格线
        const gridLevels = 5;
        for (let i = 0; i < gridLevels; i++) {
          const levelRadius = radius * (i + 1) / gridLevels;
          tools.drawCircle(graphG, x, y, levelRadius, "", 1, "", 0, `grid-circle`, `grid-circle-${idx}-${i}`);
        };
        // 绘制轴线
        dimensions.forEach((dim, i) => {
          const angle = i * angleSlice// - Math.PI / 2;
          // rcPoints.push([x - Math.sin(angleSlice * i) * cr, y + Math.cos(angleSlice * i) * cr])
          // 绘制轴线
          graphG.append("line")
            .attr("x1", x)
            .attr("y1", y)
            .attr("x2", x-Math.sin(angle) * radius)
            .attr("y2", y+Math.cos(angle) * radius)
            .attr("class", "axis-line");

          // // // 添加维度标签
          // graphG.append("text")
          //   .attr("x",  x-Math.sin(angle) *(radius + 15))
          //   .attr("y", y+Math.cos(angle) *(radius + 15))
          //   .text(dim)
          //   .attr("text-anchor", "middle")
          //   .attr("class", "axis-label");
          // 创建雷达图生成器
          // const radarLine = d3.lineRadial()
          //   .angle((d, i) => i * angleSlice - Math.PI / 2)
          //   .radius((d,i) => rScales[i](d.value))
          //   .curve(d3.curveLinearClosed);
          // 转换数据格式
          // const values =[];
          // dimensions.forEach(dim=>{
          //   if(dim == '')
          // })
          //  const values = dimensions.map(dim => ({
          //     axis: dim,
          //     value: rootCon[dim]
          //   }))
          //   console.log('vvvv',values)
            let rcPoints = [];
            dimensions.forEach((dim,i)=>{
              // if(dim == '')
              let cr = rScales[i](rootCon[dim]);
              rcPoints.push([x - Math.sin(angleSlice * i) * cr, y + Math.cos(angleSlice * i) * cr])
            })
            let rcIdName = `rootConPol_${idx}`;
            let rcFill = 'red';
            let rcClassName = 'rootConPol'
            let rootConPol = tools.drawPolygon(graphG, rcPoints, rcIdName,0.5, 0, 'red', rcFill,rcClassName); 
            
            let circle = tools.drawCircle(graphG, x, y, r, fill, opacity, stroke, width, `rootConCircle`, `rootConCircleIn_${idx}`);
            let circleB = tools.drawCircle(graphG, x, y, radius, fill, 0, stroke, width, `rootConCircle`, idName);
          // graphG.append("path")
          //   .attr("class", "radar-area")
          //   .attr("fill", "blue")
          //   .attr("d", d => radarLine(values))
          //   .attr("transform", `translate(${x},${y})`);;

        });

      });
      this.updataRootRel();
    },
    drawConsNet() {
      const _this = this;
      let psvg = this.netG
      let width = psvg.attr("width");
      let height = psvg.attr("height");
      psvg.select("#netGroups").remove();
      let groups = psvg.append("g").attr("id", "netGroups").attr("width", width).attr("height", height)

      let backG = groups.append("g").attr("id", "proRbackG").attr("width", width).attr("height", height);
      let arcG = groups.append("g").attr("id", "proRarcG").attr("width", width).attr("height", height);
      let relG = groups.append("g").attr("id", "proRrelG").attr("width", width).attr("height", height);
      let entG = groups.append("g").attr("id", "proRentG").attr("width", width).attr("height", height);
      let frontG = groups.append("g").attr("id", "proRfrontG").attr("width", width).attr("height", height);

      let problemConceptData = _this.relByPro;
      let conByPro = _this.conByPro;
      // let proRel = tools.deepClone(_this.problemRelByConcept);
      // let proInList = tools.deepClone(_this.problemListByConcept);
      let ent_edge = [];
      let ent_node = [];
      let addEgList = { '0_0': [], "0_1": [], "1_0": [], "1_1": [] };

      let relWeightMax = 10;

      ent_edge = this.edgeList;
      ent_node = this.nodeList;

      let svgWidth = width;
      let svgHeight = height;
      let relWeightScale = d3.scaleLinear().domain([0, relWeightMax]).range([1, 10]);
      var forceSimulationP = d3.forceSimulation()
        .force("link", d3.forceLink().id((d) => { return d.id }))
        .force("charge", d3.forceManyBody().strength(-10))
        .force("center", d3.forceCenter(svgWidth / 2, svgHeight / 2));
      forceSimulationP.nodes(ent_node)
        .on("tick");

      let disLinear = d3.scaleLinear().domain([0, 100]).range([svgWidth / 2, svgWidth / 2]);
      forceSimulationP.force("link")
        .links(ent_edge)
        .distance(disLinear(ent_node.length + ent_edge.length));

      let rSize = 10;
      const drags = () => {

        function dragstarted(event, d) {
          if (!event.active) forceSimulationP.alphaTarget(0.3).restart();
          d.fx = d.x;
          d.fy = d.y;
        }
        function dragged(event, d) {
          d.fx = event.x;
          d.fy = event.y;
          // d.rx = event.x;
          // d.ry = event.y;
        }

        function dragended(event, d) {
          if (!event.active) forceSimulationP.alphaTarget(0);
          d.fx = null;
          d.fy = null;
          // d.rx = event.x;
          // d.ry = event.y;
        }
        return d3.drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended);
      }
      var circle = frontG.selectAll('circle')
        .data(ent_node)
        .enter()
        .append("circle")
        .attr("id", function (d) { return `astConCir_${d.id}` })
        .attr("class", function (d) {
          return `c_${d.type}`
        })
        .attr("cx", function (d) {

          if (d.type == "pro") {
            _this.drawEntityProblem(entG, d.x, d.y, `astPro_${d.id}`);
            return d.order * 20
          }
          else if (d.type == "con")
            _this.drawEntityConcept(entG, d.x, d.y, `astCon_${d.id}`);
          return d.x;
        })
        .attr("cy", function (d) {
          if (d.type == "pro")
            return 120
          return d.y;
        })
        .attr("r", 25)
        .attr("opacity", "0")
        .call(drags())
        .on("click", function (d) {
        })
        .on("mousemove", function (d) {
          // 更新浮层内容
          // netTooltip.select(".name").text(clasN);
          // netTooltip.select(".text").text(nametext);
          // // 移除浮层hidden样式，展示浮层
          // netTooltip.classed("hidden", false);
        })
        .on("mouseleave", function (d) {

          _this.$bus.$emit("SelectingCon", '');
          _this.$bus.$emit("SelectingPro", '');

          d3.select(".netTooltip").classed("hidden", true);
        })
      // .call(drags());

      var path = relG.selectAll('.path')
        .data(ent_edge)
        .enter()
        .append('path')
        .attr("class", function (d) { return `"net_${d.type}-s-${d.source.id}-t-${d.target.id}` })
        .attr('d', function (d) {
          let eSource = d.source
          let eTarget = d.target
          let eSourceId = eSource['id']
          let eTargetId = eTarget['id']
          let startA = [eSource.x, eSource.y]
          let endA = [eTarget.x, eTarget.y]
          let path = d3.path()
          path.moveTo(startA[0], startA[1])
          path.quadraticCurveTo(startA[0], startA[1], endA[0], endA[1]);
          return path.toString()
        })
        .style('stroke', function (d) {
          if (d.type == 1) {
            return 'blue';
          }
          return "grey";
        })
        .style("stroke-opacity", "0.3")
        .style('stroke-width', function (d) {
          // if ((d.source['id'] == proId) || (d.target['id'] == proId)) {
          //   return 4;
          // }
          return relWeightScale(d.weight)
          // return 2;
        })

      forceSimulationP.on("tick", () => {
        circle.attr("cx", (d) => {
          if (d.rx != undefined) {
            d.x = d.rx;
            d.y = d.ry;
          }
          let esx = d.x;
          let esy = d.y;
          if (esx < rSize) esx = rSize;
          esx = esx > svgWidth - rSize ? svgWidth - rSize : esx;
          if (esy < rSize) esy = rSize;
          esy = esy > svgHeight - rSize ? svgHeight - rSize : esy;
          if (d.type == "con")
            _this.updateEntity(entG, esx, esy, `astCon_${d.id}`)
          if (d.type == "pro"){
            d.x = 50*d.order;
            _this.updateEntity(entG, esx, esy, `astPro_${d.id}`)
          }

          if (d.x < rSize) return rSize;
          return d.x > svgWidth - rSize ? svgWidth - rSize : d.x
        })
          .attr("cy", (d) => {
            if (d.y < rSize) return rSize;
            if (d.type == "pro"){
              d.y = 120; 
            }
            return d.y > svgHeight - rSize ? svgHeight - rSize : d.y
          });

        path.attr("d", (d) => {
          // if (!((d.source.type == 'problem') && (d.target.type == 'problem'))) 
          if (!(d.type == 3)) {
            let eSource = d.source;
            let eTarget = d.target;
            let esx = eSource.x;
            let esy = eSource.y;
            if (esx < rSize) esx = rSize;
            esx = esx > svgWidth - rSize ? svgWidth - rSize : esx;
            if (esy < rSize) esy = rSize;
            esy = esy > svgHeight - rSize ? svgHeight - rSize : esy;
            let etx = eTarget.x;
            let ety = eTarget.y;
            if (etx < rSize) etx = rSize;
            etx = etx > svgWidth - rSize ? svgWidth - rSize : etx;
            if (ety < rSize) ety = rSize;
            ety = ety > svgHeight - rSize ? svgHeight - rSize : ety;
            let path = d3.path();
            path.moveTo(esx, esy);
            path.quadraticCurveTo(esx, esy, etx, ety);
            return path.toString();
          }
        })

      });

    },
    calcRegularPolygonPoints(num, x, y, r) {
      let arcStep = Math.PI * 2 / num;
      let points = [];
      for (let i = 0; i < num; i++) {
        points.push([x - Math.sin(arcStep * i) * r, y + Math.cos(arcStep * i) * r])
      }
      return points
    },
    drawEntityConcept(svg, x, y, pId) {
      const _this = this;
      d3.select("#" + pId).remove();
      let entG = svg.append("g").attr("id", pId);
      entG.attr("transform", `translate(${x},${y})`);
      let cFill = 'blue';
      let cOpacity = 1;
      let cStroke = 'white';
      let cWidth = 1;
      let conceptDataOri = this.concepts.find((con) => { return con['id'] == pId.split("_")[1] });
      let conceptData = this.nodeList.find((con) => { return con['id'] == pId.split("_")[1] });
      const minRadius = 20;  // 最小半径
      const maxRadius = 30; // 最大半径
      const rScale = d3.scaleLinear().domain([1, _this.maxNum]).range([minRadius-8, maxRadius-8]);
      let r = rScale(conceptData['num'])
      const color_linear = d3.scaleLinear().domain([0, _this.maxDif]).range([0, 1]);
      const Compute_color = d3.interpolate("#fff", cFill);
      let fill = Compute_color(color_linear(conceptData['dif']))
      let circle = tools.drawCircle(entG, 0, 0, r, fill, cOpacity, cStroke, cWidth, `entNetCircle`, `entNetCircle_${pId}`);
      // drawTools.drawCircle(entG, 0, 0, 10, "red", 1, 1, 1, 'entNetCircle', pId);
      tools.drawTxt(entG, 0, 50, conceptDataOri['name'], "black", 18, `netConsText_${pId}`, "middle");//属性文字
      // tools.drawTxt(entG, 0, 0, txts, "grey", 18, `ConsText_${idx}`, "left");//属性文字

      const width = 50, height = 60;
      const margin = { top: 10, right: 0, bottom: 0, left: -width / 2 - 25 };

      const center = { x: 0, y: 0 };

      // 创建比例尺（角度0-2π对应数值0-100）
      const slAngleScale = d3.scaleLinear()
        .domain([0, _this.maxNum])
        .range([0, 2 * Math.PI]);

      const slRadiusScale = d3.scaleLinear()
        .domain([0, _this.maxNum])
        .range([minRadius, maxRadius]);

      // 创建轨道容器
      const slTrack = entG.append("path")
        .classed("track", true)
        .attr("transform", `translate(${center.x},${center.y})`)
        .attr("fill", "#f0f0f0");

      // 创建进度条
      const slProgress = entG.append("path")
        .classed("progress", true)
        .attr("transform", `translate(${center.x},${center.y})`)
        .attr("fill", "#2196F3");

      // 创建手柄
      const slHandle = entG.append("circle")
        .classed("handle", true)
        .attr("r", 5)
        .attr("fill", "#FF9800");

      // 更新函数
      function updateslProgress(value) {
        const currentAngle = slAngleScale(value);
        const currentRadius = slRadiusScale(value);

        d3.select(`#entNetCircle_${pId}`).attr("r", rScale(value));
        // 更新轨道（完整圆形）
        slTrack.attr("d", d3.arc()
          .innerRadius(currentRadius - 8)
          .outerRadius(currentRadius)
          .startAngle(0)
          .endAngle(2 * Math.PI)
          .cornerRadius(8)());

        // 更新进度条（当前进度）
        slProgress.attr("d", d3.arc()
          .innerRadius(currentRadius - 8)
          .outerRadius(currentRadius)
          .startAngle(-Math.PI / 2) // 从顶部开始
          .endAngle(-Math.PI / 2 + currentAngle)
          .cornerRadius(8)());

        // 更新手柄位置
        const [x, y] = polarToCartesian(
          currentRadius-4,
          -Math.PI / 2 + currentAngle // 保持从顶部开始
        );
        slHandle.attr("cx", x + center.x).attr("cy", y + center.y);
      }

      // 极坐标转笛卡尔坐标
      function polarToCartesian(radius, angle) {
        return [
          radius * Math.cos(angle-Math.PI/2),
          radius * Math.sin(angle-Math.PI/2)
        ];
      }

      // 拖拽交互
      const slDrag = d3.drag()
        .on("drag", function (event) {
          const dx = event.x - center.x;
          const dy = event.y - center.y;
          let angle = Math.atan2(dy, dx);

          // 转换到0-2π范围
          if (angle < 0) angle += 2 * Math.PI;

          // 计算当前值
          const currentValue = slAngleScale.invert(angle);
          const clampedValue = Math.max(0, Math.min(100, currentValue));

          updateslProgress(clampedValue);
          d3.select("#value-display").text(`${Math.round(clampedValue)}%`);
        });

      slHandle.call(slDrag);

      // 初始化
      updateslProgress(rScale(conceptData['num']));
     

      // 创建比例尺（角度0-2π对应数值0-100）
      const ndAngleScale = d3.scaleLinear()
        .domain([0, _this.maxDif])
        .range([0, 2 * Math.PI]);

      const ndRadiusScale = d3.scaleLinear()
        .domain([0, _this.maxDif])
        .range([minRadius+8, maxRadius+8]);

      // 创建轨道容器
      const ndTrack = entG.append("path")
        .classed("track", true)
        .attr("transform", `translate(${center.x},${center.y})`)
        .attr("fill", "#f0f0f0");

      // 创建进度条
      const ndProgress = entG.append("path")
        .classed("progress", true)
        .attr("transform", `translate(${center.x},${center.y})`)
        .attr("fill", "#2196F3");

      // 创建手柄
      const ndHandle = entG.append("circle")
        .classed("handle", true)
        .attr("r", 5)
        .attr("fill", "#FF9800");

      // 更新函数
      function updatendProgress(value) {
        const currentAngle = ndAngleScale(value);
        const currentRadius = minRadius+10//slRadiusScale();

        
        d3.select(`#entNetCircle_${pId}`).attr("fill", Compute_color(color_linear(value)))
        // 更新轨道（完整圆形）
        ndTrack.attr("d", d3.arc()
          .innerRadius(currentRadius - 8)
          .outerRadius(currentRadius)
          .startAngle(0)
          .endAngle(2 * Math.PI)
          .cornerRadius(8)());

        // 更新进度条（当前进度）
        ndProgress.attr("d", d3.arc()
          .innerRadius(currentRadius - 8)
          .outerRadius(currentRadius)
          .startAngle(-Math.PI / 2) // 从顶部开始
          .endAngle(-Math.PI / 2 + currentAngle)
          .cornerRadius(8)());

        // 更新手柄位置
        const [x, y] = polarToCartesian(
          currentRadius,
          -Math.PI / 2 + currentAngle // 保持从顶部开始
        );
        ndHandle.attr("cx", x + center.x).attr("cy", y + center.y);
      }


      // 拖拽交互
      const ndDrag = d3.drag()
        .on("drag", function (event) {
          const dx = event.x - center.x;
          const dy = event.y - center.y;
          let angle = Math.atan2(dy, dx);

          // 转换到0-2π范围
          if (angle < 0) angle += 2 * Math.PI;

          // 计算当前值
          const currentValue = ndAngleScale.invert(angle);
          const clampedValue = Math.max(0, Math.min(100, currentValue));

          updatendProgress(clampedValue);
          d3.select("#value-display").text(`${Math.round(clampedValue)}%`);
        });

      ndHandle.call(ndDrag);

      // 初始化
      updatendProgress((conceptData['dif']));
    },
    
    drawEntityProblem(svg, x, y, pId) {
      const _this = this;
      d3.select("#" + pId).remove();
      let entG = svg.append("g").attr("id", pId);
      entG.attr("transform", `translate(${x},${y})`);
      let rSize = 10;
      let attrLen = 3;
      let points = _this.calcRegularPolygonPoints(attrLen, 0, 0, rSize);
      let entColor = 'green'
      let entPolygon = tools.drawPolygon(entG, points, `pro_${pId}`,0.3, '5px', entColor, entColor,'netEntPro');

    },
    updateEntity(svg, x, y, pId) {
      const _this = this;
      let entG = svg.select(`#${pId}`);
      let transformd = entG.attr("transform")
      let s = 'scale(1)';
      if (transformd.split("scale").length > 1) {
        s = `scale${transformd.split("scale")[1]}`;
      }
      entG.attr("transform", `translate(${x},${y}) ${s}`);
    },
    click_Ent(time) {
      this.$emit("timeDur", time);
    },
  },
  created() {
    var _this = this;
    let margin = _this.margin
    this.$nextTick(() => {
      _this.drawRootConceptTree();
      _this.update()
    });
  },
  mounted() {
    const _this = this;
    d3.select(".chartTooltip").classed("hidden", true);
    this.$bus.$on('proConNet', (val) => {
      _this.proConNet = val[0];
      _this.delConceptTree = val[1];
      _this.proConRels = val[2];
    });

    this.$bus.$on('ConceptTree', (val) => {
      _this.conceptTree = val;
    });
    this.$bus.$on('papersNum', (val) => {
      _this.papersNum = val;
    });
    // this.$refs.moveindexGraphLeft.addEventListener("mouseover", _this.moveindexGraphLeft); // 监听点击事件

  },
  beforeDestroy() {
    clearInterval(this.moveTimer);
  },
} 
</script>

<style>
@import './index.css';

.radar-chart {
  background-color: #bababa;
}

.axis-line {
  stroke: #999;
  stroke-width: 0.5px;
  stroke-dasharray: 9 4;
}

.grid-circle {
  fill: white;
  stroke: #a5a4a4;
  stroke-width: 1;
}

.axis-label {
  font-size: 12px;
  fill: #333;
}
</style>
