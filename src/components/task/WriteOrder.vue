<template>
  <div>
    <div style="margin-top: 5px">
      <el-table
        ref="multipleTable" 
        :data="ddList"
        stripe
        border
        style="width: 100%" :title="dialogTitle" :visible.sync="dialogVisible">
        <el-table-column
          prop="ddId"
          label="订单编号"
          width="80">
        </el-table-column>
        <el-table-column
          prop="fDz"
          label="发货人地址"
          width="120">
        </el-table-column>
        <el-table-column
          prop="fName"
          label="发货人姓名"
          width="100">
        </el-table-column>
        <el-table-column
          prop="fNum"
          label="发货人电话"
          width="100">
        </el-table-column>
        <el-table-column
          prop="sDz"
          label="收货人地址"
          width="100">
        </el-table-column>
                <el-table-column
          prop="sName"
          label="收货人姓名"
          width="100">
        </el-table-column>
                <el-table-column
          prop="sNum"
          label="收货人电话"
          width="100">
        </el-table-column>
        <el-table-column
          prop="fp"
          label="所属分配点"
          width="100">
        </el-table-column>
        <el-table-column
          prop="money"
          label="费用"
          width="90">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="200">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">添加费用</el-button>
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
        <el-form ref="ddForm" label-width="80px" :model="dd">
          <el-form-item label="订单编号" >
            <el-input v-model="dd.ddId" prop="ddId" placeholder="输入订单编号"></el-input>
          </el-form-item>
          <el-form-item label="发货人地址">
            <el-input v-model="dd.fDz" prop="fDz" placeholder="输入收货人地址"></el-input>
          </el-form-item>
          <el-form-item label="发货人姓名">
            <el-input v-model="dd.fName" prop="fName" placeholder="请输入发货人姓名"></el-input>
          </el-form-item>
          <el-form-item label="发货人电话">
            <el-input v-model="dd.fNum" prop="fNum" placeholder="输入发货人电话"></el-input>
          </el-form-item>
          <el-form-item label="收货人地址">
            <el-input v-model="dd.sDz" prop="sDz" placeholder="输入收货人地址"></el-input>
          </el-form-item>
                    <el-form-item label="收货人姓名">
            <el-input v-model="dd.sName" prop="sName" placeholder="输入收货人姓名"></el-input>
          </el-form-item>
                    <el-form-item label="收货人电话">
            <el-input v-model="dd.sNum" prop="sNum" placeholder="输入收货人电话"></el-input>
          </el-form-item>
          <el-form-item>
           <el-select  placeholder="请选择分配点" style="width: 200px">
            <el-option label="请选择" value="请选择"></el-option>
            <el-option :label="this.dd.fp" :value="this.dd.fp"></el-option>
            <!-- <el-option label="上海" value=""></el-option> -->
          </el-select>
          <!-- 111 -->
          </el-form-item>
          <el-form-item>
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" v-if="dialogTitle=='修改订单信息'" >修改</el-button>
            <el-button type="primary" v-if="dialogTitle=='添加订单信息'" @click="submitDdForm('ddForm', lessonId)">添加2</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "dingdan",
  data() {
    return {
      lessonId: "",
      dialogTitle: "",
      dds: [],
      ddList: [],
      total: 0,
      pageSize: 10,
      currentPage: 1,
      dialogVisible: false,
      filed: "请选择",
      dd: {
        ddId: "",
        fDz: "",
        fName: "",
        fNum: "",
        sDz: "",
        sName: "",
        sNum: "",
        fp: []
      }
    };
  },
  created() {
    this.getFenPeiDian();
    this.getProfile();
  },
  methods: {
    getFenPeiDian() {
      this.$axios
        .get("/api/peisong")
        .then(res => {
          console.log(this.dd.fp);
          for (let i = 0; i < res.data.length; i++) {
            console.log(res.data[i].psName);
            this.dd.fp.push(res.data[i].psName);
          }
          console.log(this.dd.fp, "22");
        })
        .catch(err => {
          console.log(err);
        });
    },
    getProfile() {
      this.$axios
        .get("/api/dingdan")
        .then(res => {
          console.log(res.data);
          this.ddList = res.data;
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
    showAddDdView() {
      this.dialogTitle = "添加订单信息";
      this.dialogVisible = true;
      this.dd = {
        ddId: "",
        fDz: "",
        fName: "",
        fNum: "",
        sDz: "",
        sName: "",
        sNum: ""
      };
    },
    handleEdit() {
      // this.dialogVisible = true;
      // this.truck = row;
      this.dialogTitle = "修改课程信息";
      this.truck = this.dds[index];
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
    submitDdForm(formName, lessonId) {
      // console.log("1", this.truck);
      console.log(this.$refs.truckForm);
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (!this.lessonId) {
            this.$axios
              .post("/api/dingdan/add", this.dd)
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
                this.$message({ message: "课程信息已更新", type: "success" });
                this.dialogFormVisible = false;
                this.getProfile();
              })
              .catch(err => {
                console.log(err);
                this.$message({
                  message: `课程信息更新失败:${err}`,
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
  width: 40%;
}
</style>
