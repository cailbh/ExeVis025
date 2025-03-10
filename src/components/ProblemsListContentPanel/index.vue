<!-- eslint-disable no-unused-vars -->
<!-- eslint-disable no-unused-vars -->

<template>
  <div class="proListPanel">
    <div class="panelHead">题目列表 </div>
    <!-- //SupportPanel</div> -->
    <div id="proListPanelDiv" class="panelBody" ref="proListPanelDiv">

      <el-table :data="tableData" height=770 style="width: 100%;">
        <el-table-column prop="type" label="题型" width="100">
          <template slot-scope="scope">
            <i :class="getIconClass(scope.row.type)"></i>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="题目" width="300">
        </el-table-column>
        <!-- <el-table-column prop="province" label="省份" width="120">
        </el-table-column>
        <el-table-column prop="city" label="市区" width="120">
        </el-table-column>
        <el-table-column prop="address" label="地址" width="300">
        </el-table-column>
        <el-table-column prop="zip" label="邮编" width="120">
        </el-table-column> -->
        <el-table-column fixed="right" label="操作" width="120">
          <template slot-scope="scope">
            <el-tooltip effect="light" content="查看题目详情" placement="top" popper-class="action-tooltip">
              <el-button @click="click_View(scope.row)" class="view-btn" type="primary" plain circle>
                <i class="fas fa-eye"></i>
              </el-button>
            </el-tooltip>
            <!-- 添加按钮 -->
            <el-tooltip effect="light" content="添加到试卷" placement="top" popper-class="action-tooltip">
              <el-button @click="click_ProAdd(scope.row)" class="add-btn" type="success" plain circle>
                <i class="fas fa-plus"></i>
              </el-button>
            </el-tooltip>
            <!-- <el-button @click="click_View(scope.row)" type="text" size="medium">查看</el-button>
            <el-button @click="click_ProAdd(scope.row)" type="text" size="small">添加</el-button> -->
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination @current-change="handleCurrentChange" :page-size="pageSize" :pager-count="11"
          layout="prev, pager, next" :total="problemsNum">
        </el-pagination>
      </div>
      <!-- <div id="connectCon" ref="connectCon">
      </div> -->
      <div id="proListData" ref="proListData">

      </div>
    </div>
  </div>
</template>

<script>
import * as d3 from 'd3'
import tools from "@/utils/tools1.js";
import '@fortawesome/fontawesome-free/css/all.min.css'; // 引入Font Awesome CSS
export default {
  props: [],
  data() {
    return {
      proIdList: [],
      problemsNum: 0,
      page: 1,
      pageSize: 20,
      tableData: [],
      margin: { top: 5, right: 5, bottom: 5, left: 5 },
    };
  },
  watch: {
    type(val) {
    },
    curEntId(curEntId) {
    },
    proIdList(val) {
      const _this = this;
      _this.$bus.$emit("proIdList", val);
    }
  },
  methods: {
    click_ProAdd(val) {
      console.log(val);
      const _this = this;
      if (_this.proIdList.indexOf(val.id) == -1) {
        _this.proIdList.push(val.id);
      }

    },
    getIconClass(type) {
      console.log('type', type)
      const iconMap = {
        // 映射规则：覆盖所有可能的键名
        'MULTIPLE_CHOICE': 'fas fa-list-ol',
        '选择题': 'fas fa-list-ol',
        'choose': 'fas fa-list-ol',

        'TRUE_OR_FALSE': 'fas fa-check-circle',
        '判断题': 'fas fa-check-circle',
        'judge': 'fas fa-check-circle',

        'CODE_COMPLETION': 'fas fa-code',
        '编程题': 'fas fa-code',
        'PROGRAMMING': 'fas fa-code',

        '填空': 'fas fa-pencil-alt',
        'FILL_IN_THE_BLANK': 'fas fa-pencil-alt',
        'fill': 'fas fa-pencil-alt',
      };
      return iconMap[type] || 'fas fa-question'; // 未知类型默认显示问号图标
    },
    getProblemsNum() {
      const _this = this;
      let data = [];

      this.$http
        .get("/api/problem/problemNum", {}, {})
        // .get("/api/test", {}, {})
        .then((response) => {
          _this.problemsNum = response.body[0];
        });
    },
    getProblemsByPages(page, pageSize) {
      const _this = this;
      let data = [];
      this.$http
        .get("/api/problem/problemsByPage", { params: { page: page, pageSize: pageSize } }, {})
        // .get("/api/test", {}, {})
        .then((response) => {
          console.log("11", response.body);
          _this.tableData = response.body;
        });
    },
    // 显示第几页
    handleCurrentChange(val) {
      const _this = this;
      // 改变默认的页数
      this.page = val
      // 切换页码时，要获取每页显示的条数
      _this.getProblemsByPages(_this.page, _this.pageSize);
    },
    click_View(data) {
      const _this = this;
      console.log(data)
      // this.$emit("timeDur", time);
    },
    click_Edit(data) {
      // this.$emit("timeDur", time);
    },
  },
  created() {
    const _this = this;
    this.$nextTick(() => {
      // _this.updata();
      // _this.proIdList = ["1701115978840051712", "1697260400746143744"];
    });
  },
  mounted() {
    const _this = this

    _this.getProblemsNum();
    _this.getProblemsByPages(1, _this.pageSize);
    // _this.tableData.find(function (d) { return d['key'] == 'name' })['value'] = 'Computer Network';
    this.$bus.$on('selectEnt', (val) => {
      _this.curEntId = val;
      _this.updata();
    });
    this.$bus.$on('allProblem', (val) => {
      _this.problemsData = val;
      // _this.updata();
    });
    this.$bus.$on('proIdDelList', (val) => {
      _this.proIdList = val;
      console.log(val);
    });

  },
  // beforeDestroy() {
  //   clearInterval(this.moveTimer);
  // },
} 
</script>

<style>
@import './index.css';
</style>
<style scoped>
/* 按钮容器布局 */
.action-buttons {
  display: flex;
  gap: 12px;
  /* 按钮间距 */
  justify-content: center;
}

/* 基础按钮样式 */
.el-button {
  transition: all 0.3s ease;
  width: 36px;
  height: 36px;
  padding: 0;
  border-width: 1.5px;
}

/* 查看按钮特效 */
.view-btn {
  border-color: #409eff;
  color: #409eff;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 2px 8px rgba(64, 158, 255, 0.3);

    i {
      color: #66b1ff;
    }
  }
}

/* 添加按钮特效 */
.add-btn {
  border-color: #67c23a;
  color: #67c23a;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 2px 8px rgba(103, 194, 58, 0.3);

    i {
      color: #85ce61;
    }
  }
}

/* 图标微调 */
i[class^="fas"] {
  font-size: 14px;
  vertical-align: middle;
}

/* 工具提示样式 */
:deep(.action-tooltip) {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
  padding: 6px 10px;
  font-size: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 4px;

  &.is-light {
    background: #fff;
    border: 1px solid #ebeef5;
  }
}
</style>