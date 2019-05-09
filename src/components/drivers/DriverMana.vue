<template>
  <div>
    <div style="margin-top: 5px;display: flex;justify-content:flex-start;">
      <div>
        <el-button icon="el-icon-circle-plus" @click="showAddDriverView" type="primary" plain >添加驾驶员信息</el-button>
      </div>
      <div style="margin-left: 8px">
        <el-button icon="el-icon-error"  type="danger" plain>批量删除</el-button>
      </div>
      <!-- <div style="margin-left: 8px">
        <el-input placeholder="请输入您要查询的内容">
          <el-select v-model="filed" slot="prepend" placeholder="请选择" style="width: 100px">
            <el-option label="请选择" value="请选择"></el-option>
            <el-option label="车牌编号" value="truckid"></el-option>
            <el-option label="车牌号码" value="chePaiHao"></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search" ></el-button>
        </el-input>
      </div> -->
    </div>
    <div style="margin-top: 5px">
      <el-table
        ref="multipleTable" 
        :data="driversList"
        stripe
        border
        style="width: 100%" :title="dialogTitle" :visible.sync="dialogVisible">
        <el-table-column
          prop="driverid"
          label="驾驶员编号"
          width="120">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="80">
        </el-table-column>
        <el-table-column
          prop="sex"
          label="性别"
          width="100">
        </el-table-column>
        <el-table-column
          prop="num"
          label="手机号"
          width="80">
        </el-table-column>
        <el-table-column
          label="目前状态"
          width="100">
          <template slot-scope="scope">
            <el-tag type="success" v-if="driversList.state==2">空闲中</el-tag>
            <el-tag type="danger" v-else>承运中</el-tag>
          </template>
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
        <el-form ref="driverForm" label-width="80px" :model="driver">
          <el-form-item label="姓名" >
            <el-input v-model="driver.name" prop="name" placeholder="输入驾驶员姓名"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-input v-model="driver.sex" prop="sex" placeholder="输入驾驶员性别"></el-input>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="driver.num" prop="num" placeholder="输入驾驶员手机号"></el-input>
          </el-form-item>
          <el-form-item label="当前状态">
            <el-switch
              v-model="driver.state"
              active-color="#ff4949"
              inactive-color="#13ce66"
              active-text="承运中"
              inactive-text="空闲中"
              active-value="1"
              inactive-value="2">
            </el-switch>
          </el-form-item>
          <el-form-item>
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" v-if="dialogTitle=='修改驾驶员信息'" >修改</el-button>
            <el-button type="primary" v-if="dialogTitle=='添加驾驶员信息'" @click="submitDriverForm('driverForm', lessonId)">添加2</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "DriverMana",
  data() {
    return {
      lessonId: "",
      dialogTitle: "",
      drivers: [],
      driversList: [],
      total: 0,
      pageSize: 10,
      currentPage: 1,
      dialogVisible: false,
      filed: "请选择",
      // truckTypes: "全部车辆类型",
      driver: {
        driverid: "",
        name: "",
        sex: "",
        num: "",
        state: 0
      }
    };
  },
  created() {
    this.getDriver();
  },
  methods: {
    getDriver() {
      this.$axios
        .get("/api/drivers")
        .then(res => {
          console.log(res.data);
          this.driversList = res.data;
          // console.log(this.trucksList.state);
          // this.pagination.total = res.data.length;
          // this.tableData = res.data.filter((item, index) => {
          //   return index < this.pagination.pageSize;
          // });
        })
        .catch(err => {
          console.log(err);
        });
    },
    showAddDriverView() {
      this.dialogTitle = "添加驾驶员信息";
      this.dialogVisible = true;
      this.driver = {
        // truckid: "",
        name: "赵四",
        sex: "男",
        num: 18888888888,
        state: -1
      };
    },
    handleEdit() {
      // this.dialogTitle = "修改车辆信息";
      // this.dialogVisible = true;
      // this.truck = row;
      this.dialogTitle = "修改驾驶员信息";
      this.driver = this.drivers[index];
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
          this.postRequest("/truck/delete", row.truckid).then(resp => {
            if (resp) {
              this.initTrucks();
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
    //     this.delArr.push(this.multipleSelection[i].truckid);
    //     console.log(this.delArr);
    //   }
    // },
    // 提交信息表单
    submitDriverForm(formName, lessonId) {
      // console.log("1", this.truck);
      console.log(this.$refs.driverForm);
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (!this.lessonId) {
            this.$axios
              .post("/api/drivers/add", this.driver)
              .then(res => {
                this.$message({ message: "信息添加成功", type: "success" });
                this.dialogVisible = false;
                // this.getDriver();
              })
              .catch(err => {
                this.$message({
                  message: `添加失败:${err}`,
                  type: "warning"
                });
              });
          } else {
            this.$axios
              .post(`/api/drivers/edit/${this.lessonId}`, this.dialogForm)
              .then(res => {
                this.$message({ message: "驾驶员信息已更新", type: "success" });
                this.dialogFormVisible = false;
                this.getDriver();
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
            this.postRequest("/truck/deleteAll", this.delArr).then(resp => {
              if (resp) {
                this.delArr = [];
                this.initTrucks();
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
    updateTruck() {
      this.putRequest("/truck/", this.truck).then(resp => {
        if (resp) {
          this.initTrucks();
          this.dialogVisible = false;
          this.truck = {
            truckid: "",
            chePaiHao: "",
            buydate: null,
            type: "",
            length: "",
            describe: 0,
            fkTeamid: null,
            state: -1,
            remark: "",
            checkintime: null,
            isdelete: -1,
            altertime: null
          };
        }
      });
    }
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
