<template>
  <div class="wrap">
    <template>
      <!-- 操作按钮 -->
      <el-row class="btns">
        <el-button type="primary" @click="addDialog = true" size="small" icon="el-icon-plus">添加项目</el-button>
      </el-row>
      <!-- 数据表格 -->
      <el-table :data="tableData" border>
        <el-table-column align="center" prop="name" label="项目名称"></el-table-column>
        <el-table-column align="center" prop="date" label="日期"></el-table-column>
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
            :hide-on-single-page="value"
            :page-size="params.pageSize"
            :total="params.total"
          ></el-pagination>
        </el-col>
      </el-row>
      <!-- 添加弹框 -->
      <el-dialog title="添加项目" :visible.sync="addDialog" width="30%" center>
        <el-form ref="addForm" :rules="rules" :model="form" label-width="80px">
          <el-form-item label="项目名称" prop="name">
            <el-input v-model="form.name" placeholder="请输入项目名称" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="addOrUpdateData('addForm')">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 修改弹框 -->
      <el-dialog title="修改项目" :visible.sync="updateDialog" width="30%" center>
        <el-form ref="updateForm" :rules="rules" :model="updateForm" label-width="80px">
          <el-form-item label="项目名称" prop="name">
            <el-input v-model="updateForm.name" placeholder="请输入项目名称" autocomplete="off"></el-input>
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
export default {
  data() {
    return {
      value: false,
      addDialog: false,
      updateDialog: false,
      params: {
        pageSize: 10,
        total: 50
      },
      form: {
        name: ""
      },
      updateForm: {
        name: ""
      },
    //   表单输入规则
      rules: {
        name: [
            { required: true, message: '请输入项目名称', trigger: 'blur' },
          ],
      },
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  },
  methods: {
    handleClick(row) {
      window.console.log(row);
    },
    //打开修改弹框
    handleEdit(index, row) {
      this.updateDialog = true;
      this.updateForm.name = row.name;
      window.console.log(index, row);
    },
    handleDelete(index, row) {
      window.console.log(index, row);
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
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
            // 新增数据后刷新表格
          } else if (formName == "updateForm") {
            this.updateDialog = false;
            window.console.log(this.updateForm.name);
          }
        }
      });
    }
  }
};
</script>

