import React, {Component} from "react";
import {actions} from "mirrorx";
import {Button, Table, FormControl, Modal} from "tinper-bee";
import Grid from "components/Grid";

import "bee-complex-grid/build/Grid.css";
import "bee-pagination/build/Pagination.css";
import "bee-table/build/Table.css";
import "./index.less";

class Part extends Component {
    constructor() {
        super();
        this.state = {
            showModal: false
        };
    }

    columns1 = [
        {
            title: "序号",
            dataIndex: "index",
            key: "index",
            width: 60,
            render(record, text, index) {
                return index + 1;
            }
        },
        {
            title: "删除",
            dataIndex: "e",
            key: "e",
            width: 50,
            render(text, record, index) {
                return (
                    <div className='operation-btn'>
                        <i size='sm' className='uf uf-del' onClick={(e) => {
                            console.log("删除部位",record)
                            e.stopPropagation()
                            actions.quote.deletePart(record.id)
                        }}></i>
                    </div>
                )
            }
        },
        {
            title: "部位名称",
            dataIndex: "ppPositionName",
            key: "ppPositionName",
            width: 150
        },
        {
            title: "部位小计",
            dataIndex: "partSubtotal",
            className: 'column-number-right ', // 靠右对齐
            key: "partSubtotal",
            width: 80,
        },
    ];

    close = () => {
        this.setState({
            showModal: false
        });
    };

    render() {
        const _this = this;
        const {partObj, partIndex, pid} = this.props;
        console.log("partIndex",partIndex)
        const paginationObj = {
            // 分页
            // horizontalPosition: "right",
            verticalPosition: "none"
        };

        return (
            <div className="part">
                <div className="title"> 部位</div>
                <div className="operate">
                    <FormControl
                        className="partVal"
                        value={partObj.partVal}
                        onChange={actions.quote.partValChange}
                        placeholder="请输入部位"
                    />
                    <div>
                    <Button
                        colors="primary"
                        size="sm"
                        onClick={() => actions.quote.addPart()}
                        disabled = { pid ? false : true }
                    >
                        添加
                    </Button>
                    <Button
                        style={{marginRight: 16}}
                        colors="primary"
                        size="sm"
                        onClick={() => {
                            this.setState({
                                showModal: true
                            });
                        }}
                        disabled = { pid ? false : true }
                    >
                        参考其他部位
                    </Button>
                    </div>
                    
                   
                </div>
                <Grid
                    rowKey={(r, i) => r.id}
                    columns={this.columns1}
                    data={partObj.list}
                    paginationObj={paginationObj}
                    showFilterMenu={true} //是否显示行过滤菜单
                    multiSelect={false} //false 单选，默认多选
                    rowClassName={(record, index, indent) => {
                        return partIndex === index ? "selected" : "";
                    }}
                    onRowClick={(record, index) => {
                        console.log("onRowClick")
                        actions.quote.updateState({partIndex: index, slectedPartId:record.id});
                        // 查询项目
                        const param={search_pid:record.id};
                        actions.quote.loadSubjectList(param); // 查询默认条件
                    }}
                    getSelectedDataFunc={() => {}}
                />
                <Modal show={this.state.showModal} backdrop={true} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title> 我来组成头部 </Modal.Title>
                    </Modal.Header>
                    <Modal.Body/>
                    <Modal.Footer>
                        <Button onClick={this.close}> 关闭 </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default Part;
