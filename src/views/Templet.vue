<template>
  <div class="wrap">
    <template>
      <!-- 操作按钮 -->
      <el-row class="btns">
        <el-button type="primary" @click="addDialog = true" size="small" icon="el-icon-plus">添加模板</el-button>
      </el-row>
      <!-- 数据表格 -->
      <el-table :data="tableData" border v-loading="statu">
        <el-table-column align="center" prop="templateName" label="模板名称"></el-table-column>
        <el-table-column align="center" prop="mailTheme" label="邮件主题"></el-table-column>
        <el-table-column align="center" prop="mailContent" label="邮件内容"></el-table-column>
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
      <el-dialog title="添加模板" :visible.sync="addDialog" width="350px" center :before-close="((done) => {handleClose(done,'addForm')})">
        <el-form :inline="true" ref="addForm" :rules="rules" :model="form" label-width="80px">
          <el-form-item label="模板名称" prop="templateName">
            <el-input v-model="form.templateName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="邮件主题" prop="mailTheme">
            <el-input v-model="form.mailTheme" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="邮件内容" prop="mailContent">
            <el-input type="textarea" v-model="form.mailContent" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="addOrUpdateData('addForm')">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 修改弹框 -->
      <el-dialog title="修改模板" :visible.sync="updateDialog" width="350px" center :before-close="((done) => {handleClose(done,'updateForm')})">
        <el-form ref="updateForm" :inline="true" :rules="rules" :model="updateForm" label-width="80px">
          <el-form-item label="模板名称" prop="templateName">
            <el-input v-model="updateForm.templateName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="邮件主题" prop="mailTheme">
            <el-input v-model="updateForm.mailTheme" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="邮件内容" prop="mailContent">
            <el-input type="textarea" v-model="updateForm.mailContent" autocomplete="off"></el-input>
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
import { reqListTemplatePage, addTemplate, updateTemplate,deleteTemplate } from "@/api";
export default {
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
        templateName: "",
        mailTheme: "",
        mailContent: "",
      },
      updateForm: {
        templateName: '',
        mailTheme: "",
        mailContent: "",
      },
      //   表单输入规则
      rules: {
        templateName: [
          { required: true, message: "请输入模板名称", trigger: "blur" }
        ],
        mailTheme: [
          { required: true, message: "请输入邮件主题", trigger: "blur" }
        ],
        mailContent: [
          { required: true, message: "请输入邮件内容", trigger: "blur" },
        ],
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
      this.updateForm.templateName = row.templateName;
      this.updateForm.mailTheme = row.mailTheme;
      this.updateForm.mailContent = row.mailContent;
      this.updateForm.id = row.id;
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
      const result = await addTemplate(data);
      if (result.code === "0000") {
        this.$message({
          message: "恭喜你，数据插入成功",
          type: "success"
        });
        this.initTable();
        this.$nextTick(() => {
          this.$refs['addForm'].resetFields();
        });
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
      const result = await updateTemplate(data);
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
      const result = await deleteTemplate(data);
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
      const result = await reqListTemplatePage(data);
      if (result.code === "0000") {
        // result.datas.records
        this.tableData = result.datas.records;
        this.params.total = result.datas.total;
        this.statu = false
      }
    }
  },
  mounted() {
    this.initTable();
  }
};
</script>

