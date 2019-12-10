<template>
  <div class="wrap">
    <template>
      <!-- 操作按钮 -->
      <el-row class="btns">
        <el-button type="primary" @click="addDialog = true" size="small" icon="el-icon-plus">添加接口</el-button>
        <!-- <el-button type="primary" @click="$router.push('/add')" size="small" icon="el-icon-plus">添加接口</el-button> -->
      </el-row>
      <!-- 数据表格 -->
      <el-table :data="tableData" border v-loading="statu">
        <el-table-column align="center" prop="apiDesc" label="接口描述"></el-table-column>
        <el-table-column align="center" prop="apiUrl" label="接口地址"></el-table-column>
        <el-table-column align="center" prop="successResult" label="成功结果"></el-table-column>
        <el-table-column align="center" prop="sendFlag" label="模板类型">
          <template slot-scope="scope">
            <template v-if="scope.row.sendFlag == '1'">邮件</template>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="systemName" label="项目"></el-table-column>
        <el-table-column align="center" prop="groupName" label="用户组"></el-table-column>
        <el-table-column align="center" prop="templateName" label="预警模板"></el-table-column>
        <el-table-column align="center" fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
            <el-button @click="handleDelete(scope.$index, scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 表格分页 -->
      <el-row style="margin: 20px 0;">
        <el-col align="right">
          <el-pagination
            background
            class="myStyle"
            layout="total,prev, pager, next"
            :hide-on-single-page="params.total == 0?true:false"
            :page-size="params.pageSize"
            :total="params.total"
            @current-change="handleCurrentChange"
          ></el-pagination>
        </el-col>
      </el-row>
      <el-dialog
        title="添加接口"
        :visible.sync="addDialog"
        width="635px"
        center
        :before-close="((done) => {handleClose(done,'addForm')})"
      >
        <el-form
          :inline="true"
          ref="addForm"
          :rules="rules"
          :model="form"
          class="formCss"
          label-width="80px"
        >
          <el-form-item label="接口描述" prop="apiDesc">
            <el-input v-model="form.apiDesc" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="接口地址" prop="apiUrl">
            <el-input v-model="form.apiUrl" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="成功结果" prop="successResult">
            <el-input v-model="form.successResult" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="模板类型" prop="sendFlag">
            <el-select v-model="form.sendFlag">
              <el-option label="邮件" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="项目" prop="systemId">
            <el-select v-model="form.systemId">
              <el-option
                v-for="item in options.systems"
                :key="item.id"
                :label="item.systemName"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="用户组" prop="groupId">
            <el-select v-model="form.groupId" @change="onSelectedGroup($event)">
              <el-option
                v-for="item in options.groups"
                :key="item.id"
                :label="item.groupName"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="收件人">
            <el-input placeholder="选定用户组后自动填充" v-model="options.toUserList" :disabled="true" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="抄送人">
            <el-input placeholder="选定用户组后自动填充" v-model="options.ccUserList" :disabled="true" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="预警模板" prop="templateId">
            <el-select v-model="form.templateId" @change="onSelectedTemplate($event)">
              <el-option
                v-for="item in options.templates"
                :key="item.id"
                :label="item.templateName"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="预警主题">
            <el-input placeholder="选定预警模板后自动填充" v-model="options.mailTheme" :disabled="true" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="预警内容">
            <el-input placeholder="选定预警模板后自动填充" v-model="options.mailContent" :disabled="true" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="addOrUpdateData('addForm')">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 修改弹框 -->
      <el-dialog
        title="修改接口"
        :visible.sync="updateDialog"
        width="635px"
        center
        :before-close="((done) => {handleClose(done,'updateForm')})"
      >
        <el-form
          ref="updateForm"
          :inline="true"
          :rules="rules"
          :model="updateForm"
          label-width="80px"
        >
          <el-form-item label="接口描述" prop="apiDesc">
            <el-input v-model="updateForm.apiDesc" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="接口地址" prop="apiUrl">
            <el-input v-model="updateForm.apiUrl" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="成功结果" prop="successResult">
            <el-input v-model="updateForm.successResult" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="模板类型" prop="sendFlag">
            <el-select v-model="updateForm.sendFlag">
              <el-option label="邮件" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="项目" prop="systemId">
            <el-select v-model="updateForm.systemId">
              <el-option
                v-for="item in options.systems"
                :key="item.id"
                :label="item.systemName"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="用户组" prop="groupId">
            <el-select v-model="updateForm.groupId" @change="onSelectedGroup($event)">
              <el-option
                v-for="item in options.groups"
                :key="item.id"
                :label="item.groupName"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="收件人">
            <el-input placeholder="选定用户组后自动填充" v-model="options.toUserList" :disabled="true" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="抄送人">
            <el-input placeholder="选定用户组后自动填充" v-model="options.ccUserList" :disabled="true" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="预警模板" prop="templateId">
            <el-select v-model="updateForm.templateId" @change="onSelectedTemplate($event)">
              <el-option
                v-for="item in options.templates"
                :key="item.id"
                :label="item.templateName"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="预警主题">
            <el-input placeholder="选定预警模板后自动填充" v-model="options.mailTheme" :disabled="true" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="预警内容">
            <el-input placeholder="选定预警模板后自动填充" v-model="options.mailContent" :disabled="true" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="addOrUpdateData('updateForm')">确 定</el-button>
        </div>
      </el-dialog>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.wrap .el-input,
.wrap .el-select {
  width: 200px;
}
</style>

<script>
import {
  reqListApiInfo,
  addApiInfo,
  updateApiInfo,
  deleteApiInfo,
  reqSystem,
  reqGroup,
  reqTemplate
} from "@/api";
export default {
  name: "Api",
  data() {
    return {
      statu: true,
      value: false,
      addDialog: false,
      updateDialog: false,
      params: {
        pageSize: 10,
        pageNum: 1,
        total: 0
      },
      form: {
        apiDesc: "",
        apiUrl: "",
        successResult: "",
        sendFlag: "",
        systemId: "",
        groupId: "",
        templateId: "",
      },
      options: {
        systems: [],
        groups: [],
        templates: [],
        toUserList: '',
        ccUserList: '',
        mailTheme: '',
        mailContent: '',
      },
      updateForm: {},
      //   表单输入规则
      rules: {
        apiDesc: [
          { required: true, message: "请输入接口描述", trigger: "blur" }
        ],
        apiUrl: [
          { required: true, message: "请输入接口地址", trigger: "blur" }
        ],
        successResult: [
          { required: true, message: "请输入成功结果", trigger: "blur" }
        ],
        sendFlag: [
          { required: true, message: "请选择模板类型", trigger: "blur" }
        ],
        systemId: [{ required: true, message: "请选择项目", trigger: "blur" }],
        groupId: [{ required: true, message: "请选择用户组", trigger: "blur" }],
        templateId: [
          { required: true, message: "请选择预警模板", trigger: "blur" }
        ]
      },
      tableData: []
    };
  },
  methods: {
    //自动填充
    onSelectedGroup(event) {
      let obj = {}, toUserList = '', ccUserList=''
      obj = this.options.groups.find(item => item.id === event);
      toUserList = obj.toUserList.map(item => item.userName).toString()
      ccUserList = obj.ccUserList.map(item => item.userName).toString()
      this.$set(this.options, 'toUserList', toUserList)
      this.$set(this.options, 'ccUserList', ccUserList)
    },
    onSelectedTemplate(event) {
      let obj = {}, mailTheme = '', mailContent= ''
      obj = this.options.templates.find(item => item.id === event);
      mailTheme = obj.mailTheme
      mailContent = obj.mailContent
      this.$set(this.options, 'mailTheme', mailTheme)
      this.$set(this.options, 'mailContent', mailContent)
    },
    //页码
    handleCurrentChange(val) {
      this.params.pageNum = val;
      this.initTable();
    },
    //打开修改弹框
    handleEdit(index, row) {
      this.updateDialog = true;
      this.updateForm = row;
      this.updateForm.sendFlag = String(row.sendFlag);
      this.onSelectedGroup(row.groupId)
      this.onSelectedTemplate(row.templateId)
    },
    // 删除数据
    handleDelete(index, row) {
      window.console.log(index, row);
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deleteTable(row);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 新增或者修改确定
    addOrUpdateData(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (formName == "addForm") {
            this.addDialog = false;
            this.addTable();
            // this.initTable()
            // 新增数据后刷新表格
          } else if (formName == "updateForm") {
            this.updateDialog = false;
            this.updateTable();
          }
        }
      });
    },
    // 取消弹框并清空
    handleClose(done, formName) {
      done();
      if (formName == "addForm") {
        this.addDialog = false;
      } else if (formName == "updateForm") {
        this.updateDialog = false;
      }
      if (this.$refs[formName] !== undefined) {
        this.$nextTick(() => {
          this.$refs[formName].resetFields();
        });
      }
    },
    // 异步添加数据
    async addTable() {
      const data = this.form;
      const result = await addApiInfo(data);
      if (result.code === "0000") {
        this.$message({
          message: "恭喜你，数据插入成功",
          type: "success"
        });
        this.initTable();
      } else {
        this.$message({
          message: result.msg,
          type: "error"
        });
      }
    },
    // 异步修改数据
    async updateTable() {
      const data = this.updateForm;
      const result = await updateApiInfo(data);
      if (result.code === "0000") {
        this.$message({
          message: "恭喜你，数据修改成功",
          type: "success"
        });
        this.initTable();
      } else {
        this.$message({
          message: result.msg,
          type: "error"
        });
      }
    },
    // 异步修改数据
    async deleteTable(data) {
      const result = await deleteApiInfo(data);
      if (result.code === "0000") {
        this.$message({
          message: "数据删除成功",
          type: "success"
        });
        this.initTable();
      } else {
        this.$message({
          message: result.msg,
          type: "error"
        });
      }
    },
    // 异步获取列表信息
    async initTable() {
      const data = this.params;
      const result = await reqListApiInfo(data);
      if (result.code === "0000") {
        this.tableData = result.datas.records;
        this.params.total = result.datas.total;
        this.statu = false;
      }
    },
    // 异步获取选择框信息
    async initSystems() {
      const data = this.params;
      const result = await reqSystem(data);
      this.options.systems = result;
    },
    // 异步获取选择框信息
    async initGroups() {
      const data = this.params;
      const result = await reqGroup(data);
      this.options.groups = result;
    },
    // 异步获取选择框信息
    async initTemplates() {
      const data = this.params;
      const result = await reqTemplate(data);
      this.options.templates = result;
    }
  },
  mounted() {
    this.initTable();
    this.initSystems();
    this.initGroups();
    this.initTemplates();
  }
};
</script>

