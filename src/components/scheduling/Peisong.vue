<template>
  <div>
    <div style="margin-top: 5px;display: flex;justify-content:flex-start;">
      <div>
        <el-button icon="el-icon-circle-plus" @click="showAddPsView" type="primary" plain >添加配送点信息</el-button>
      </div>
      <div style="margin-left: 8px">
        <el-button icon="el-icon-error"  type="danger" plain>批量删除</el-button>
      </div>
    </div>
    <div style="margin-top: 5px">
      <el-table
        ref="multipleTable" 
        :data="psList"
        stripe
        border
        style="width: 100%" :title="dialogTitle" :visible.sync="dialogVisible">
        <el-table-column
          prop="psid"
          label="配送点编号"
          width="120">
        </el-table-column>
        <el-table-column
          prop="psName"
          label="配送点名称"
          width="120">
        </el-table-column>
        <el-table-column
          prop="place"
          label="配送点所属地区"
          width="120">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="150">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="display: flex;justify-content: flex-end;margin-top: 5px;margin-right: 10px">
        <el-pagination
          :page-sizes="[10,20,40]"
          :page-size="pageSize"
          background
          layout="sizes, prev, pager, next, jumper, ->, total, slot"
          :total="total">
        </el-pagination>
      </div>
    </div>
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="30%">
      <div style="padding-right: 77px;">
        <el-form ref="peisongForm" label-width="80px" :model="ps">
          <el-form-item label="编号" >
            <el-input v-model="ps.psid" prop="psid" placeholder="输入编号"></el-input>
          </el-form-item>
          <el-form-item label="配送点名称">
            <el-input v-model="ps.psName" prop="psName" placeholder="输入配送点名称"></el-input>
          </el-form-item>
          <el-form-item label="所属地区">
            <el-input v-model="ps.place" prop="place" placeholder="输入所属地区"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" v-if="dialogTitle=='修改配送点信息'" >修改</el-button>
            <el-button type="primary" v-if="dialogTitle=='添加配送点信息'" @click="submitpeisongForm('peisongForm', lessonId)">添加2</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Peisong",
  data() {
    return {
      lessonId: "",
      dialogTitle: "",
      ps: [],
      psList: [],
      total: 0,
      pageSize: 10,
      currentPage: 1,
      dialogVisible: false,
      filed: "请选择",
      // peisongTypes: "全部车辆类型",
      ps: {
        psid: "",
        psName: "",
        place: ""
      }
    };
  },
  created() {
    this.getProfile();
  },
  methods: {
    getProfile() {
      this.$axios
        .get("/api/peisong")
        .then(res => {
          console.log(res);
          this.psList = res.data;
          // console.log(this.peisongsList.state);
          // this.pagination.total = res.data.length;
          // this.tableData = res.data.filter((item, index) => {
          //   return index < this.pagination.pageSize;
          // });
        })
        .catch(err => {
          console.log(err);
        });
    },
    showAddPsView() {
      this.dialogTitle = "添加配送点信息";
      this.dialogVisible = true;
      this.ps = {
        psid: "BJ001",
        psName: "京城一号店",
        place: "北京"
      };
    },
    handleEdit() {
      // this.dialogTitle = "修改车辆信息";
      // this.dialogVisible = true;
      // this.peisong = row;
      this.dialogTitle = "修改驾驶员信息";
      this.peisong = this.peisongs[index];
      this.dialogVisible = true;
      // this.lessonId = this.tableData[index]._id;
    },
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该记录, 是否继续?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.postRequest("/peisong/delete", row.psid).then(resp => {
            if (resp) {
              this.initpeisongs();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // handleSelectionChange(val) {
    //   this.multipleSelection = val;
    //   const length = this.multipleSelection.length;
    //   for (let i = 0; i < length; i++) {
    //     this.delArr.push(this.multipleSelection[i].psid);
    //     console.log(this.delArr);
    //   }
    // },
    // 提交信息表单
    submitpeisongForm(formName, lessonId) {
      // console.log("1", this.peisong);
      console.log(this.$refs.peisongForm);
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (!this.lessonId) {
            this.$axios
              .post("/api/peisong/add", this.ps)
              .then(res => {
                this.$message({ message: "信息添加成功", type: "success" });
                this.dialogVisible = false;
                // this.getProfile();
              })
              .catch(err => {
                this.$message({
                  message: `添加失败:${err}`,
                  type: "warning"
                });
              });
          } else {
            this.$axios
              .post(`/api/profiles/edit/${this.lessonId}`, this.dialogForm)
              .then(res => {
                this.$message({ message: "驾驶员信息已更新", type: "success" });
                this.dialogFormVisible = false;
                this.getProfile();
              })
              .catch(err => {
                console.log(err);
                this.$message({
                  message: `驾驶员信息更新失败:${err}`,
                  type: "warning"
                });
              });
          }
        }
      });
    },
    delAll() {
      if (this.delArr.length == 0) {
        this.$message({
          message: "警告，请选择要批量删除的记录",
          type: "warning"
        });
      } else {
        console.log(this.delArr);
        this.$confirm("此操作将永久批量删除该记录, 是否继续?", "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.postRequest("/peisong/deleteAll", this.delArr).then(resp => {
              if (resp) {
                this.delArr = [];
                this.initpeisongs();
              }
              this.delArr = [];
            });
          })
          .catch(() => {
            this.delArr = [];
            this.$refs.multipleTable.clearSelection();
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      }
    },
    updatepeisong() {}
  }
};
</script>

<style>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 30%;
}
</style>
