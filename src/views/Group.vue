<template>
  <div class="wrap">
    <template>
      <!-- 操作按钮 -->
      <el-row class="btns">
        <el-button type="primary" @click="addDialog = true" size="small" icon="el-icon-plus">添加用户组</el-button>
      </el-row>
      <!-- 数据表格 -->
      <el-table :data="tableData" border>
        <el-table-column align="center" prop="groupName" label="用户组名称"></el-table-column>
        <el-table-column align="center" prop="toUserList" label="主送人">
          <template slot-scope="scope" v-if="scope.row.toUserList.length">
            <template v-for="(item, index) in scope.row.toUserList">
              <span v-if="scope.row.toUserList.length-1 > index" :key="index">{{item.userName}},</span>
              <span v-else :key="index">{{item.userName}}</span>
            </template>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="ccUserList" label="抄送人">
          <template slot-scope="scope" v-if="scope.row.ccUserList.length">
            <template v-for="(item, index) in scope.row.ccUserList">
              <span v-if="scope.row.ccUserList.length-1 > index" :key="index">{{item.userName}},</span>
              <span v-else :key="index">{{item.userName}}</span>
            </template>
          </template>
        </el-table-column>
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
            layout="total,prev, pager, next"
            :page-size="params.pageSize"
            :total="params.total"
            @current-change="handleCurrentChange"
          ></el-pagination>
        </el-col>
      </el-row>
      <!-- 添加弹框 -->
      <el-dialog
        title="添加用户组"
        :visible.sync="addDialog"
        width="461px"
        center
        :before-close="((done) => {handleClose(done,'addForm')})"
      >
        <el-form ref="addForm" :rules="rules" :model="form" label-width="100px">
          <el-form-item label="用户组名称" prop="groupName">
            <el-input v-model="form.groupName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="主送人" prop="toUserId">
            <el-select v-model="form.toUserId" multiple>
              <el-option
                v-for="item in option"
                :key="item.id"
                :label="item.userName"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="抄送人" prop="ccUserId">
            <el-select v-model="form.ccUserId" multiple>
              <el-option
                v-for="item in option"
                :key="item.id"
                :label="item.userName"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="addOrUpdateData('addForm')">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 修改弹框 -->
      <el-dialog
        title="修改用户组"
        :visible.sync="updateDialog"
        width="461px"
        center
        :before-close="((done) => {handleClose(done,'updateForm')})"
      >
        <el-form ref="updateForm" :rules="rules" :model="updateForm" label-width="100px">
          <el-form-item label="用户组名称" prop="groupName">
            <el-input v-model="updateForm.groupName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="主送人" prop="toUserId">
            <el-select v-model="updateForm.toUserId" multiple>
              <el-option
                v-for="item in option"
                :key="item.id"
                :label="item.userName"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="抄送人" prop="ccUserId">
            <el-select v-model="updateForm.ccUserId" multiple>
              <el-option
                v-for="item in option"
                :key="item.id"
                :label="item.userName"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="addOrUpdateData('updateForm')">确 定</el-button>
        </div>
      </el-dialog>
    </template>
  </div>
</template>

<script>
import {
  reqListUser,
  reqListGroupUser,
  addGroupUser,
  updateGroupUser,
  deleteGroupUser
} from "@/api";
export default {
  data() {
    return {
      addDialog: false,  //添加弹框开关
      updateDialog: false,  //修改弹框开关
      params: {  //列表参数
        pageSize: 10,
        pageNum: 1,
        total: 0
      },
      form: {  //添加弹框数据
        groupName: "",
        toUserId: [],
        ccUserId: []
      },
      updateForm: {},  //修改弹框数据
      rules: {  //表单输入规则
        groupName: [
          { required: true, message: "请输入用户组账号", trigger: "blur" }
        ],
        toUserId: [
          { required: true, message: "请选择用户组类型", trigger: "change" }
        ],
        ccUserId: [
          { required: true, message: "请选择用户组类型", trigger: "change" }
        ]
      },
      tableData: [], //表格数据
      option: [] //所有用户--select
    };
  },
  methods: {
    //页码改变
    handleCurrentChange(val) {
      this.params.pageNum = val;
      this.initTable();
    },
    //打开修改弹框
    handleEdit(index, row) {
      this.updateDialog = true;
      this.updateForm = row;
      window.console.log(row.toUserList);
      row.toUserList.map(item => this.updateForm.toUserId.push(item.userCode));
      row.ccUserList.map(item => this.updateForm.ccUserId.push(item.userCode));
      // this.updateForm.toUserId = String(row.toUserId)
    },
    handleDelete(index, row) {
      window.console.log(index, row);
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
          this.deleteTable(row);
        }).catch(() => {
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
      if (done) {
        done();
      }
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
      window.console.log(data);
      const result = await addGroupUser(data);
      if (result.code === "0000") {
        this.$message({
          message: "恭喜你，数据插入成功",
          type: "success"
        });
        this.initTable();
        this.handleClose("", "addForm");
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
      const result = await updateGroupUser(data);
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
    // 异步删除数据
    async deleteTable(data) {
      const result = await deleteGroupUser(data);
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
      const result = await reqListGroupUser(data);
      if (result.code === "0000") {
        this.tableData = result.datas.records;
        this.params.total = result.datas.total;
      }
    },
    // 异步获取用户选择框信息
    async initOption() {
      const data = this.params;
      const result = await reqListUser(data);
      if (result.code === "0000") {
        this.option = result.datas.records;
      }
    }
  },
  mounted() {
    this.initTable();
    this.initOption();
  }
};
</script>

