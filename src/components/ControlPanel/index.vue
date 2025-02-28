<!-- eslint-disable no-unused-vars -->
<!-- eslint-disable no-unused-vars -->

<template>
  <div class="controlPanel">
    <div class="panelHead">Control View</div>
    <div id="controlPanelDiv" class="panelBody" ref="controlPanelDiv">
      <!-- <div id="upLoadVideo">
        <el-upload class="uploadVideoel" action="https://jsonplaceholder.typicode.com/posts/"
          :on-change="handleVideoChange" :file-list="fileVideoList">
          <el-button ref="videoBut" size="middle" type="primary">Upload</el-button>
        </el-upload>
      </div> -->
      <div id="baseInformation">
        <label class="T1">>Information</label>
        <el-button size="mini" type="" style="margin-left: 40%;" plain>Upload</el-button>
        <el-divider class="divider"></el-divider>
        <el-table stripe :data="tableData" style="width: 100%;overflow: hidden;" height="250px" :row-style="iRowStyle"
          :cell-style="iCellStyle" :header-row-style="iHeaderRowStyle" :header-cell-style="iHeaderCellStyle">
          <el-table-column prop="key" label="" width="250">

          </el-table-column>
          <el-table-column prop="value" label="" width="260">
            <template slot-scope="scope" style="float: left;font-size:10px">
              <div v-if="scope.row.key != 'Coursename'">
                <div style="text-align:center">
                  {{ scope.row.value }}</div>

              </div>
              <!-- <div :class="scope.row.name" :id="scope.row.name" :height="scope.row.value === '' ? '10' : '0'" disable-transitions>
                {{ scope.row.value }}
              </div> -->
            </template>
          </el-table-column>
        </el-table>

        <div id="iconUploadVideoEl" @click="videoUpClk">
          <img class="iconUpload" :src="upLoadUrl">
        </div>
      </div>
      <div id="controlLineChart" ref="controlLineDiv"></div>
      <div id="topicControl">
        <label class="T1">>Index</label>
        <div class="academic-tabs">
          <!-- 标签导航 -->
          <div class="tab-nav">
            <div v-for="(tab, index) in tabs" :key="index" class="nav-item" :class="{ active: activeTab === index }"
              @click="activeTab = index">
              <i :class="tab.icon"></i>
              {{ tab.title }}
              <span class="item-count" v-if="tab.count !== undefined">({{ tab.count }})</span>
            </div>
          </div>

          <!-- 内容区域 -->
          <div class="tab-content">
            <transition name="fade-slide" mode="out-in">
              <div>
              <!-- 题型分布 -->
              <div v-show="activeTab === 0" class="tabPane">
                <div class="question-types">
                  <!-- 原有题型分布内容 -->
                  <!-- 题型数量模块 -->
                  <div class="config-card">
                    <!-- <h3 class="section-title"><i class="icon icon-question"></i> 题型分布</h3> -->
                    <div class="question-type-grid">
                      <div class="type-item" v-for="(type, index) in questionTypes" :key="index">
                        <label class="type-label">{{ type.name }}：</label>
                        <div class="number-input">
                          <el-button type=""  plain style="height: 30px;width: 30px;padding: 0; margin: 1px 2px;"@click="type.count > 0 && type.count--">-</el-button>
                          <input type="number" v-model.number="type.count" min="0" class="count-input">
                          <el-button type=""  plain style="height: 30px;width: 30px;padding: 0; margin: 1px 2px;" @click="type.count++">+</el-button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 知识点参数 -->
              <div v-show="activeTab === 1" class="tabPane">
                <div class="knowledge-params">
                  <div class="config-card">
                    <!-- <h3 class="section-title"><i class="icon icon-knowledge"></i> 知识点参数</h3> -->
                    <div class="knowledge-controls">
                      <div v-for="(chapter, index) in chapters" :key="index" class="chapter-item">
                        <div class="chapter-header">
                          <span class="chapter-name">{{ chapter.name }}</span>
                          <span class="chapter-meta">（{{ chapter.code }}）</span>
                        </div>

                        <div class="param-controls">
                          <!-- 题目数量 -->
                          <div class="param-group">
                            <label>数量</label>
                            <div class="number-input">
                              <el-button type=""  plain style="height: 30px;width: 30px;padding: 0; margin: 1px 2px;"@click="chapter.count > 0 && chapter.count--">-</el-button>
                              <input type="number" v-model.number="chapter.count" min="0" class="count-input">
                              <el-button type=""  plain style="height: 30px;width: 30px;padding: 0; margin: 1px 2px;" @click="chapter.count++">+</el-button>
                            
                            </div>
                          </div>

                          <!-- 难度调节 -->
                          <div class="param-group">
                            <label>难度</label>
                            <select v-model="chapter.difficulty" class="academic-select">
                              <option v-for="d in 5" :value="d">{{ '★'.repeat(d) }}（Lv.{{ d }}）</option>
                            </select>
                          </div>

                          <!-- 考察深度 -->
                          <div class="param-group">
                            <label>深度</label>
                            <div class="depth-slider">
                              <input type="range" v-model.number="chapter.depth" min="1" max="3"
                                :title="depthLabels[chapter.depth - 1]">
                              <span class="depth-tag">{{ depthLabels[chapter.depth - 1] }}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 难度调节 -->
              <div v-show="activeTab === 2" class="tabPane">
                <div class="difficulty-control">
                  <!-- 原有难度调节内容 -->
                  <!-- 难度选择 -->
                  <div class="config-card">
                    <h3 class="section-title"><i class="icon icon-difficulty"></i> 难度设置</h3>
                    <div class="difficulty-select">
                      <div class="difficulty-option" v-for="(dif, index) in difficultyOptions" :key="index"
                        :class="{ active: selectedDifficulty === dif.value }" @click="selectedDifficulty = dif.value">
                        <span class="difficulty-label">{{ dif.label }}</span>
                        <span class="difficulty-desc">{{ dif.desc }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </transition>
          </div>
        </div>
        <!-- <el-button size="primary" type="primary" >Upload</el-button> -->
        <el-divider class="divider"></el-divider>
      </div>
      <div id="tools">
        <el-button type="" style="height: 30px;width: 140px;padding: 0; margin: 10px 20px;"
          @click="confirmClk"  plain>Apply</el-button>
        <el-button type="" style="height: 30px;width: 140px;;padding: 0; margin: 10px 20px;" plain>ReSet</el-button>
      </div>

      <!-- <div id="confirmButDiv" @click="confirmClk" ref="addBtn">
        <img class="icons" :src="confirmUrl">
      </div> -->

    </div>
    <!-- <div id="lectureStyleIconDiv">
        <img class="icons" :src="lectureStyleIconUrl">
      </div>
      <div id="banshuDiv">
        <img class="icons banshu" :src="banshuUrl">
      </div>
      <div id="kousuDiv">
        <img class="icons kousu" :src="kousuUrl">
      </div>
      <div id="pptDiv">
        <img class="icons ppt" :src="pptUrl">
      </div> -->
  </div>
</template>

<script>
import * as d3 from 'd3'
import { onMounted, ref } from 'vue';
import filenames from "@/utils/fileName";
import domtoimage from 'dom-to-image';
import tools from "@/utils/tools1.js";
import { select } from 'd3';

export default {
  props: ["videoTime"],
  data() {
    return {

      tableData: [{
        key: 'Course : ',
        value: 'C Language'// Programming'
      }, {
        key: 'Questions ：',
        value: '236',
      }, {
        key: 'Concepts ：',
        value: '59',
      }, {
        key: 'Relationships ：',
        value: '1011',
      }
      ],
      confirmUrl: require("@/assets/img/confirmGroup.png"),
      upSliderUrl: require('@/assets/img/Slider.png'),
      upScriptUrl: require('@/assets/img/Script.png'),
      // require('@/assets/videos/index.mp4'),
      upLoadUrl: require('@/assets/img/openFile.png'),
      videoUploadIcon: '@/', s: "none",
      switchL: {
        "1": false,
        "2": false,
        "3": false
      },
      curToolState: {
        "addRel": false,
        "addRelMain": false,
        "delRel": false,
      },
      renew: false,
      lectureStyleIconUrl: require("@/assets/img/lecture style.png"),
      banshuUrl: require("@/assets/img/lecture style banshu.png"),
      kousuUrl: require("@/assets/img/lecture style kousu.png"),
      pptUrl: require("@/assets/img/lecture style ppt.png"),

      questionTypes: [
        { name: '选择题', count: 0 },
        { name: '判断题', count: 0 },
        { name: '填空题', count: 0 },
        { name: '编程题', count: 0 }
      ],
      chapters: [
        {
          code: 'CH01',
          name: '基本数据类型',
          count: 0,
          difficulty: 1,
          depth: 1
        },
        {
          code: 'CH02',
          name: '表达式',
          count: 0,
          difficulty: 1,
          depth: 1
        },{
          code: 'CH03',
          name: '分支控制',
          count: 0,
          difficulty: 1,
          depth: 1
        },{
          code: 'CH04',
          name: '循环控制',
          count: 0,
          difficulty: 1,
          depth: 1
        },{
          code: 'CH05',
          name: '函数与程序结构',
          count: 0,
          difficulty: 1,
          depth: 1
        },{
          code: 'CH06',
          name: '数组',
          count: 0,
          difficulty: 1,
          depth: 1
        },{
          code: 'CH07',
          name: '指针',
          count: 0,
          difficulty: 1,
          depth: 1
        },{
          code: 'CH08',
          name: '结构体',
          count: 0,
          difficulty: 1,
          depth: 1
        },
      ],
      depthLabels: ['识记', '理解', '应用'],
      difficultyOptions: [
        { value: 1, label: '基础', desc: '适合巩固基础知识' },
        { value: 2, label: '中等', desc: '常规难度题目' },
        { value: 3, label: '困难', desc: '综合应用题型' }
      ],
      selectedDifficulty: 1,
      activeTab: 0,
      tabs: [
        {
          title: '题型配置',
          icon: 'el-icon-data-line',
          count: 0  // 当前题型总数
        },
        {
          title: '知识体系',
          icon: 'el-icon-notebook',
          count: 0  // 已选知识点数
        },
        {
          title: '难度策略',
          icon: 'el-icon-aim',
          count: null
        }
      ],
      paperData:[],
    };
  },
  watch: {
    type(val) {
    },
    questionTypes: {
      deep: true,
      handler(val) {
        console.log(1111, val)
        this.tabs.count = val.reduce((acc, cur) => acc + cur.count, 0)
      }
    },
    chapters: {
      deep: true,
      handler(val) {
        this.tabs.count = val.filter(c => c.count > 0).length
      }
    },
  },
  methods: {
    confirmClk() {
      console.log("开始组卷",this.chapters,this.selectedDifficulty,this.questionTypes)
      this.FormPaper()
    },
    FormPaper() {
      const _this = this;
      let data = [];
      this.$http
        // .get("/api/problem/allProblem", { params: { name: "12345" } }, {})
        .post("/api/AutoFormPaper", { params: {paperIndex: [this.chapters,this.selectedDifficulty,this.questionTypes],paperId: _this.papersNum+""} }, {})
        .then((response) => {
          // _this.$bus.$emit("proIdList", response.body);
          _this.paperData = response.body;
          console.log('paper',_this.paperData)
          _this.$bus.$emit("paperProIds", response.body);
        });
    },
    iRowStyle: function ({ row, rowIndex }) {
      return 'height:25px ;font-size:10px';
    },
    iHeaderRowStyle: function ({ row, rowIndex }) {
      return 'height:10px';
    },
    iCellStyle: function ({ row, column, rowIndex, columnIndex }) {
      return 'padding:0px;font-size:18px;'
    },
    iHeaderCellStyle: function ({ row, column, rowIndex, columnIndex }) {
      return 'padding:0px'
    },

    icRowStyle: function ({ row, rowIndex }) {
      return 'height:23px ;font-size:12px';
    },
    icHeaderRowStyle: function ({ row, rowIndex }) {
      return 'height:23px';
    },
    icCellStyle: function ({ row, column, rowIndex, columnIndex }) {
      return 'padding:0px;font-size:18px;'
    },
    icHeaderCellStyle: function ({ row, column, rowIndex, columnIndex }) {
      return 'padding:0px'
    },
    handleCommand(command) {
      this.selectSession = command;
    },

    click_Ent(time) {
      this.$emit("timeDur", time);
    },
    videoUpClk() {
      this.$refs.videoBut.$el.click()
    },
    sliderUpClk() {
      this.$refs.sliderBut.$el.click()
    },
    scriptUpClk() {
      this.$refs.scriptBut.$el.click()
    },
    handleVideoChange(file, fileList) {
      this.fileList = fileList.slice(-3);
    },
    handleSlidesChange(file, fileList) {
      this.fileList = fileList.slice(-3);
    },
    handleScriptChange(file, fileList) {
      this.fileList = fileList.slice(-3);
    }
  },
  created() {



    const _this = this;

    this.$nextTick(() => {

    });
  },
  mounted() {
    const _this = this


    this.$bus.$on('ConceptTree', (val) => {
      _this.conceptTree = val;
    });


  },
  // beforeDestroy() {
  //   clearInterval(this.moveTimer);
  // },
} 
</script>

<!-- <style>
@import './index.css';
</style> -->
<style>
@import './index.css';
@media (max-width: 768px) {
  .nav-item {
    font-size: 0.9rem;
    padding: 0.8rem;
    flex-direction: column;
    gap: 4px;
  }

  .item-count {
    display: block;
    font-size: 0.75rem;
  }
}

.exam-config-container {
  max-width: 1200px;
  margin: 20px auto;
  padding: 20px;
}

.config-card {
  /* background: white;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.08);
  padding: 24px;
  margin-bottom: 24px; */
}

.section-title {
  color: #2c3e50;
  font-size: 18px;
  margin-bottom: 20px;
}

.section-title .icon {
  margin-right: 8px;
  color: #409eff;
}

.question-type-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 30px;
}

.question-type-grid .type-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  background: #f8f9fa;
  border-radius: 8px;
}

.number-input {
  display: flex;
  align-items: center;
}

/* .question-type-grid .type-item .number-input button {
  background: #409eff;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
}

.question-type-grid .type-item .number-input button:hover {
  background: #66b1ff;
} */

.number-input .count-input {
  width: 50px;
  text-align: center;
  margin: 0 8px;
  padding: 6px;
  height: 30px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
}

.number-input .count-input:focus {
  border-color: #409eff;
  outline: none;
}

.knowledge-tree .tree-node {
  padding: 8px 0;
  border-bottom: 1px solid #eee;
}

.knowledge-tree .tree-node .node-item {
  display: flex;
  align-items: center;
  padding: 8px;
}

.knowledge-tree .tree-node input[type="checkbox"] {
  margin-right: 8px;
}

.knowledge-tree .tree-node .children-nodes {
  padding-left: 24px;
}

.knowledge-tree .tree-node .children-nodes .child-node {
  padding: 6px 0;
}

.knowledge-tree .tree-node .children-nodes .child-node label {
  display: flex;
  align-items: center;
}

.difficulty-select {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.difficulty-select .difficulty-option {
  padding: 20px;
  border: 2px solid #eee;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
}

.difficulty-select .difficulty-option:hover {
  border-color: #409eff;
}

.difficulty-select .difficulty-option.active {
  border-color: #409eff;
  background: #f5f9ff;
}

.difficulty-select .difficulty-option .difficulty-label {
  display: block;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
  color: #409eff;
}

.difficulty-select .difficulty-option .difficulty-desc {
  font-size: 12px;
  color: #666;
}

.collapse-module {
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  margin-bottom: 16px;
  transition: all 0.3s;
}

.collapse-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: #f8f9fa;
  cursor: pointer;
  transition: background 0.3s;
}

.collapse-header:hover {
  background: #f1f3f5;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.module-title {
  font-weight: 500;
  color: #2c3e50;
}

.arrow {
  color: #6c757d;
  transition: transform 0.3s;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s;
  max-height: 800px;
  /* 根据实际内容调整 */
}

.slide-enter,
.slide-leave-to {
  opacity: 0;
  max-height: 0;
  overflow: hidden;
}

.academic-tabs {
  border: 1px solid #e0e3e6;
  border-radius: 4px;
  background: #fff;
}

.tab-nav {
  display: flex;
  border-bottom: 2px solid #f0f2f5;
  background: #fafbfc;
}

.nav-item {
  flex: 1;
  text-align: center;
  padding: 1rem 0;
  cursor: pointer;
  transition: all 0.3s;
  color: #5e6d82;
  border-right: 1px solid #f0f2f5;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.nav-item:last-child {
  border-right: none;
}

.nav-item.active {
  color: #4a90e2;
  background: linear-gradient(to bottom, #f8fafe, #fff);
  position: relative;
}

.nav-item.active::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 2px;
  background: #4a90e2;
}

.item-count {
  font-size: 0.85em;
  color: #8c9bab;
}

.tab-content {
  padding: 1.5rem;
  min-height: 220px;
}

.fade-slide-enter-active {
  transition: all 0.3s ease;
}

.fade-slide-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.fade-slide-enter {
  opacity: 0;
  transform: translateY(10px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
.knowledge-controls{
  overflow: auto;
  height: 180px;
  scrollbar-width: 0px;
  -ms-overflow-style: none;
}

.knowledge-controls::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
}
.chapter-item {
  border-bottom: 1px solid #e0e0e0;
  padding: 1rem 0;
}

.chapter-header {
  margin-bottom: 0.8rem;
}

.chapter-name {
  font-weight: 600;
  color: #2c3e50;
}

.chapter-meta {
  color: #6c757d;
  font-size: 0.9em;
}

.param-controls {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.param-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.param-group label {
  font-size: 0.9em;
  color: #495057;
}

.academic-select {
  padding: 0.3rem;
  border: 1px solid #ced4da;
  border-radius: 3px;
  width: 100%;
}

.depth-slider {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.depth-slider input[type="range"] {
  flex: 1;
}

.depth-tag {
  font-size: 0.85em;
  color: #4a90e2;
  min-width: 40px;
}
</style>
