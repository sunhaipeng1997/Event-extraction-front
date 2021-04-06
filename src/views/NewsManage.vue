<template>
    <div>
        <el-row>
            <el-col :span="20">
                <el-form :inline="true" :model="formInline" class="demo-form-inline">
                    <el-form-item label="内容">
                        <el-input v-model="formInline.content" placeholder="内容"></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="getData()">查询</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="openDialog()">添加</el-button>
                    </el-form-item>
                </el-form>
                <el-table
                        :data="tableData"
                        border

                        style="width: 100%">
                    <el-table-column
                            fixed
                            prop="id"
                            label="编号"
                            width="200"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="content"
                            label="内容"
                            show-overflow-tooltip
                            width="800px">
                    </el-table-column>

                    <el-table-column
                            prop="result"
                            label="关键词"
                            width="400">
                    </el-table-column>
                    <el-table-column
                            label="操作"
                            width="200">
                        <template slot-scope="scope">
                            <el-button @click="check(scope.row)" type="text" size="small">查看详情</el-button>
                            <el-button @click="deleteBook(scope.row)" type="text" size="small">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="block">
                    <el-pagination
                            background
                            class="pagination"
                            layout="prev, pager, next"
                            :total="this.total"
                            @current-change="handleCurrentPageChange"
                    >
                    </el-pagination>
                </div>
            </el-col>

        </el-row>

        <el-dialog title="事件抽取" :visible.sync="dialogFormVisible" v-loading="loading" >
            <el-row>
                <el-col :span="12">
                    <text>新闻内容</text>
                    <el-form :model="form"
                    >
                        <el-form-item>
                            <el-input type="textarea"
                                      v-model="form.content"
                                      :rows="10"
                            ></el-input>
                        </el-form-item>
                    </el-form>
                </el-col>
                <el-col :span="12">
                    <el-card class="box-card">
                        <div>
                            {{result}}
                        </div>
                    </el-card>
                </el-col>
            </el-row>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="handle()" style="display:block;margin:0 auto">事件抽取</el-button>
                <el-button @click="dialogFormVisible = false">取 消</el-button>

                <el-button type="primary" @click="addContent()">保存</el-button>
            </div>
        </el-dialog>
        <el-dialog title="事件抽取" :visible.sync="checkDialogVisible">
            <el-row>
                <el-col :span="12">
                    <el-form :model="form">
                        <el-form-item label="新闻内容" label-width="80px">
                            <el-input type="textarea"
                                      v-model="this.content"
                                      :rows="10"
                            ></el-input>
                        </el-form-item>
                    </el-form>
                </el-col>
                <el-col :span="12">
                    <el-card class="box-card">
                        <div>
                            {{this.result}}
                        </div>
                    </el-card>
                </el-col>
            </el-row>
            <div slot="footer" class="dialog-footer">
                <el-button @click="checkDialogVisible = false">关闭</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    const serverUrl = 'http://127.0.0.1:7777'
    export default {
        methods: {
            deleteBook(row) {
                const _this = this
                axios.delete(serverUrl + 'http://localhost:8181/book/deleteById/' + row.id).then(function (resp) {
                    _this.$alert('《' + row.name + '》删除成功！', '消息', {
                        confirmButtonText: '确定',
                        callback: action => {
                            window.location.reload()
                        }
                    })
                })
            },
            check(row) {
                this.result = row.result,
                    this.content = row.content,
                    this.checkDialogVisible = true
            },
            getData() {
                console.log('submit!');
                let that = this
                axios.get(serverUrl + '/api/articles', {
                    params: {
                        content: that.formInline.content,
                        page: that.page
                    }
                })
                    .then(function (response) {
                        that.tableData = response.data.articles
                        that.total = response.data.pageData.total
                        console.log(response);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            openDialog() {
                this.result = '',
                this.form.content= '',
                this.dialogFormVisible = true
            },
            addContent() {
                let that = this
                axios.post(serverUrl + '/api/addArticle', {
                    data: {
                        content: that.form.content,
                        result: that.result
                    }
                })
                    .then(function (response) {
                        console.log(response);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });

            },

            //进行事件抽取
            handle() {
                let that = this
                that.loading = true
                axios.post(serverUrl + '/api/handleArticle', {
                    data: {
                        content: that.form.content
                    }
                })
                    .then(function (response) {
                        that.result = response.data
                        that.loading = false
                        this.$message({
                            message: '事件抽取完成',
                            type: 'success'
                        });
                    })
                    .catch(function (error) {
                        console.log(error);
                        that.$message('提取失败');
                        that.loading = false
                    });

            },

            /*
            * 处理新闻列表的页面大小和当前页变化
            * 并查询
            */
            handleCurrentPageChange(val) {
                this.page = val;
                this.getData();
            }
        },

        data() {
            return {
                dialogFormVisible: false,
                checkDialogVisible: false,
                pageSize: 10,
                total: 10,
                page: 1,
                loading: false,
                form: {
                    content: ''
                },
                formInline: {
                    content: '',
                    id: ''
                },
                result: '',
                content: '',
                tableData: [{
                    id: 1,
                    title: '解忧杂货店',
                    content: '东野圭吾',
                    result: 'result'
                }, {
                    id: 2,
                    title: '追风筝的人',
                    content: '卡勒德·胡赛尼',
                    result: 'result'
                }, {
                    id: 3,
                    title: '人间失格',
                    content: '太宰治',
                    result: 'result'
                }]
            }
        },

        created() {
            this.getData();
        }
    }
</script>
<style>
    .pagination {
        overflow: auto;
        text-align: right;
        padding: 20px 0;
        margin: 0 10px;
    }
</style>
