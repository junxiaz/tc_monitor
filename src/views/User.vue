<template>
  <div class="wrap">
    <template>
      <!-- 操作按钮 -->
      <el-row class="btns">
        <el-button type="primary" @click="addDialog = true" size="small" icon="el-icon-plus">添加用户</el-button>
      </el-row>
      <!-- 数据表格 -->
      <el-table :data="tableData" border>
        <el-table-column align="center" prop="userName" label="用户名称"></el-table-column>
        <el-table-column align="center" prop="userCode" label="用户账号"></el-table-column>
        <el-table-column align="center" prop="userType" label="用户类型">
          <template slot-scope="scope">
            <template v-if="scope.row.userType == '1'">管理员</template>
            <template v-if="scope.row.userType == '2'">普通用户</template>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="userMobile" label="手机"></el-table-column>
        <el-table-column align="center" prop="userMail" label="邮箱"></el-table-column>
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
      <!-- 添加弹框 -->
      <el-dialog title="添加用户" :visible.sync="addDialog" width="635px" center :before-close="((done) => {handleClose(done,'addForm')})">
        <el-form :inline="true" ref="addForm" :rules="rules" :model="form" label-width="80px">
          <el-form-item label="用户账号" prop="userCode">
            <el-input v-model="form.userCode" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="userPwd">
            <el-input v-model="form.userPwd" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="用户姓名" prop="userName">
            <el-input v-model="form.userName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="手机" prop="userMobile">
            <el-input v-model="form.userMobile" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="用户类型" prop="userType">
            <el-select v-model="form.userType">
              <el-option label="管理员" value="1"></el-option>
              <el-option label="普通用户" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="邮箱" prop="userMail">
            <el-input style="width: 300px;" v-model="form.userMail" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="addOrUpdateData('addForm')">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 修改弹框 -->
      <el-dialog title="修改用户" :visible.sync="updateDialog" width="635px" center :before-close="((done) => {handleClose(done,'updateForm')})">
        <el-form ref="updateForm" :inline="true" :rules="rules" :model="updateForm" label-width="80px">
          <!-- <el-form-item label="用户名称" prop="name">
            <el-input v-model="updateForm.name" placeholder="请输入用户名称" autocomplete="off"></el-input>
          </el-form-item> -->
          <el-form-item label="用户账号" prop="userCode">
            <el-input v-model="updateForm.userCode" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="userPwd">
            <el-input v-model="updateForm.userPwd" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="用户姓名" prop="userName">
            <el-input v-model="updateForm.userName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="手机" prop="userMobile">
            <el-input v-model="updateForm.userMobile" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="用户类型" prop="userType">
            <el-select v-model="updateForm.userType">
              <el-option label="管理员" value="1"></el-option>
              <el-option label="普通用户" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="邮箱" prop="userMail">
            <el-input style="width: 300px;" v-model="updateForm.userMail" autocomplete="off"></el-input>
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
import { reqListUser, addUser, updateUser,deleteUser } from "@/api";
export default {
  data() {
    return {
      value: false,
      addDialog: false,
      updateDialog: false,
      params: {
        pageSize: 10,
        pageNum: 1,
        total: 0
      },
      form: {
        userCode: "",
        userMail: "",
        userMobile: "",
        userName: "",
        userPwd: "",
        userType: ""
      },
      updateForm: {},
      //   表单输入规则
      rules: {
        userCode: [
          { required: true, message: "请输入用户账号", trigger: "blur" }
        ],
        userPwd: [
          { required: true, message: "请输入用户密码", trigger: "blur" }
        ],
        userName: [
          { required: true, message: "请输入用户姓名", trigger: "blur" }
        ],
        userMobile: [
          { required: true, pattern: /^1[34578]\d{9}$/, message: "请输入手机号码", trigger: "blur" }
        ],
        userType: [
          { required: true, message: "请选择用户类型", trigger: "blur" }
        ],
        userMail: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ]
      },
      tableData: []
    };
  },
  methods: {
    //页码
    handleCurrentChange(val) {
      this.params.pageNum = val;
      this.initTable();
    },
    //打开修改弹框
    handleEdit(index, row) {
      this.updateDialog = true;
      this.updateForm = row;
      this.updateForm.userType = String(row.userType)
    },
    // 删除数据
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
    handleClose(done,formName) {
      done();         
      if(formName == "addForm"){
        this.addDialog = false;
      }
      else if(formName == "updateForm"){
        this.updateDialog = false;
      }
      if (this.$refs[formName] !== undefined) {
        this.$nextTick(() => {
          this.$refs[formName].resetFields();
        })
      }     
    },
    // 异步添加数据
    async addTable() {
      const data = this.form;
      const result = await addUser(data);
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
      const result = await updateUser(data);
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
      const result = await deleteUser(data);
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
      const result = await reqListUser(data);
      if (result.code === "0000") {
        // result.datas.records
        this.tableData = result.datas.records;

        this.params.total = result.datas.total;
      }
    }
  },
  mounted() {
    this.initTable();
  }
};
</script>

